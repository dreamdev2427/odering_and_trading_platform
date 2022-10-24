export default interface IInvestmentsService {
    /**
     * Checks if investor has a sum of investments above an amount
     * @param investorId
     * @param amount string due to decimal precision
     */
    getIsEligible(investorId: number, amount: string): Promise<Boolean>;
    /**
     * Returns how much currency an investor has invested in an sto (as string)
     * @param investorId
     * @param stoId
     */
    getInvestedIn(investorId: number, stoId: number): Promise<string>;
    /**
     * Returns total amount of currency invested in all stos
     * @param investorId
     */
    getTotalInvestment(investorId: number): Promise<string>;
}
