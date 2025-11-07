import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Kiran Nevill",
    initials: "KN",
    rating: 5,
    text: "I've been going to Presfades for years and he always gets me right. Very personable and if you want a barber that truly cares about you and knows his stuff you gotta check him out. Best barber in the DFW undoubtedly."
  },
  {
    id: 2,
    name: "Philip Mercer",
    initials: "PM",
    rating: 5,
    text: "Preston is a phenomenal barber with amazing talent, with a personality to go hand and hand with. He's personable and makes sure you get everything you want with your cut. This man has it all!!"
  },
  {
    id: 3,
    name: "Brennen Moffett",
    initials: "BM",
    rating: 5,
    text: "Preston's more than a barber, he's a vibe. Every cut leaves me looking sharp and feeling like I can take on anything. He's got skills with the clippers and a knack for real talk that lifts you up. It's not just a haircut, it's a confidence boost."
  },
  {
    id: 4,
    name: "Ricky Menchaca",
    initials: "RM",
    rating: 5,
    text: "Hands down the best barber in the game. Preston makes sure to keep elevating his knowledge on cutting hair and perfecting his craft. If you're looking for the best cut you can get, Preston is the man to get you right."
  },
  {
    id: 5,
    name: "Brandon Hayes",
    initials: "BH",
    rating: 5,
    text: "I've been using Preston for years now and I won't go anywhere else. He has attention to detail and delivers the best cut every single time."
  },
  {
    id: 6,
    name: "Marcus Johnson",
    initials: "MJ",
    rating: 5,
    text: "The precision and attention to detail is unmatched. Preston transformed my look and my confidence. Worth every penny for this VIP grooming experience."
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-testimonials">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-testimonials-badge">
                Client Reviews
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-testimonials-main">
              What Our Clients
              <br />
              <span className="text-primary">Are Saying</span>
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed" data-testid="text-testimonials-description">
              See what our clients have to say about their experience with Presfades - Dallas-Fort Worth's premier fade specialist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
                data-testid={`testimonial-card-${testimonial.id}`}
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20" data-testid={`avatar-${testimonial.id}`}>
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground" data-testid={`name-${testimonial.id}`}>
                          {testimonial.name}
                        </p>
                        <div className="flex gap-0.5" data-testid={`rating-${testimonial.id}`}>
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-primary fill-primary"
                              data-testid={`star-${testimonial.id}-${i}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                </CardHeader>

                <CardContent className="pb-6">
                  <p className="text-foreground/80 leading-relaxed" data-testid={`text-${testimonial.id}`}>
                    "{testimonial.text}"
                  </p>
                </CardContent>

                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-md transition-colors pointer-events-none" />
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                    data-testid={`avatar-badge-${i}`}
                  >
                    <Star className="h-4 w-4 text-primary fill-primary" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground" data-testid="text-rating-summary">
                  5.0 Star Rating
                </p>
                <p className="text-xs text-muted-foreground" data-testid="text-review-count">
                  From 100+ verified clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
