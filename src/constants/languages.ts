export const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];
