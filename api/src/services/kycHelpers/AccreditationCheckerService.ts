import {
  InvestingEntity,
  Investor,
  InvestorBuyPropertyAlert as BuyAlert,
  InvestorBuyPropertyAlert,
  InvestorSto,
} from 'entities';
import {
  accreditationRequirementStep,
  accreditationRequiringCountries,
  isAccreditationEnabled,
  isMarketSpace,
} from 'core/feature-flags-checkers';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { InvestorKycData } from '../sharePurchaseDocuments/SharePurchaseSignatureService';

export class AccreditationCheckerService {
  private static async getInvestingCountry(investorID: number, entityID = 0): Promise<string> {
    const isMS = await isMarketSpace();
    // TODO: replace with dedicated param switch once DIG-541 (breakup isMS) gets merged
    if (isMS) {
      const investingEntity = await InvestingEntity.findOneOrFail({ ID: entityID });
      return investingEntity.country;
    }
    const investor = await Investor.findOneOrFail({ ID: investorID });
    return investor.taxCountry || investor.country;
  }

  private static async getInvestingStatus(investorID: number, entityID = 0): Promise<number> {
    const isMS = await isMarketSpace();
    // TODO: replace with dedicated param switch once DIG-541 (breakup isMS) gets merged
    if (isMS) {
      const investingEntity = await InvestingEntity.findOneOrFail({ ID: entityID });
      return investingEntity.accredited ? 3 : 7;
    }
    const investorSto = await InvestorSto.findOneOrFail({ investorID: investorID, stoID: 0 });
    return investorSto.status;
  }

  static async meetsAccreditationStepRequirements(
    purchase: InvestorBuyPropertyAlert,
    purchaseID: number,
    investorID: number,
    trueKycData: InvestorKycData | null = null,
  ): Promise<boolean> {
    const isEnabled = await isAccreditationEnabled();
    if (!isEnabled) {
      return true;
    }

    const accreditationStep = await accreditationRequirementStep();
    if (!accreditationStep.isPrePayment()) {
      return true;
    }

    const investorStatus =
      trueKycData?.status || (await this.getInvestingStatus(investorID, purchase.entityID));
    const taxCountry =
      trueKycData?.country || (await this.getInvestingCountry(investorID, purchase.entityID));
    const countryCheck = accreditationRequiringCountries.includes(taxCountry);
    if (countryCheck && investorStatus !== 3) {
      await BuyAlert.update(purchase.ID, { status: PURCHASE_STATUS_TYPE.AccreditationRequired });
      return false;
    } else {
      await BuyAlert.update(purchase.ID, { status: PURCHASE_STATUS_TYPE.Pending });
      return true;
    }
  }
}
