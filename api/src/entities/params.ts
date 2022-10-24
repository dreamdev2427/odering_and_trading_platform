import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from 'type-graphql';

import {
  ACCREDITATION_PROVIDER_ENUM,
  PARAM,
  PLATFORM_CONFIGURATION,
  ACCREDITATION_REQUIREMENT_STEP_ENUM,
  SHARE_PURCHASE_MODE,
} from 'core/envs';

import {
  accreditationRequiringCountries,
  internalSignatureMode,
  internalWalletMode,
  isMoonpayEnabledCached,
  sharePurchaseDocumentsModes,
} from 'core/feature-flags-checkers';
import { TermsAndConditionsConfig } from '../api/custom-params.types';

export enum KYC_PROVIDER_TYPE {
  Internal,
  BlockPass,
  SumSub,
  Netki,
}

export enum KYC_REQUIREMENT_STEP {
  OnRegister,
  OnPurchase,
  Ignore,
  PrePayment,
}

registerEnumType(KYC_PROVIDER_TYPE, {
  name: 'KycProviders',
  description: 'Kyc providers supported by the platform',
});
registerEnumType(KYC_REQUIREMENT_STEP, {
  name: 'KycRequirementStep',
  description: 'Denotes the step at which the platform should require the investor to pass KYC',
});
registerEnumType(ACCREDITATION_PROVIDER_ENUM, {
  name: 'AccreditationProviderEnum',
  description: 'Denotes the providers supported by the platform',
});
registerEnumType(PLATFORM_CONFIGURATION, {
  name: 'PLATFORM_CONFIGURATIONEnum',
  description: 'Denotes the modes in which the platform can work',
});
registerEnumType(ACCREDITATION_REQUIREMENT_STEP_ENUM, {
  name: 'AccreditationRequirementEnum',
  description:
    'Denotes the step at which the platform should require the investor to pass Accreditation checks',
});
registerEnumType(SHARE_PURCHASE_MODE, {
  name: 'SharePurchaseModeEnum',
  description: 'Denotes the provider of documents for share purchases',
});

@ObjectType()
export class AppParameters {
  @Field(() => Boolean)
  [PARAM.IS_MARKET_SPACE]: boolean;

  @Field(() => String)
  [PARAM.INVESTOR_DASHBOARD_THEME]: string;

  @Field(() => Boolean)
  IsDocuSignActive: boolean;

  @Field(() => Boolean)
  IsHelloSignActive: boolean;

  @Field(() => Boolean)
  [PARAM.DO_AUTOMATIC_PURCHASE]: boolean;

  @Field(() => Boolean)
  isSSOModeEnabled: boolean;

  @Field(() => Boolean)
  [PARAM.DO_AUTOMATIC_SELLBACK]: boolean;

  @Field(() => Boolean)
  [PARAM.ARE_HOST_NAMES_ENABLED]: boolean;

  @Field(() => KYC_PROVIDER_TYPE)
  KycProvider: KYC_PROVIDER_TYPE;

  @Field(() => Boolean)
  IsDarwSignatureActive: boolean;

  @Field(() => Boolean)
  IsCheckMarkSignatureActive: boolean;

  @Field(() => [String])
  [PARAM.DRAW_SIGNATURE_PREFILL_FONTS]: string[];

  @Field(() => String)
  [PARAM.WEB3_ADDRESS]: string;

  @Field(() => String)
  [PARAM.BINANCE_WEB3_ADDRESS]: string;

  @Field(() => String)
  [PARAM.POLYGON_WEB3_ADDRESS]: string;

  @Field(() => Boolean)
  IsInternalWalletStoSpecific: boolean;

  @Field(() => Boolean)
  IsInternalWalletGlobal: boolean;

  @Field(() => Boolean)
  IsInternalWalletDisabled: boolean;

  @Field(() => String)
  [PARAM.LEFT_SIDE_MENU_FONT]: string;

  @Field(() => String)
  [PARAM.POWERED_BY_LABEL]: string;

  @Field(() => String)
  [PARAM.CLIENT_KYC]: string;

  @Field(() => String)
  [PARAM.SSO_REDIRECT_URL]: string;

