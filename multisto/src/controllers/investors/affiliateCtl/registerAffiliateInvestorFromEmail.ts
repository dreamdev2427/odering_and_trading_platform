import logger from '../../../logger';
import { Investor } from '../../../Schema';
import { mapInvestor } from '../../../services/investorClient/affiliate/dto/AffiliateInvestorDto';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import AffiliateInvestorSqlService from '../../../services/investorClient/affiliate/data/AffiliateInvestorSqlService';

/**
 * Register investor for affiliate programme if it's enabled. Part of investorClient controller.
 * This happens after KYC has been approved.
 */
export default async (email: string) => {
    let investor: Investor | null | undefined = null;
    try {
        const config = loadConfig();
        if (config?.enabled) {
            // Get investor record, especially ID
            const investorSvc = new AffiliateInvestorSqlService();
            investor = await investorSvc.getInvestorByEmail(email);
            if (!investor) {
                throw new Error(`Internal error: Investor with email:${email} was referenced but does not exist on our system. Check correctness of this function's invocation and email value.`);
            }
            // Register investor
            const affSvc = new RemoteAffiliateService(config);
            await affSvc.registerInvestor(mapInvestor(investor), false);
        }
        logger.info(`affiliateCtl registerAffiliateInvestorFromEmail remote succeess: id?:${investor?.ID} email:${email}`);
    } catch(error) {
        logger.error(`affiliateCtl registerAffiliateInvestorFromEmail: Investor id?:${investor?.ID} email:${email} not properly registered in affiliate system upon registration:\n${error}`);
    }
}
