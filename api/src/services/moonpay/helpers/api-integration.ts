import got from 'got';
import { Response } from 'got';
import {
  ApiConfig,
  ApiHttpErrorResponse as ApiHttpErrorResponse,
  Endpoint,
} from './api-integration-internal';

const getQueryString = <B, R>(endpoint: Endpoint<B, R>): string | undefined => {
  if (endpoint.query === undefined) return undefined;
  return Object.entries(endpoint.query)
    .map(([k, v]) => `${k}=${v}`)
    .join(`&`);
};

const fillUrlParams = <B, R>(endpoint: Endpoint<B, R>): string => {
  if (!endpoint.urlParams) return endpoint.path;
  let path = endpoint.path;
  Object.entries(endpoint.urlParams).forEach(([k, v]) => (path = path.replace(`:${k}`, v)));
  return path;
};

const isSuccess = (statusCode: number = 0): boolean => statusCode >= 200 && statusCode < 300;

/**
 * Make an API request with the provided settings.
 * @throws on unknown HTTP error with no JSON response, if configured to do so from `api.httpSettings`
 * @param api The base API settings
 * @param endpoint The endpoint settings
 * @param options Modify the endpoint settings object with this object
 * @returns `Result` - Response of your selected generic type
 * @returns `undefined` if empty result on HTTP 2xx
 * @returns `ApiHttpErrorResponse` if the code is not a success and there is no response JSON
 */
export const apiAction = async <Body, Result, ApiError = void>(
  api: ApiConfig,
  endpoint: Endpoint<Body, Result>,
  options?: Partial<Endpoint<Body, Result>>,
): Promise<typeof endpoint.result | ApiError | ApiHttpErrorResponse> => {
  endpoint = { ...endpoint, ...options };

  const req = {
    url: endpoint.modifyBaseUrl || api.baseUrl,
    method: endpoint.method,
    headers: { ...api.headers, ...endpoint.modifyHeaders },
    pathname: fillUrlParams(endpoint),
    search: getQueryString(endpoint),
    ...(endpoint.body && { body: JSON.stringify(endpoint.body) }),
  };
  if (options?.log === true) console.log(req);
  const httpRes = got({ ...req, throwHttpErrors: false });
  let resJson = undefined;
  let resDone: Response<string> | undefined = undefined;
  let isHtml = false;
  try {
    resDone = await httpRes;
    resJson = JSON.parse(resDone.body); // await httpRes.json() as { message?: string };
  } catch (e) {
    // const res = await httpRes;
    isHtml = resDone?.body.includes('<html') ?? false;
    if (api.httpSettings?.throwOnHttpError === true) {
      throw new Error(
        `Internal API integration engine HTTP Error at ${req.method} ${req.url}${req.pathname}\n ${
          (e as Error).stack
        }`,
      );
    }
    // console.error(`Error in API Action response. Expected JSON but failed to parse it.\nResponse (${res.statusCode}) ${(isHtml) ? `is HTML.` : `: ${res.body}`}\nError:\n${(e as Error).stack}`);
  }
  // If no json, we have a regular HTTP error and not an API response
  if ((resJson === undefined && isHtml) || !isSuccess(resDone?.statusCode)) {
    const error: ApiHttpErrorResponse = {
      status: resDone?.statusCode ?? 404,
      message: resDone
        ? `${isHtml ? `<Remote API returned an HTML page>` : resDone?.body}`
        : `HTTPError: Response code 404 (Not Found)`,
      ...resJson,
      __isApiHttpErrorResponse: true,
    };
    if (api.httpSettings?.throwOnHttpErrorResponse === true) {
      console.warn(
        `Check local endpoint config (caused error): ${req.method} ${req.url}${req.pathname}`,
      );
      throw new Error(`API integration HTTP Error response: ${JSON.stringify(error)}`);
    }
    return error;
  }
  return resJson as Result;
};

export const isApiHttpError = (response: unknown): boolean => {
  return (response as ApiHttpErrorResponse).__isApiHttpErrorResponse;
};

export { ApiConfig };
export { Endpoint };
