import logger from '../../../logger';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';


/**
 * Register investor for affiliate programme. Part of investorClient controller.
 * This happens after KYC has been approved.
 */
export default async () => {
    try {
        const config = loadConfig();
        if (config?.enabled) {
            const service = new RemoteAffiliateService(config);
            if (config.doSyncInvestorsOnStartup) {
                service.registerInvestorsBulk(config.doSyncUploadedInvestors);
            }
        }
    } catch(error) {
        logger.error(`affiliateCtl registerBulk:\n${error}`);
    }
}
