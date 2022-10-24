import { Dividend } from '../../../../Schema';
import DividendsDto from '../dto/DividendsDto';

export default interface IDividendsService {
    /**
     * Get divident information for all investors
     */
    getInvestorsDividends(): Promise<Dividend[]>;
    /**
     * Get all divident payout reports
     */
    getDividendPayouts(): Promise<Dividend[]>;
    /**
     * Get total investor dividends for STO
     * @param investorId
     * @param stoId
     * @param status optional: Where status = ?
     */
    getInvestorDividendsFor(investorId: number, stoId: number, status?: number[]): Promise<DividendsDto>;
    /**
     * Get total investor affiliate dividends for STO
     * @param investorId
     * @param stoId
     * @param status optional: Where status = ?
     */
    getInvestorTotalAffiliateDividendsFor(investorId: number, stoId: number, status?: number[]): Promise<DividendsDto>;
    /**
     * Get a sum of total rental incomes (dividends) for a project
     * @param stoId
     * @param status optional: Where status = ?
     */
    getProjectDividends(stoId: number, status?: number[]): Promise<string>;
}
