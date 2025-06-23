import { useLocation } from "wouter";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const bookTransformation = () => {
    // Track booking event with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'book_btn_hero'
      });
    }
    
    // Redirect to custom booking page
    setLocation('/booking');
  };

  return (
    <section className="hero-bg h-screen flex items-center justify-center relative mt-[60px]">
      <div className="text-center z-10 px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-primary mb-6 leading-tight">
          DALLAS-FORT WORTH'S ELITE
          <span className="gradient-text block">FADE SPECIALISTS</span>
          <span className="text-brand-secondary block text-2xl md:text-3xl lg:text-4xl mt-4">Precision cuts, sharp lines & VIP grooming</span>
        </h1>
        <button 
          type="button"
          onClick={bookTransformation} 
          className="btn-gradient text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg md:text-xl shadow-2xl min-h-[48px] min-w-[48px]"
        >
          BOOK YOUR TRANSFORMATION
        </button>
      </div>
    </section>
  );
}
