import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 sm:py-32 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-instagram">
                <SiInstagram className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-instagram-badge">
                  Follow The Journey
                </span>
              </div>

              <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-instagram-main">
                Behind The
                <br />
                <span className="text-primary">Fades</span>
              </h2>

              <p className="text-lg text-foreground/70 leading-relaxed" data-testid="text-instagram-description">
                See our latest fade haircuts and transformations from our Dallas-Fort Worth barbershop. Follow @presfades on Instagram for daily updates, behind-the-scenes content, and exclusive grooming tips.
              </p>
            </div>

            <div className="relative py-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
              </div>
              
              <div className="relative flex flex-col items-center gap-6">
                <div className="p-6 rounded-full bg-primary/10 border-2 border-primary/30 backdrop-blur-sm">
                  <SiInstagram className="h-16 w-16 text-primary" data-testid="icon-instagram-large" />
                </div>
                
                <div className="space-y-3 text-center">
                  <p className="text-2xl font-bold text-foreground" data-testid="text-instagram-handle">
                    @presfades
                  </p>
                  <p className="text-foreground/60 max-w-md mx-auto" data-testid="text-instagram-subtitle">
                    Daily transformation showcases • Expert fade techniques • VIP grooming insights
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="font-bold text-base h-14 px-8 shadow-xl shadow-primary/20 gap-2"
                    data-testid="button-view-instagram"
                  >
                    <a
                      href="https://www.instagram.com/presfades/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiInstagram className="h-5 w-5" />
                      VIEW LATEST POSTS
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="font-bold text-base h-14 px-8 gap-2 bg-background/50 backdrop-blur-sm"
                    data-testid="button-follow-instagram"
                  >
                    <a
                      href="https://www.instagram.com/presfades/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FOLLOW @PRESFADES
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground pt-2" data-testid="text-instagram-cta">
                  Join thousands of followers for exclusive transformation reveals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
