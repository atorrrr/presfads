import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";

const GIFT_CARD_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

export function GiftCardBanner() {
  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-r from-background via-primary/5 to-background border-y border-primary/20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-[10%] text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute top-8 right-[15%] text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="absolute bottom-6 left-[20%] text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="absolute bottom-4 right-[25%] text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="hidden sm:flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center border border-primary/30 shrink-0">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold tracking-wider uppercase text-primary" data-testid="text-holiday-label">
                  Holiday Special
                </span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground" data-testid="heading-gift-card-banner">
                Give the Gift of a <span className="text-primary">Premium Fade</span>
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base" data-testid="text-gift-card-description">
                The perfect present for the man who deserves VIP treatment
              </p>
            </div>
          </div>

          <Button
            size="lg"
            asChild
            className="text-base font-bold px-8 h-12 shadow-xl shadow-primary/20 whitespace-nowrap"
            data-testid="button-gift-card-banner"
          >
            <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer">
              <Gift className="h-5 w-5 mr-2" />
              SHOP GIFT CARDS
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
