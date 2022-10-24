import * as express from 'express';
import getIndex from '../../controllers/investorClient/tradingCtl/getIndex';
import { isInvestorUserAuthenticated } from '../../modules/common';

const router = express.Router();

/* Trading module router. */

router.get('/trading', isInvestorUserAuthenticated, getIndex);

// To implement:
// router.get('/tradingsellview', isInvestorUserAuthenticated, tradingSellView);
// router.get('/tradingbuy', isInvestorUserAuthenticated, tradingBuy);
// router.post('/tradingbuypost', isInvestorUserAuthenticated, tradingBuyPost);
// router.get('/tradingsell', isInvestorUserAuthenticated, tradingSell);
// router.post('/tradingsellpost', isInvestorUserAuthenticated, tradingSellPost);
// router.get('/tradingselldelete', isInvestorUserAuthenticated, tradingSellDelete);
// router.get('/deleteBuyOffer', isInvestorUserAuthenticated, deleteBuyOffer);
// router.get('/opennewbuyorder', isInvestorUserAuthenticated, openNewBuyOrder);
// router.post('/opennewbuyorderpost', isInvestorUserAuthenticated, openNewBuyOrderPost);
// router.get('/atomicSwap', isInvestorUserAuthenticated, atomicSwap);
// router.get('/acceptSwap', isInvestorUserAuthenticated, acceptSwap);
// router.get('/changeSwapStatus', isInvestorUserAuthenticated, clientinvestor.changeSwapStatus);

export = router;
