import { trackEvent } from "@/lib/analytics";

export default function VisionarySection() {
  const bookTransformation = () => {
    // Track booking event
    trackEvent('click', 'engagement', 'book_btn');
    
    // Redirect to Square booking
    window.open('https://app.squareup.com/appointments/book/mhhy3h6z761e4o/LKWJHT5S9KSN3/start', '_blank');
  };

  return (
    <section id="about" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800" 
              alt="Professional barber portrait" 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full mx-auto object-cover gradient-border" 
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              THE <span className="gradient-text">VISIONARY</span>
            </h2>
            <p className="text-brand-secondary text-lg mb-6 leading-relaxed">
              With over a decade of experience in premium barbering and styling, I specialize in creating transformative experiences that go beyond just a haircut. Every service is tailored to enhance your natural features and boost your confidence.
            </p>
            <p className="text-brand-secondary text-lg mb-8 leading-relaxed">
              From precision fades to complete style makeovers, I'm committed to delivering exceptional results that reflect your personality and lifestyle.
            </p>
            <button 
              onClick={bookTransformation} 
              className="btn-gradient text-white px-8 py-4 rounded-full font-semibold min-h-[48px] min-w-[48px]"
            >
              BOOK CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
