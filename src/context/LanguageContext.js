'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import hi from '@/i18n/hi.json';
import en from '@/i18n/en.json';

const translations = { hi, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('hi');

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[lang];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
