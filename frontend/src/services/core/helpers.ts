import { format, parseISO, intlFormat } from 'date-fns';

export const environment = {
  REACT_APP_GRAPHQL_URI: process.env.REACT_APP_GRAPHQL_URI,
  REACT_APP_STO: process.env.REACT_APP_STO,
  REACT_APP_STO_MODE: process.env.REACT_STO_MODE,
  REACT_APP_SHOW_STO_STYLING: process.env.REACT_APP_SHOW_STO_STYLING,
  // Overwrite with injected values from window.env if present
  ...(
    window as unknown as {
      env: {
        REACT_APP_GRAPHQL_URI?: string;
        REACT_APP_STO?: string;
        REACT_APP_STO_MODE?: string;
        REACT_APP_SHOW_STO_STYLING?: string;
      };
    }
  ).env,
};

export const isMulti: () => boolean = () =>
  // Assume 'MULTI' by default
  environment.REACT_APP_STO_MODE === 'MULTI' || !environment.REACT_APP_STO_MODE;

export const isSingle: () => boolean = () => environment.REACT_APP_STO_MODE === 'SINGLE';

export const formatDate: (date: string) => string = (date) => format(parseISO(date), 'MMMM dd yyyy');

export const unixTimeToDate = (timeStamp: string): string =>
  timeStamp ? new Date(Number(timeStamp)).toDateString() : '';

export const isDev: () => boolean = () => process.env.NODE_ENV === 'development';

export const unixTimeToLocalDate = (timeStamp: string | undefined, locale: string): string =>
  timeStamp
    ? intlFormat(
        parseInt(timeStamp, 10) ?? 0,
        {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
        {
          locale,
        },
      )
    : '';

/** Split str as { key, args } for use in t(key, args) if str is api arguments string. Split on \, */
export const tArgs = (str: string): { key: string; args: { [key: string]: string } } => {
  if (str.startsWith('api-arg-')) {
    const [msg, args] = str.split('\\,');
    return { key: msg, args: JSON.parse((args ?? '{}').replaceAll('\\"', '"')) };
  }
  return { key: str, args: {} };
};
