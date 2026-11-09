import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import type { Locale } from '../context/LanguageContext';

const languages: { code: Locale; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'fr', label: 'FR' },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#EAE5DC] p-1 rounded-xl text-xs shadow-2xs">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLocale(item.code)}
          className={`px-2.5 py-1 rounded-lg font-serif-display text-xs font-bold transition-all duration-200 cursor-pointer ${
            locale === item.code
              ? 'bg-[#2D4523] text-white shadow-xs'
              : 'text-[#4A5568] hover:text-[#1A1A1A] hover:bg-black/5'
          }`}
          title={item.label}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};