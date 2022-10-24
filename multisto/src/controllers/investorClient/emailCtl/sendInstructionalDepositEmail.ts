import { Request, Response } from "express";
import IEmailSendingService from "../../../services/investorClient/email/IEmailSendingService";
import EmailSendingService from "../../../services/investorClient/email/EmailSendingService";
import logger from "../../../logger";

export default async (req: Request, res: Response) => {
  const reqObj = req as any;
  const investorID = reqObj.session.user.ID;
  const paymentChannelID = req.body.accountID;
  const globalObj = global as any;
  // don't post the mercury details for gains
  const additionalText = globalObj.config.CurrentClientID === 14 ? '' : req.body.additionalText;
  if (paymentChannelID && investorID) {
    const emailService: IEmailSendingService = new EmailSendingService();
    const amount = 0;
    const isWithdrawRequest = 0;
    const result = await emailService.sendInstructionalDepositEmail(paymentChannelID, investorID, req.body.stoID,amount, isWithdrawRequest, additionalText);
    if (result) {
      res.sendStatus(200);
    } else {
      logger.error("An Error occurred in sendInstructionalDepositEmail");
      res.sendStatus(400);
    }
  } else {
    logger.error("Missing paymentID/investorID/stoID - Error occurred in sendInstructionalDepositEmail");
    res.sendStatus(400);
  }
};
