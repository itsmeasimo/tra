import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/381654512033', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-lime-400 hover:bg-lime-300 text-slate-800 rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 z-40 animate-pulse"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </button>
  );
};

export default WhatsAppFloat;