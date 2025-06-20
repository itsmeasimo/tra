import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, MapPin, Car } from 'lucide-react';
import { Language } from '../utils/types';
import { getTranslations } from '../utils/translations';
import { getPrices, RoutePrice, getRouteName, getWhatsAppMessage, getPriceDescription, initializeDefaultData } from '../utils/firebaseStorage';

interface PricingProps {
  language: Language;
}

const PricingSection: React.FC<PricingProps> = ({ language }) => {
  const t = getTranslations(language);
  const [routes, setRoutes] = useState<RoutePrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutes();
    
    // Listen for custom events to update prices in real-time
    const handlePriceUpdate = () => {
      loadRoutes();
    };
    
    window.addEventListener('pricesUpdated', handlePriceUpdate);
    
    return () => {
      window.removeEventListener('pricesUpdated', handlePriceUpdate);
    };
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      await initializeDefaultData();
      const loadedRoutes = await getPrices();
      setRoutes(loadedRoutes);
    } catch (error) {
      console.error('Error loading routes:', error);
      // Fallback to empty array if Firebase fails
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoute = (routeId: string) => {
    const message = encodeURIComponent(getWhatsAppMessage(routeId, language, routes));
    window.open(`https://wa.me/381654512033?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <section id="pricing" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-lime-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
              <span className="text-xl font-medium">Učitavanje cena...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.pricingTitle}
          </h2>
          <p className="text-lg md:text-xl text-lime-400 font-semibold">
            {t.pricingSubtitle}
          </p>
        </div>

        {routes.length === 0 ? (
          <div className="text-center text-white">
            <p className="text-xl">Nema dostupnih ruta u bazi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {routes.map((route, index) => (
              <div
                key={route.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-2xl md:text-3xl mr-4">{route.icon}</div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-slate-800 leading-tight">
                        {getRouteName(route.id, language, routes)}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-slate-600">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 mr-3 text-lime-500 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{t.available247}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-3 text-lime-500 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{t.waitingIncluded}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Car className="h-4 w-4 md:h-5 md:w-5 mr-3 text-lime-500 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">
                        {language === 'sr' && 'Komforno vozilo'}
                        {language === 'en' && 'Comfortable vehicle'}
                        {language === 'ru' && 'Комфортное авто'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-lime-50 rounded-2xl p-4 md:p-6 mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl md:text-4xl font-bold text-slate-800">{route.price}</span>
                      <span className="text-base md:text-lg font-semibold text-slate-600 ml-2">RSD</span>
                    </div>
                    <div className="text-slate-600 text-center mt-1 font-medium text-sm md:text-base">
                      {getPriceDescription(route.id, language, routes)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookRoute(route.id)}
                    className="w-full bg-lime-400 text-slate-800 py-3 md:py-4 px-4 md:px-6 rounded-2xl font-bold text-base md:text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {language === 'sr' && 'Rezerviši odmah'}
                    {language === 'en' && 'Book now'}
                    {language === 'ru' && 'Забронировать'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;