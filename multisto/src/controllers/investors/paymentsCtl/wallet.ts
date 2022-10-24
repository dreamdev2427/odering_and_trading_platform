import IWalletService from "../../../services/investors/payments/wallet/IWalletService";
import WalletService from "../../../services/investors/payments/wallet/WalletService";

module.exports = {
  async getInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    walletProjectSpecific: number
  ) {
    const wallet: IWalletService = new WalletService();
    return wallet.getInvestorBalance(
      investorId,
      stoId,
      currencyID,
      walletProjectSpecific
    );
  },

  async increaseInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    channelID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number
  ) {
    const wallet: IWalletService = new WalletService();
    await wallet.increaseInvestorBalance(
      investorId,
      stoId,
      currencyID,
      amount,
      adminID,
      approvalStatusID,
      channelID,
      details,
      CreateInvestorDepositReceivedAlert,
      walletProjectSpecific
    );
    // await bimountDepositNotification(depositID);
  },

  async reduceInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number
  ) {
    const wallet: IWalletService = new WalletService();
    await wallet.reduceInvestorBalance(
      investorId,
      stoId,
      currencyID,
      amount,
      adminID,
      approvalStatusID,
      details,
      CreateInvestorDepositReceivedAlert,
      walletProjectSpecific
    );
    // await bimountDepositNotification(depositID);
  },

  async getInvestorSTOBalances(
    investorId: number,
    stoId: number,
    walletProjectSpecific: number
  ) {
    const wallet: IWalletService = new WalletService();
    return wallet.getInvestorSTOBalances(
      investorId,
      stoId,
      walletProjectSpecific
    );
  },
};
