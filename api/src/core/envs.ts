export enum PARAM {
  INVESTOR_DASHBOARD_THEME = 'investorDashboardTheme',
  VERIFY_INVESTOR_COM_API_TOKEN = 'VerifyInvestorComApiToken',
  IS_MARKET_SPACE = 'IsMarketSpace',
  SHARE_PURCHASE_DOCUMENTS_MODE = 'sharePurchaseDocumentsMode',
  VERIFY_INVESTOR_COM_URL = 'verifyInvestorComUrl',
  DOCUSIGN_EMAIL = 'DocuSignEmail',
  DOCUSIGN_PASSWORD = 'DocuSignPassword',
  DOCUSIGN_INTEGRATION_KEY = 'DocuSignIntegrationKey',
  DOCUSIGN_STO_CONTRACT_ID = `DocuSignSTOContractID`,
  DOCUSIGN_LINK = `DocuSignlinkToLoginServer`,
  DOCUSIGN_SHARE_PURCHASE_CONTRACT_ID = `DocuSignSharesPurchaseContractID`,
  HELLO_SIGN_API_KEY = `helloSignApiKey`,
  HELLO_SIGN_TEST_MODE = `helloSignTestMode`,
  CUSTODIAN_NAME = `CustodianName`,
  POLYGON_WEB3_ADDRESS = `polygonWeb3Address`,
  BINANCE_WEB3_ADDRESS = `binanceWeb3Address`,
  WEB3_ADDRESS = `web3Address`,
  SSO_MODE_ENABLED = 'SSOModeEnabled',
  DO_AUTOMATIC_PURCHASE = `doAutomaticPurchase`,
  DO_AUTOMATIC_SELLBACK = `doAutomaticSellBack`,
  ARE_HOST_NAMES_ENABLED = 'areSTOHostnamesEnabled',
  SUM_SUB_API_JSON = `SumSubApiJson`,
  KYC_PROVIDER = 'KycProvider',
  DOCUSIGN_OAUTH_BASE_PATH = 'DocuSignOauthBasePath',
  DOCUSIGN_RSA_KEY = 'DocuSignRsaKey',
  DOCUSIGN_USER_ID = 'DocuSignUserID',
  INTERNAL_SIGNATURE_MODE = 'internalSignatureMode',
  DRAW_SIGNATURE_PREFILL_FONTS = 'drawSignaturePrefillFonts',
  MOONPAY_CONFIG = 'MoonpayConfig',
  RAVENCOIN_USETWALLETPASSWORD = 'Ravencoin_UserWalletPassword',
  RAVENCOIN_SERVERURL = 'Ravencoin_ServerURL',
  RAVENCOIN_USERNAME = 'Ravencoin_Username',
  RAVENCOIN_PASSWORD = 'Ravencoin_Password',
  INTERNAL_WALLET_MODE = 'investorInternalWalletProjectSpecific',
  BLOCK_PASS_API_JSON = 'BlockPassApiJson',
  LEFT_SIDE_MENU_FONT = 'leftSideMenuFont',
  POWERED_BY_LABEL = 'poweredByLabel',
  IS_SMTP_SSL3_ENABLED = 'SMTP_SSL3',
  CLIENT_KYC = 'clientKYC',
  SSO_REDIRECT_URL = 'SSORedirectFrontEnd',
  KYC_REQUIREMENT_STEP = 'KycRequirementStep',
  IS_2FA_ENABLED_BY_DEFAULT = 'is2FAEnabledByDefault',
  DO_AUTOMATIC_BLOCKCHAIN_TRANSACTION_CHECKS = 'doAutomaticBlockchainTransactionChecks',
  NETKI_PARAM_JSON = 'NetkiParamJson',
  IS_INVOICING_ENABLED = 'isInvoicingEnabled',
  ATOMIC_SWAP_CONTRACT_ADDRESS = 'atomicSwapContractAddress',
  WHITELISTED_CORS_URLS = 'whitelistedCorsUrls',
  IS_ACCREDITATION_ENABLED = 'AccreditationEnabled',
  ACCREDITATION_PROVIDER = 'AccreditationProvider',
  ACCREDD_LINK = 'AccreddRedirectLink',
  IS_CLOUD_STORAGE_ENABLED = 'isCloudStorageEnabled',
  IS_2FA_FORCED_FOR_ALL = 'is2FAForcedForAll',
  IS_PROPERTY_SORTING_ENABLED = 'isPropertySortingEnabled',
  IS_WALLET_MANAGEMENT_MODULE_ENABLED = 'isWalletManagementModuleEnabled',
  IS_MY_PORTFOLIO_MODULE_ENABLED = 'isMyPortfolioModuleEnabled',
  IS_ACTIVE_OFFERINGS_MODULE_ENABLED = 'isActiveOfferingsModuleEnabled',
  IS_NEWS_MODULE_ENABLED = 'isNewsModuleEnabled',
  IS_CONTRACT_MODULE_ENABLED = 'isContractsModuleEnabled',
  IS_CORPORATE_ACTIONS_MODULE_ENABLED = 'isCorporateActionsModuleEnabled',
  IS_TRADING_MODULE_ENABLED = 'isTradingModuleEnabled',
  IS_CHAT_MODULE_ENABLED = 'isChatModuleEnabled',
  IS_SUPPORT_MODULE_ENABLED = 'isSupportModuleEnabled',
  IS_INVESTOR_OWNERSHIP_MODULE_ENABLED = 'isInvestorOwnershipModuleEnabled',
  IS_SETTINGS_MODULE_ENABLED = 'isSettingsModuleEnabled',
  IS_REFERRAL_MODULE_ENABLED = 'isTellAFriendModuleEnabled',
  IS_ACCREDITATION_MODULE_ENABLED = 'isAccreditationModuleEnabled',
  IS_CONTACT_THE_SPONSOR_FONT_ENABLED = 'isContactTheSponsorFontSwitchEnabled',
  IS_SELL_BACK_ENABLED = 'isSellBackEnabled',
  IS_BANK_DETAILS_ENABLED = 'isBankDetailsSwitchEnabled',
  IS_BLOCKCHAIN_ADDRESS_ENABLED = 'isBlockchainAddressSwitchEnabled',
  PLATFORM_CONFIGURATION = 'platformConfiguration',
  TOGGLE_THEME_EDITOR = 'toggleThemeEditor',
  ACCREDITATION_REQUIREMENT_STEP = `accreditationRequirementStep`,
  SCHEDULED_EMAIL_NOTIFICATION_TIMER = 'scheduledEmailNotificationTimer',
  SKIP_DOCUMENT_SIGN_SCREEN = 'skipDocumentSignScreen',
  ALLOW_INVESTORS_TO_REGISTER = 'allowInvestorsToRegister',
  HIDE_CONTRACTS_TIL_POST_PURCHASE = 'hideContractsTilPostPurchase',
  DEFAULT_PROJECT_TYPE = 'defaultProjectType',
  IS_PRIVATE_MODULE_ENABLED = 'isPrivateModuleEnabled',
  ENABLE_PLATFORM_CONFIGURATION_SWITCHES = 'enablePlatformConfigurationSwitches',
  IS_INVESTMENT_RETURN_CALCULATION_ENABLED = 'isInvestmentReturnCalculationEnabled',
  IS_AUTOMATIC_SHARE_CLASS_SETTINGS_ENABLED = 'isAutomaticShareClassSettingsEnabled',
  IS_INTERNAL_TOKENIZED_PURCHASE_ENABLED = 'isInternalTokenizedPurchaseEnabled',
  IS_DRIVERS_LICENSE_ENABLED = 'isDriversLicenseEnabled',
  IS_HTTPS_START_ENABLED = 'LocalHttpsStart',
  TERMS_AND_CONDITIONS_CONFIG = 'termsAndConditionsConfig',
  IS_ALL_DOCS_SIGNED_POP_UP_ENABLED = 'isAllDocumentsSignedPopUpEnabled',
  IS_MERGING_PAYMENTS_SHARES_REQUESTS_ENABLED = 'isMergingPaymentsSharesRequestsEnabled',
  IS_SHARE_TRANSFER_EMAIL_ENABLED = `isShareTransferEmailEnabled`,
  DEFAULT_CURRENCY_TYPE = `defaultCurrencyType`,
}

export enum SHARE_PURCHASE_MODE {
  INTERNAL = 'internal',
  DOCUSIGN = 'docuSign',
  HELLOSIGN = 'helloSign',
}

export enum INTERNAL_SIGNATURE_MODE {
  DRAW = 'draw',
  CHECKMARK = 'checkmark',
}

export enum INTERNAL_WALLET_MODE {
  StoSpecific = 1,
  Global = 2,
  Disabled = 3,
}

export enum ACCREDITATION_PROVIDER_ENUM {
  VerifyInvestor = 0,
  Accredd = 1,
}

export enum PLATFORM_CONFIGURATION {
  External_Wallets_Blockchain_Only = 1,
  External_Wallets_Fiat_Only = 2,
  Internal_Wallets_Blockchain_Fiat_Combined = 3,
}

export enum ACCREDITATION_REQUIREMENT_STEP_ENUM {
  OnRegister,
  OnPurchase,
  Ignore,
  PrePayment,
}

export enum PLATFORM_CONFIGURATION_ENUM {
  Wallet = 1,
  Account = 2,
  Custody = 3,
}

export enum DEFAULT_PROJECT_TYPE_ENUM {
  Tokenized = 1,
  NonTokenized = 2,
  Combined = 3,
}