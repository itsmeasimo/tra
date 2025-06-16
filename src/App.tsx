import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import NotFound from './components/NotFound';
import { Language } from './utils/types';

function App() {
  const [language, setLanguage] = useState<Language>('sr');
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Check if current path should show 404
    const path = window.location.pathname;
    const validPaths = [
      '/',
      '/index.html',
      '/#home',
      '/#pricing',
      '/#about',
      '/#contact'
    ];

    // Check if it's a valid path or anchor link
    const isValidPath = validPaths.includes(path) || 
                       path === '/' || 
                       path.startsWith('/#') ||
                       path === '/index.html';

    if (!isValidPath) {
      setIs404(true);
      
      // Update document title for SEO
      document.title = language === 'en' 
        ? 'Page Not Found - Transferko Airport Transfer Novi Sad'
        : language === 'ru'
        ? 'Страница не найдена - Transferko Трансфер в Аэропорт'
        : 'Stranica nije pronađena - Transferko Aerodromski Transfer';
    }
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  // Show 404 page if needed
  if (is404) {
    return <NotFound language={language} />;
  }

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <Hero language={language} />
      <PricingSection language={language} />
      <FeaturesSection language={language} />
      <ContactSection language={language} />
      <Footer language={language} />
      <WhatsAppFloat />
    </div>
  );
}

export default App;