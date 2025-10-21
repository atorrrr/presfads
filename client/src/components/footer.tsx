import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-4" data-testid="section-footer-brand">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-foreground" data-testid="text-footer-logo">
                Pres<span className="text-primary">fades</span>
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed" data-testid="text-footer-tagline">
              Dallas-Fort Worth's premier destination for elite fade haircuts and VIP grooming experiences. Master craftsmanship meets precision.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/presfades/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                data-testid="link-footer-instagram"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://www.facebook.com/share/1Z2pc57rmt/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                data-testid="link-footer-facebook"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          <div className="space-y-4" data-testid="section-footer-contact">
            <h3 className="font-serif font-bold text-lg text-foreground" data-testid="heading-footer-contact">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3" data-testid="item-footer-address">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/70" data-testid="text-footer-address">
                  6700 Silver Sage Dr
                  <br />
                  Fort Worth, TX 76137
                </p>
              </div>
              <div className="flex items-center gap-3" data-testid="item-footer-phone">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+14699010585"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  data-testid="link-footer-phone"
                >
                  (469) 901-0585
                </a>
              </div>
              <div className="flex items-center gap-3" data-testid="item-footer-email">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:presfades@gmail.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  presfades@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4" data-testid="section-footer-hours">
            <h3 className="font-serif font-bold text-lg text-foreground" data-testid="heading-footer-hours">
              Hours
            </h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <div className="flex justify-between" data-testid="item-footer-hours-weekday">
                <span>Monday - Saturday</span>
                <span className="text-primary">9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between" data-testid="item-footer-hours-sunday">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
              <p className="pt-2 text-xs text-primary" data-testid="text-footer-after-hours">
                After-hours service available by appointment
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} Presfades. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
