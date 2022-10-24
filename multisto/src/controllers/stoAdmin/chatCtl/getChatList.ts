import { Response } from "express";
import IChatService from "../../../services/platform/chat/IChatService";
import ChatSqlService from "../../../services/platform/chat/ChatSqlService";
import ISentToAllMessageService, {
  SENDER_TYPE,
} from "../../../services/platform/chat/ISentToAllMessageService";
import SentToAllMessageSqlService from "../../../services/platform/chat/SentToAllMessageSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: any, res: Response) => {
  try {
    const chatService: IChatService = new ChatSqlService();
    const chatList = await chatService.getChatList(req.session.stoid);
    const chatListCount = chatList.length;

    const sentToAllMessageService: ISentToAllMessageService =
      new SentToAllMessageSqlService();
    const messages = await sentToAllMessageService.getMessagesList(
      SENDER_TYPE.Admin,
      req.session.stoid
    );
    const messagesCount = messages.length;

    res.render("admin/chat", {
      csrfToken: req.csrfToken(),
      partials: common.getPartials(),
      Data: common.getCommonPageProperties(req),
      chatList,
      chatListCount,
      messages,
      messagesCount,
      successMessage: req.flash("successMessage"),
      errorMessage: req.flash("errorMessage"),
    });
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in getChatList");
  }
};
