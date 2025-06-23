import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Booking() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Track booking page visit for Meta
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'booking_page_view', {
        event_category: 'conversion',
        event_label: 'square_booking'
      });
    }

    // Track Meta Pixel event for booking page (if you have Meta Pixel)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  }, []);

  const handleBookingComplete = () => {
    // Track successful booking for Meta
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'booking_completed', {
        event_category: 'conversion',
        event_label: 'square_booking',
        value: 60 // Average service value
      });
    }

    // Track Meta Pixel purchase event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 60.00,
        currency: 'USD'
      });
    }

    // Redirect to success page after a short delay
    setTimeout(() => {
      setLocation('/booking-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
          BOOK YOUR <span className="gradient-text">TRANSFORMATION</span>
        </h1>
        <p className="text-brand-secondary text-lg mb-8">
          Schedule your appointment with Dallas-Fort Worth's premier fade specialists
        </p>
      </div>

      {/* Square Booking Embed */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="gradient-border rounded-2xl overflow-hidden">
          <iframe
            src="https://app.squareup.com/appointments/book/mhhy3h6z761e4o/LKWJHT5S9KSN3/embed"
            width="100%"
            height="800"
            style={{
              border: 'none',
              borderRadius: '16px'
            }}
            title="Book Appointment with PRESFADES"
            onLoad={() => {
              // Track when booking widget loads
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'booking_widget_loaded', {
                  event_category: 'engagement',
                  event_label: 'square_embed'
                });
              }
            }}
          />
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <button
          type="button"
          onClick={() => setLocation('/')}
          className="text-brand-secondary hover:text-brand-primary transition-colors"
        >
          ← Back to Home
        </button>
      </div>

      {/* Success Detection Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Listen for Square booking completion
            window.addEventListener('message', function(event) {
              if (event.origin !== 'https://app.squareup.com') return;
              
              if (event.data && event.data.type === 'booking_complete') {
                // Trigger our completion handler
                if (window.handleBookingComplete) {
                  window.handleBookingComplete();
                }
              }
            });
            
            // Make function available globally
            window.handleBookingComplete = ${handleBookingComplete.toString()};
          `
        }}
      />
    </div>
  );
}