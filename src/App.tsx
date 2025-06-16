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
    const hash = window.location.hash;
    
    // Valid paths for SPA
    const validPaths = [
      '/',
      '/index.html'
    ];

    // Valid hash routes
    const validHashes = [
      '#home',
      '#pricing', 
      '#about',
      '#contact'
    ];

    // Check if it's a valid path or has valid hash
    const isValidPath = validPaths.includes(path);
    const hasValidHash = hash && validHashes.includes(hash);
    const isRootWithHash = path === '/' && hash;

    // For Netlify SPA routing - only show 404 for clearly invalid paths
    // that don't match our expected patterns
    const shouldShow404 = !isValidPath && 
                         !isRootWithHash && 
                         !path.startsWith('/transfer-') &&
                         !path.startsWith('/aerodrom') &&
                         path !== '/404' &&
                         path.length > 1; // Don't 404 on root variations

    if (shouldShow404) {
      setIs404(true);
      
      // Update document title for SEO
      document.title = language === 'en' 
        ? 'Page Not Found - Transferko Airport Transfer Novi Sad'
        : language === 'ru'
        ? 'Страница не найдена - Transferko Трансфер в Аэропорт'
        : 'Stranica nije pronađena - Transferko Aerodromski Transfer';
    } else {
      setIs404(false);
      
      // Reset to default title
      document.title = language === 'en'
        ? 'Airport Transfer Novi Sad | Transferko - Reliable Transport to Airport'
        : language === 'ru'
        ? 'Трансфер в Аэропорт Нови Сад | Transferko - Надежная Перевозка'
        : 'Aerodromski Transfer Novi Sad | Transferko - Pouzdani Prevoz do Aerodroma';
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