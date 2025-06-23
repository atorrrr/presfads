import { useEffect } from "react";
import { useLocation } from "wouter";

export default function BookingSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Track booking success for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'booking_success', {
        event_category: 'conversion',
        event_label: 'appointment_confirmed',
        value: 60
      });
    }

    // Track Meta Pixel purchase confirmation
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 60.00,
        currency: 'USD',
        content_name: 'Haircut Appointment'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="gradient-border rounded-2xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
            APPOINTMENT <span className="gradient-text">CONFIRMED!</span>
          </h1>
          
          <p className="text-brand-secondary text-lg mb-8 leading-relaxed">
            Thank you for choosing PRESFADES! Your appointment has been successfully booked. 
            You'll receive a confirmation email with all the details shortly.
          </p>

          {/* What's Next */}
          <div className="bg-brand-card rounded-xl p-6 mb-8 text-left">
            <h3 className="text-xl font-bold text-brand-primary mb-4">What's Next:</h3>
            <ul className="space-y-3 text-brand-secondary">
              <li className="flex items-start">
                <span className="gradient-text font-bold mr-3">1.</span>
                Check your email for appointment confirmation and reminders
              </li>
              <li className="flex items-start">
                <span className="gradient-text font-bold mr-3">2.</span>
                Arrive 5-10 minutes early to your appointment
              </li>
              <li className="flex items-start">
                <span className="gradient-text font-bold mr-3">3.</span>
                Bring reference photos of your desired fade style
              </li>
              <li className="flex items-start">
                <span className="gradient-text font-bold mr-3">4.</span>
                Get ready for the best fade experience in Dallas-Fort Worth!
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="border-t border-purple-500/20 pt-6 mb-8">
            <p className="text-brand-secondary mb-4">
              Need to reschedule or have questions?
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="tel:4699010585" 
                className="btn-gradient text-white px-6 py-3 rounded-full font-semibold"
              >
                Call Us
              </a>
              <a 
                href="mailto:presfades@gmail.com" 
                className="text-brand-secondary hover:text-brand-primary transition-colors px-6 py-3"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* Return Home */}
          <button
            type="button"
            onClick={() => setLocation('/')}
            className="text-brand-secondary hover:text-brand-primary transition-colors"
          >
            ← Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}