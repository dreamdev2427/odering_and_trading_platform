import logger from '../../../logger';
import IAffiliateModule from '../../../services/investorClient/affiliate/api/IAffiliateModule';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig'

export default (investorId: number, stoId: number): Promise<string> => {
    try {
        const config = loadConfig();
        if (config?.enabled) {
            const svc: IAffiliateModule = new RemoteAffiliateService(config);
            return svc.getInvestorTokenIncome(investorId, stoId);
        }
        logger.error("investors affiliateCtl: Tried to invoke getInvestorAffiliateTokenIncome but affiliate service is not enabled. Returning 0.");
        return Promise.resolve('0');
    } catch(error) {
        logger.error(`Error in investors affiliateCtl getInvestorAffiliateTokenIncome:\n${error}`);
        return Promise.resolve('0');
    }
}
