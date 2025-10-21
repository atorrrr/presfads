import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "LOCATION",
      value: "6700 Silver Sage Dr",
      subValue: "Fort Worth, TX 76137",
      link: "https://www.google.com/maps/search/?api=1&query=6700+Silver+Sage+Dr+Fort+Worth+TX+76137",
      testId: "link-location"
    },
    {
      icon: Phone,
      label: "CALL NOW",
      value: "(469) 901-0585",
      link: "tel:4699010585",
      testId: "link-phone"
    },
    {
      icon: Mail,
      label: "EMAIL US",
      value: "presfades@gmail.com",
      link: "mailto:presfades@gmail.com",
      testId: "link-email"
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20" data-testid="badge-contact">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase" data-testid="text-contact-badge">
                Get In Touch
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-contact-main">
              Book Your
              <br />
              <span className="text-primary">Transformation</span>
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed" data-testid="text-contact-description">
              Ready for the best fade haircut in Dallas-Fort Worth? Book your appointment at our Fort Worth barbershop or reach out with any questions about our services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 p-6 rounded-md border border-card-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                      data-testid={info.testId}
                    >
                      <div className="p-3 rounded-md bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide" data-testid={`text-contact-label-${info.testId}`}>
                          {info.label}
                        </div>
                        <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2" data-testid={`text-contact-value-${info.testId}`}>
                          {info.value}
                          {info.link.startsWith('http') && (
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        {info.subValue && (
                          <div className="text-foreground/70" data-testid={`text-contact-subvalue-${info.testId}`}>
                            {info.subValue}
                          </div>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full font-bold text-base h-14 shadow-xl shadow-primary/20"
                  data-testid="button-secure-appointment"
                >
                  <a href="tel:4699010585">
                    SECURE YOUR APPOINTMENT
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square rounded-md overflow-hidden border border-card-border shadow-2xl shadow-primary/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3346.4982754729843!2d-97.2713!3d32.9547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864dd8d6e9d8b3d9%3A0x1234567890abcdef!2s6700%20Silver%20Sage%20Dr%2C%20Fort%20Worth%2C%20TX%2076137!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Presfades Location"
                className="grayscale-[30%] contrast-[1.1] brightness-[0.95]"
              />
              <div className="absolute top-4 left-4 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-md border border-primary/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-semibold text-foreground">
                    Fort Worth, TX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
