import * as locales from "./locale";

interface Locales {
  [locale: string]: ILocale | undefined;
}

export const getLocale = (languages: Readonly<string[]>): ILocale => {
  // eslint-disable-next-line no-restricted-syntax
  for (const lang of languages) {
    // e.g. en-GB -> en_gb
    const localeId = lang.toLowerCase().replace(/-/g, "_");
    const locale = (locales as Locales)[localeId];
    if (locale) {
      return locale;
    }
  }

  return locales.en;
};

export const defaultLocale = getLocale(window.navigator.languages);
