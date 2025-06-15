const services = [
  {
    title: "HAIRCUT",
    description: "Precision haircut tailored to your style, finished with a sharp line-up.",
    price: "$60",
    duration: "Approx. 1 hour"
  },
  {
    title: "HAIRCUT & BEARD TRIM", 
    description: "Complete grooming: precision cut paired with expert beard shaping & line-up.",
    price: "$75",
    duration: "Approx. 1 hour"
  },
  {
    title: "AFTER HOURS SERVICE",
    description: "Premium service outside regular hours. Contact for availability before booking.",
    price: "$100+",
    duration: "Approx. 1 hour"
  },
  {
    title: "EYEBROW SHAPING",
    description: "Clean up and define your brows with razor/trim. (Add-on to any service).",
    price: "$5",
    duration: "Add-on Service"
  }
];

export default function ServicesSection() {
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
    <section id="services" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-6">
            ELITE FADE <span className="gradient-text">SERVICES</span>
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl mx-auto">
            Discover our range of professional fade haircuts and grooming services serving Dallas and Fort Worth. Expert barber specializing in skin fades, taper fades, and precision cuts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card gradient-border p-6 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L13 8h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-4">{service.title}</h3>
              <p className="text-brand-secondary mb-4">
                {service.description}
              </p>
              <p className="text-2xl font-bold gradient-text mb-2">{service.price}</p>
              <p className="text-sm text-brand-secondary mb-6">{service.duration}</p>
              <button 
                onClick={bookTransformation} 
                className="btn-gradient text-white px-6 py-3 rounded-full font-semibold w-full min-h-[48px]"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
