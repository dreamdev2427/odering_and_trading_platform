import * as express from 'express';
import deleteAffiliatePlan from '../../controllers/investors/affiliateCtl/api/deleteAffiliatePlan';
import getAffiliatePlans from '../../controllers/investors/affiliateCtl/api/getAffiliatePlans';
import getInvestment from '../../controllers/investors/affiliateCtl/api/getInvestment';
import registerAffiliatePlan from '../../controllers/investors/affiliateCtl/api/registerAffiliatePlan';
import registerPurchase from '../../controllers/investors/affiliateCtl/api/registerPurchase';
import updateAffiliatePlan from '../../controllers/investors/affiliateCtl/api/updateAffiliatePlan';
import getAffiliatePayouts from '../../controllers/admin/affiliateCtl/getAffiliatePayouts';
import common from '../../modules/common';
import ApiAuthService from '../../services/api/ApiAuthService';
import getReferrals from '../../controllers/admin/affiliateCtl/getReferrals';
import postReferrer from '../../controllers/admin/affiliateCtl/postReferrer';
import postAwardAffiliateIncomes from '../../controllers/admin/affiliateCtl/postAwardAffiliateIncomes'
import debug from '../../controllers/api/debug';


const router = express.Router();

// Web routes
router.get('/platform/affiliatepayouts', common.isPlatformAdminUserAuthenticated, getAffiliatePayouts);
router.get('/platform/referralnetwork', common.isPlatformAdminUserAuthenticated, getReferrals);
router.post('/platform/referrer', common.isPlatformAdminUserAuthenticated, postReferrer);
router.post('/platform/awardAffiliateIncomes', common.isPlatformAdminUserAuthenticated, postAwardAffiliateIncomes);

const api = new ApiAuthService(); // TODO: invoke from a controller function instead ?

// API routes
router.get('/api/affiliate_plan', api.authenticateApiRequest, getAffiliatePlans);
router.get('/api/affiliate_plan_unauth', getAffiliatePlans);
router.post('/api/affiliate_plan', api.authenticateApiRequest, registerAffiliatePlan);
router.post('/api/affiliate_plan', api.authenticateApiRequest, updateAffiliatePlan);
router.delete('/api/affiliate_plan', api.authenticateApiRequest, deleteAffiliatePlan);
router.post('/api/affiliate_purchase', api.authenticateApiRequest, registerPurchase);
router.get('/api/investment', api.authenticateApiRequest, getInvestment);

// Debug API routes
router.get('/api/debug/getAffiliateNetwork/:stoId/:investorId', debug.getAffiliateNetwork);
router.get('/api/debug/getInvestmentsForIds', debug.getInvestmentsForIds);
router.patch('/api/debug/patchCommissionStatusForIds/:stoId/:status', debug.patchCommissionStatusForIds);

export = router;
