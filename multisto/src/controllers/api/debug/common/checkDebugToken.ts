import { Request } from "express";
import logger from "../../../../logger";

type Key = {
  name: string;
  value: string;
};
const keys: Key[] = [
  {
    name: "DigiShares Affiliate Debug",
    value:
      "DigiSharesDebug-a67e9c00fb904ec566e9f9cbfa825652b00c54ab3b1cbc28bacb2adc6c8deda7",
  },
  {
    name: "DigiShares Debug",
    value:
      "DigiSharesDebug-6ac7f0a6c7fcfa767a34c9fd6a82f7d1d79f0de0bccecceb7ee6bb5017b1c504",
  },
];

/**
 * Used to check API access for debug features
 */
export default (req: Request): boolean => {
  const header = req.header("x-api-key");
  const keyFound = keys.find((key) => key.value === header);
  if (keyFound) {
    logger.info(
      `Granted access to debug API '${req.path}' using key name '${keyFound.name}'`
    );
    return true;
  }
  logger.warn(
    `Blocked access to unauthorized debug API request from ip:${req.ip}${
      header ? ` and x-api-key:"${header}"` : ``
    }`
  );
  return false;
};
