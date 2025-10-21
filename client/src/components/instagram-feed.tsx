import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-instagram">
              <Instagram className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-instagram-badge">
                Follow Our Work
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-instagram-main">
              Behind The
              <br />
              <span className="text-primary">Fades</span>
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto" data-testid="text-instagram-description">
              Experience the precision and artistry that goes into every cut. Follow us on Instagram to see our latest work, client transformations, and exclusive behind-the-scenes content.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              asChild
              className="font-semibold gap-2"
              data-testid="button-view-instagram"
            >
              <a href="https://www.instagram.com/presfades/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                VIEW LATEST POSTS
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="font-semibold gap-2"
              data-testid="button-follow-instagram"
            >
              <a href="https://www.instagram.com/presfades/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                FOLLOW @PRESFADES
              </a>
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground" data-testid="text-instagram-cta">
            Join thousands who trust Presfades for premium grooming in the DFW area
          </div>
        </div>
      </div>
    </section>
  );
}
