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
    const receiverIDs = await chatService.getReceiverIDs();
    for (let i = 0; i < receiverIDs.length; i++) {
      await chatService.insertOne(
        sender,
        receiver,
        receiverIDs[i].investorid,
        req.session.user.ID,
        0,
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
      0,
      message
    );
    const investorIDs = receiverIDs.map((obj) => obj.investorid);
    const senderType: SENDER_TYPE = "Platform";
    req.gqlExecute(SEND_EMAIL_NOTIFICATION, {
      variables: {
        investorIDs,
        senderType,
        stoID: 0,
        message,
      },
    });
    res.redirect(`chat`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in postSendToAll");
  }
};
