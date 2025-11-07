import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, ExternalLink } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    alt: "Fresh fade haircut"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    alt: "Precision line work"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    alt: "Skin fade close up"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    alt: "Barber at work"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
    alt: "Fresh cut transformation"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    alt: "Taper fade styling"
  }
];

export function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://www.instagram.com/presfades/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-md"
                data-testid={`instagram-post-${post.id}`}
              >
                <Card className="h-full w-full overflow-hidden border-border">
                  <div className="relative h-full w-full">
                    <img
                      src={post.image}
                      alt={post.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-testid={`instagram-image-${post.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white">
                          <Instagram className="h-8 w-8" />
                          <span className="text-lg font-semibold">View on Instagram</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-primary/90 backdrop-blur-sm">
                        <ExternalLink className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 pt-8">
            <div className="flex flex-col sm:flex-row gap-4">
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
                  VIEW ALL POSTS
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="font-bold text-base h-14 px-8 gap-2"
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

            <p className="text-sm text-muted-foreground text-center" data-testid="text-instagram-cta">
              Join thousands of followers for exclusive transformation reveals and grooming tips
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
