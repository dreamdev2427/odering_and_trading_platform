import logger from "../../../../logger";
import {
  HttpsBadResponseError,
  HttpsResponse,
} from "../../../../modules/httpsHandler";

/**
 * Read remote server error and rethrow as normal error.
 * @param call a remote executed function
 */
export const handleRemoteError = async (
  call: Promise<HttpsResponse<any>>,
  location?: string
) => {
  try {
    await call;
  } catch (error) {
    let msg = error as string;
    // Handle service-specific errors and re-throw.
    // The upper layer should not know that this is a remote service, this is an IAffiliateService type.
    const substr = location ? ` in ${location}` : ``;
    if (error instanceof HttpsBadResponseError) {
      msg = `Remote server responded with error${substr}:\n${error.message}`;
    } else {
      logger.error(`Remote error${substr}:\n${error}`);
      if (typeof msg === "string" && msg?.includes("path")) {
        logger.error(
          `Please check that your remote path configuration is correct.`
        );
      }
    }
    throw new Error(msg);
  }
};

export default {
  handleRemoteError,
};
