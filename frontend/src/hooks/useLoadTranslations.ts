import { useMemo } from 'react';
import i18next from 'i18next';

import { Translation, useTranslationLoadQuery } from 'services/apollo';
import { loadNativeNames } from 'lib/i18';

const loadDictionary = (translations: Translation[], locales: string[]) => {
  loadNativeNames(locales);
  const list: { [key: string]: { [key: string]: string } } = {};

  translations.forEach((t) => {
    if (list[t.locale] === undefined) {
      list[t.locale] = {};
    }
    if (t.translation !== '') {
      list[t.locale][t.key] = t.translation;
    }
  });

  locales.forEach((locale) => {
    i18next.addResourceBundle(locale, 'translation', { ...list[locale] }, true, true);
  });
};

const useLoadTranslations = (): void => {
  const { data } = useTranslationLoadQuery();

  useMemo(() => {
    if (data?.translations && data?.locales) {
      loadDictionary(data.translations, data.locales);
    }
  }, [data]);
};

export default useLoadTranslations;
