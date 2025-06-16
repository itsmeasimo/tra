import React, { useEffect } from 'react';
import { Home, ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { Language } from '../utils/types';

interface NotFoundProps {
  language: Language;
}

const NotFound: React.FC<NotFoundProps> = ({ language }) => {
  useEffect(() => {
    // SEO optimized redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getText = () => {
    switch (language) {
      case 'en':
        return {
          title: 'Page Not Found - Transferko Airport Transfer',
          subtitle: 'The page you are looking for does not exist.',
          description: 'You will be automatically redirected to our homepage in 5 seconds, or click the button below.',
          homeButton: 'Go to Homepage',
          contactButton: 'Contact Us',
          callButton: 'Call Now'
        };
      case 'ru':
        return {
          title: 'Страница не найдена - Transferko Трансфер в Аэропорт',
          subtitle: 'Страница, которую вы ищете, не существует.',
          description: 'Вы будете автоматически перенаправлены на главную страницу через 5 секунд, или нажмите кнопку ниже.',
          homeButton: 'На главную',
          contactButton: 'Связаться с нами',
          callButton: 'Позвонить'
        };
      default:
        return {
          title: 'Stranica nije pronađena - Transferko Aerodromski Transfer',
          subtitle: 'Stranica koju tražite ne postoji.',
          description: 'Bićete automatski preusmereni na početnu stranicu za 5 sekundi, ili kliknite dugme ispod.',
          homeButton: 'Idite na početnu',
          contactButton: 'Kontaktirajte nas',
          callButton: 'Pozovite odmah'
        };
    }
  };

  const t = getText();

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleCall = () => {
    window.open('tel:+381654512033', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/381654512033', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-lime-400 opacity-20 mb-4">404</div>
          <div className="relative">
            <img 
              src="/IMG_20250528_120341-removebg-preview.png" 
              alt="Transferko vozilo"
              className="w-64 h-auto mx-auto rounded-2xl shadow-xl opacity-80"
            />
            <div className="absolute inset-0 bg-lime-400 rounded-2xl opacity-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            {t.subtitle}
          </p>
          <p className="text-slate-500 mb-8">
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="bg-lime-400 text-slate-800 px-6 py-3 rounded-2xl font-bold hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              {t.homeButton}
            </button>
            
            <button
              onClick={handleCall}
              className="border-2 border-lime-400 text-slate-800 px-6 py-3 rounded-2xl font-bold hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t.callButton}
            </button>
            
            <button
              onClick={handleWhatsApp}
              className="bg-slate-800 text-lime-400 px-6 py-3 rounded-2xl font-bold hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t.contactButton}
            </button>
          </div>
        </div>

        {/* SEO Footer */}
        <div className="text-slate-400 text-sm">
          <p>Transferko - Profesionalni aerodromski transfer Novi Sad</p>
          <p>Licencirani prevoznik • Fiksne cene • 24/7 dostupnost</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;