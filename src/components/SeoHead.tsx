import { useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';

export function SeoHead() {
  const { locale, tKey } = useTranslation();

  const siteTitle = tKey('seo.title', 'God Got You — Paz bíblica para tu mente');
  const siteDescription = tKey(
    'seo.description',
    'Un remanso contemplativo para desahogar cargas, llevar cautivo el pensamiento y recibir promesas de paz viva.'
  );

  useEffect(() => {
    // 1. Título de la pestaña
    document.title = siteTitle;

    // 2. Idioma del documento
    document.documentElement.lang = locale;

    // 3. Función auxiliar para actualizar o crear metas
    const updateMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.replace("meta[name='", '').replace("']", '');
          element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.replace("meta[property='", '').replace("']", '');
          element.setAttribute('property', prop);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Meta Description estándar
    updateMeta("meta[name='description']", 'content', siteDescription);

    // Open Graph (WhatsApp, Facebook, iMessage)
    updateMeta("meta[property='og:title']", 'content', siteTitle);
    updateMeta("meta[property='og:description']", 'content', siteDescription);
    updateMeta("meta[property='og:locale']", 'content', locale === 'en' ? 'en_US' : locale === 'pt' ? 'pt_BR' : locale === 'fr' ? 'fr_FR' : 'es_LA');
    updateMeta("meta[property='og:url']", 'content', `https://godgotyou.app?lang=${locale}`);
    updateMeta("meta[property='og:type']", 'content', 'website');
    updateMeta("meta[property='og:image']", 'content', 'https://godgotyou.app/og-preview.png');

    // Twitter Card
    updateMeta("meta[name='twitter:card']", 'content', 'summary_large_image');
    updateMeta("meta[name='twitter:title']", 'content', siteTitle);
    updateMeta("meta[name='twitter:description']", 'content', siteDescription);
    updateMeta("meta[name='twitter:image']", 'content', 'https://godgotyou.app/og-preview.png');
  }, [locale, siteTitle, siteDescription]);

  return null;
}