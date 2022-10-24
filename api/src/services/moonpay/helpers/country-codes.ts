import countries from 'i18n-iso-countries';

export type CountryCode = string;

export const findCountryCode = (country: string, lang = 'en'): CountryCode => {
  return countries.getAlpha3Code(country, lang);
};
