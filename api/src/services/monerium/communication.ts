import { MoneriumConfig, ApiAction, fillApiActionParams } from './api/config';

/** A valid JSON error response usually always includes at minimum a message, although we have a fallback if that isn't the case */
export interface ApiErrorJson {
  message: string;
}
/** This type of error is returned when calling apiRequest */
export class ApiError extends Error {
  body;

  constructor(responseJson: ApiErrorJson, fallback?: string) {
    super(responseJson.message ?? fallback ?? 'Unknown API error');
    this.body = responseJson;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
/**
 * Makes an API reqeust and fetches a JSON result
 * @throws ApiError
 */
export const apiRequest = async <Response, Body = never>(
  config: MoneriumConfig,
  action: ApiAction,
  body?: Body,
): Promise<Response> => {
  const actionWithParams = fillApiActionParams(action);
  // TODO Auth
  const res = await fetch(`${config.url}/${actionWithParams.path}`, {
    headers: config.headers,
    method: action.method,
    body: JSON.stringify(body),
  });
  const resBody = await res.json();
  if (!res.ok) {
    if (res.body) {
      throw new ApiError(resBody, `${res.status}: ${res.statusText}`);
    }
  }
  return resBody as Promise<Response>;
};
