import { Request, Response } from "express";
import logger from "../../../logger";
import { VeifyInvestorComWebhookPayload } from "../../../services/investorClient/externalKyc/verifyInvestorCom/dto/VerifyInvestorComTypes";
import updateKYCDataFromVerifyInvestorCom from "../../../services/investorClient/externalKyc/verifyInvestorCom/VerifyInvestorComService";

export default async (req: Request, res: Response) => {
  const payload: VeifyInvestorComWebhookPayload = req.body;
  if (!payload || !Object.keys(payload).length) {
    logger.error(
      `No payload found - error happened in VerifyInvestorCom Webhook `
    );
    res.sendStatus(400);
    return;
  }

  try {
    await updateKYCDataFromVerifyInvestorCom(
      payload.verification_request_id,
      payload.eapi_identifier
    );
    res.sendStatus(200);
    return;
  } catch (e) {
    logger.error(`${e} - error happened in VerifyInvestorCom Webhook `);
    res.sendStatus(400);
  }
};
