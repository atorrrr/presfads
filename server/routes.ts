import { createHash, randomUUID } from "crypto";
import type { Express, Request, Response } from "express";
import { urlencoded } from "express";
import multer from "multer";
import { createServer, type Server } from "http";
import fetch from "node-fetch";
import { Pool } from "pg";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import twilio from "twilio";

const upload = multer({ storage: multer.memoryStorage() });

const databaseUrl = process.env.DATABASE_URL;
const shouldUseSsl = Boolean(databaseUrl) && !/localhost|127\.0\.0\.1/.test(databaseUrl!);

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
});

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : undefined;

const s3Client = process.env.AWS_REGION
  ? new S3Client({ region: process.env.AWS_REGION })
  : undefined;

const port = parseInt(process.env.PORT ?? "5000", 10);
const baseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY,
      name TEXT,
      email TEXT,
      raw_phone TEXT,
      normalized_phone TEXT UNIQUE,
      consent BOOLEAN DEFAULT FALSE,
      upload_token TEXT UNIQUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY,
      lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
      direction TEXT NOT NULL,
      body TEXT,
      media_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS lead_media (
      id UUID PRIMARY KEY,
      lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
      message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
      s3_key TEXT NOT NULL,
      content_type TEXT,
      media_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(
    "CREATE INDEX IF NOT EXISTS leads_normalized_phone_idx ON leads (normalized_phone);",
  );
  await pool.query("CREATE INDEX IF NOT EXISTS leads_upload_token_idx ON leads (upload_token);");
  await pool.query("CREATE INDEX IF NOT EXISTS messages_lead_id_idx ON messages (lead_id);");
  await pool.query("CREATE INDEX IF NOT EXISTS lead_media_lead_id_idx ON lead_media (lead_id);");
}

function ensureUploadSecret() {
  if (!process.env.UPLOAD_TOKEN_SECRET) {
    throw new Error("UPLOAD_TOKEN_SECRET is not configured");
  }
}

function generateUploadToken(leadId: string) {
  ensureUploadSecret();
  return createHash("sha256")
    .update(`${leadId}:${process.env.UPLOAD_TOKEN_SECRET}`)
    .digest("hex");
}

