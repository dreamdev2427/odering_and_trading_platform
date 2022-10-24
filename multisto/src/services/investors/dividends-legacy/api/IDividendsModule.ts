import { Dividend, Dividendreceivers } from '../../../../Schema';
import DividendsOverviewDto from '../dto/DividendsOverviewDto';

/**
 * Facade interface to the dividends module's services.
 */
export default interface IDividendsModule {
    /**
     * Get divident information for all investors
     */
    getInvestorsDividends(): Promise<Dividendreceivers[]>;
    /**
     * Get dividend payout reports
     */
    getPayoutsReports(): Promise<Dividend[]>;
    /**
     * Get the dividend periods of all investors
     */
    getInvestorDividendPeriods(): Promise<number[]>;
    /**
     * Get overview of all specified investors' dividend-relevant info
     */
    getInvestorDividendsOverviews(ids: number[], stoid: number): Promise<DividendsOverviewDto[]>;
    /**
     * Get specified investor's sum of unpaid dividends in STO (status = 0)
     */
    getInvestorUnpaidDividendsFor(investorId: number, stoId: number): Promise<string>;
    /**
     * Get specified project's sum of unpaid dividends in STO (status = 0)
     */
    getProjectUnpaidDividends(stoId: number): Promise<string>;
    /**
     * Get specified project's sum of dividends in STO
     */
    getProjectAllDividends(stoId: number): Promise<string>;
    /**
     * Get specified investor's sum of all dividends in STO (purchase + affiliate dividend income)
     */
    getInvestorAllDividendsFor(investorId: number, stoId: number): Promise<string>;
    /**
     * Get specified investor's sum of paid affiliate dividends in STO
     */
    getInvestorPaidAffiliateDividendsFor(investorId: number, stoId: number): Promise<string>;
}
