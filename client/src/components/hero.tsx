import { Button } from "@/components/ui/button";
import { Sparkles, Award, Clock } from "lucide-react";

const BOOKING_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2940&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-primary" />
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm" data-testid="text-vip-badge">
              VIP Grooming Experience
            </span>
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="h-px w-12 bg-primary" />
          </div>

          <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground tracking-tight leading-[1.1]" data-testid="heading-hero-main">
            DALLAS-FORT WORTH'S
            <br />
            <span className="text-primary">ELITE FADE</span>
            <br />
            SPECIALISTS
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/90 font-light max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-tagline">
            Precision cuts, sharp lines & master craftsmanship.
            <br />
            <span className="text-muted-foreground">
              Where artistry meets attention to detail.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              asChild
              className="text-base font-bold px-8 h-12 shadow-xl shadow-primary/20"
              data-testid="button-reserve-transformation"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                RESERVE YOUR TRANSFORMATION
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base font-semibold px-8 h-12 bg-background/20 backdrop-blur-sm border-primary/30 hover:bg-background/30"
              data-testid="button-book-consultation"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                BOOK CONSULTATION
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-md bg-background/10 backdrop-blur-sm border border-primary/20" data-testid="stat-craftsmanship">
              <Award className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-foreground" data-testid="text-stat-title-craftsmanship">Master Craftsmanship</span>
              <span className="text-xs text-muted-foreground" data-testid="text-stat-desc-craftsmanship">Years of Dedication</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-md bg-background/10 backdrop-blur-sm border border-primary/20" data-testid="stat-vip">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-foreground" data-testid="text-stat-title-vip">VIP Service</span>
              <span className="text-xs text-muted-foreground" data-testid="text-stat-desc-vip">Exclusive Experience</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-md bg-background/10 backdrop-blur-sm border border-primary/20" data-testid="stat-availability">
              <Clock className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-foreground" data-testid="text-stat-title-availability">Limited Availability</span>
              <span className="text-xs text-muted-foreground" data-testid="text-stat-desc-availability">By Appointment Only</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
