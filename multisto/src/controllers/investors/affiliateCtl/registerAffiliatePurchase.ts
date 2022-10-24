import logger from '../../../logger';
import mysql from '../../../modules/mysql';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import IStoService from '../../../services/investorClient/affiliate/data/IStoService';
import SharesSqlService from '../../../services/investorClient/affiliate/data/SharesSqlService';
import StoSqlService from '../../../services/investorClient/affiliate/data/StoSqlService';

/**
 * Register share purchase into affiliate programme if it's enabled. Part of investorClient controller.
 * This happens after KYC has been approved.
 */
export default async (userId: number, stoId: number, purchasedShareTypeId: number, tokens: any) => {
    try {
        const config = loadConfig();
        if (config?.enabled) {
            logger.info(`Registering affiliate purchase of tokens:${tokens} for id:${userId} in sto:${stoId}, shareId:${purchasedShareTypeId}`);
            const service = new RemoteAffiliateService(config);
            const stoSvc: IStoService = new StoSqlService();
            const stoRecord = await stoSvc.getSto(stoId);
            const shareSvc = new SharesSqlService();
            let cost = '';

            // const useDiscount = (
            //   await mysql.executeSQLStatement(`SELECT isICOShareTypeCompany as isIco FROM stos WHERE ID = ?`, stoId)
            // )[0].isIco === 1;

            // if (useDiscount) {
                // cost = await shareSvc.getPreciseDiscountCost(purchasedShareTypeId, tokens);
            // } else {
                cost = await shareSvc.getPreciseCost(purchasedShareTypeId, tokens);
            // }

            await service.registerPurchase({
                user_id: userId,
                project_id: stoId,
                plan_id: stoRecord?.affiliatePlanId || 0,
                purchase_cost: cost,
                tokens_issued: tokens,
                order_status: 1
            });
            logger.debug(`affiliateCtl registerAffiliatePurchase remote success: user:${userId} sto:${stoId}`);
        }
    } catch(error) {
        logger.error(`affiliateCtl registerAffiliatePurchase: Purchase order for user:${userId} sto:${stoId} not properly registered in affiliate system, but it (most likely) exists in this system:\n${error}`);
    }
}
