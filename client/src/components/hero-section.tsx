import { trackEvent } from "@/lib/analytics";

export default function HeroSection() {
  const bookTransformation = () => {
    // Track booking event
    trackEvent('click', 'engagement', 'book_btn');
    
    // Redirect to Square booking
    window.open('https://app.squareup.com/appointments/book/mhhy3h6z761e4o/LKWJHT5S9KSN3/start', '_blank');
  };

  return (
    <section className="hero-bg h-screen flex items-center justify-center relative mt-[60px]">
      <div className="text-center z-10 px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-primary mb-6 leading-tight">
          TRANSFORM YOUR
          <span className="gradient-text block">PRESENCE</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-secondary mb-8 max-w-2xl mx-auto">
          Premium barbering and styling services that elevate your confidence and presence. Experience the difference of precision cuts and personalized service.
        </p>
        <button 
          onClick={bookTransformation} 
          className="btn-gradient text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg md:text-xl shadow-2xl min-h-[48px] min-w-[48px]"
        >
          BOOK YOUR TRANSFORMATION
        </button>
      </div>
    </section>
  );
}
