import { Shares, Sharetypes } from '../../../../Schema';

export default interface ISharesService {
    /**
     * Get the sum number of total shares of all share types in a project
     * This is always an integer by definition (you never split an asset into a fraction of total shares)
     * @param stoId id of project
     */
    getTotalShares(stoId: number): Promise<number>;
    /**
     * Get the sum cost of shares of all share types in a project
     * @param stoId id of project
     */
    getTotalCost(stoId: number): Promise<number>;
    /**
     * Get the sum number of shares of all blockchain-only share types in a project
     * @param stoId id of project
     */
    getTotalBlockchainShares(stoId: number): Promise<number>;
    /**
     * Get the sum cost of shares of all blockchain-only share types in a project
     * @param stoId id of project
     */
    getTotalBlockchainCost(stoId: number): Promise<number>;
    /**
     * Calculate with decimal precision the cost of N shares
     * @param shareTypeId type of shares
     * @param nShares how many shares
     */
    getPreciseCost(shareTypeId: number, nShares: string): Promise<string>;
    /**
     * Calculate with decimal precision the cost of N shares at its discount price
     * @param shareTypeId type of shares
     * @param nShares how many shares
     */
    getPreciseDiscountCost(shareTypeId: number, nShares: string): Promise<string>;
    /**
     * Gets the number of shares of all types held by an investor in an sto
     * @param investorId
     * @param stoId
     */
    getTotalInvestorSharesInSto(investorId: number, stoId: number): Promise<number>;
    /**
     * Gets how many shares of a certain type the investor holds in the sto
     * @param investorId
     * @param stoId
     * @param shareTypeId
     */
    getInvestorSharesInSto(investorId: number, stoId: number, shareTypeId: number): Promise<number>;
    /**
     * Gets the default (first) shareId in an STO or undefined if none are found
     * @param stoId
     */
    getDefaultShareTypeId(stoId: number): Promise<number | undefined>;
    /**
     * Increase sharess of an investor
     * @param investorId
     * @param stoId
     * @param shareTypeId
     * @param shares
     */
    grantShares(investorId: number, stoId: number, shareTypeId: number, shares: number): Promise<void>;
    /**
     * Get details of owned shares, where an investment is above a certain amount.
     * @param stoId
     * @param investorId
     * @param tokens
     */
    getInvestmentsAbove(investorId: number, tokens: string): Promise<Shares[]>;
    /**
     * Get share types by id
     * @param shareTypeId
     */
    getShareTypesById(shareTypeId: number): Promise<Sharetypes>;
    /**
     * Get share types that exist for sto
     * @param stoId
     */
    getShareTypesForSto(stoId: number): Promise<Sharetypes[]>;
    /**
     * Gets global amount invested for investor
     * @param investorId
     */
    getTotalInvestorInvestment(investorId: number): Promise<string>;
    /**
     * Gets global share value for investor
     * @param investorId
     */
    getTotalInvestorShareValue(investorId: number): Promise<number>
}
