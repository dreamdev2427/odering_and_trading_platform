import { request as requestWithHttps } from "https";
import { request as requestWithHttp, IncomingHttpHeaders } from "http";
import logger from "../logger";

/* eslint-disable import/prefer-default-export */
export interface HttpsResponse<T> {
  statusCode: number;
  headers: IncomingHttpHeaders;
  body: T;
}

/**
 * A response is received successfully, but the server has returned a bad status code.
 */
export class HttpsBadResponseError extends Error {
  response: HttpsResponse<any>;

  /**
   * A response is received successfully, but the server has returned a bad status code.
   */
  constructor(response: HttpsResponse<any>, message?: string) {
    if (message) {
      // If there is a message provided, behave like a normal Error object, while retaining metadata.
      super(message);
    } else {
      // On no message, build a message from the response.
      const msg = response.body?.message
        ? response.body.message
        : response.body;
      super(`HTTP ${response.statusCode}: ${msg}`);
    }
    Object.setPrototypeOf(this, HttpsBadResponseError.prototype);
    this.response = response;
  }
}

export const validateOptions = (options: any): void => {
  if (!options.host || !options.path || !options.method) {
    const err = `Invalid HTTP options!\n${options}`;
    logger.error(err);
    throw new Error(err);
  }
};

/**
 * Send an async HTTPS request (uses HTTP on localhost).
 * @param options HTTP options object
 * @param data
 * @returns Promise of a response, where its body is expected to be type T
 */
export const send = async <T>(
  options: any,
  data?: any
): Promise<HttpsResponse<T>> => {
  let result: string = "";
  validateOptions(options);

  const promise: any = new Promise((resolve, reject) => {
    /** Use HTTP on localhost and HTTPS on remote hosts */
    let requestProtocol;
    if (
      options.host === "127.0.0.1" ||
      options.host === "localhost" ||
      (options.useHttp && // optional parameter
        !options.useHttps) // optional parameter
    ) {
      requestProtocol = requestWithHttp;
      if (!options.port || options.port === 443) {
        // eslint-disable-next-line no-param-reassign
        options.port = 80; // Set to default HTTP port
      }
    } else {
      requestProtocol = requestWithHttps;
      if (!options.port || options.port === 80) {
        // eslint-disable-next-line no-param-reassign
        options.port = 443; // Set to default HTTPS port
      }
    }

    const req = requestProtocol(options, (res) => {
      res.on("data", (chunk) => {
        result += chunk;
      });
      res.on("error", (error) => {
        if (options.logResponseErrors) {
          logger.error(`HTTP ERROR:::\n${error}`);
        }
        reject(error);
      });
      res.on("end", () => {
        // Action not succeeded or requires further handling
        if (res.statusCode && res.statusCode >= 300) {
          const resBody = result ? JSON.parse(result) : null;
          if (options.logResponseErrors) {
            logger.error("HTTP REMOTE ERROR:::");
            logger.error("Request:");
            logger.error(JSON.stringify(options));
            logger.error(JSON.stringify(data));
            logger.error("Response:");
            logger.error(
              JSON.stringify({
                statusCode: res.statusCode,
                headers: res.headers,
                body: resBody,
              })
            );
          }
          try {
            reject(
              new HttpsBadResponseError({
                statusCode: res.statusCode ?? 0,
                headers: res.headers,
                body: resBody,
              })
            );
          } catch (error) {
            logger.error(error as Error);
          }
        } else {
          // Processing or success server status
          resolve({
            statusCode: res.statusCode ?? 0,
            headers: res.headers,
            body: JSON.parse(result),
          });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });
    req.on("timeout", (error: any) => {
      req.abort();
      reject(error);
    });
    req.on("uncaughtException", (error) => {
      req.abort();
      reject(error);
    });
    if (data) {
      const body = JSON.stringify(data);
      req.write(body);
    }
    /**
     * End the request to prevent ECONNRESETand socket hung errors
     */
    req.end();
  });

  return promise;
};
