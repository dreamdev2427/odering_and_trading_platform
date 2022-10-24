import { CountryCode } from './helpers/country-codes';

export interface MoonpaySignedHeader {
  'Moonpay-Signature-V2': string;
  [key: string]: string;
}

export type MoonpayIDDoc =
  | 'passport'
  | 'national_identity_card'
  | 'driving_license'
  | 'proof_of_address'
  | 'residence_permit';

export interface MoonpayFile {
  type: MoonpayIDDoc;
  side: 'front' | 'back' | null;
  country: string;
  downloadLink: string;
}

export interface MoonpayKyc {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: CountryCode;
  address: {
    street: string;
    subStreet: string;
    town: string;
    postCode: string;
    state: string;
    country: CountryCode;
  };
  files: MoonpayFile[];
}

export interface MoonpayWidgetSettings {
  apiKey: string;
  currencyCode?: string;
  defaultCurrencyCode?: string;
  walletAddress?: string;
  walletAddressTag?: string;
  walletAddresses?: string;
  walletAddressTags?: string;
  colorCode?: string;
  language?: string;
  baseCurrencyCode?: string;
  baseCurrencyAmount?: number;
  quoteCurrencyAmount?: number;
  lockAmount?: boolean;
  email?: string;
  /** The ID is on our end */
  externalTransactionId: number;
  /** The ID is on our end */
  externalCustomerId: number;
  kycAvailable?: boolean;
  redirectURL?: string;
  showAllCurrencies?: boolean;
  showOnlyCurrencies?: string;
  showWalletAddressFrom?: string;
  enableRecurringBuys?: boolean;
  unsupportedRegionRedirectUrl?: string;
  skipUnsupportedRegionScreen?: boolean;
}

export enum REMOTE_STATUS {
  waitingPayment = 'waitingPayment',
  pending = 'pending',
  waitingAuthorization = 'waitingAuthorization',
  failed = 'failed',
  completed = 'completed',
}

export type StageType =
  | 'stage_one_ordering'
  | 'stage_two_verification'
  | 'stage_three_processing'
  | 'stage_four_delivery';

export type StageStatus = 'not_started' | 'in_progress' | 'success' | 'failed';

export type StageActionType =
  | 'complete_bank_transfer'
  | 'retry_kyc'
  | 'verify_card_by_code'
  | 'verify_card_by_file';

export interface StageAction {
  type: StageActionType;
  url: string;
}

export type StageFailureReason =
  | null
  | 'card_not_supported'
  | 'daily_purchase_limit_exceeded'
  | 'payment_authorization_declined'
  | 'timeout_3d_secure'
  | 'timeout_bank_transfer'
  | 'timeout_kyc_verification'
  | 'timeout_card_verification'
  | 'rejected_kyc'
  | 'rejected_card'
  | 'rejected_other'
  | 'cancelled'
  | 'refund'
  | 'failed_testnet_withdrawal'
  | 'error';

export interface Stage {
  stage: StageType;
  status: StageStatus;
  actions: StageAction[];
  failureReason: StageFailureReason;
}

/** Fields only relevant to fiat */
export interface MoonpayFiatCurrency {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'crypto' | 'fiat';
  name: string;
  code: string;
  precision: number;
  maxAmount: number;
  minAmount: number;
  minBuyAmount: number;
  maxBuyAmount: number;
}

export interface MoonpayCurrency extends MoonpayFiatCurrency {
  addressRegex: string;
  testnetAddressRegex: string;
  supportsAddressTag: boolean;
  addressTagRegex: string | null;
  supportsTestMode: boolean;
  supportsLiveMode: boolean;
  isSuspended: boolean;
  isSupportedInUS: boolean;
  notAllowedUSStates: string[];
  notAllowedCountries: string[];
  isSellSupported: boolean;
  confirmationsRequired: number;
  minSellAmount: number;
  maxSellAmount: number;
}

export interface MoonpayTransaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  baseCurrencyAmount: number;
  quoteCurrencyAmount: number | null;
  feeAmount: number | null;
  extraFeeAmount: number | null;
  networkFeeAmount: number | null;
  areFeesIncluded: boolean;
  status: REMOTE_STATUS;
  failureReason: string | null;
  walletAddress: string;
  walletAddressTag: string | null;
  cryptoTransactionId: string | null;
  returnUrl: string;
  redirectUrl: string | null;
  widgetRedirectUrl: string | null;
  baseCurrencyId: string;
  currencyId: string;
  customerId: string;
  cardId: string;
  bankAccountId: null;
  bankDepositInformation: null;
  bankTransferReference: null;
  eurRate: number;
  usdRate: number;
  gbpRate: number;
  externalTransactionId: string;
  /** Fiat. Can transact only fiat to crypto. See MoonpaySellTransaction for the reverse. */
  baseCurrency: MoonpayFiatCurrency;
  /** Crypto. Can transact only fiat to crypto. See MoonpaySellTransaction for the reverse. */
  currency: MoonpayCurrency;
  externalCustomerId: string;
  country: string;
  state: string;
  stages: Stage[];
}

export interface MoonpayError {
  type: 'BadRequestError' | 'NotFoundError' | 'UnauthorizedError';
  // MoonPay documentation is misleading on the name of this field, maybe both exist
  name?: 'BadRequestError' | 'NotFoundError' | 'UnauthorizedError';
  message: string;
  errors: JSON;
}
