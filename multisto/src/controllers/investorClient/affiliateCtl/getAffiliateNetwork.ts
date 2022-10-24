
import { Request, Response } from 'express';
import logger from '../../../logger';
import common from '../../../modules/common';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import AffiliateInvestorSqlService from '../../../services/investorClient/affiliate/data/AffiliateInvestorSqlService';
import IAffiliateInvestorService from '../../../services/investorClient/affiliate/data/IAffiliateInvestorService';
import getNetworkData from './getAffiliateProgram/getNetworkData';

/**
 * Renders only the investor's affiliate network, as a separate page
 */
export default async (req: Request, res: Response) => {
    const reqAny = req as any;
    try {
        const config = loadConfig();
        if (config?.enabled) {
            // Session data and logic
            const investorId = (req as any).session.user.ID;

            // Services initialization
            const investorSvc: IAffiliateInvestorService = new AffiliateInvestorSqlService();

            // Logic and data for display
            const networkDataPromise = getNetworkData(investorId, 0);
            const referrerNamePromise = investorSvc.getReferrerName(investorId);
            // Await async round
            const [
                networkData,
                referrerName,
            ] = await Promise.all([
                networkDataPromise,
                referrerNamePromise,
            ]);

            res.render('investors/affiliate/network-only', {
                partials: common.getInvestorDashboardPartials(),
                Data: await common.getCommonInvestorDashboardPageProperties(req, res),
                referrerName,
                network: networkData.network,
                networkTree: JSON.stringify(networkData.networkTree),
                message: config?.dashboard?.disabledMessage,
            });
        } else {
            logger.error("affiliateCtl: Trying to GET affiliate program network, but it's not enabled.");
            res.render('error', {
                message: reqAny.flash('message'),
                partials: common.getPartials(),
            });
        }
    } catch(error) {
        logger.error(`${error}`);
		res.render('error', {
			message: reqAny.flash('message'),
			partials: common.getPartials(),
		});
    }
}
