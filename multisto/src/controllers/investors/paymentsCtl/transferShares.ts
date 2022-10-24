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
  sellback: boolean
): Promise<void> => {
  try {
    const paymentsSvc: IPaymentsModule = new PaymentsModule();
    return await paymentsSvc.transferShares(
      investorId,
      stoId,
      shareTypeId,
      tokensToTransfer,
      adminID,
      sellback
    );
  } catch (error) {
    logger.error(
      `Error in paymentsCtl transfereShares: Could not transfer ${tokensToTransfer} shares of type:${shareTypeId} for investor:${investorId} in sto:${stoId}:\n${error}`
    );
    throw new Error((error as Error).message);
  }
};
