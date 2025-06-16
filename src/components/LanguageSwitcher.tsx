import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../utils/types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'sr' as Language, name: 'Srpski', flag: '🇷🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: Language) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 bg-slate-800 text-lime-400 shadow-lg hover:bg-slate-700"
      >
        <span className="mr-1 sm:mr-2 text-sm">{currentLang?.flag}</span>
        <span className="hidden sm:inline mr-1 sm:mr-2">{currentLang?.name}</span>
        <span className="sm:hidden mr-1 text-xs">{currentLang?.code.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors hover:bg-lime-50 flex items-center ${
                currentLanguage === lang.code
                  ? 'bg-lime-100 text-slate-800'
                  : 'text-slate-700 hover:text-slate-800'
              }`}
            >
              <span className="mr-2 sm:mr-3 text-sm">{lang.flag}</span>
              <span className="text-xs sm:text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;