import { Response } from "express";
import logger from "../../../logger";
import PaymentChannelSqlService from "../../../services/platform/price-oracle/data/PaymentChannelSqlService";

export default async (req: any, res: Response) => {
  try {
    const { paymentChannelType, ID } = req.body;
    const paymentChannelID = parseInt(ID, 10);
    const channelSvc = new PaymentChannelSqlService();
    const channel = await channelSvc.fetchPaymentChannel(paymentChannelID);
    if (!channel) {
      throw new Error(`No such channel found: ${req.query.id}`);
    }
    // you can find the enum declaration in the api PAYMENT_CHANNEL_TYPE
    channel.paymentType = paymentChannelType;
    await channelSvc.upsert(channel);

    res.redirect(`/admin/createNewPaymentChannel?id=${ID}`);
  } catch (error) {
    logger.error(`${error} - Error in postChangePaymentChannelMode`);
  }
};
