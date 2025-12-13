import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, X } from "lucide-react";

const GIFT_CARD_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

export function GiftCardPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenGiftPopup = localStorage.getItem("presfades_gift_popup_seen");
    
    if (!hasSeenGiftPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem("presfades_gift_popup_seen", "true");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[450px] border-primary/30 bg-gradient-to-b from-background to-primary/5 overflow-hidden"
        data-testid="dialog-gift-card"
      >
        <div className="absolute top-3 left-3 text-primary/20">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute top-6 right-12 text-primary/15">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="absolute bottom-16 left-6 text-primary/15">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute bottom-8 right-8 text-primary/20">
          <Sparkles className="h-7 w-7" />
        </div>

        <div className="relative z-10 py-4 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/40 shadow-lg shadow-primary/20">
              <Gift className="h-10 w-10 text-primary" />
            </div>
          </div>

          <DialogHeader className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary" data-testid="text-popup-holiday-label">
                Holiday Special
              </span>
              <div className="h-px w-8 bg-primary/50" />
            </div>
            <DialogTitle className="text-3xl font-serif" data-testid="heading-gift-card-popup">
              Give the Gift of a <span className="text-primary">Premium Fade</span>
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed px-4" data-testid="text-gift-card-popup-description">
              Looking for the perfect gift? Treat someone special to a VIP grooming experience at Presfades.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 px-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                <div className="text-lg font-bold text-primary" data-testid="text-gift-amount-75">$75</div>
                <div className="text-xs text-muted-foreground">Haircut</div>
              </div>
              <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                <div className="text-lg font-bold text-primary" data-testid="text-gift-amount-90">$90</div>
                <div className="text-xs text-muted-foreground">Cut + Beard</div>
              </div>
              <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                <div className="text-lg font-bold text-primary" data-testid="text-gift-amount-125">$125+</div>
                <div className="text-xs text-muted-foreground">VIP After Hours</div>
              </div>
            </div>

            <Button
              size="lg"
              asChild
              className="w-full text-base font-bold h-12 shadow-xl shadow-primary/20"
              data-testid="button-gift-card-popup"
            >
              <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer">
                <Gift className="h-5 w-5 mr-2" />
                SHOP GIFT CARDS NOW
              </a>
            </Button>

            <button
              onClick={() => handleClose(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-dismiss-gift-popup"
            >
              Maybe later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
