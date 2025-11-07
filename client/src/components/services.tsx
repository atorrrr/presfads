import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Clock, Sparkles } from "lucide-react";

const BOOKING_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

const services = [
  {
    id: "haircut",
    title: "HAIRCUT",
    description: "Precision haircut tailored to your style, finished with a sharp line-up.",
    price: "$75",
    duration: "Approx. 1 hour",
    icon: Scissors,
  },
  {
    id: "haircut-beard",
    title: "HAIRCUT & BEARD TRIM",
    description: "Complete grooming: precision cut paired with expert beard shaping & line-up.",
    price: "$90",
    duration: "Approx. 1 hour",
    icon: Scissors,
  },
  {
    id: "after-hours",
    title: "AFTER HOURS SERVICE",
    description: "Premium service outside regular hours. Contact for availability before booking.",
    price: "$125+",
    duration: "Approx. 1 hour",
    icon: Sparkles,
    featured: true,
  },
  {
    id: "eyebrow",
    title: "EYEBROW SHAPING",
    description: "Clean up and define your brows with razor/trim. (Add-on to any service).",
    price: "$10",
    duration: "Add-on Service",
    icon: Scissors,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-services">
              <Scissors className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-services-badge">
                Elite Services
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-services-main">
              Premium Fade
              <br />
              <span className="text-primary">Services</span>
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed" data-testid="text-services-description">
              Discover our range of professional fade haircuts and grooming services serving Dallas and Fort Worth. Expert barber specializing in skin fades, taper fades, and precision cuts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 ${
                    service.featured ? "border-primary/50 bg-card/80" : "border-card-border"
                  }`}
                  data-testid={`card-service-${service.id}`}
                >
                  {service.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full" data-testid={`badge-exclusive-${service.id}`}>
                        EXCLUSIVE
                      </div>
                    </div>
                  )}

                  <CardHeader className="space-y-4 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-md bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <CardTitle className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors" data-testid={`text-service-title-${service.id}`}>
                      {service.title}
                    </CardTitle>

                    <CardDescription className="text-foreground/70 leading-relaxed min-h-[4rem]" data-testid={`text-service-description-${service.id}`}>
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary" data-testid={`text-service-price-${service.id}`}>
                          {service.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span data-testid={`text-service-duration-${service.id}`}>{service.duration}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      asChild
                      className="w-full font-semibold"
                      variant={service.featured ? "default" : "outline"}
                      data-testid={`button-book-${service.id}`}
                    >
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                        BOOK SERVICE
                      </a>
                    </Button>
                  </CardFooter>

                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-md transition-colors pointer-events-none" />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
