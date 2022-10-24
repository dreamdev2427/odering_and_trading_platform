import { NextFunction, Request, Response } from "express";
import logger from "../../../logger";
import { updateKYCDataFromSumSub } from "../../../services/investorClient/externalKyc/sumsub/SumSubService";
import { SumSubWebhookPayload } from "../../../services/investorClient/externalKyc/sumsub/dto/SumSubTypes";

const crypto = require("crypto");

export const verifySumSubWebHook = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const globalObj: any = global as any; // Fetch global object

  const reqObj = req as any;
  // creating hmac object
  const hmac: any = crypto
    .createHmac("sha1", globalObj.config.SumSubApiJson.WebhookSecretKey)
    .update(reqObj.rawBody)
    .digest("hex");

  const webhookHeader = req.get("x-payload-digest");
  if (webhookHeader === hmac) {
    return next();
  }
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  logger.info(
    `Unauthorized request to SumSub webhook from ip: ${ip}. Please check token header.`
  );
  res.sendStatus(401);
  return {};
};

export default async (req: Request, res: Response) => {
  const payload: SumSubWebhookPayload = req.body;
  if (!payload) {
    logger.error(`No payload found - error happened in SumSub Webhook `);
    res.sendStatus(400);
    return;
  }
  try {
    switch (payload.type) {
      case "applicantReviewed":
        if (payload.reviewResult) {
          await updateKYCDataFromSumSub(payload.externalUserId);
        }
        break;
      case "applicantPersonalInfoChanged":
        if (payload.reviewResult) {
          await updateKYCDataFromSumSub(payload.externalUserId);
        }
        break;
      case "applicantDeleted":
        if (payload.reviewResult) {
          await updateKYCDataFromSumSub(payload.externalUserId);
        }
        break;
      default:
        // there are more types of webhooks, but they don't fit our use cases
        break;
    }
    res.sendStatus(200);
    return;
  } catch (e) {
    logger.error(`${e} - error happened in SumSub Webhook `);
    res.sendStatus(400);
  }
};
