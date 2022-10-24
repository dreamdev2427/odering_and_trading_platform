import {
  accreditationRequirementStep,
  doAutomaticPurchase,
  isAccreditationEnabled,
  isInvoicingEnabled,
  isMarketSpace,
  kycRequirementStep,
} from 'core/feature-flags-checkers';
import { InvestorBuyPropertyAlert, InvestorSto, Stos } from 'entities';
import { In, Not } from 'typeorm';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import {
  InvestorKycData,
  SharePurchaseSignatureServiceClass,
} from '../sharePurchaseDocuments/SharePurchaseSignatureService';
import { KycCheckerService } from '../kycHelpers/KycCheckerService';
import { AccreditationCheckerService } from '../kycHelpers/AccreditationCheckerService';
import { automaticPurchaseAfterAllDocumentsSigned } from '../automaticPurchase/automatic-purchase-after-all-documents-signed';
import { createInvoiceFromPurchase } from '../invoice/create';
import Email from '../email';

export const sendPostSignEmails = async (alert: InvestorBuyPropertyAlert): Promise<void> => {
  const sto = await Stos.findOneOrFail({ ID: alert.stoID });
  const email = new Email(sto);
  const shareTypeTitle = (await alert.shareType).title;
  await email.documentsESignedEmail(
    alert.investorID,
    Number(alert.purchasePriceOffered),
    shareTypeTitle,
  );
};

export const postSignUpdates = async (
  alert: InvestorBuyPropertyAlert,
  trueKycData: InvestorKycData | null = null,
): Promise<void> => {
  const isKycOk = await KycCheckerService.meetsKycStepRequirements(
    alert,
    alert.ID,
    alert.investorID,
    trueKycData,
  );
  const isAccreditationOk = await AccreditationCheckerService.meetsAccreditationStepRequirements(
    alert,
    alert.ID,
    alert.investorID,
    trueKycData,
  );
  if (isKycOk && isAccreditationOk) {
    await sendPostSignEmails(alert);
    if (await isInvoicingEnabled()) {
      await createInvoiceFromPurchase(alert, alert.ID, alert.investorID);
    }
    if ((await doAutomaticPurchase()) && (await !isInvoicingEnabled())) {
      await automaticPurchaseAfterAllDocumentsSigned(alert);
    }
  }
};

export const handleAlertPostKycUpdate = async (kycData: InvestorKycData): Promise<void> => {
  const kycMode = await kycRequirementStep();
  const accreditationMode = await accreditationRequirementStep();
  const isEnabled = await isAccreditationEnabled();
  if (
    (kycMode.isPrePayment() && kycData.isKyc) ||
    (isEnabled && accreditationMode.isPrePayment() && kycData.status === 3)
  ) {
    const purchases = await InvestorBuyPropertyAlert.find({
      investorID: kycData.investorID,
      status: In([PURCHASE_STATUS_TYPE.KycRequired, PURCHASE_STATUS_TYPE.AccreditationRequired]),
      isHiddenForInvestor: false,
    });
    for (const p of purchases) {
      const isMS = await isMarketSpace();
      if (isMS && p.entityID !== kycData.entityID) {
        continue;
      }
      await SharePurchaseSignatureServiceClass.doPostSignatureUpdateActions(
        p,
        p.ID,
        kycData.investorID,
        kycData,
      );
    }
  }
};

/** Copies InvestorSto to all projects if it doesn't exist in them */
export const copyInvestorStoToAll = async (investorSto: InvestorSto): Promise<void> => {
  await investorSto.investor;
  const stos = await Stos.find();
  const existingInvestorStos = await InvestorSto.find({
    where: {
      investorID: investorSto.investorID,
      stoID: Not(0),
    },
  });
  const istos: InvestorSto[] = [];
  stos.forEach((sto) => {
    const existing = existingInvestorStos.find((isto) => isto.stoID === sto.ID);
    if (!existing) {
      istos.push(InvestorSto.create({ ...investorSto, stoID: sto.ID }));
    }
  });
  await InvestorSto.save(istos);
};

/** Copies InvestorSto to stoID project if it doesn't exist in it */
export const copyInvestorSto = async (investorSto: InvestorSto, stoID: number): Promise<void> => {
  const existing = await InvestorSto.findOne({
    where: {
      investorID: investorSto.investorID,
      stoID,
    },
  });
  if (existing) {
    await existing.investor;
    const { ID, ...omitID } = investorSto;
    const entityLike = omitID;
    const newISto = InvestorSto.create(entityLike);
    await newISto.save();
  }
};
