// import { Router } from 'express';
import * as express from 'express';
import InvestorClientRouter from './investorClientRouter';
import StoAdminRouter from './stoAdminRouter';
import ApiRouter from './apiRouter';
import PlatformAdminRouter from './platformAdminRouter';

const router = express.Router();

/* Central application router. Redirects to other modules. */

router.use(InvestorClientRouter);
router.use(StoAdminRouter);
router.use(ApiRouter);
router.use(PlatformAdminRouter);

// Example:
// router.use(AdminRouter);
// router.use(BrokerRouter);
// router.use(IndexRouter);
// router.use(InvestorsRouter);
// router.use(StoRouter);

export = router;
