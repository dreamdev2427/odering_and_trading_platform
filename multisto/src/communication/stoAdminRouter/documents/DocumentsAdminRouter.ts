import * as express from "express";
import DocusignAdminRouter from "./docusign/DocusignAdminRouter";
import getDirectoryList from "../../../controllers/stoAdmin/documents/getDirectoryList";
import common from "../../../modules/common";
import sharePurchaseDocumentsCtl from "../../../controllers/investorClient/sharePurchaseDocumentsCtl";

const router = express.Router();

router.use(DocusignAdminRouter);

router.get(
  "/admin/directorylist",
  common.isAdminUserAuthenticated,
  getDirectoryList
);

router.get(
  "/admin/deleteDocumentUser",
  common.isAdminUserAuthenticated,
  sharePurchaseDocumentsCtl.deleteDocumentUser
);

export = router;
