import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, User, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const leadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive SMS messages",
  }),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadMagnetContextType {
  openPopup: () => void;
}

const LeadMagnetContext = createContext<LeadMagnetContextType | null>(null);

export function useLeadMagnet() {
  const context = useContext(LeadMagnetContext);
  if (!context) {
    throw new Error("useLeadMagnet must be used within LeadMagnetProvider");
  }
  return context;
}

export function LeadMagnetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("presfades_lead_popup_seen");
    
    if (!hasSeenPopup) {
      // Show after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      // Show on exit intent (mouse leaving viewport at top)
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !isOpen) {
          setIsOpen(true);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isOpen]);

  return (
    <LeadMagnetContext.Provider value={{ openPopup }}>
      {children}
      <LeadMagnetPopupInternal isOpen={isOpen} setIsOpen={setIsOpen} />
    </LeadMagnetContext.Provider>
  );
}

function LeadMagnetPopupInternal({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      consent: false,
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (data: LeadFormValues) => {
      const res = await apiRequest("POST", "/api/lead", {
        name: data.name,
        phone: data.phone,
        consent: data.consent,
        consentChecked: data.consent,
      });
      return res.json() as Promise<{ id: string; uploadUrl: string }>;
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 5000);
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error?.message || "Unable to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem("presfades_lead_popup_seen", "true");
    }
  };

  const onSubmit = (data: LeadFormValues) => {
    leadMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[500px] border-primary/20"
        data-testid="dialog-lead-magnet"
      >
        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif" data-testid="heading-success">
                Text Message Sent! 📱
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed" data-testid="text-success-message">
                <strong className="text-foreground">Check your phone now!</strong>
                <br /><br />
                We just sent you a text with a secure upload link. Click it to share your hairstyle inspiration photos, and Preston will review them personally and reach out to schedule your appointment.
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <DialogTitle className="text-2xl font-serif" data-testid="heading-lead-magnet">
                  Get Your Free SMS Consultation
                </DialogTitle>
              </div>
              <DialogDescription className="text-base leading-relaxed" data-testid="text-lead-description">
                <strong className="text-foreground">Here's what happens next:</strong>
                <br />
                1. We'll text you a secure link instantly
                <br />
                2. Upload your hairstyle inspiration photos
                <br />
                3. Preston reviews and reaches out to schedule
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-lead-magnet">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            className="pl-10"
                            data-testid="input-name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            className="pl-10"
                            data-testid="input-phone"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary/20 p-4 bg-primary/5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-consent"
                            id="consent-checkbox"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex-1">
                          <FormLabel 
                            htmlFor="consent-checkbox"
                            className="text-sm font-normal cursor-pointer"
                          >
                            I agree to receive SMS messages from Presfades for consultation purposes.
                            Standard message rates may apply.
                          </FormLabel>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={leadMutation.isPending}
                  data-testid="button-submit-lead"
                >
                  {leadMutation.isPending ? "Sending SMS..." : "Send Me The Link"}
                </Button>

                <p className="text-xs text-center text-muted-foreground" data-testid="text-privacy-note">
                  Your information is secure and will only be used for consultation purposes.
                </p>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
