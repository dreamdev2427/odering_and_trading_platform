import express from "express";
import common from "../../modules/common";
import getChatList from "../../controllers/admin/chatCtl/getChatList";
import getChatHistory from "../../controllers/admin/chatCtl/getChatHistory";
import getUnreadMessagesCount from "../../controllers/admin/chatCtl/getUnreadMessagesCount";
import postCreateChat from "../../controllers/admin/chatCtl/postCreateChat";
import postDeleteChatRecord from "../../controllers/admin/chatCtl/postDeleteChatRecord";
import postDeleteChatRecordPermanently from "../../controllers/admin/chatCtl/postDeleteChatRecordPermanently";
import postDeleteChatHistory from "../../controllers/admin/chatCtl/postDeleteChatHistory";
import postDeleteChatHistoryPermanently from "../../controllers/admin/chatCtl/postDeleteChatHistoryPermanently";
import postDeleteChatList from "../../controllers/admin/chatCtl/postDeleteChatList";
import postDeleteChatListPermanently from "../../controllers/admin/chatCtl/postDeleteChatListPermanently";
import postUpdateToSeen from "../../controllers/admin/chatCtl/postUpdateToSeen";
import postUploadFileToCloud from "../../controllers/admin/chatCtl/postUploadFileToCloud";
import postSendToAll from "../../controllers/admin/chatCtl/postSendToAll";
import { upload } from "../../services/file-upload-gql";

const router = express.Router();

router.get(
  "/platform/chat",
  common.isPlatformAdminUserAuthenticated,
  getChatList
);
router.get(
  "/platform/chatHistory",
  common.isPlatformAdminUserAuthenticated,
  getChatHistory
);
router.get(
  "/platform/unreadMessagesCount",
  common.isPlatformAdminUserAuthenticated,
  getUnreadMessagesCount
);
router.post(
  "/platform/createChat",
  common.isPlatformAdminUserAuthenticated,
  postCreateChat
);
router.post(
  "/platform/deleteChatRecord",
  common.isPlatformAdminUserAuthenticated,
  postDeleteChatRecord
);
router.post(
  "/platform/deleteChatRecordPermanently",
  common.isNotAllowed,
  postDeleteChatRecordPermanently
);
router.post(
  "/platform/deleteChatHistory",
  common.isPlatformAdminUserAuthenticated,
  postDeleteChatHistory
);
router.post(
  "/platform/deleteChatHistoryPermanently",
  common.isNotAllowed,
  postDeleteChatHistoryPermanently
);
router.post(
  "/platform/deleteChatList",
  common.isPlatformAdminUserAuthenticated,
  postDeleteChatList
);
router.post(
  "/platform/deleteChatListPermanently",
  common.isNotAllowed,
  postDeleteChatListPermanently
);
router.post(
  "/platform/updateToSeen",
  common.isPlatformAdminUserAuthenticated,
  postUpdateToSeen
);
router.post(
  "/platform/uploadFileToCloud",
  common.isPlatformAdminUserAuthenticated,
  upload.single("fileInput"),
  postUploadFileToCloud
);
router.post(
  "/platform/sendToAll",
  common.isPlatformAdminUserAuthenticated,
  postSendToAll
);

export = router;
