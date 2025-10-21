import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const BOOKING_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight" data-testid="heading-contact-main">
              Get In
              <br />
              <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto" data-testid="text-contact-description">
              Ready to experience premium grooming? Book your appointment or reach out with any questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-card-border" data-testid="card-contact-info">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-foreground" data-testid="heading-contact-info">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4" data-testid="item-address">
                  <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="text-address-label">Address</p>
                    <p className="text-foreground/70" data-testid="text-address">
                      6700 Silver Sage Dr
                      <br />
                      Fort Worth, TX 76137
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="item-phone">
                  <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="text-phone-label">Phone</p>
                    <a href="tel:+14699010585" className="text-foreground/70 hover:text-primary transition-colors" data-testid="link-phone">
                      (469) 901-0585
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="item-email">
                  <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="text-email-label">Email</p>
                    <a href="mailto:presfades@gmail.com" className="text-foreground/70 hover:text-primary transition-colors" data-testid="link-email">
                      presfades@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="item-hours">
                  <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="text-hours-label">Hours</p>
                    <p className="text-foreground/70" data-testid="text-hours">
                      Monday - Saturday: 9:00 AM - 7:00 PM
                      <br />
                      Sunday: Closed
                      <br />
                      <span className="text-primary text-sm">After-hours available by appointment</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center space-y-8" data-testid="section-booking">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-3xl text-foreground" data-testid="heading-ready-to-book">
                  Ready to Book?
                </h3>
                <p className="text-foreground/70 leading-relaxed" data-testid="text-booking-description">
                  Schedule your appointment online through our booking system. Choose your preferred service and time slot that works best for you.
                </p>
              </div>

              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto font-semibold"
                data-testid="button-book-appointment-contact"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  BOOK APPOINTMENT
                </a>
              </Button>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground" data-testid="text-service-area">
                  Proudly serving the Dallas-Fort Worth metroplex with premium fade haircuts and grooming services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
