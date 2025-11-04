import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import plTranslations from './locales/pl.json';

export const DEFAULT_LANGUAGE = 'en';

export function resetLanguage() {
  localStorage.removeItem('language');
  const resources = (i18n.options as any)?.resources as
    | Record<string, unknown>
    | undefined;
  const supportedLangs = resources ? Object.keys(resources) : [];
  const navLang =
    typeof navigator !== 'undefined' ? navigator.language : undefined;
  const primaryTag = navLang ? navLang.split('-')[0].toLowerCase() : undefined;
  const langToUse =
    primaryTag && supportedLangs.includes(primaryTag)
      ? primaryTag
      : DEFAULT_LANGUAGE;
  i18n.changeLanguage(langToUse);
}

// Get saved language from localStorage or use browser default
const savedLanguage = localStorage.getItem('language');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pl: {
        translation: plTranslations,
      },
    },
    supportedLngs: ['en', 'pl'],
    fallbackLng: DEFAULT_LANGUAGE,
    lng: savedLanguage || undefined, // Use saved language if available
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Save language choice to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
