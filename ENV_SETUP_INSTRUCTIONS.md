# Environment Variables Setup for Render

## Your Generated Secrets

```bash
UPLOAD_TOKEN_SECRET=aae3377ec193a9a0def703951488bb88a55636c35465823a4655a0521d1abcc8
```

## Step-by-Step Instructions

### 1. Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `presfads-db`
   - **Region**: Same as your web service
   - **Plan**: Starter (recommended) or Free
4. Click "Create Database"
5. Copy the **Internal Database URL** (it will look like: `postgresql://...`)

### 2. Add Environment Variables to Your Web Service

1. Go to your web service in Render (presfads-dev or presfads-fullstack)
2. Click "Environment" in the left sidebar
3. Add each variable below by clicking "Add Environment Variable"

### Required Variables

#### Database
| Key | Value |
|-----|-------|
| `DATABASE_URL` | [Paste Internal Database URL from Step 1] |
| `UPLOAD_TOKEN_SECRET` | `aae3377ec193a9a0def703951488bb88a55636c35465823a4655a0521d1abcc8` |

#### Twilio (for SMS)
Get from: https://console.twilio.com

| Key | Value |
|-----|-------|
| `TWILIO_ACCOUNT_SID` | [From Twilio Console] |
| `TWILIO_AUTH_TOKEN` | [From Twilio Console] |
| `TWILIO_MESSAGING_SERVICE_SID` | [From Twilio Messaging Services] OR use TWILIO_FROM_NUMBER below |
| `TWILIO_FROM_NUMBER` | [Your Twilio phone number, e.g., +15551234567] |

#### AWS S3 (for file uploads)
Get from: https://console.aws.amazon.com/iam/

| Key | Value |
|-----|-------|
| `AWS_ACCESS_KEY_ID` | [From AWS IAM] |
| `AWS_SECRET_ACCESS_KEY` | [From AWS IAM] |
| `AWS_REGION` | [Your S3 region, e.g., us-west-2] |
| `S3_BUCKET` | [Your S3 bucket name] |

#### Optional
| Key | Value |
|-----|-------|
| `PUBLIC_BASE_URL` | [Your Render URL, e.g., https://presfads-dev.onrender.com] |
| `TURNSTILE_SECRET` | [From Cloudflare Turnstile] |

### 3. Save and Deploy

After adding all variables, Render will automatically redeploy your service.

### 4. Verify Deployment

Check the logs for:
- ✅ `serving on port 10000` (or your port)
- ✅ No database connection errors
- ✅ No "Pool is not defined" errors

## Quick Links

- Render Dashboard: https://dashboard.render.com
- Twilio Console: https://console.twilio.com
- AWS Console: https://console.aws.amazon.com/iam/
- Cloudflare Turnstile: https://dash.cloudflare.com/

## Troubleshooting

### "Pool is not defined" error
Make sure the pg import fix is merged to your deploy branch (develop).

### Database connection timeout
Use the Internal Database URL, not External, if your database and web service are in the same region.

### Missing UPLOAD_TOKEN_SECRET error
Copy the generated secret above and add it as an environment variable.

## Local Development

For local development, create a `.env` file (see `.env.example`) with your values.
