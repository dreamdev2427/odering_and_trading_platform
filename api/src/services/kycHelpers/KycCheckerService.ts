import {
  InvestorBuyPropertyAlert as BuyAlert,
  InvestorBuyPropertyAlert,
  InvestorSto,
} from 'entities';
import { kycRequirementStep } from 'core/feature-flags-checkers';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { InvestorKycData } from '../sharePurchaseDocuments/SharePurchaseSignatureService';

export class KycCheckerService {
  static async meetsKycStepRequirements(
    purchase: InvestorBuyPropertyAlert,
    purchaseID: number,
    investorID: number,
    trueKycData: InvestorKycData | null = null,
  ): Promise<boolean> {
    const kycMode = await kycRequirementStep();

    if (!kycMode.isPrePayment()) {
      return true;
    }

    const kyc =
      trueKycData?.isKyc || !!(await InvestorSto.findOneOrFail({ stoID: 0, investorID })).isKYC;

    if (kyc) {
      await BuyAlert.update(purchase.ID, { status: PURCHASE_STATUS_TYPE.Pending });
      return true;
    } else {
      await BuyAlert.update(purchase.ID, { status: PURCHASE_STATUS_TYPE.KycRequired });
      return false;
    }
  }
}
