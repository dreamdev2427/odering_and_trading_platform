import DividendsOverviewDto from '../dto/DividendsOverviewDto';

export default interface IDividendInvestorService {
    /**
     * Get the dividend periods for all investors.
     */
    getInvestorDividendPeriods(): Promise<{ID: number, dividendPeriod: number}[]>;
    /**
     * Get the dividend periods for all investors as dictionary array where [ID] => period.
     */
    getInvestorDividendPeriodsArray(): Promise<number[]>;
    /**
     * Get divident information for multiple investor IDs
     */
    getInvestorsDividendsOverview(ids: number[], stoId: number): Promise<DividendsOverviewDto[]>;
}
