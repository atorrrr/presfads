import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import VisionarySection from "@/components/visionary-section";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import FloatingCTA from "@/components/floating-cta";
import LeadCaptureModal from "@/components/lead-capture-modal";
import { useLeadCapture } from "@/hooks/use-lead-capture";

export default function Home() {
  const { isModalOpen, openModal, closeModal } = useLeadCapture();

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation onOpenLeadModal={openModal} />
      <HeroSection />
      <VisionarySection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <FloatingCTA />
      <LeadCaptureModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-bold gradient-text mb-6">PRESFADES</div>
          <p className="text-brand-secondary mb-8">
            Dallas-Fort Worth's premier barbershop specializing in elite fade haircuts, precision cuts, and expert grooming services. Professional barber serving the DFW metroplex.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://www.instagram.com/presfades/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/share/1Z2pc57rmt/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="tel:4699010585" 
              className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Call us"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </a>
            <a 
              href="mailto:presfades@gmail.com" 
              className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Email us"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </a>
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJ2cKEcdpXT6ERvrGM72C88WI&source=g.page.m.kd._&laa=lu-desktop-review-solicitation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Google Reviews"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </a>
          </div>
          <p className="text-brand-secondary text-sm">
            © 2024 PRESFADES. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
