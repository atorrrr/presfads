import { useState } from "react";

const faqs = [
  {
    question: "What types of fade haircuts do you specialize in?",
    answer: "We specialize in all fade variations including skin fades, low fades, mid fades, high fades, taper fades, and bald fades. Our expert barber has years of experience creating precision fade haircuts for clients throughout Dallas and Fort Worth."
  },
  {
    question: "Do you serve both Dallas and Fort Worth areas?",
    answer: "Yes! While our barbershop is located in Fort Worth at 6700 Silver Sage Dr, we proudly serve clients from across the Dallas-Fort Worth metroplex. Many of our regular clients travel from Dallas for our premium fade haircuts and grooming services."
  },
  {
    question: "How much do fade haircuts cost?",
    answer: "Our haircuts start at $75 for precision cuts and fades. Haircut and beard trim combinations are $90. We also offer after-hours services for $125+ and eyebrow shaping add-ons for $10. All services include expert consultation and styling."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can easily book your appointment online through our Square booking system. Just click any 'Book Now' button on our website, or call us directly at (469) 901-0585. We recommend booking in advance as our premium services are in high demand."
  },
  {
    question: "What makes your barbershop different from others in DFW?",
    answer: "PRESFADES specializes exclusively in fade haircuts and precision grooming. Our barber has years of dedicated experience in fade techniques, ensuring every client receives expert-level cuts. We focus on quality over quantity, providing VIP-level service in a professional environment."
  },
  {
    question: "Do you offer beard trimming and grooming services?",
    answer: "Absolutely! We offer expert beard sculpting and trimming services that complement our fade haircuts perfectly. Our beard services include precise trimming, shaping, and line-ups to enhance your overall look."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-brand-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-6">
            FREQUENTLY ASKED <span className="gradient-text">QUESTIONS</span>
          </h2>
          <p className="text-brand-secondary text-lg">
            Common questions about our fade haircuts and barbershop services in the Dallas-Fort Worth area
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="gradient-border overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-brand-bg/20 transition-colors"
              >
                <h3 className="text-lg font-semibold text-brand-primary pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-brand-primary transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-brand-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}