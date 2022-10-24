import { Response } from "express";
import logger from "../../../logger";
import PaymentChannelSqlService from "../../../services/platform/price-oracle/data/PaymentChannelSqlService";
import { Paymentchannels } from "../../../Schema";

const initializePaymentChannel = (body: any, stoID: number) => {
  const {
    title,
    details,
    chkCurrencyConversion,
    currencyToConvert,
    conversionRate,
    canWithdrawFunds,
    sendInstructionalDepositEmails,
    sendAdminEmail,
    depositInstructionText,
    depositInstructionEmailHeader,
    adminEmailBody,
    adminEmailHeader,
    id,
    currency,
    paymentType,
  } = body;
  const conversionEnabled = chkCurrencyConversion !== undefined ? 1 : 0;
  const sae = sendAdminEmail !== undefined ? 1 : 0;
  const cwf = canWithdrawFunds !== undefined ? 1 : 0;
  const sendInstructionalDepositEmail =
    sendInstructionalDepositEmails !== undefined ? 1 : 0;
  const channel: Paymentchannels = {
    ID: id ?? 0,
    paymentType: paymentType !== "" ? paymentType : 1, // always make it internal by default (check PAYMENT_CHANNEL_TYPE in the api for a full enum)
    adminEmailBody,
    adminEmailHeader,
    sendAdminEmail: sae,
    depositInstructionEmailHeader,
    depositInstructionText,
    canWithdrawFunds: cwf,
    conversionRate: conversionRate === "" ? "0" : conversionRate,
    sendInstructionalDepositEmail,
    currencyToConvert,
    conversionEnabled,
    currencyID: currency,
    title,
    stoid: stoID,
    paymentDetails: details,
    isActive: 1,
  };
  return channel;
};

export default async (req: any, res: Response) => {
  try {
    const stoID = req.session.stoid;
    const channelSvc = new PaymentChannelSqlService();
    const channel = initializePaymentChannel(req.body, stoID);
    await channelSvc.upsert(channel);

    res.redirect("/admin/paymentchannels");
  } catch (error) {
    logger.error(`${error} - Error occurred in postChangeSumSubSettings`);
  }
};
