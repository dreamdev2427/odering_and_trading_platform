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
    const chatList = await chatService.getCustomerSupportChatList();
    const chatListCount = chatList.length;

    const sentToAllMessageService: ISentToAllMessageService =
      new SentToAllMessageSqlService();
    const messages = await sentToAllMessageService.getMessagesList(
      SENDER_TYPE.Platform,
      0
    );
    const messagesCount = messages.length;

    res.render("platform/chat", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
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
