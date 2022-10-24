import * as express from "express";
import TradingRouter from "./TradingRouter";
import DocumentsRouter from "./DocumentsRouter";
import AffiliateRouter from "./AffiliateRouter";
import SharePurchaseDocumentsRouter from "./SharePurchaseDocumentsRouter";
import RegistrationRouter from "./RegistrationRouter";
import AccreditationRouter from "./AccreditationRouter";

const router = express.Router();

/* Central InvestorClient module router. */

router.use(TradingRouter);
router.use(DocumentsRouter);
router.use(AffiliateRouter);
router.use(SharePurchaseDocumentsRouter);
router.use(RegistrationRouter);
router.use(AccreditationRouter);

// Example:
// router.use(DocumentsRouter);
// router.use(VotingRouter);

export = router;
