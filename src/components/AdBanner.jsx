
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const AdBanner = ({ position }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const bannerContent = position === 'top' ? {
    text: "🚀 Hospedagem Premium - 50% OFF no primeiro ano!",
    cta: "Aproveitar Oferta",
    bg: "bg-gradient-to-r from-green-600 to-emerald-600"
  } : {
    text: "💼 Consultoria Jurídica Especializada - Fale com nossos advogados",
    cta: "Consultar Agora",
    bg: "bg-gradient-to-r from-blue-600 to-indigo-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: position === 'top' ? -50 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${bannerContent.bg} text-white py-3 px-4 relative`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">{bannerContent.text}</span>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm font-medium transition-colors">
            {bannerContent.cta}
          </button>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default AdBanner;
