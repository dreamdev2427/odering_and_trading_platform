import logger from "../../../logger";
import IPaymentsModule from "../../../services/investors/payments/api/IPaymentsModule";
import PaymentsModule from "../../../services/investors/payments/api/PaymentsModule";

/**
 * To be used by other controllers.
 * Transfers shares from company account to investor
 */
export default async (
  investorId: number,
  stoId: number,
  shareTypeId: number,
  tokensToTransfer: number,
  adminID: number,
  amountToReduce: number,
  walletProjectSpecific: number
): Promise<void> => {
  try {
    const paymentsSvc: IPaymentsModule = new PaymentsModule();
    return await paymentsSvc.transferSharesToInvestorWallets(
      investorId,
      stoId,
      shareTypeId,
      tokensToTransfer,
      adminID,
      amountToReduce,
      walletProjectSpecific
    );
  } catch (error) {
    logger.error(
      `Error in paymentsCtl transfereShares: Could not transfer  shares of type: for investor: in sto:\n${error}`
    );
    throw new Error((error as Error).message);
  }
};
