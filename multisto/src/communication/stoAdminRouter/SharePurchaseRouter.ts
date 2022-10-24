import express from "express";
import common from "../../modules/common";
import postActivateNewInvestorInSto from "../../controllers/stoAdmin/investor/post-Activate-New-Investor-In-Sto";

const router = express.Router();

router.get(
  "/admin/activateNewInvestorInSTO",
  common.isAdminUserAuthenticated,
  postActivateNewInvestorInSto
);

export = router;
