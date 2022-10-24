import { Affiliateincomes } from '../../../../Schema';
import AffiliateEarningsDto from '../dto/AffiliateEarningsDto';
import NamedAffiliateIncome from '../dto/NamedAffiliateIncome';

export default interface IAffiliateIncomesService {
    /**
     * Records the incomes as a log. Does not actually distribute them to investors.
     * @param incomes
     */
    logIncomes(incomes: Affiliateincomes[]): Promise<void[]>;
    /**
     * Records the income as a log. Does not actually distribute them to investors.
     * @param income
     */
    logIncome(income: Affiliateincomes): Promise<void>;
    /**
     * Get all UNAWARDED affiliate incomes that have been logged.
     */
    getIncomes(): Promise<Affiliateincomes[]>;
    /**
     * Get affiliate incomes by their IDs.
     */
    getIncomesById(ids: number[]): Promise<Affiliateincomes[]>;
    /**
     * Gets total earnings for investor in sto
     * @param investorId
     */
    getProjectTotalEarnings(investorId: number, stoId: number): Promise<AffiliateEarningsDto>;
    /**
     * Gets total token earnings for investor in sto
     * @param investorId
     */
    getProjectTotalTokenEarnings(investorId: number, stoId: number, awarded?: number): Promise<string>;
    /**
     * Gets total fiat earnings for investor in sto
     * @param investorId
     */
    getProjectTotalFiatEarnings(investorId: number, stoId: number, newOrPending?: boolean): Promise<string>;
    /**
     * Get which sto ids have an affiliate income logged for an investor
     * @param investorId
     */
    getStoIdsFor(investorId: number): Promise<number[]>;
    /**
     * Record that this income is awarded
     * @param income
     */
    markAsAwarded(income: Affiliateincomes): Promise<void>;
    /**
     * Fetch only unpaid incomes
     */
    getUnpaidIncomes(stoId?: number): Promise<Affiliateincomes[]>;
    /**
     * Fetch only unpaid incomes
     */
    getAllInvestorIncomes(investorId: number, stoId?: number): Promise<NamedAffiliateIncome[]>;
}
