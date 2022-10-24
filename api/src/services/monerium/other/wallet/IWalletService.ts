/**
 * Data service for managing investor internal wallet
 */
export default interface IWalletService {
  reduceInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number,
  ): Promise<number>;

  increaseInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    channelID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number,
  ): Promise<number>;

  getInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    walletProjectSpecific: number,
  ): Promise<number>;
}
