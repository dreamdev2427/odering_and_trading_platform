import { Response } from "express";
import IChatService from "../../../services/platform/chat/IChatService";
import ChatSqlService from "../../../services/platform/chat/ChatSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: any, res: Response) => {
  try {
    const chatService: IChatService = new ChatSqlService();
    const { sender, receiver, investorID, message, type, location } = req.body;
    await chatService.insertOne(
      sender,
      receiver,
      investorID,
      req.session.user.ID,
      0,
      message,
      type,
      location
    );
    res.redirect(`/platform/chatHistory?investorID=${investorID}`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in postCreateChat");
  }
};
