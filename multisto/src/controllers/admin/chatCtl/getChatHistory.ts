import { Response } from "express";
import IChatService from "../../../services/platform/chat/IChatService";
import ChatSqlService from "../../../services/platform/chat/ChatSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: any, res: Response) => {
  try {
    const chatService: IChatService = new ChatSqlService();
    const chatHistory = await chatService.getCustomerSupportChatHistory(
      req.query.investorID
    );
    const chatHistoryCount = chatHistory.length;

    res.render("platform/chatHistory", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      investorID: req.query.investorID,
      chatHistory,
      chatHistoryCount,
      successMessage: req.flash("successMessage"),
      errorMessage: req.flash("errorMessage"),
    });
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in getChatHistory");
  }
};
