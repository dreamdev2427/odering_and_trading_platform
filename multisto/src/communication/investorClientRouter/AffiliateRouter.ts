
import * as express from "express";
import getAffiliateProgram from '../../controllers/investorClient/affiliateCtl/getAffiliateProgram';
import getAffiliateNetwork from '../../controllers/investorClient/affiliateCtl/getAffiliateNetwork';
import { isInvestorUserAuthenticated } from "../../modules/common";

const router = express.Router();

router.get('/affiliateprogram', isInvestorUserAuthenticated, getAffiliateProgram);
router.get('/affiliatenetwork', isInvestorUserAuthenticated, getAffiliateNetwork);

export = router;