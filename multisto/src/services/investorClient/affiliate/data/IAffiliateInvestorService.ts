import { Investor } from '../../../../Schema';
import AffiliateOverviewDto from '../dto/AffiliateOverviewDto';
import InvestorTreeNodeDto from '../dto/InvestorTreeNodeDto';
import InvestorReferralOverviewDto from '../dto/InvestorReferralOverviewDto';
import AffiliateInvestmentVolumeDto from '../dto/AffiliateInvestmentVolumeDto';

export default interface IAffiliateInvestorService {
    /**
     * Gets the direct affiliate relatives of an investor
     * @param investorId
     */
    getAffiliateDirects(investorId: number, stoId?: number): Promise<Partial<Investor>[]>;
    /**
     * Retruns network of related affiliate investors up to specified depth.
     * Strucutred as depth amount of levels
     * @param investorId
     * @param depth 0 = self, 1 = direct, 2 = indirect, 3 = level 3, etc.
     */
    getAffiliateNetworkTree(investorId: number, depth: number, stoId?: number): Promise<InvestorTreeNodeDto[][]>;
    /**
     * Strucutre affiliate tree as a nested object, including current investor
     * @param investorId
     */
    getListAsNestedStructure(investorId: number, stoId: number, tree: InvestorTreeNodeDto[]): Promise<InvestorTreeNodeDto>;
    /**
     * Retruns network of related affiliate investors up to specified depth
     * @param investorId
     * @param depth 0 = self, 1 = direct, 2 = indirect, 3 = level 3, etc.
     */
    getAffiliateNetworkAsList(investorId: number, depth: number, stoId?: number): Promise<InvestorTreeNodeDto[]>;
    /**
     * Get the full name of a referrer
     * @param investorId 
     */
    getReferrerName(investorId: number): Promise<string | null>;
    /**
     * Get an overview for all investors' affiliate data
     */
    getAffiliateOverviews(stoId: number): Promise<AffiliateOverviewDto[]>;
    /**
     * Get an overview of all investors and denote which ones have invested anything
     */
    getInvestorsReferralOverview(): Promise<InvestorReferralOverviewDto[]>;
    /**
     * Get the full name of a referrer
     * @param investorId 
     */
    getKycCurrentStatus(investorId: number): Promise<number | null>;
    /**
     * Count how many investors have invested anything > 0 in a given STO
     * @param stoid
     */
    getActiveInvestorsCount(stoid: number): Promise<number>;
    /**
     * Count how many investors in the provided network meet the minimum
     * investment criteria to be counted as truly "active" and eligible.
     * @param investorId 
     * @param stoId 
     */
    getActiveInvestorsInNetworkCount(network: InvestorTreeNodeDto[], stoId: number): Promise<number>;
    /**
     * Fetch an investor who has this specified email, or else return null
     * @param email
     */
    getInvestorByEmail(email: string): Promise<Investor>;
    /**
     * Find a referrer by email and if successfull, set him as a referrer to the specified investor
     * @param investorId - The one whose referrer is being changed
     * @param referrerEmail - The email of the referrer
     * @returns false if either investorId or referrerEmail is invalid and no change occured
     */
    setAffiliateReferrerByEmail(investorId: number, referrerEmail: string): Promise<boolean>;
    /**
     * Find a referrer by ID and if successfull, set him as a referrer to the specified investor
     * @param investorId - The one whose referrer is being changed
     * @param referrerEmail - The email of the referrer
     * @returns false if either investorId or referrerEmail is invalid and no change occured
     */
    setAffiliateReferrerById(investorId: number, referrerId: number): Promise<boolean>;
    /**
     * Get number of investors that are referred by this ID
     * @param investorId
     */
    getInvestorDirectsCount(investorId: number): Promise<number>;
    /**
     * Get an investor's affiliate directs (lines)
     */
    getInvestorDirects(investorId: number): Promise<Investor[]>;
    /**
     * Get the IDs of an investor's affiliate directs (lines)
     */
    getInvestorDirectIds(investorId: number): Promise<number[]>;
    /**
     * Gets the investment volume of an entire network of investors.
     * Also used to calculate a direct line's volume by providing the line ID
     */
    getInvestorNetworkVolume(
        investorId: number,
        options?: {
            stoId?: number;
            dateFrom?: Date;
            dateTo?: Date;
        },
        network?: InvestorTreeNodeDto[],
    ): Promise<{ amount: string, tokens: string }>;
    getInvestorNetworkVolumeAsDto(investor: Investor, options?: {
            stoId?: number;
            dateFrom?: Date;
            dateTo?: Date;
        },
        network?: InvestorTreeNodeDto[],
    ): Promise<AffiliateInvestmentVolumeDto>;
    /**
     * Gets all the investment volumes of an investor
     */
    getAllInvestorNetworkVolumes(investorId: number, networkList?: InvestorTreeNodeDto[], options?: {
            stoId?: number;
            dateFrom?: Date;
            dateTo?: Date;
    }): Promise<AffiliateInvestmentVolumeDto[]>;
}
