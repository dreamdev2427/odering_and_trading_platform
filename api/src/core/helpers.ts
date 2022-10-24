import countries from 'i18n-iso-countries';

export const convertToNumber = (value: number | string, digits = 2): number => {
  if (typeof value === 'string') {
    value = Number(value);
  }

  return Number(value.toFixed(digits));
};

export const getCountryName = (countryCode: string): string => {
  const code = countryCode.toLowerCase();
  return code === 'us' || code === 'usa'
    ? 'United States'
    : countries.getName(code, 'en', {
        select: 'official',
      });
};

export const removeNullEntries = <T extends { toString: () => string }>(
  obj: T,
): { [k: string]: () => string } => {
  const entries = Object.entries(obj);
  const validEntries = entries.filter(([, value]) => value != null);
  return Object.fromEntries(validEntries);
};

export const groupBy = <K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> => {
  const map = new Map<K, Array<V>>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

/** Signify a i18n translation key with variables */
export const tArgs = (msg: string, args: { [key: string]: string | number }): string =>
  `${msg}\\,${JSON.stringify(args)}`;