async function verifyTurnstileToken(token: string | undefined, remoteIp: string | undefined) {
  if (!process.env.TURNSTILE_SECRET) {
    return true;
  }

  if (!token) {
    return false;
  }

  const params = new URLSearchParams();
  params.append("secret", process.env.TURNSTILE_SECRET);
  params.append("response", token);
  if (remoteIp) {
    params.append("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

async function normalizePhoneNumber(phone: string) {
  if (!twilioClient) {
    throw new Error("Twilio client is not configured");
  }

  try {
    const lookup = await twilioClient.lookups.v2.phoneNumbers(phone).fetch({ type: ["carrier"] });
    return lookup.phoneNumber;
  } catch (error: any) {
    console.error("Phone normalization failed:", error?.message ?? error);
    throw new Error("Unable to verify phone number");
  }
}

function buildUploadLink(token: string) {
  try {
    return new URL(`/upload/${token}`, baseUrl).toString();
  } catch (error) {
    return `${baseUrl.replace(/\/$/, "")}/upload/${token}`;
  }
}

async function createOrUpdateLead({
  name,
  email,
  phone,
  normalizedPhone,
  consent,
}: {
  name: string | null;
  email: string | null;
  phone: string;
  normalizedPhone: string;
  consent: boolean;
}) {
  const existing = await pool.query<{ id: string; upload_token: string | null }>(
    "SELECT id, upload_token FROM leads WHERE normalized_phone = $1",
    [normalizedPhone],
  );

  if (existing.rowCount && existing.rows[0]) {
    const lead = existing.rows[0];
    const uploadToken = lead.upload_token ?? generateUploadToken(lead.id);
    await pool.query(
      "UPDATE leads SET name = $1, email = $2, raw_phone = $3, consent = $4, upload_token = $5 WHERE id = $6",
      [name, email, phone, consent, uploadToken, lead.id],
    );
    return { id: lead.id, uploadToken };
  }

  const id = randomUUID();
  const uploadToken = generateUploadToken(id);
  await pool.query(
    "INSERT INTO leads (id, name, email, raw_phone, normalized_phone, consent, upload_token) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [id, name, email, phone, normalizedPhone, consent, uploadToken],
  );
  return { id, uploadToken };
}

async function sendSms(to: string, body: string) {
  if (!twilioClient) {
    throw new Error("Twilio client is not configured");
  }

  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!messagingServiceSid && !fromNumber) {
    throw new Error("Twilio messaging configuration is missing");
  }

  const params: Record<string, string> = {
    to,
    body,
  };

  if (messagingServiceSid) {
    params.messagingServiceSid = messagingServiceSid;
  } else if (fromNumber) {
    params.from = fromNumber;
  }

  return twilioClient.messages.create(params);
}

function getTwilioAuthHeader() {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    throw new Error("Twilio credentials are not configured");
  }

  const token = Buffer.from(
    `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`,
  ).toString("base64");

  return `Basic ${token}`;
}

async function storeMediaInS3({
  leadId,
  messageId,
  mediaUrl,
  contentType,
  buffer,
}: {
  leadId: string;
  messageId: string;
  mediaUrl: string;
  contentType: string | undefined;
  buffer: Buffer;
}) {
  if (!s3Client || !process.env.S3_BUCKET) {
    throw new Error("S3 is not configured");
  }

  const extension = contentType ? contentType.split("/").pop() ?? "bin" : "bin";
  const key = `leads/${leadId}/messages/${messageId}/${randomUUID()}.${extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType ?? "application/octet-stream",
      ACL: "private",
    }),
  );

  await pool.query(
    "INSERT INTO lead_media (id, lead_id, message_id, s3_key, content_type, media_url) VALUES ($1, $2, $3, $4, $5, $6)",
    [randomUUID(), leadId, messageId, key, contentType, mediaUrl],
  );
}

export async function registerRoutes(app: Express): Promise<Server> {
  await initDatabase();

  app.post("/api/lead", async (req: Request, res: Response) => {
    const {
      name = null,
      email = null,
      phone,
      message: initialMessage = "",
      consent,
      consentChecked,
      turnstileToken,
    } = req.body ?? {};

    const consentGiven =
      consent === true ||
      consent === "true" ||
      consentChecked === true ||
      consentChecked === "true";

    if (!consentGiven) {
      return res.status(400).json({ error: "Consent is required to submit the form." });
    }

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required." });
    }

    const turnstileValid = await verifyTurnstileToken(turnstileToken, req.ip);
    if (!turnstileValid) {
      return res.status(400).json({ error: "Turnstile validation failed." });
    }

    try {
      const normalizedPhone = await normalizePhoneNumber(phone);
      const lead = await createOrUpdateLead({
        name,
        email,
        phone,
        normalizedPhone,
        consent: true,
      });

      const uploadLink = buildUploadLink(lead.uploadToken);
      const trimmedMessage = typeof initialMessage === "string" ? initialMessage.trim() : "";
      const smsBody =
        trimmedMessage.length > 0
          ? `${trimmedMessage} ${uploadLink}`
          : `Thanks for reaching out to Presfades! You can upload your inspiration photos here: ${uploadLink}`;

      await sendSms(normalizedPhone, smsBody);

      await pool.query(
        "INSERT INTO messages (id, lead_id, direction, body, media_count) VALUES ($1, $2, $3, $4, $5)",
        [randomUUID(), lead.id, "outbound", smsBody, 0],
      );

      return res.status(201).json({ id: lead.id, uploadUrl: uploadLink });
    } catch (error: any) {
      console.error("Lead submission failed:", error);
      return res.status(500).json({ error: error?.message ?? "Failed to submit lead." });
    }
  });

  app.post("/webhooks/sms", urlencoded({ extended: false }), async (req: Request, res: Response) => {
    const from = req.body?.From as string | undefined;
    const body = (req.body?.Body as string | undefined) ?? "";
    const mediaCount = parseInt((req.body?.NumMedia as string | undefined) ?? "0", 10);

    if (!from) {
      res.set("Content-Type", "text/xml");
      return res.send("<Response></Response>");
    }

    try {
      const leadResult = await pool.query<{ id: string }>(
        "SELECT id FROM leads WHERE normalized_phone = $1 OR raw_phone = $1 LIMIT 1",
        [from],
      );

      if (!leadResult.rowCount || !leadResult.rows[0]) {
        console.warn("Lead not found for inbound message from", from);
        res.set("Content-Type", "text/xml");
        return res.send("<Response></Response>");
      }

      const leadId = leadResult.rows[0].id;
      const messageId = randomUUID();

      await pool.query(
        "INSERT INTO messages (id, lead_id, direction, body, media_count) VALUES ($1, $2, $3, $4, $5)",
        [messageId, leadId, "inbound", body, mediaCount],
      );

      let mediaStored = false;

      for (let i = 0; i < mediaCount; i += 1) {
        const mediaUrl = req.body?.[`MediaUrl${i}`] as string | undefined;
        const contentType = req.body?.[`MediaContentType${i}`] as string | undefined;

        if (!mediaUrl) {
          continue;
        }

        const response = await fetch(mediaUrl, {
          headers: {
            Authorization: getTwilioAuthHeader(),
          },
        });

        if (!response.ok) {
          console.error("Failed to download media from Twilio:", mediaUrl, response.statusText);
          continue;
        }

        const arrayBuffer = await response.arrayBuffer();
        await storeMediaInS3({
          leadId,
          messageId,
          mediaUrl,
          contentType,
          buffer: Buffer.from(arrayBuffer),
        });

        mediaStored = true;
      }

      if (mediaStored) {
        const thankYouMessage =
          "Thanks for sharing your inspiration with Presfades! We will review and follow up shortly.";
        await sendSms(from, thankYouMessage);
        await pool.query(
          "INSERT INTO messages (id, lead_id, direction, body, media_count) VALUES ($1, $2, $3, $4, $5)",
          [randomUUID(), leadId, "outbound", thankYouMessage, 0],
        );
      }

      res.set("Content-Type", "text/xml");
      return res.send("<Response></Response>");
    } catch (error) {
      console.error("Failed to process inbound SMS webhook:", error);
      res.set("Content-Type", "text/xml");
      return res.send("<Response></Response>");
    }
  });

  app.get("/upload/:token", async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
      const result = await pool.query<{ id: string }>(
        "SELECT id FROM leads WHERE upload_token = $1",
        [token],
      );

      if (!result.rowCount || !result.rows[0]) {
        return res.status(404).send("Invalid or expired upload link.");
      }

      return res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Upload Inspiration</title>
    <style>
      body { font-family: sans-serif; margin: 2rem; }
      form { display: flex; flex-direction: column; gap: 1rem; max-width: 480px; }
      input[type="file"] { padding: 0.5rem; }
      button { padding: 0.75rem 1.5rem; font-size: 1rem; cursor: pointer; }
      .status { margin-top: 1rem; }
    </style>
  </head>
  <body>
    <h1>Upload Your Inspiration Photos</h1>
    <p>Select up to 10 files to share with the Presfades team.</p>
    <form id="uploadForm">
      <input type="file" id="files" name="files" accept="image/*" multiple required />
      <button type="submit">Upload</button>
    </form>
    <div id="status" class="status"></div>
    <script>
      const form = document.getElementById('uploadForm');
      const statusEl = document.getElementById('status');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        statusEl.textContent = 'Uploading...';
        const filesInput = document.getElementById('files');
        if (!filesInput.files.length) {
          statusEl.textContent = 'Please choose at least one file to upload.';
          return;
        }
        const formData = new FormData();
        for (const file of filesInput.files) {
          formData.append('files', file);
        }
        try {
          const response = await fetch('/upload', {
            method: 'POST',
            headers: { 'x-upload-token': '${token}' },
            body: formData,
          });
          const data = await response.json();
          if (!response.ok) {
            statusEl.textContent = data.error || 'Upload failed. Please try again.';
          } else {
            statusEl.textContent = 'Uploaded ' + data.count + ' file(s) successfully.';
          }
        } catch (error) {
          statusEl.textContent = 'Upload failed. Please try again later.';
        }
      });
    </script>
  </body>
</html>`);
    } catch (error) {
      console.error("Failed to render upload page:", error);
      return res.status(500).send("Unable to load upload page.");
    }
  });

  app.post("/upload", upload.array("files", 10), async (req: Request, res: Response) => {
    const token = (req.headers["x-upload-token"] as string | undefined) ?? req.body?.uploadToken;

    if (!token) {
      return res.status(401).json({ error: "Upload token is required." });
    }

    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "At least one file must be provided." });
    }

    try {
      const leadResult = await pool.query<{ id: string }>(
        "SELECT id FROM leads WHERE upload_token = $1",
        [token],
      );

      if (!leadResult.rowCount || !leadResult.rows[0]) {
        return res.status(403).json({ error: "Invalid upload token." });
      }

      const leadId = leadResult.rows[0].id;

      if (!s3Client || !process.env.S3_BUCKET) {
        throw new Error("S3 is not configured");
      }

      for (const file of files) {
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const key = `leads/${leadId}/uploads/${randomUUID()}-${sanitizedName}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype ?? "application/octet-stream",
            ACL: "private",
          }),
        );

        await pool.query(
          "INSERT INTO lead_media (id, lead_id, message_id, s3_key, content_type, media_url) VALUES ($1, $2, $3, $4, $5, $6)",
          [randomUUID(), leadId, null, key, file.mimetype, null],
        );
      }

      return res.json({ success: true, count: files.length });
    } catch (error: any) {
      console.error("Upload failed:", error);
      return res.status(500).json({ error: error?.message ?? "Failed to upload files." });
    }
  });

  app.get("/healthz", (_req: Request, res: Response) => {
    res.send("ok");
  });

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled rejection:", error);
  });

  const httpServer = createServer(app);
  return httpServer;
}
