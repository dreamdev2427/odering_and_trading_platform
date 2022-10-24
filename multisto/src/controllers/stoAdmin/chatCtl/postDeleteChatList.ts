import { Response } from "express";
import IChatService from "../../../services/platform/chat/IChatService";
import ChatSqlService from "../../../services/platform/chat/ChatSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: any, res: Response) => {
  try {
    const chatService: IChatService = new ChatSqlService();
    await chatService.deleteChatList(req.session.stoid);
    res.redirect(`chat`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in postDeleteChatList");
  }
};
