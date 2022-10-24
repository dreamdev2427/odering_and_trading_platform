import got, { Got } from 'got';

export const enum REQUEST_LIBRARY {
  GOT = 'got',
}

export interface ApiHttpErrorResponse {
  __isApiHttpErrorResponse: true;
  status: number;
  message?: string;
}

/** Used in case of Got library */
export interface GotHttpSettings {
  timeout?: {
    lookup?: number;
    connect?: number;
    secureConnect?: number;
    socket?: number;
    send?: number;
    response?: number;
  };
  throwOnHttpError?: boolean;
  throwOnHttpErrorResponse?: boolean;
}

/** Example for timeout on http requests */
export const DEFAULT_GOT_TIMEOUT: GotHttpSettings['timeout'] = {
  lookup: 100,
  connect: 50,
  secureConnect: 50,
  socket: 1000,
  send: 10000,
  response: 1000,
};

/**
 * Takes the type of your error objects.
 */
export interface ApiConfig<T = undefined> {
  baseUrl: string;

  /** Used in case of Got library */
  httpSettings?: GotHttpSettings;

  headers?: {
    [key: string]: string;
  };

  errorPrototype?: T;

  library?: REQUEST_LIBRARY;
}

// type ApiErrorType<Type> = Type extends ApiConfig<infer X> ? X : never;

export interface Endpoint<Body, Result> {
  path: string;
  method: 'GET' | 'POST';
  query?: {
    [key: string]: string;
  };
  /** For documentation purposes */
  exampleQuery?: {
    [key: string]: string;
  };
  urlParams?: {
    [key: string]: string;
  };
  /** For documentation purposes */
  exampleUrlParams?: {
    [key: string]: string;
  };
  modifyBaseUrl?: string;
  modifyHeaders?: {
    [key: string]: string;
  };
  body?: Body;
  result?: Result; // added so linter won't complain
  log?: boolean;
}

type Handler = <Body, Result>(
  api: ApiConfig,
  endpoint: Endpoint<Body, Result>,
) => Promise<Result | typeof api.errorPrototype | undefined>;

const useGot: Handler = <Body, Result>(
  api: ApiConfig,
  endpoint: Endpoint<Body, Result>,
): Promise<Result> => {
  return Promise.reject(`not implemented ${api} ${endpoint}`);
};

/**
 * Use for testing only
 */
export class ApiIntegratorInternal {
  static DEFAULT_LIBRARY = REQUEST_LIBRARY.GOT;

  static libraries: {
    [lib in REQUEST_LIBRARY]: Got | unknown;
  } = {
    got,
  };

  static replaceGot(library: unknown): void {
    this.libraries.got = library;
  }

  static handlers: {
    [lib in REQUEST_LIBRARY]: Handler;
  } = {
    got: useGot,
  };

  static request<Body, Result>(
    useLibrary: REQUEST_LIBRARY = REQUEST_LIBRARY.GOT,
    api: ApiConfig,
    endpoint: Endpoint<Body, Result>,
  ): Promise<Result | typeof api.errorPrototype | undefined> {
    return ApiIntegratorInternal.handlers[useLibrary](api, endpoint);
  }
}
