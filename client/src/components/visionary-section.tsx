import { useLocation } from "wouter";

export default function VisionarySection() {
  const [, setLocation] = useLocation();

  const bookTransformation = () => {
    // Track booking event with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'book_btn_about'
      });
    }
    
    // Redirect to custom booking page
    setLocation('/booking');
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
              With years of dedication to the craft, Presfades was founded on a passion for precision fade haircuts and a commitment to providing an unparalleled grooming experience throughout the Dallas-Fort Worth metroplex.
            </p>
            <p className="text-brand-secondary text-lg mb-6 leading-relaxed">
              Where artistry meets attention to detail. At Presfades, we've elevated men's grooming into an art form, specializing in fade haircuts that have made us Dallas and Fort Worth's premier barbershop destination.
            </p>
            <p className="text-brand-secondary text-lg mb-8 leading-relaxed italic">
              <strong>Specialties:</strong> Flawless skin fades • Sharp taper fades • Expert beard sculpting • Premium men's haircuts • Dallas-Fort Worth area service
            </p>
            <button 
              type="button"
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
