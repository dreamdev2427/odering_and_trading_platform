/**
 * Handles processing of payments in a project
 */
export default interface IPaymentsModule {
  /**
   * Transfer shares from a company
   * @param investorId
   * @param stoId
   * @param shareTypeId
   * @param tokensToTransfer
   * @param adminID
   */
  transferShares(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    sellback: boolean
  ): Promise<void>;

  transferSharesToInvestorWallets(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    amountToReduce: number,
    walletProjectSpecific: number
  ): Promise<void>;
}
