import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop",
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-gallery">
              <Instagram className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-gallery-badge">
                Transformations
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-gallery-main">
              Fade Haircut
              <br />
              <span className="text-primary">Gallery</span>
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed" data-testid="text-gallery-description">
              See our latest fade haircuts and transformations from our Dallas-Fort Worth barbershop. Follow{" "}
              <a
                href="https://www.instagram.com/presfades/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
                data-testid="link-instagram-inline"
              >
                @presfades
                <ExternalLink className="h-3 w-3" />
              </a>{" "}
              on Instagram for daily updates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-md border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                data-testid={`gallery-item-${index}`}
              >
                <img
                  src={image}
                  alt={`Fade haircut transformation ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-testid={`img-gallery-${index}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40 flex items-center justify-center">
                    <ExternalLink className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="font-semibold border-primary/30 hover:bg-primary/10"
              data-testid="button-follow-instagram"
            >
              <a
                href="https://www.instagram.com/presfades/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                FOLLOW @PRESFADES FOR DAILY TRANSFORMATIONS
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
