import logger from '../../../logger';
import AffiliateInvestorSqlService from '../../../services/investorClient/affiliate/data/AffiliateInvestorSqlService'
import IAffiliateInvestorService from '../../../services/investorClient/affiliate/data/IAffiliateInvestorService'
import AffiliateOverviewDto from '../../../services/investorClient/affiliate/dto/AffiliateOverviewDto'
import { loadConfig } from '../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig';

/**
 * View model that represents a data row of affiliate-relevant data for an investor
 */
export interface InvestorAffiliateDataRowVM {
    // NB: Strings are used for decimal precision purposes
    id: number,
    eligible: boolean, // Whether investor can receive affiliate incomes
    tokens: string, // Affiliate token earnings
    fiat: string, // Affiliate earnings in FIAT
    registered: number, // Whether registered in affiliate system
}
const mapDtoToVM = (dto: AffiliateOverviewDto[]): InvestorAffiliateDataRowVM[] => {
    const array: InvestorAffiliateDataRowVM[] = [];
    dto.forEach((row) => {
        array[row.ID] = {
            id: row.ID,
            eligible: row.eligible === 1,
            tokens: row.tokens,
            fiat: row.fiat,
            registered: row.registered,
        }
    });
    return array;
}
const getInvestorsAffiliateOverview = async(stoId: number): Promise<InvestorAffiliateDataRowVM[]> => {
    try {
        const config = loadConfig();
        if (config?.enabled) {
            const svc: IAffiliateInvestorService = new AffiliateInvestorSqlService();
            const rows = await svc.getAffiliateOverviews(stoId);
            return mapDtoToVM(rows);
        }
        return [];
    } catch (error) {
        logger.error(`Error in affiliateCtl getInvestorsAffiliateOverview:\n${error}`);
        return [];
    }
}

export default getInvestorsAffiliateOverview;
