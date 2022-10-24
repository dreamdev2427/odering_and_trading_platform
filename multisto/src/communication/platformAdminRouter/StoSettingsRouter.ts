import * as express from "express";
import common from "../../modules/common";
import postStoKycSteps from "../../controllers/admin/stoTools/postStoKycSteps";
import postStoSettingsJson from "../../controllers/admin/stoTools/postStoSettingsJson";
import postStoVerifyInvestorComHostToken from "../../controllers/admin/stoTools/postStoVerifyInvestorComHostToken";
import postStoMetadata from "../../controllers/admin/stoTools/postStoMetadata";
import * as emailTextsController from "../../services/platform/emails/controllers/EmailTexts.controller";

const router = express.Router();

router.post(
  "/platform/updateStoKycSteps",
  common.isPlatformAdminUserAuthenticated,
  postStoKycSteps
);
router.post(
  "/platform/updateStoSettingsJson",
  common.isPlatformAdminUserAuthenticated,
  postStoSettingsJson
);
router.post(
  "/platform/updateStoVerifyInvestorComHostToken",
  common.isPlatformAdminUserAuthenticated,
  postStoVerifyInvestorComHostToken
);
router.post(
  "/platform/stoMetadata",
  common.isPlatformAdminUserAuthenticated,
  postStoMetadata
);
router.post(
  "/platform/emailTexts",
  common.isPlatformAdminUserAuthenticated,
  emailTextsController.postEmailTextsWeb
);
export = router;