  @Field(() => Boolean)
  IsMoonpayEnabled: boolean;

  @Field(() => KYC_REQUIREMENT_STEP)
  KycRequirementStep: KYC_REQUIREMENT_STEP;

  @Field(() => Boolean)
  [PARAM.IS_2FA_ENABLED_BY_DEFAULT]: boolean;

  @Field(() => Boolean)
  [PARAM.DO_AUTOMATIC_BLOCKCHAIN_TRANSACTION_CHECKS]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_INVOICING_ENABLED]: boolean;

  @Field(() => String)
  [PARAM.ATOMIC_SWAP_CONTRACT_ADDRESS]: string;

  @Field(() => Boolean)
  isAccreditationEnabled: boolean;

  @Field(() => ACCREDITATION_PROVIDER_ENUM)
  [PARAM.ACCREDITATION_PROVIDER]: ACCREDITATION_PROVIDER_ENUM;

  @Field(() => String)
  [PARAM.ACCREDD_LINK]: string;

  @Field(() => Boolean)
  [PARAM.IS_CLOUD_STORAGE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_2FA_FORCED_FOR_ALL]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_PROPERTY_SORTING_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_WALLET_MANAGEMENT_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_MY_PORTFOLIO_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_ACTIVE_OFFERINGS_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_NEWS_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_CONTRACT_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_CORPORATE_ACTIONS_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_TRADING_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_CHAT_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_SUPPORT_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_INVESTOR_OWNERSHIP_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_SETTINGS_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_REFERRAL_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_ACCREDITATION_MODULE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_CONTACT_THE_SPONSOR_FONT_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_SELL_BACK_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_BANK_DETAILS_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.TOGGLE_THEME_EDITOR]: boolean;

  @Field(() => ACCREDITATION_REQUIREMENT_STEP_ENUM)
  [PARAM.ACCREDITATION_REQUIREMENT_STEP]: ACCREDITATION_REQUIREMENT_STEP_ENUM;

  @Field(() => [String])
  accreditationRequiringCountries: string[];

  @Field(() => Int)
  [PARAM.SCHEDULED_EMAIL_NOTIFICATION_TIMER]: number;

  @Field(() => SHARE_PURCHASE_MODE)
  [PARAM.SHARE_PURCHASE_DOCUMENTS_MODE]: SHARE_PURCHASE_MODE;

  @Field(() => Boolean)
  [PARAM.SKIP_DOCUMENT_SIGN_SCREEN]: boolean;

  @Field(() => Boolean)
  [PARAM.ALLOW_INVESTORS_TO_REGISTER]: boolean;

  @Field(() => Boolean)
  [PARAM.HIDE_CONTRACTS_TIL_POST_PURCHASE]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_INVESTMENT_RETURN_CALCULATION_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_INTERNAL_TOKENIZED_PURCHASE_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_DRIVERS_LICENSE_ENABLED]: boolean;

  @Field(() => TermsAndConditionsConfig)
  [PARAM.TERMS_AND_CONDITIONS_CONFIG]: TermsAndConditionsConfig;

  @Field(() => Boolean)
  [PARAM.IS_ALL_DOCS_SIGNED_POP_UP_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_MERGING_PAYMENTS_SHARES_REQUESTS_ENABLED]: boolean;

  @Field(() => Boolean)
  [PARAM.IS_SHARE_TRANSFER_EMAIL_ENABLED]: boolean;
}

