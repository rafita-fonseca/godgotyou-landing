import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';
import pt from '../locales/pt.json';
import fr from '../locales/fr.json';

export type Locale = 'es' | 'en' | 'pt' | 'fr';
export type Translations = Record<string, any>;

const translations: Record<Locale, Translations> = { es, en, pt, fr };

interface LanguageContextType {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('app_locale') as Locale;
    if (['es', 'en', 'pt', 'fr'].includes(saved)) return saved;

    const browserLang = navigator.language.slice(0, 2) as Locale;
    return ['es', 'en', 'pt', 'fr'].includes(browserLang) ? browserLang : 'es';
  });

  const setLocale = (lang: Locale) => {
    setLocaleState(lang);
    localStorage.setItem('app_locale', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation debe utilizarse dentro de un LanguageProvider');
  }
  return context;
};