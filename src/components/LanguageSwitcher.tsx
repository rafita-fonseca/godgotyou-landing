import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import type { Locale } from '../context/LanguageContext';

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-xs">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLocale(item.code)}
          className={`px-2 py-1 rounded-full transition-all duration-200 font-medium cursor-pointer ${
            locale === item.code
              ? 'bg-[#5E7153] text-white shadow-xs'
              : 'text-stone-300 hover:text-white'
          }`}
          title={item.label}
        >
          {item.flag} {item.label}
        </button>
      ))}
    </div>
  );
};