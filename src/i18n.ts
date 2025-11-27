import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import plTranslations from './locales/pl.json';

const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGS = ['en', 'pl'];

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

/** Get the language code (e.g. "en") from navigator.language if available. */
const getNavigatorLanguage = (): string | undefined => {
  const navLang =
    typeof navigator !== 'undefined' ? navigator.language : undefined;
  return navLang?.split('-')[0].toLowerCase();
};

/**
 * Return a supported language or the default.
 * @param lang - candidate language code
 */
const normalizeLang = (lang?: string): string =>
  lang && SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANGUAGE;

// ---------------------------------------------------------------------------
// i18next configuration
// ---------------------------------------------------------------------------

/** Load initial language from localStorage or browser fallback. */
const initialLang =
  localStorage.getItem('language') || normalizeLang(getNavigatorLanguage());

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
    supportedLngs: SUPPORTED_LANGS,
    fallbackLng: DEFAULT_LANGUAGE,
    lng: initialLang,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

/** Persist any language change to localStorage. */
i18n.on('languageChanged', (lng) => localStorage.setItem('language', lng));

export default i18n;

/**
 * Reset the chosen language to browser default and update i18next.
 */
export function resetLanguage() {
  localStorage.removeItem('language');
  const langToUse = normalizeLang(getNavigatorLanguage());
  i18n.changeLanguage(langToUse);
}
