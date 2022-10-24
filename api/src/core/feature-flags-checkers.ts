import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-core';

import { Params } from 'entities';
import {
  ACCREDITATION_REQUIREMENT_STEP_ENUM,
  INTERNAL_SIGNATURE_MODE,
  INTERNAL_WALLET_MODE,
  PARAM,
  SHARE_PURCHASE_MODE,
} from 'core/envs';
import { loadConfig } from 'services/moonpay/moonpay.config';
import { KYC_PROVIDER_TYPE, KYC_REQUIREMENT_STEP } from 'entities/params';
import { Context } from 'core/context';

export const isAccreditationEnabled = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_ACCREDITATION_ENABLED);

  return !!param?.intValue;
};

export const isMarketSpace = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_MARKET_SPACE);

  return !!param?.intValue;
};

export const is2FAEnabledByDefault = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_2FA_ENABLED_BY_DEFAULT);
  return !!param?.intValue;
};

export const isCloudStorageEnabled = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_CLOUD_STORAGE_ENABLED);
  return !!param?.intValue;
};

export const scheduledEmailNotificationTimer = async (): Promise<number> => {
  const param = await Params.getParam(PARAM.SCHEDULED_EMAIL_NOTIFICATION_TIMER);
  return param?.intValue ?? 0;
};

export const is2FAForcedForAll = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_2FA_FORCED_FOR_ALL);
  return !!param?.intValue;
};

export const isHideDocumentsEnabled = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.HIDE_CONTRACTS_TIL_POST_PURCHASE);
  return !!param?.intValue;
};

interface SharePurchaseDocumentsMode {
  isInternal: () => boolean;
  isDocuSign: () => boolean;
  isHelloSign: () => boolean;
}

interface InternalSignatureMode {
  isDraw: () => boolean;
  isCheckmark: () => boolean;
}

interface WalletMode {
  isStoSpecific: () => boolean;
  isGlobal: () => boolean;
  isDisabled: () => boolean;
}

interface KycRequirementMode {
  isOnRegister: () => boolean;
  isOnPurchase: () => boolean;
  isIgnored: () => boolean;
  isPrePayment: () => boolean;
}

interface AccreditationRequirementStep {
  isOnRegister: () => boolean;
  isOnPurchase: () => boolean;
  isIgnored: () => boolean;
  isPrePayment: () => boolean;
}

interface KycProvider {
  isInternal: () => boolean;
  isBlockPass: () => boolean;
  isSumSub: () => boolean;
  isNetki: () => boolean;
}

export const sharePurchaseDocumentsModes = async (): Promise<SharePurchaseDocumentsMode> => {
  const param = await Params.getParam(PARAM.SHARE_PURCHASE_DOCUMENTS_MODE);

  return {
    isInternal: () => param?.stringValue === SHARE_PURCHASE_MODE.INTERNAL,
    isDocuSign: () => param?.stringValue === SHARE_PURCHASE_MODE.DOCUSIGN,
    isHelloSign: () => param?.stringValue === SHARE_PURCHASE_MODE.HELLOSIGN,
  };
};

export const internalSignatureMode = async (): Promise<InternalSignatureMode> => {
  const param = await Params.getParam(PARAM.INTERNAL_SIGNATURE_MODE);

  return {
    isDraw: () => param?.stringValue === INTERNAL_SIGNATURE_MODE.DRAW,
    isCheckmark: () => param?.stringValue === INTERNAL_SIGNATURE_MODE.CHECKMARK,
  };
};

export const internalWalletMode = async (): Promise<WalletMode> => {
  const param = await Params.getParam(PARAM.INTERNAL_WALLET_MODE);

  return {
    isDisabled: () => param?.intValue === INTERNAL_WALLET_MODE.Disabled,
    isGlobal: () => param?.intValue === INTERNAL_WALLET_MODE.Global,
    isStoSpecific: () => param?.intValue === INTERNAL_WALLET_MODE.StoSpecific,
  };
};

export const kycRequirementStep = async (): Promise<KycRequirementMode> => {
  const param = await Params.getParam(PARAM.KYC_REQUIREMENT_STEP);

  return {
    isOnPurchase: () => param?.intValue === KYC_REQUIREMENT_STEP.OnPurchase,
    isOnRegister: () => param?.intValue === KYC_REQUIREMENT_STEP.OnRegister,
    isIgnored: () => param?.intValue === KYC_REQUIREMENT_STEP.Ignore,
    isPrePayment: () => param?.intValue === KYC_REQUIREMENT_STEP.PrePayment,
  };
};

export const accreditationRequirementStep = async (): Promise<AccreditationRequirementStep> => {
  const param = await Params.getParam(PARAM.ACCREDITATION_REQUIREMENT_STEP);

  return {
    isOnPurchase: () => param?.intValue === ACCREDITATION_REQUIREMENT_STEP_ENUM.OnPurchase,
    isOnRegister: () => param?.intValue === ACCREDITATION_REQUIREMENT_STEP_ENUM.OnRegister,
    isIgnored: () => param?.intValue === ACCREDITATION_REQUIREMENT_STEP_ENUM.Ignore,
    isPrePayment: () => param?.intValue === ACCREDITATION_REQUIREMENT_STEP_ENUM.PrePayment,
  };
};

export const accreditationRequiringCountries = [
  'United States',
  'United States of America',
  'USA',
  'US',
];

export const MarketSpaceMiddleware: MiddlewareFn<Context> = async (_, next) => {
  const isMS = await isMarketSpace();

  if (!isMS) {
    throw new ForbiddenError('is-not-market-space-app');
  }

  return next();
};

export const isMoonpayEnabled = async (): Promise<boolean> => {
  const moonpay = await loadConfig();
  return moonpay?.enabled ?? false;
};

export const isMoonpayEnabledCached = (): boolean => {
  try {
    const raw = Params.getParamCached(PARAM.MOONPAY_CONFIG)?.stringValue;
    if (!raw) return false;
    const moonpay = JSON.parse(raw);
    return moonpay.enabled ?? false;
  } catch (e) {
    console.error((e as Error).stack);
    return false;
  }
};

export const isSsoModeEnabled = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.SSO_MODE_ENABLED);
  return !!param?.intValue;
};

export const doAutomaticBlockchainTransactionChecks = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.DO_AUTOMATIC_BLOCKCHAIN_TRANSACTION_CHECKS);

  return !!param?.intValue;
};

export const kycProvider = async (): Promise<KycProvider> => {
  const param = await Params.getParam(PARAM.KYC_PROVIDER);

  return {
    isInternal: () => param?.intValue === KYC_PROVIDER_TYPE.Internal,
    isBlockPass: () => param?.intValue === KYC_PROVIDER_TYPE.BlockPass,
    isSumSub: () => param?.intValue === KYC_PROVIDER_TYPE.SumSub,
    isNetki: () => param?.intValue === KYC_PROVIDER_TYPE.Netki,
  };
};

export const doAutomaticPurchase = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.DO_AUTOMATIC_PURCHASE);
  return !!param?.intValue;
};

export const isInvoicingEnabled = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_INVOICING_ENABLED);
  return !!param?.intValue;
};

export const isSellBackEnabled = async (): Promise<boolean> => {
  const param = await Params.getParam(PARAM.IS_SELL_BACK_ENABLED);
  return !!param?.intValue;
};
