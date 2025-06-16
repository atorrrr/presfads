export default function HeroSection() {
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
