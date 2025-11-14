import { useState, useEffect } from "react";
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

export function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("presfades_lead_popup_seen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

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
                Check Your Phone! 📱
              </DialogTitle>
              <DialogDescription className="text-base" data-testid="text-success-message">
                We've sent you an SMS with a link to share your inspiration photos.
                Our team will review and get back to you shortly!
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <DialogTitle className="text-2xl font-serif" data-testid="heading-lead-magnet">
                  Get Your Free Consultation
                </DialogTitle>
              </div>
              <DialogDescription className="text-base" data-testid="text-lead-description">
                Share your hairstyle inspiration with us! We'll send you a personalized SMS consultation
                and help you achieve the perfect look.
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary/20 p-4 bg-primary/5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-consent"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          I agree to receive SMS messages from Presfades for consultation purposes.
                          Standard message rates may apply.
                        </FormLabel>
                        <FormMessage />
                      </div>
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
                  {leadMutation.isPending ? "Sending..." : "Get Free Consultation"}
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