@Entity()
class Params extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  param: PARAM;

  @Column({
    type: 'tinyint',
    width: 4,
    name: 'isglobal',
    nullable: true,
  })
  isGlobal: number;

  @Column({
    type: 'tinyint',
    width: 4,
    name: 'datatype',
    nullable: true,
  })
  dataType: number;

  @Column({
    type: 'varchar',
    length: 10000,
    nullable: true,
  })
  stringValue: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  intValue: number;

  static cache: Params[];

  static async reloadCache(): Promise<void> {
    this.cache = await this.find();
  }

  static getParamCached(param: PARAM): Params | undefined {
    return this.cache.find((p) => p.param === param);
  }

  static getParam(param: PARAM): Promise<Params | undefined> {
    return this.findOne({ param });
  }

  static getParamOrFail(param: PARAM): Promise<Params> {
    return this.findOneOrFail({ param });
  }

  static async setTheme(theme: string): Promise<boolean> {
    const param = await this.getParam(PARAM.INVESTOR_DASHBOARD_THEME);
    if (!param) {
      return false;
    }
    param.stringValue = theme;
    await param.save();

    return true;
  }

  static async getAppParams(): Promise<AppParameters> {
    await this.reloadCache();
    const theme = this.getParamCached(PARAM.INVESTOR_DASHBOARD_THEME);
    const isMarketSpace = this.getParamCached(PARAM.IS_MARKET_SPACE);
    const spdsMode = await sharePurchaseDocumentsModes();
    const doAutomaticPurchase = this.getParamCached(PARAM.DO_AUTOMATIC_PURCHASE);
    const doAutomaticSellBack = this.getParamCached(PARAM.DO_AUTOMATIC_SELLBACK);
    const areSTOHostnamesEnabled = this.getParamCached(PARAM.ARE_HOST_NAMES_ENABLED);
    const kycProviderRaw = this.getParamCached(PARAM.KYC_PROVIDER);
    const kycProviderEnum: KYC_PROVIDER_TYPE = kycProviderRaw?.intValue ?? 0;
    const signatureMode = await internalSignatureMode();
    const signaturePrefill = this.getParamCached(PARAM.DRAW_SIGNATURE_PREFILL_FONTS);
    const web3Address = this.getParamCached(PARAM.WEB3_ADDRESS);
    const binanceWeb3Address = this.getParamCached(PARAM.BINANCE_WEB3_ADDRESS);
    const polygonWeb3Address = this.getParamCached(PARAM.POLYGON_WEB3_ADDRESS);
    const ssoModeEnabled = this.getParamCached(PARAM.SSO_MODE_ENABLED);
    const walletMode = await internalWalletMode();
    const leftSideMenuPanelFont = this.getParamCached(PARAM.LEFT_SIDE_MENU_FONT);
    const poweredByLabel = this.getParamCached(PARAM.POWERED_BY_LABEL);
    const clientKYC = this.getParamCached(PARAM.CLIENT_KYC);
    const ssoRedirectUrl = this.getParamCached(PARAM.SSO_REDIRECT_URL);
    const moonpayEnabled = isMoonpayEnabledCached();
    const kycRequirementRaw = await this.getParamCached(PARAM.KYC_REQUIREMENT_STEP);
    const kycRequirementEnum: KYC_REQUIREMENT_STEP = kycRequirementRaw?.intValue ?? 0;
    const is2FAEnabledByDefault = this.getParamCached(PARAM.IS_2FA_ENABLED_BY_DEFAULT);
    const doAutomaticBlockchainTransactionChecks = this.getParamCached(
      PARAM.DO_AUTOMATIC_BLOCKCHAIN_TRANSACTION_CHECKS,
    );
    const isInvoicingEnabled = this.getParamCached(PARAM.IS_INVOICING_ENABLED);
    const atomicSwapContractAddress = this.getParamCached(PARAM.ATOMIC_SWAP_CONTRACT_ADDRESS);
    const accreditationEnabled = this.getParamCached(PARAM.IS_ACCREDITATION_ENABLED);
    const accreditationProviderRaw = this.getParamCached(PARAM.ACCREDITATION_PROVIDER);
    const accreditationProviderEnum: ACCREDITATION_PROVIDER_ENUM =
      accreditationProviderRaw?.intValue ?? 0;
    const accreddLink = this.getParamCached(PARAM.ACCREDD_LINK);
    const isCloudStorageEnabled = this.getParamCached(PARAM.IS_CLOUD_STORAGE_ENABLED);
    const is2FAForcedForAll = this.getParamCached(PARAM.IS_2FA_FORCED_FOR_ALL);
    const isPropertySortingEnabled = this.getParamCached(PARAM.IS_PROPERTY_SORTING_ENABLED);
    const isWalletManagementModuleEnabled = this.getParamCached(
      PARAM.IS_WALLET_MANAGEMENT_MODULE_ENABLED,
    );
    const isMyPortfolioModuleEnabled = this.getParamCached(PARAM.IS_MY_PORTFOLIO_MODULE_ENABLED);
    const isActiveOfferingsModuleEnabled = this.getParamCached(
      PARAM.IS_ACTIVE_OFFERINGS_MODULE_ENABLED,
    );
    const isNewsModuleEnabled = this.getParamCached(PARAM.IS_NEWS_MODULE_ENABLED);
    const isContractsModuleEnabled = this.getParamCached(PARAM.IS_CONTRACT_MODULE_ENABLED);
    const isCorporateActionsModuleEnabled = this.getParamCached(
      PARAM.IS_CORPORATE_ACTIONS_MODULE_ENABLED,
    );
    const isTradingModuleEnabled = this.getParamCached(PARAM.IS_TRADING_MODULE_ENABLED);
    const isChatModuleEnabled = this.getParamCached(PARAM.IS_CHAT_MODULE_ENABLED);
    const isSupportModuleEnabled = this.getParamCached(PARAM.IS_SUPPORT_MODULE_ENABLED);
    const isInvestorOwnershipModuleEnabled = this.getParamCached(
      PARAM.IS_INVESTOR_OWNERSHIP_MODULE_ENABLED,
    );
    const isSettingsModuleEnabled = this.getParamCached(PARAM.IS_SETTINGS_MODULE_ENABLED);
    const isTellAFriendModuleEnabled = this.getParamCached(PARAM.IS_REFERRAL_MODULE_ENABLED);
    const isAccreditationModuleEnabled = this.getParamCached(PARAM.IS_ACCREDITATION_MODULE_ENABLED);
    const isContactTheSponsorFontSwitchEnabled = this.getParamCached(
      PARAM.IS_CONTACT_THE_SPONSOR_FONT_ENABLED,
    );
    const isSellBackEnabled = this.getParamCached(PARAM.IS_SELL_BACK_ENABLED);
    const isBankDetailsSwitchEnabled = this.getParamCached(PARAM.IS_BANK_DETAILS_ENABLED);
    const isBlockchainAddressSwitchEnabled = this.getParamCached(
      PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED,
    );
    const toggleThemeEditor = this.getParamCached(PARAM.TOGGLE_THEME_EDITOR);
    const accreditationRequirementStep = this.getParamCached(PARAM.ACCREDITATION_REQUIREMENT_STEP);
    const accreditationRequirementStepEnum: ACCREDITATION_REQUIREMENT_STEP_ENUM =
      accreditationRequirementStep?.intValue ?? 0;
    const scheduledEmailNotificationTimer = this.getParamCached(
      PARAM.SCHEDULED_EMAIL_NOTIFICATION_TIMER,
    );
    const sharePurchaseMode = this.getParamCached(PARAM.SHARE_PURCHASE_DOCUMENTS_MODE);
    const sharePurchaseModeEnum: SHARE_PURCHASE_MODE = (<any>SHARE_PURCHASE_MODE)[
      sharePurchaseMode?.stringValue ?? ''
    ];
    const skipDocumentSignScreen = this.getParamCached(PARAM.SKIP_DOCUMENT_SIGN_SCREEN);
    const allowInvestorsToRegister = this.getParamCached(PARAM.ALLOW_INVESTORS_TO_REGISTER);
    const hideContractsTilPostPurchase = this.getParamCached(
      PARAM.HIDE_CONTRACTS_TIL_POST_PURCHASE,
    );
    const isInvestmentReturnCalculationEnabled = this.getParamCached(
      PARAM.IS_INVESTMENT_RETURN_CALCULATION_ENABLED,
    );
    const isInternalTokenizedPurchaseEnabled = this.getParamCached(
      PARAM.IS_INTERNAL_TOKENIZED_PURCHASE_ENABLED,
    );
    const isDriversLicenseEnabled = this.getParamCached(PARAM.IS_DRIVERS_LICENSE_ENABLED);
    const termsAndConditionsConfig = await this.getParamCached(PARAM.TERMS_AND_CONDITIONS_CONFIG);
    const isAllDocumentsSignedPopUpEnabled = this.getParamCached(
      PARAM.IS_ALL_DOCS_SIGNED_POP_UP_ENABLED,
    );
    const isMergingPaymentsSharesRequestsEnabled = this.getParamCached(
      PARAM.IS_MERGING_PAYMENTS_SHARES_REQUESTS_ENABLED,
    );
    const isShareTransferEmailEnabled = this.getParamCached(PARAM.IS_SHARE_TRANSFER_EMAIL_ENABLED);

    return {
      [PARAM.INVESTOR_DASHBOARD_THEME]: theme?.stringValue || '',
      [PARAM.IS_MARKET_SPACE]: !!isMarketSpace?.intValue,
      IsDocuSignActive: spdsMode.isDocuSign(),
      IsHelloSignActive: spdsMode.isHelloSign(),
      [PARAM.DO_AUTOMATIC_PURCHASE]: !!doAutomaticPurchase?.intValue,
      [PARAM.DO_AUTOMATIC_SELLBACK]: !!doAutomaticSellBack?.intValue,
      [PARAM.ARE_HOST_NAMES_ENABLED]: !!areSTOHostnamesEnabled?.intValue,
      isSSOModeEnabled: !!ssoModeEnabled?.intValue,
      KycProvider: kycProviderEnum,
      IsDarwSignatureActive: signatureMode.isDraw(),
      IsCheckMarkSignatureActive: signatureMode.isCheckmark(),
      [PARAM.DRAW_SIGNATURE_PREFILL_FONTS]: JSON.parse(signaturePrefill?.stringValue ?? '[]'),
      [PARAM.WEB3_ADDRESS]: web3Address?.stringValue || '',
      [PARAM.BINANCE_WEB3_ADDRESS]: binanceWeb3Address?.stringValue || '',
      [PARAM.POLYGON_WEB3_ADDRESS]: polygonWeb3Address?.stringValue || '',
      IsInternalWalletStoSpecific: walletMode.isStoSpecific(),
      IsInternalWalletGlobal: walletMode.isGlobal(),
      IsInternalWalletDisabled: walletMode.isDisabled(),
      [PARAM.LEFT_SIDE_MENU_FONT]: leftSideMenuPanelFont?.stringValue || '',
      [PARAM.POWERED_BY_LABEL]: poweredByLabel?.stringValue || '',
      [PARAM.CLIENT_KYC]: clientKYC?.stringValue || '',
      [PARAM.SSO_REDIRECT_URL]: ssoRedirectUrl?.stringValue || '',
      IsMoonpayEnabled: moonpayEnabled,
      KycRequirementStep: kycRequirementEnum,
      [PARAM.IS_2FA_ENABLED_BY_DEFAULT]: !!is2FAEnabledByDefault?.intValue,
      [PARAM.DO_AUTOMATIC_BLOCKCHAIN_TRANSACTION_CHECKS]:
        !!doAutomaticBlockchainTransactionChecks?.intValue,
      [PARAM.IS_INVOICING_ENABLED]: !!isInvoicingEnabled?.intValue,
      [PARAM.ATOMIC_SWAP_CONTRACT_ADDRESS]: atomicSwapContractAddress?.stringValue || '',
      isAccreditationEnabled: !!accreditationEnabled?.intValue,
      [PARAM.ACCREDITATION_PROVIDER]: accreditationProviderEnum,
      [PARAM.ACCREDD_LINK]: accreddLink?.stringValue || '',
      [PARAM.IS_CLOUD_STORAGE_ENABLED]: !!isCloudStorageEnabled?.intValue,
      [PARAM.IS_2FA_FORCED_FOR_ALL]: !!is2FAForcedForAll?.intValue,
      [PARAM.IS_PROPERTY_SORTING_ENABLED]: !!isPropertySortingEnabled?.intValue,
      [PARAM.IS_WALLET_MANAGEMENT_MODULE_ENABLED]: !!isWalletManagementModuleEnabled?.intValue,
      [PARAM.IS_MY_PORTFOLIO_MODULE_ENABLED]: !!isMyPortfolioModuleEnabled?.intValue,
      [PARAM.IS_ACTIVE_OFFERINGS_MODULE_ENABLED]: !!isActiveOfferingsModuleEnabled?.intValue,
      [PARAM.IS_NEWS_MODULE_ENABLED]: !!isNewsModuleEnabled?.intValue,
      [PARAM.IS_CONTRACT_MODULE_ENABLED]: !!isContractsModuleEnabled?.intValue,
      [PARAM.IS_CORPORATE_ACTIONS_MODULE_ENABLED]: !!isCorporateActionsModuleEnabled?.intValue,
      [PARAM.IS_TRADING_MODULE_ENABLED]: !!isTradingModuleEnabled?.intValue,
      [PARAM.IS_CHAT_MODULE_ENABLED]: !!isChatModuleEnabled?.intValue,
      [PARAM.IS_SUPPORT_MODULE_ENABLED]: !!isSupportModuleEnabled?.intValue,
      [PARAM.IS_INVESTOR_OWNERSHIP_MODULE_ENABLED]: !!isInvestorOwnershipModuleEnabled?.intValue,
      [PARAM.IS_SETTINGS_MODULE_ENABLED]: !!isSettingsModuleEnabled?.intValue,
      [PARAM.IS_REFERRAL_MODULE_ENABLED]: !!isTellAFriendModuleEnabled?.intValue,
      [PARAM.IS_ACCREDITATION_MODULE_ENABLED]: !!isAccreditationModuleEnabled?.intValue,
      [PARAM.IS_CONTACT_THE_SPONSOR_FONT_ENABLED]: !!isContactTheSponsorFontSwitchEnabled?.intValue,
      [PARAM.IS_SELL_BACK_ENABLED]: !!isSellBackEnabled?.intValue,
      [PARAM.IS_BANK_DETAILS_ENABLED]: !!isBankDetailsSwitchEnabled?.intValue,
      [PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED]: !!isBlockchainAddressSwitchEnabled?.intValue,
      [PARAM.TOGGLE_THEME_EDITOR]: !!toggleThemeEditor?.intValue,
      [PARAM.ACCREDITATION_REQUIREMENT_STEP]: accreditationRequirementStepEnum,
      accreditationRequiringCountries,
      [PARAM.SCHEDULED_EMAIL_NOTIFICATION_TIMER]: scheduledEmailNotificationTimer?.intValue ?? 0,
      [PARAM.SHARE_PURCHASE_DOCUMENTS_MODE]: sharePurchaseModeEnum,
      [PARAM.SKIP_DOCUMENT_SIGN_SCREEN]: !!(skipDocumentSignScreen?.intValue ?? 0),
      [PARAM.ALLOW_INVESTORS_TO_REGISTER]: !!(allowInvestorsToRegister?.intValue ?? 0),
      [PARAM.HIDE_CONTRACTS_TIL_POST_PURCHASE]: !!(hideContractsTilPostPurchase?.intValue ?? 0),
      [PARAM.IS_INVESTMENT_RETURN_CALCULATION_ENABLED]: !!(
        isInvestmentReturnCalculationEnabled?.intValue ?? 0
      ),
      [PARAM.IS_DRIVERS_LICENSE_ENABLED]: !!(isDriversLicenseEnabled?.intValue ?? 0),
      [PARAM.IS_INTERNAL_TOKENIZED_PURCHASE_ENABLED]: !!(
        isInternalTokenizedPurchaseEnabled?.intValue ?? 0
      ),
      [PARAM.TERMS_AND_CONDITIONS_CONFIG]: JSON.parse(
        termsAndConditionsConfig?.stringValue || '{}',
      ),
      [PARAM.IS_ALL_DOCS_SIGNED_POP_UP_ENABLED]: !!isAllDocumentsSignedPopUpEnabled?.intValue,
      [PARAM.IS_MERGING_PAYMENTS_SHARES_REQUESTS_ENABLED]:
        !!isMergingPaymentsSharesRequestsEnabled?.intValue,
      [PARAM.IS_SHARE_TRANSFER_EMAIL_ENABLED]: !!isShareTransferEmailEnabled?.intValue,
    };
  }
}

export default Params;
