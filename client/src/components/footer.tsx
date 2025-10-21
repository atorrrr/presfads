import { Scissors, Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-black border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2" data-testid="logo-footer">
                <Scissors className="h-8 w-8 text-primary" />
                <span className="text-2xl font-serif font-bold text-foreground">
                  Pres<span className="text-primary">fades</span>
                </span>
              </div>
              <p className="text-foreground/70 leading-relaxed" data-testid="text-footer-description">
                Dallas-Fort Worth's elite fade specialist. Precision cuts, sharp lines & VIP grooming experience.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/presfades/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                  data-testid="link-instagram-footer"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground" data-testid="heading-footer-quicklinks">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-foreground/70 hover:text-primary transition-colors"
                      data-testid={`link-footer-${link.id}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground" data-testid="heading-footer-contact">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:4699010585"
                    className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors group"
                    data-testid="link-phone-footer"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <span>(469) 901-0585</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:presfades@gmail.com"
                    className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors group"
                    data-testid="link-email-footer"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span>presfades@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-primary/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground" data-testid="text-copyright">
                © {currentYear} Presfades. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground" data-testid="text-footer-tagline">
                Dallas-Fort Worth's Premier Barbershop
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
