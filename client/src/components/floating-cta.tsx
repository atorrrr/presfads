import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [, setLocation] = useLocation();

  const bookTransformation = () => {
    // Track booking event with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'book_btn_floating'
      });
    }
    
    // Redirect to custom booking page
    setLocation('/booking');
  };

  useEffect(() => {
    const checkVisibility = () => {
      if (window.innerWidth >= 768) {
        setIsVisible(false);
        return;
      }
      
      const heroSection = document.querySelector('.hero-bg');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 0;
        setIsVisible(!isHeroVisible);
      }
    };

    const handleScroll = () => {
      checkVisibility();
    };

    const handleResize = () => {
      checkVisibility();
    };

    // Initial check
    checkVisibility();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button 
      type="button"
      onClick={bookTransformation} 
      className="floating-cta flex items-center justify-center text-white font-bold text-lg"
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      BOOK NOW
    </button>
  );
}
