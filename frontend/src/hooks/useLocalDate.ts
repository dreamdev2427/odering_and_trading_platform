import { useTranslation } from 'react-i18next';
import { intlFormat } from 'date-fns';

/**
* Usage:
const toLocalDate = useLocalDate();
* @returns a function that accepts the date as string, number or Date 
  format and returns the local datestring 
*/
function useLocalDate(): (unixTime: string | number | undefined | Date) => string {
  const { i18n } = useTranslation();
  function toLocalDate(unixTime: string | number | undefined | Date) {
    if (!unixTime) return '';
    const date = typeof unixTime === 'string' ? parseInt(unixTime, 10) : unixTime;

    return intlFormat(
      date ?? 0,
      {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      {
        locale: i18n.language,
      },
    );
  }
  return toLocalDate;
}

export default useLocalDate;