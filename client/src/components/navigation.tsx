import { useState, useEffect } from "react";

interface NavigationProps {
  onOpenLeadModal?: () => void;
}

export default function Navigation({ onOpenLeadModal }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for sticky nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    closeMobileMenu();
  };

  const bookTransformation = () => {
    // Track booking event with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'book_btn'
      });
    }
    
    // Redirect to Square booking
    window.open('https://app.squareup.com/appointments/book/mhhy3h6z761e4o/LKWJHT5S9KSN3/start', '_blank');
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-purple-500/20 h-[60px]">
        <div className="flex items-center justify-between h-full px-4">
          <div className="text-2xl font-bold gradient-text">PRESFADES</div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden w-12 h-12 flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="block w-full h-0.5 bg-brand-primary transition-all duration-300"></span>
              <span className="block w-full h-0.5 bg-brand-primary transition-all duration-300"></span>
              <span className="block w-full h-0.5 bg-brand-primary transition-all duration-300"></span>
            </div>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-brand-secondary hover:text-brand-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-brand-secondary hover:text-brand-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="text-brand-secondary hover:text-brand-primary transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-brand-secondary hover:text-brand-primary transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={onOpenLeadModal} 
              className="text-brand-secondary hover:gradient-text transition-colors border border-purple-500/30 px-3 py-2 rounded-lg hover:border-purple-500/60"
            >
              Free Guide
            </button>
            <button 
              onClick={bookTransformation} 
              className="btn-gradient text-white px-6 py-3 rounded-full font-semibold"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 w-full h-full bg-brand-bg z-40 md:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-2xl text-brand-primary font-semibold"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-2xl text-brand-primary font-semibold"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('gallery')} 
            className="text-2xl text-brand-primary font-semibold"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-2xl text-brand-primary font-semibold"
          >
            Contact
          </button>
          <button 
            onClick={() => {
              onOpenLeadModal?.();
              closeMobileMenu();
            }} 
            className="text-xl gradient-text font-semibold border border-purple-500/30 px-6 py-3 rounded-lg"
          >
            Free Consultation Guide
          </button>
          <button 
            onClick={bookTransformation} 
            className="btn-gradient text-white px-8 py-4 rounded-full font-semibold text-lg"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </>
  );
}
