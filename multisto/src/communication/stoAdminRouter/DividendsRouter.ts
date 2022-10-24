import express from "express";
import common from "../../modules/common";
import dividends from "../../controllers/admin/dividendsCtl";

const router = express.Router();

router.get(
  "/admin/dividends",
  common.isAdminUserAuthenticated,
  dividends.getIndex
);
router.post(
  "/admin/dividends",
  common.isAdminUserAuthenticated,
  dividends.postDividends
);
router.post(
  "/admin/dividendIsActive",
  common.isAdminUserAuthenticated,
  dividends.postDividendIsActive
);
router.get(
  "/admin/dividendPayouts/:id",
  common.isAdminUserAuthenticated,
  dividends.getPayouts
);
router.get(
  "/admin/dividendInvestorPayouts/:id",
  common.isAdminUserAuthenticated,
  dividends.getInvestorPayouts
);
router.post(
  "/admin/triggerDividendPayout",
  common.isAdminUserAuthenticated,
  dividends.postWebTriggerDividendPayout
);
router.post(
  "/admin/dividendChangeAwardValue",
  common.isAdminUserAuthenticated,
  dividends.postChangeAwardValue
);
router.post(
  "/admin/purgeDividend",
  common.isAdminUserAuthenticated,
  dividends.postPurgeDividend
);

export = router;
