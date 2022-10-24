import logger from '../../../logger';
import { Dividendreceivers } from '../../../Schema';
import DividendsModule from '../../../services/investors/dividends-legacy/api/DividendsModule'
import IDividendsModule from '../../../services/investors/dividends-legacy/api/IDividendsModule'

/**
 * View model that represents a data row of dividends-relevant data for an investor
 */
export interface InvestorDividendsDataRowVM {
    id: number;
    purchasedTokens: number; // Total amount of purchased tokens in all stos
    period: string; // Such as quarterly or yearly
    dividends: number; // Precise amount of dividends
}
export const getDividendPeriodName = (period: number): string => {
    switch(period) {
        default: return "Unkown"
        case 1: return "Quarterly";
        case 2: return "Yearly";
    }
}
const mapToVM = (investors: Dividendreceivers[], periods: number[]): InvestorDividendsDataRowVM[] => {
    const array: InvestorDividendsDataRowVM[] = [];
    investors.forEach((investor) => {
        array[investor.ID] = {
            id: investor.ID,
            purchasedTokens: investor.shares || 0,
            dividends: investor.amounttopaid || 0,
            period: getDividendPeriodName(periods[investor.ID] || 0)
        }
    });
    return array;
}

const getInvestorsDividendsOverview = async (): Promise<InvestorDividendsDataRowVM[]> => {
    try {
        const svc: IDividendsModule = new DividendsModule();
        const periods = await svc.getInvestorDividendPeriods();
        const rawData = await svc.getInvestorsDividends();
        return mapToVM(rawData, periods);
    } catch(error) {
        logger.error(`Error in dividendsCtl getInvestorsDividendsOverview:\n${error}`);
        return [];
    }
}

export default getInvestorsDividendsOverview;
