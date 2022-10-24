import * as express from "express";
import { NextFunction, Request, Response } from "express";
import investorBlockPassWebhookPost from "../../controllers/api/externalKycWebhooks/investorBlockPassWebhookPost";
import getProjectsList from "../../controllers/api/getProjectsList";
import ApiAuthService from "../../services/api/ApiAuthService";
import getProjectStatus from "../../controllers/api/getProjectStatus";
import { isInvestorUserAuthenticated } from "../../modules/common";
import {
  getConversionRate,
  lockConversionRate,
} from "../../services/platform/price-oracle/controller";
import investorSumSubWebhookPost, {
  verifySumSubWebHook,
} from "../../controllers/api/externalKycWebhooks/investorSumSubWebhookPost";
import investorVerifyInvestorWebhookPost from "../../controllers/api/externalKycWebhooks/investorVerifyInvestorWebhookPost";
import debug from "../../controllers/api/debug";

const router = express.Router();

router.get("/api/testapi", getProjectsList);
router.post("/api/investorBlockPassWebhookPost", investorBlockPassWebhookPost);
router.post(
  "/api/investorSumSubWebhookPost",
  verifySumSubWebHook,
  investorSumSubWebhookPost
);
router.get(
  "/api/conversionRate/:from/:to",
  isInvestorUserAuthenticated,
  getConversionRate
);
router.post(
  "/api/lockConversionRate/:from/:to",
  isInvestorUserAuthenticated,
  lockConversionRate
);
router.post(
  "/api/investorVerifyInvestorComWebhookPost",
  investorVerifyInvestorWebhookPost
);

router.post("/api/debug/getConfig", debug.auth, debug.getConfig);
router.post("/api/debug/getResource/:name", debug.auth, debug.getResource);
router.post("/api/debug/patchInvestorSto", debug.auth, debug.patchInvestorSto);

const authenticateApiRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authService = new ApiAuthService();
  authService.authenticateApiRequest(req, res, next);
};

router.get("/api/getProjectStatus", authenticateApiRequest, getProjectStatus);

export = router;
