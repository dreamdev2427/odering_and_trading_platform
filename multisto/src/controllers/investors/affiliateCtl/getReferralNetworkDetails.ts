import logger from '../../../logger';
import IAffiliateModule from '../../../services/investorClient/affiliate/api/IAffiliateModule';
import RemoteAffiliateService from '../../../services/investorClient/affiliate/api/RemoteAffiliateService';
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';
import DividendsModule from '../../../services/investors/dividends-legacy/api/DividendsModule';
import IDividendsModule from '../../../services/investors/dividends-legacy/api/IDividendsModule';
import { getDividendPeriodName } from '../dividendsCtl/getInvestorsDividendsOverview';

export interface ReferralDetailsVm {
    id: number,
    name: string,
    purchasedTokens: string,
    dividends: string,
    dividendPeriod: string,
    affiliateEligibility: boolean,
    affiliateTokens: string,
    affiliateFiat: string,
}

/**
 * Get investor details from the referral network, including referrees' affiliate and dividends information
 */
export const getReferralNetworkDetails = async(investorId: number, stoId: number): Promise<ReferralDetailsVm[]> => {
    try {
        const config = loadConfig();
        if (config?.enabled) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const affSvc: IAffiliateModule = new RemoteAffiliateService(config);
            const divSvc: IDividendsModule  = new DividendsModule();

            const referrals = await affSvc.getAffiliateNetworkAsList(investorId, stoId)
            const ids: number[] = referrals.map(referral => referral.ID);
            const dividends = await divSvc.getInvestorDividendsOverviews(ids, stoId);

            const combinedViewModel: ReferralDetailsVm[] = [];
            for(let i = 0; i < referrals.length; i += 1) {
                const dividendRow = dividends.find(divRecord => divRecord.id === referrals[i].ID);
                combinedViewModel.push({
                    id: referrals[i].ID,
                    name: referrals[i].name,
                    purchasedTokens: (dividendRow) ? dividendRow.purchasedTokens : '-',
                    dividends: (dividendRow) ? dividendRow.dividends : '-',
                    dividendPeriod: (dividendRow) ? getDividendPeriodName(dividendRow.dividendPeriod) : '-',
                    affiliateEligibility: referrals[i].eligible === 1,
                    affiliateTokens: 'N/A',
                    affiliateFiat: 'N/A',
                });
            }

            return combinedViewModel;
        }
    } catch(error) {
        logger.error(`Error in investors affiliateCtl getReferralNetworkDetails:\n${error}`);
    }
    return Promise.resolve([]);
}

export default getReferralNetworkDetails;
