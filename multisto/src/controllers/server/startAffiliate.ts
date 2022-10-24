import logger from '../../logger';
import IAffiliateModule from '../../services/investorClient/affiliate/api/IAffiliateModule';
import RemoteAffiliateService from '../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig'

export default async() => {
    try {
        const config = loadConfig();
        if (config && config.enabled) {
            console.log(`-- Affiliate pre-start hook invoked [module is enabled]`);
            logger.info(`-- Affiliate pre-start hook invoked [module is enabled]`);
            const svc: IAffiliateModule = new RemoteAffiliateService(config);
            if (config.doSyncInvestorsOnStartup) {
                svc.registerInvestorsBulk(config.doSyncUploadedInvestors);
            }
            console.log(`<- Done!`);
            logger.info(`<- Done!`);
        }
    } catch(error) {
        logger.error(`Error in startAffiliate:\n${error}`);
        console.log(`Error in startAffiliate:\n${error}`);
    }
}
