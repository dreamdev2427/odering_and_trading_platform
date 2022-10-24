/**
 * Data service directly repsonsible for transfering shares
 */
export default interface IShareTransferService {
  /**
   * Transfers shares from company account to investor
   * @param investorId
   * @param stoId
   * @param shareTypeId
   * @param tokensToTransfer
   * @param adminID
   * @param sellback
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
