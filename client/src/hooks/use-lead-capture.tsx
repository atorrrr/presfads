import { useState, useEffect } from "react";

export const useLeadCapture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before
    const modalShown = localStorage.getItem('leadCaptureShown');
    if (modalShown) {
      setHasShown(true);
      return;
    }

    // Show modal after user has been on site for 15 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsModalOpen(true);
        setHasShown(true);
        localStorage.setItem('leadCaptureShown', 'true');
      }
    }, 15000);

    // Show modal when user scrolls to services section
    const handleScroll = () => {
      const servicesSection = document.getElementById('services');
      if (servicesSection && !hasShown) {
        const rect = servicesSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsModalOpen(true);
          setHasShown(true);
          localStorage.setItem('leadCaptureShown', 'true');
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal
  };
};