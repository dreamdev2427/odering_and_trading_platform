import IShareTransferService from "../data/IShareTransferService";
import ShareTransferSqlService from "../data/ShareTransferSqlService";
import IPaymentsModule from "./IPaymentsModule";

export default class PaymentsModule implements IPaymentsModule {
  shareTransferSvc: IShareTransferService;

  constructor() {
    this.shareTransferSvc = new ShareTransferSqlService();
  }

  async transferShares(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    sellback: boolean
  ): Promise<void> {
    return this.shareTransferSvc.transferShares(
      investorId,
      stoId,
      shareTypeId,
      tokensToTransfer,
      adminID,
      sellback
    );
  }

  async transferSharesToInvestorWallets(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    amountToReduce: number,
    walletProjectSpecific: number
  ): Promise<void> {
    await this.shareTransferSvc
      .transferSharesToInvestorWallets(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer,
        adminID,
        amountToReduce,
        walletProjectSpecific
      )
      .then(
        () => {},
        (err) => {
          throw new Error(
            `PaymentsModule - investor do not have enough funds to buy shares. ${err.message}`
          );
        }
      );
  }
}
