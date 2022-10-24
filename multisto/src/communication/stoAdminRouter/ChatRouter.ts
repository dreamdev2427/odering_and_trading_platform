import express from "express";
import common from "../../modules/common";
import getChatList from "../../controllers/stoAdmin/chatCtl/getChatList";
import getChatHistory from "../../controllers/stoAdmin/chatCtl/getChatHistory";
import getUnreadMessagesCount from "../../controllers/stoAdmin/chatCtl/getUnreadMessagesCount";
import postCreateChat from "../../controllers/stoAdmin/chatCtl/postCreateChat";
import postDeleteChatRecord from "../../controllers/stoAdmin/chatCtl/postDeleteChatRecord";
import postDeleteChatRecordPermanently from "../../controllers/stoAdmin/chatCtl/postDeleteChatRecordPermanently";
import postDeleteChatHistory from "../../controllers/stoAdmin/chatCtl/postDeleteChatHistory";
import postDeleteChatHistoryPermanently from "../../controllers/stoAdmin/chatCtl/postDeleteChatHistoryPermanently";
import postDeleteChatList from "../../controllers/stoAdmin/chatCtl/postDeleteChatList";
import postDeleteChatListPermanently from "../../controllers/stoAdmin/chatCtl/postDeleteChatListPermanently";
import postUpdateToSeen from "../../controllers/stoAdmin/chatCtl/postUpdateToSeen";
import postUploadFileToCloud from "../../controllers/stoAdmin/chatCtl/postUploadFileToCloud";
import postSendToAll from "../../controllers/stoAdmin/chatCtl/postSendToAll";
import { upload } from "../../services/file-upload-gql";

const router = express.Router();

router.get("/admin/chat", common.isAdminUserAuthenticated, getChatList);
router.get(
  "/admin/chatHistory",
  common.isAdminUserAuthenticated,
  getChatHistory
);
router.get(
  "/admin/unreadMessagesCount",
  common.isAdminUserAuthenticated,
  getUnreadMessagesCount
);
router.post(
  "/admin/createChat",
  common.isAdminUserAuthenticated,
  postCreateChat
);
router.post(
  "/admin/deleteChatRecord",
  common.isAdminUserAuthenticated,
  postDeleteChatRecord
);
router.post(
  "/admin/deleteChatRecordPermanently",
  common.isNotAllowed,
  postDeleteChatRecordPermanently
);
router.post(
  "/admin/deleteChatHistory",
  common.isAdminUserAuthenticated,
  postDeleteChatHistory
);
router.post(
  "/admin/deleteChatHistoryPermanently",
  common.isNotAllowed,
  postDeleteChatHistoryPermanently
);
router.post(
  "/admin/deleteChatList",
  common.isAdminUserAuthenticated,
  postDeleteChatList
);
router.post(
  "/admin/deleteChatListPermanently",
  common.isNotAllowed,
  postDeleteChatListPermanently
);
router.post(
  "/admin/updateToSeen",
  common.isAdminUserAuthenticated,
  postUpdateToSeen
);
router.post(
  "/admin/uploadFileToCloud",
  common.isAdminUserAuthenticated,
  upload.single("fileInput"),
  postUploadFileToCloud
);
router.post("/admin/sendToAll", common.isAdminUserAuthenticated, postSendToAll);

export = router;
