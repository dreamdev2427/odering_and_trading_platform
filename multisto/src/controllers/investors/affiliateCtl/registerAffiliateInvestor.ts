import logger from '../../../logger';
import { Investor } from '../../../Schema';
import { mapInvestor } from '../../../services/investorClient/affiliate/dto/AffiliateInvestorDto';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';

/**
 * Register investor for affiliate programme if it's enabled. Part of investorClient controller.
 * This happens after KYC has been approved.
 */
export default async (investor: Investor) => {
    try {
        const config = loadConfig();
        if (config?.enabled) {
            const service = new RemoteAffiliateService(config);
            await service.registerInvestor(mapInvestor(investor), false);
        }
        logger.info(`affiliateCtl registerAffiliateInvestor remote succeess: ${investor.ID}`);
    } catch(error) {
        logger.error(`affiliateCtl registerAffiliateInvestor: Investor ${investor.ID} not properly registered in affiliate system upon registration:\n${error}`);
    }
}
