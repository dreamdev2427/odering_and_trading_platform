/* eslint-disable */
import { Response } from "express";
import IChatService from "../../../services/platform/chat/IChatService";
import ChatSqlService from "../../../services/platform/chat/ChatSqlService";
import ISentToAllMessageService from "../../../services/platform/chat/ISentToAllMessageService";
import SentToAllMessageSqlService from "../../../services/platform/chat/SentToAllMessageSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";
import { mutation$ } from "../../../graphql/fetchers";
import { SENDER_TYPE } from "../../../graphql/enums";

const SEND_EMAIL_NOTIFICATION = mutation$.sendEmailNotification();

export default async (req: any, res: Response) => {
  try {
    const { sender, receiver, message, type, location } = req.body;
    const chatService: IChatService = new ChatSqlService();
    const receiverIDs = await chatService.getReceiverIDs(req.session.stoid);
    for (let i = 0; i < receiverIDs.length; i++) {
      await chatService.insertOne(
        sender,
        receiver,
        receiverIDs[i].investorid,
        req.session.user.ID,
        req.session.stoid,
        message,
        type,
        location
      );
    }
    const sentToAllMessageService: ISentToAllMessageService =
      new SentToAllMessageSqlService();
    await sentToAllMessageService.insertOne(
      sender,
      req.session.user.ID,
      req.session.stoid,
      message
    );
    const investorIDs = receiverIDs.map((obj) => obj.investorid);
    const senderType: SENDER_TYPE = "Admin";
    req.gqlExecute(SEND_EMAIL_NOTIFICATION, {
      variables: {
        investorIDs,
        senderType,
        stoID: req.session.stoid,
        message,
      },
    });
    res.redirect(`chat`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in postSendToAll");
  }
};
