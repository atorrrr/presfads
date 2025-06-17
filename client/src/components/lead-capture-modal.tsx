import { useState } from "react";
import { X } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Track consultation guide download event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'consultation_guide_request', {
        event_category: 'lead_generation',
        event_label: 'consultation_guide'
      });
    }

    // Close modal after success message
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "" });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-brand-bg gradient-border rounded-2xl p-8 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-secondary hover:text-brand-primary transition-colors"
        >
          <X size={24} />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4">
                FREE <span className="gradient-text">CONSULTATION GUIDE</span>
              </h2>
              <p className="text-brand-secondary">
                Get our exclusive consultation checklist emailed to you instantly. Discover how to achieve the perfect fade and what questions to ask your barber for guaranteed results.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-brand-primary font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-brand-card text-brand-primary border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-brand-primary font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-brand-card text-brand-primary border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-brand-primary font-semibold mb-2">
                  Phone Number <span className="text-brand-secondary text-sm">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-brand-card text-brand-primary border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="(469) 555-0123"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gradient text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[48px]"
              >
                {isSubmitting ? "SENDING YOUR GUIDE..." : "GET FREE CONSULTATION GUIDE"}
              </button>
            </form>

            <p className="text-center text-brand-secondary text-sm mt-6">
              📧 Your consultation guide will be emailed instantly. We respect your privacy and never spam.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brand-primary mb-4">
              CHECK YOUR <span className="gradient-text">EMAIL!</span>
            </h3>
            <p className="text-brand-secondary">
              Your consultation guide is on its way! Check your inbox for expert tips on achieving the perfect fade.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}