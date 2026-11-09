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
  tKey: (path: string, fallback?: string) => string;
}

// 1. Tipado corregido con unión válida
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Función auxiliar para resolver rutas anidadas tipo "hero.title"
function resolvePath(obj: any, path: string): any {
  if (!obj || typeof obj !== 'object') return undefined;
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'es';

    const saved = localStorage.getItem('app_locale') as Locale;
    if (['es', 'en', 'pt', 'fr'].includes(saved)) return saved;

    const browserLang = navigator.language?.slice(0, 2) as Locale;
    return ['es', 'en', 'pt', 'fr'].includes(browserLang) ? browserLang : 'es';
  });

  const setLocale = (lang: Locale) => {
    setLocaleState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_locale', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // Traductor seguro con fallback a español y a texto por defecto
  const tKey = (path: string, fallback?: string): string => {
    const currentDict = translations[locale] || translations.es;
    const value = resolvePath(currentDict, path);
    if (typeof value === 'string') return value;

    // Fallback a español si falta en el idioma actual
    const esValue = resolvePath(translations.es, path);
    if (typeof esValue === 'string') return esValue;

    return fallback || path;
  };

  const currentTranslations = translations[locale] || translations.es;

  // 2. Propiedad 'value' construida correctamente como objeto JavaScript
  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: currentTranslations,
        tKey,
      }}
    >
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