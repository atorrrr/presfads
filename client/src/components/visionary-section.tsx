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
              src="https://i.imgur.com/U1G781I.jpeg" 
              alt="Presfades profile" 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full mx-auto object-cover gradient-border" 
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              THE VISIONARY <span className="gradient-text">BEHIND THE FADE</span>
            </h2>
            <p className="text-brand-secondary text-lg mb-6 leading-relaxed">
              With years of dedication to the craft, Presfades was founded on a passion for precision and a commitment to providing an unparalleled grooming experience.
            </p>
            <p className="text-brand-secondary text-lg mb-6 leading-relaxed">
              Where artistry meets attention to detail. At Presfades, we've elevated grooming into an art form, designed for those who value craftsmanship and exclusivity.
            </p>
            <p className="text-brand-secondary text-lg mb-8 leading-relaxed italic">
              <strong>Specialties:</strong> Flawless skin fades • Sharp tapers • Expert beard sculpting • Premium grooming services.
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
