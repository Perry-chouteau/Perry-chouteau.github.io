export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'fr';

export const LANG_LABEL: Record<Lang, string> = {
  fr: 'Français',
  en: 'English',
};

/** Un texte traduit. Les deux langues sont obligatoires : si tu en oublies une, le build casse. */
export type I18nText = Record<Lang, string>;

export const t = (text: I18nText, lang: Lang) => text[lang];

export const isLang = (value: string): value is Lang => LANGS.includes(value as Lang);
