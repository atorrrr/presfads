import { Button } from "@/components/ui/button";
import { Scissors, Star, TrendingUp } from "lucide-react";

const BOOKING_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-about">
                <Scissors className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-about-badge">
                  The Visionary Behind The Fade
                </span>
              </div>

              <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-about-main">
                Master Fade
                <br />
                <span className="text-primary"> Specialist</span>
              </h2>

              <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed text-center">
              <p className="text-lg" data-testid="text-about-intro">
                With years of dedication to the craft, <span className="text-primary font-semibold">Presfades</span> was founded on a passion for precision fade haircuts and a commitment to providing an unparalleled grooming experience throughout the Dallas-Fort Worth metroplex.
              </p>

              <p className="text-lg" data-testid="text-about-mission">
                Where artistry meets attention to detail. At Presfades, we've elevated men's grooming into an art form, specializing in fade haircuts that have made us Dallas and Fort Worth's premier barbershop destination.
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="font-semibold text-foreground text-lg flex items-center justify-center gap-2" data-testid="heading-specialties">
                  <Star className="h-5 w-5 text-primary" />
                  Specialties
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
                  {[
                    "Flawless skin fades",
                    "Sharp taper fades",
                    "Expert beard sculpting",
                    "Premium men's haircuts",
                    "Dallas-Fort Worth area service",
                    "VIP after-hours service"
                  ].map((specialty, index) => (
                    <li key={specialty} className="flex items-start gap-2" data-testid={`item-specialty-${index}`}>
                      <TrendingUp className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-foreground/90" data-testid={`text-specialty-${index}`}>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                asChild
                className="font-semibold"
                data-testid="button-book-consultation-about"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  BOOK CONSULTATION
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
