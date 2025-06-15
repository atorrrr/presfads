import { trackEvent } from "@/lib/analytics";

export default function ContactSection() {
  const bookTransformation = () => {
    // Track booking event
    trackEvent('click', 'engagement', 'book_btn');
    
    // Redirect to Square booking
    window.open('https://app.squareup.com/appointments/book/mhhy3h6z761e4o/LKWJHT5S9KSN3/start', '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-6">
            GET IN <span className="gradient-text">TOUCH</span>
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl mx-auto">
            Ready for your transformation? Book your appointment or reach out with any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="gradient-border p-8 text-center">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-4">LOCATION</h3>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=6700+Silver+Sage+Dr+Fort+Worth+TX+76137" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-gradient text-white px-6 py-3 rounded-full font-semibold inline-block min-h-[48px] min-w-[48px] text-sm"
            >
              6700 Silver Sage Dr<br/>
              Fort Worth, TX 76137
            </a>
          </div>

          <div className="gradient-border p-8 text-center">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-4">CALL NOW</h3>
            <a 
              href="tel:4699010585" 
              className="btn-gradient text-white px-6 py-3 rounded-full font-semibold inline-block min-h-[48px] min-w-[48px]"
            >
              (469) 901-0585
            </a>
          </div>

          <div className="gradient-border p-8 text-center">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-4">EMAIL US</h3>
            <a 
              href="mailto:presfades@gmail.com" 
              className="btn-gradient text-white px-6 py-3 rounded-full font-semibold inline-block min-h-[48px] min-w-[48px]"
            >
              presfades@gmail.com
            </a>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={bookTransformation} 
            className="btn-gradient text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl min-h-[48px] min-w-[48px]"
          >
            BOOK YOUR TRANSFORMATION
          </button>
        </div>
      </div>
    </section>
  );
}
