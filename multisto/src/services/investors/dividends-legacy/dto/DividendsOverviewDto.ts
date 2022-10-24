import { DividendsPeriod } from './DividendsPeriod';

export default interface DividendsOverviewDto {
    id: number;
    name: string;
    dividends: string;
    dividendPeriod: DividendsPeriod;
    purchasedTokens: string;
}
