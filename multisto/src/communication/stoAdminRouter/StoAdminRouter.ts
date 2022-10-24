import * as express from "express";
import postVotingPower from "../../controllers/admin/votingCtl/postVotingPower";
import common from "../../modules/common";
import enableDisableInvestorLogin from "../../controllers/admin/investors/enableDisableInvestorLogin";
import DividendsRouter from "./DividendsRouter";
import getSignedContracts from "../../controllers/stoAdmin/documents/getSignedContracts";
import PaymentChannelRouter from "./PaymentChannelRouter";
import ShareCapCtl from "../../services/investors/sharecap/controller/api/admin";
import SharePurchaseRouter from "./SharePurchaseRouter";

const router = express.Router();

// Web routes
router.post(
  "/admin/postVotingPower",
  common.isAdminUserAuthenticated,
  postVotingPower
);
router.get(
  "/admin/enableDisableInvestorLogin",
  common.isAdminUserAuthenticated,
  enableDisableInvestorLogin
);
router.get(
  "/admin/viewSignedContracts",
  common.isAdminUserAuthenticated,
  getSignedContracts
);

// Dividends routes
router.use(DividendsRouter);

// Payment Channel routes
router.use(PaymentChannelRouter);

// Requires regular admin login
router.use(SharePurchaseRouter);

// Sharecap table API routes
router.get(
  "/admin/api/sharecap",
  common.isAdminUserAuthenticated,
  ShareCapCtl.get
);
router.get(
  "/admin/api/sharecap_csv",
  common.isAdminUserAuthenticated,
  ShareCapCtl.getCsv
);
router.post(
  "/admin/api/reloadSharecap",
  common.isAdminUserAuthenticated,
  ShareCapCtl.reload
);
router.post(
  "/admin/reloadSharecapRedirect",
  common.isAdminUserAuthenticated,
  ShareCapCtl.reloadAndRedirect
);

// Api routes

export = router;
