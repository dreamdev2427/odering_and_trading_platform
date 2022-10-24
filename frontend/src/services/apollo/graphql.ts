import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** Denotes the providers supported by the platform */
export enum AccreditationProviderEnum {
  VerifyInvestor = 'VerifyInvestor',
  Accredd = 'Accredd',
}

/** Denotes the step at which the platform should require the investor to pass Accreditation checks */
export enum AccreditationRequirementEnum {
  OnRegister = 'OnRegister',
  OnPurchase = 'OnPurchase',
  Ignore = 'Ignore',
  PrePayment = 'PrePayment',
}

export type ActiveProperty = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  details: Scalars['String'];
  picture: Scalars['String'];
  projectCost: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  popularity: Scalars['Int'];
  isBuyButtonEnabled: Scalars['Boolean'];
};

export type Admin = {
  user: AdminUser;
  STO: Sto;
};

export type AdminUser = {
  ID: Scalars['Int'];
  stoid?: Maybe<Scalars['Int']>;
  FirstName?: Maybe<Scalars['String']>;
  LastName?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Int']>;
  Username: Scalars['String'];
  twofactorenable?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  isPlatformAdminLogin?: Maybe<Scalars['Int']>;
};

export type AllMeeting = {
  past: Array<Meeting>;
  current: Array<Meeting>;
  future: Array<Meeting>;
};

export type AppParameters = {
  IsMarketSpace: Scalars['Boolean'];
  investorDashboardTheme: Scalars['String'];
  IsDocuSignActive: Scalars['Boolean'];
  IsHelloSignActive: Scalars['Boolean'];
  doAutomaticPurchase: Scalars['Boolean'];
  isSSOModeEnabled: Scalars['Boolean'];
  doAutomaticSellBack: Scalars['Boolean'];
  areSTOHostnamesEnabled: Scalars['Boolean'];
  KycProvider: KycProviders;
  IsDarwSignatureActive: Scalars['Boolean'];
  IsCheckMarkSignatureActive: Scalars['Boolean'];
  drawSignaturePrefillFonts: Array<Scalars['String']>;
  web3Address: Scalars['String'];
  binanceWeb3Address: Scalars['String'];
  polygonWeb3Address: Scalars['String'];
  IsInternalWalletStoSpecific: Scalars['Boolean'];
  IsInternalWalletGlobal: Scalars['Boolean'];
  IsInternalWalletDisabled: Scalars['Boolean'];
  leftSideMenuFont: Scalars['String'];
  poweredByLabel: Scalars['String'];
  clientKYC: Scalars['String'];
  SSORedirectFrontEnd: Scalars['String'];
  IsMoonpayEnabled: Scalars['Boolean'];
  KycRequirementStep: KycRequirementStep;
  is2FAEnabledByDefault: Scalars['Boolean'];
  doAutomaticBlockchainTransactionChecks: Scalars['Boolean'];
  isInvoicingEnabled: Scalars['Boolean'];
  atomicSwapContractAddress: Scalars['String'];
  isAccreditationEnabled: Scalars['Boolean'];
  AccreditationProvider: AccreditationProviderEnum;
  AccreddRedirectLink: Scalars['String'];
  isCloudStorageEnabled: Scalars['Boolean'];
  is2FAForcedForAll: Scalars['Boolean'];
  isPropertySortingEnabled: Scalars['Boolean'];
  isWalletManagementModuleEnabled: Scalars['Boolean'];
  isMyPortfolioModuleEnabled: Scalars['Boolean'];
  isActiveOfferingsModuleEnabled: Scalars['Boolean'];
  isNewsModuleEnabled: Scalars['Boolean'];
  isContractsModuleEnabled: Scalars['Boolean'];
  isCorporateActionsModuleEnabled: Scalars['Boolean'];
  isTradingModuleEnabled: Scalars['Boolean'];
  isChatModuleEnabled: Scalars['Boolean'];
  isSupportModuleEnabled: Scalars['Boolean'];
  isInvestorOwnershipModuleEnabled: Scalars['Boolean'];
  isSettingsModuleEnabled: Scalars['Boolean'];
  isTellAFriendModuleEnabled: Scalars['Boolean'];
  isAccreditationModuleEnabled: Scalars['Boolean'];
  isContactTheSponsorFontSwitchEnabled: Scalars['Boolean'];
  isSellBackEnabled: Scalars['Boolean'];
  isBankDetailsSwitchEnabled: Scalars['Boolean'];
  isBlockchainAddressSwitchEnabled: Scalars['Boolean'];
  toggleThemeEditor: Scalars['Boolean'];
  accreditationRequirementStep: AccreditationRequirementEnum;
  accreditationRequiringCountries: Array<Scalars['String']>;
  scheduledEmailNotificationTimer: Scalars['Int'];
  sharePurchaseDocumentsMode: SharePurchaseModeEnum;
  skipDocumentSignScreen: Scalars['Boolean'];
  allowInvestorsToRegister: Scalars['Boolean'];
  hideContractsTilPostPurchase: Scalars['Boolean'];
  isInvestmentReturnCalculationEnabled: Scalars['Boolean'];
  isInternalTokenizedPurchaseEnabled: Scalars['Boolean'];
  isDriversLicenseEnabled: Scalars['Boolean'];
  termsAndConditionsConfig: TermsAndConditionsConfig;
  isAllDocumentsSignedPopUpEnabled: Scalars['Boolean'];
  isMergingPaymentsSharesRequestsEnabled: Scalars['Boolean'];
  isShareTransferEmailEnabled: Scalars['Boolean'];
};

/** Statuses of atomic swap operations */
export enum AtomicSwapStatus {
  NotInitialized = 'NOT_INITIALIZED',
  Accepted = 'ACCEPTED',
  SellerCommitted = 'SELLER_COMMITTED',
  SellerSent = 'SELLER_SENT',
  BuyerCommitted = 'BUYER_COMMITTED',
  BuyerCompleted = 'BUYER_COMPLETED',
  Unsuccessful = 'UNSUCCESSFUL',
  Processed = 'PROCESSED',
}

/** All Kinds of Broker Types */
export enum BrokerType {
  Broker = 'Broker',
  Investor = 'Investor',
}

/** Investor blockchain share transaction create data */
export type BlockchainSharesTransferTransactionsInput = {
  toAddress: Scalars['String'];
  stoID?: Maybe<Scalars['Float']>;
  adminID: Scalars['Float'];
  investorID?: Maybe<Scalars['Float']>;
  shareTypeID: Scalars['Float'];
  amountToSend: Scalars['Float'];
  investmentDetails?: Maybe<Scalars['String']>;
  investmentAmount: Scalars['Float'];
  reduceInvestorBalance: Scalars['Float'];
  status: Scalars['Float'];
  recordDate: Scalars['DateTime'];
};

/** Status of a BuyAlert */
export enum BuyAlertStatus {
  Unused = 'Unused',
  Pending = 'Pending',
  Accepted = 'Accepted',
  Declined = 'Declined',
  PaymentFailure = 'PaymentFailure',
  PaymentOngoing = 'PaymentOngoing',
  PaymentAwaiting = 'PaymentAwaiting',
  KycRequired = 'KycRequired',
  AccreditationRequired = 'AccreditationRequired',
  PendingDocuments = 'PendingDocuments',
}

/** Between Who Chatting Happens */
export enum ChatBetween {
  InvestorAdmin = 'InvestorAdmin',
  InvestorPlatform = 'InvestorPlatform',
  InvestorInvestor = 'InvestorInvestor',
}

/** In Which Context Chatting Happens */
export enum ChatContext {
  ExchangeOrder = 'ExchangeOrder',
}

/** All Kinds of Commission Types */
export enum CommissionType {
  Flat = 'Flat',
  Percentage = 'Percentage',
}

/** Change password data */
export type ChangePasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type Chat = {
  ID: Scalars['Int'];
  sender: SenderType;
  receiver: ReceiverType;
  investorID: Scalars['Int'];
  adminID: Scalars['Int'];
  stoID: Scalars['Int'];
  message: Scalars['String'];
  type: MessageType;
  dateSent: Scalars['Timestamp'];
  isRead: Scalars['Boolean'];
  dateRead?: Maybe<Scalars['Timestamp']>;
  isEdited: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  context?: Maybe<ChatContext>;
  contextID?: Maybe<Scalars['Int']>;
  contextReceiverID?: Maybe<Scalars['Int']>;
};

/** Chat Data */
export type ChatInput = {
  sender: SenderType;
  receiver: ReceiverType;
  investorID: Scalars['Int'];
  adminID: Scalars['Int'];
  stoID: Scalars['Int'];
  message: Scalars['String'];
  type?: Maybe<MessageType>;
  dateSent?: Maybe<Scalars['Timestamp']>;
  location?: Maybe<Scalars['String']>;
  context?: Maybe<ChatContext>;
  contextID?: Maybe<Scalars['Int']>;
  contextReceiverID?: Maybe<Scalars['Int']>;
};

export type CloudFiles = {
  ID: Scalars['Int'];
  fileName: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  modified: Scalars['DateTime'];
};

export type ComponentCustomization = {
  ID: Scalars['Int'];
  component: Scalars['String'];
  body: Scalars['String'];
};

/** Component customization data */
export type ComponentCustomizationInput = {
  component: Scalars['String'];
  body?: Maybe<Scalars['String']>;
};

export type Currency = {
  ID: Scalars['Int'];
  currency: Scalars['String'];
  abbreviation: Scalars['String'];
  symbol: Scalars['String'];
  isBlockchainBased: Scalars['Boolean'];
  blockchainID: Scalars['Int'];
  isNative: Scalars['Float'];
  cryptoReceivingAddress?: Maybe<Scalars['String']>;
  Address?: Maybe<Scalars['String']>;
};

export type DetailProperty = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  details: Scalars['String'];
  picture: Scalars['String'];
  projectCost: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  popularity: Scalars['Int'];
  isBuyButtonEnabled: Scalars['Boolean'];
  fullDetails: Scalars['String'];
  images?: Maybe<Array<PropertyFile>>;
  documents?: Maybe<Array<PropertyFile>>;
};

export type DividendInvestorPayout = {
  ID: Scalars['Int'];
  investorID: Scalars['Int'];
  payoutID: Scalars['Int'];
  amount: Scalars['Float'];
  investorShares: Scalars['Float'];
  lastUpdatedAt: Scalars['Timestamp'];
  status: Scalars['String'];
};

export type Document = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  contents?: Maybe<Scalars['String']>;
  directoryID: Scalars['Float'];
  filetype: Scalars['Float'];
  docusignDocumentID?: Maybe<Scalars['String']>;
  helloSignDocumentID?: Maybe<Scalars['String']>;
  offer?: Maybe<OfferedDocument>;
  submittedDocument?: Maybe<DocumentUser>;
  sharePurchaseDocument?: Maybe<SharePurchaseDocument>;
};

export type DocumentComment = {
  ID: Scalars['Int'];
  stoID?: Maybe<Scalars['Float']>;
  documentID: Scalars['Int'];
  text: Scalars['String'];
  investorID: Scalars['Int'];
  modified?: Maybe<Scalars['DateTime']>;
  replyText: Scalars['String'];
  replyByID: Scalars['Int'];
  dateReplyComment?: Maybe<Scalars['DateTime']>;
  isAccepted: Scalars['Int'];
  isNew: Scalars['Int'];
  reply: DocumentCommentReply;
};

export type DocumentCommentReply = {
  investorID: Scalars['Int'];
  text: Scalars['String'];
  modified: Scalars['DateTime'];
};

export type DocumentField = {
  ID: Scalars['Int'];
  documentID: Scalars['Int'];
  stoID: Scalars['Int'];
  title: Scalars['String'];
  type: Scalars['Int'];
  helperText: Scalars['String'];
  fieldID: Scalars['String'];
  externalFileDataLabel: Scalars['String'];
};

/** Document Submitted entiry data */
export type DocumentFieldValueDto = {
  ID: Scalars['String'];
  value: Scalars['String'];
};

export type DocumentUser = {
  ID: Scalars['Int'];
  contents: Scalars['String'];
  investorID?: Maybe<Scalars['Int']>;
  stoID?: Maybe<Scalars['Int']>;
  documentID?: Maybe<Scalars['Int']>;
  directoryID?: Maybe<Scalars['Int']>;
  status: Scalars['Int'];
  fieldValuesJson: Scalars['String'];
  documentOfferInvestorID: Scalars['Int'];
  signatureFilePath?: Maybe<Scalars['String']>;
  signatureDate?: Maybe<Scalars['DateTime']>;
  signatureFileID?: Maybe<Scalars['Float']>;
  fieldValues?: Maybe<Array<DocumentUserFieldValue>>;
  sharePurchaseID?: Maybe<Scalars['Float']>;
  buyAlert?: Maybe<InvestorBuyAlert>;
  signature?: Maybe<CloudFiles>;
  document: Document;
};

export type DocumentUserFieldValue = {
  ID?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ExchangeBuyOrderInput = {
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
  shareTypeID: Scalars['Int'];
  shares: Scalars['Float'];
  rateFrom: Scalars['Float'];
};

export type ExchangeOffer = {
  ID: Scalars['Int'];
  exchangeOrderID: Scalars['Int'];
  exchangeOrder: ExchangeOrder;
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
  sharesPartial: Scalars['Float'];
  rateFrom: Scalars['Float'];
  rateTo: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  atomicSwapAccepted?: Maybe<Scalars['Boolean']>;
  atomicSwapSecret?: Maybe<Scalars['String']>;
  atomicBuyerPublicKey?: Maybe<Scalars['String']>;
  atomicSwapExpireDate?: Maybe<Scalars['Timestamp']>;
};

export type ExchangeOfferInput = {
  exchangeOrderID: Scalars['Int'];
  sharesPartial: Scalars['Float'];
  rateFrom: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  atomicBuyerPublicKey: Scalars['String'];
};

export type ExchangeOrder = {
  ID: Scalars['Int'];
  type: ExchangeType;
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
  dateFrom: Scalars['String'];
  dateTo: Scalars['String'];
  shareTypeID: Scalars['Int'];
  shareType: ShareType;
  shares: Scalars['Float'];
  rateFrom: Scalars['Float'];
  rateTo: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  atomicSwapCurrentStatus: AtomicSwapStatus;
  atomicSwapExchangeOffersID?: Maybe<Scalars['Int']>;
  atomicSwapAcceptable: Scalars['Boolean'];
  atomicSwapTokenAddressAcceptable?: Maybe<Scalars['String']>;
  atomicSwapSharesWalletID: Scalars['Int'];
  atomicSwapSharesWallet?: Maybe<SharesWallet>;
};

export type ExchangeSellOrderInput = {
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
  shareTypeID: Scalars['Int'];
  shares: Scalars['Float'];
  rateFrom: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  atomicSwapSharesWalletID?: Maybe<Scalars['Int']>;
  atomicSwapTokenAddressAcceptable?: Maybe<Scalars['String']>;
};

/** Types of exchange operations */
export enum ExchangeType {
  Sell = 'SELL',
  Buy = 'BUY',
}

export type ExchangeUpdateOrderInput = {
  dateTo?: Maybe<Scalars['String']>;
  rateFrom: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
};

/** All Kinds of Fee Beneficiaries */
export enum FeeBeneficiary {
  Broker = 'Broker',
  Platform = 'Platform',
}

/** All Kinds of Fee Types */
export enum FeeType {
  Registration = 'Registration',
  Deposit = 'Deposit',
  BuyShares = 'BuyShares',
  BuyExchange = 'BuyExchange',
  SellExchange = 'SellExchange',
  SellBack = 'SellBack',
}

export type Fee = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  beneficiary: FeeBeneficiary;
  type: FeeType;
  amount: Scalars['Float'];
  status: CommissionType;
};

export type FeeCommission = {
  ID: Scalars['Int'];
  feeID: Scalars['Int'];
  amount: Scalars['Float'];
  transactionID: Scalars['Int'];
  beneficiaryID: Scalars['Int'];
  dateEarned: Scalars['Timestamp'];
  status: PaymentStatus;
  beneficiaryType?: Maybe<BrokerType>;
};

/** Fee Commission data */
export type FeeCommissionInput = {
  feeID: Scalars['Int'];
  amount: Scalars['Float'];
  transactionID: Scalars['Int'];
  beneficiaryID: Scalars['Int'];
  dateEarned?: Maybe<Scalars['Timestamp']>;
  status?: Maybe<PaymentStatus>;
  beneficiaryType?: Maybe<BrokerType>;
};

/** Fee data */
export type FeeInput = {
  stoID: Scalars['Int'];
  beneficiary: FeeBeneficiary;
  type: FeeType;
  amount: Scalars['Float'];
  status: CommissionType;
};

export type FileUploaded = {
  link: Scalars['String'];
  name: Scalars['String'];
};

/** InvoiceStatusType */
export enum InvoiceStatusType {
  Unpaid = 'Unpaid',
  PendingVerification = 'PendingVerification',
  Paid = 'Paid',
  Declined = 'Declined',
  PaymentFailure = 'PaymentFailure',
  PaymentOngoing = 'PaymentOngoing',
  PaymentAwaiting = 'PaymentAwaiting',
}

export type Inbox = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  investorID: Scalars['Int'];
  title: Scalars['String'];
  details: Scalars['String'];
  date: Scalars['String'];
  isResponded: Scalars['Int'];
  response?: Maybe<Scalars['String']>;
  responseDate?: Maybe<Scalars['String']>;
};

/** Investor inbox create data */
export type InboxInput = {
  stoID: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
};

export type InvestingEntity = {
  ID: Scalars['Int'];
  investorID: Scalars['Int'];
  members: Array<InvestingEntityMember>;
  typeID: Scalars['Int'];
  type: InvestingEntityTypes;
  taxId: Scalars['String'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  accredited: Scalars['Boolean'];
  paymentMethod: InvestingEntityPaymentMethods;
  address: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  isApprovedByAdmin: Scalars['Int'];
};

/** Investors Investing Entity data for creating or updating */
export type InvestingEntityInput = {
  typeID: Scalars['Float'];
  taxId: Scalars['String'];
  name: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  accredited: Scalars['Boolean'];
  paymentMethod: InvestingEntityPaymentMethods;
  address: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
};

export type InvestingEntityMember = {
  ID: Scalars['Int'];
  investorID: Scalars['Int'];
  entityID: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: InvestingEntityMemberRoles;
  signatory: Scalars['Boolean'];
  email: Scalars['String'];
};

/** Investors Investing Entity members data */
export type InvestingEntityMemberInput = {
  entityID: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: InvestingEntityMemberRoles;
  signatory: Scalars['Boolean'];
  email: Scalars['String'];
};

/** Roles of the Investing entity member */
export enum InvestingEntityMemberRoles {
  Investor = 'INVESTOR',
  Accountant = 'ACCOUNTANT',
  Advisor = 'ADVISOR',
}

/** Payment methods of the Investing entity */
export enum InvestingEntityPaymentMethods {
  Mail = 'MAIL',
  Ach = 'ACH',
  Wire = 'WIRE',
  Blockchain = 'BLOCKCHAIN',
}

export type InvestingEntityTypes = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  countries: Array<Scalars['String']>;
};

export type Investor = {
  ID: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  cell?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  town?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  passportNumber?: Maybe<Scalars['String']>;
  nationalID?: Maybe<Scalars['String']>;
  kinname?: Maybe<Scalars['String']>;
  kinphone?: Maybe<Scalars['String']>;
  kinemail?: Maybe<Scalars['String']>;
  investorType: Scalars['Int'];
  companyName?: Maybe<Scalars['String']>;
  titleWithinCompany?: Maybe<Scalars['String']>;
  powerToBindCompany: Scalars['Int'];
  birthDate?: Maybe<Scalars['String']>;
  isTwoFactorEnabled: Scalars['Boolean'];
  language: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  socialSecurity?: Maybe<Scalars['String']>;
  mailingAddress?: Maybe<Scalars['String']>;
  faxNumber?: Maybe<Scalars['String']>;
  maritalStatus: Scalars['Int'];
  occupation?: Maybe<Scalars['String']>;
  employerName?: Maybe<Scalars['String']>;
  employerAddress?: Maybe<Scalars['String']>;
  retirementAccount: Scalars['Int'];
  trustOrBusinessEntity: Scalars['Int'];
  dateIncorporation?: Maybe<Scalars['String']>;
  taxID?: Maybe<Scalars['String']>;
  govtID?: Maybe<Scalars['String']>;
  isTax: Scalars['Int'];
  secondaryContactName?: Maybe<Scalars['String']>;
  secondaryContactPhone?: Maybe<Scalars['String']>;
  secondaryContactEmail?: Maybe<Scalars['String']>;
  primaryContactName?: Maybe<Scalars['String']>;
  primaryContactPhone?: Maybe<Scalars['String']>;
  primaryContactEmail?: Maybe<Scalars['String']>;
  countryBusiness?: Maybe<Scalars['String']>;
  countryCitizenship?: Maybe<Scalars['String']>;
  taxCountry?: Maybe<Scalars['String']>;
  brokerID?: Maybe<Scalars['String']>;
  driversLicenseID?: Maybe<Scalars['String']>;
  investmentLimitUpdateDate: Scalars['String'];
  allowedTotalInvestment: Scalars['Float'];
  yearlyTotalInvestment: Scalars['Float'];
  userName: Scalars['String'];
};

export type InvestorBalance = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  investorID: Scalars['Int'];
  currencyID: Scalars['Int'];
  currency: Currency;
  amount: Scalars['Float'];
};

/** Investor Bank Account Input */
export type InvestorBankAccountInput = {
  accountTitle: Scalars['String'];
  accountNo: Scalars['String'];
  routingNumber: Scalars['String'];
  iban: Scalars['String'];
  accountHolderName: Scalars['String'];
  accountHolderCity: Scalars['String'];
  accountHolderCountry: Scalars['String'];
  accountHolderAddress: Scalars['String'];
  accountPostalCode: Scalars['String'];
  bankName: Scalars['String'];
  bankCity: Scalars['String'];
  bankCountry: Scalars['String'];
  bankAddress: Scalars['String'];
  swift: Scalars['String'];
};

/** Investor beneficial data */
export type InvestorBeneficialInput = {
  ID: Scalars['Float'];
  beneficialFirstName: Scalars['String'];
  beneficialLastName: Scalars['String'];
  beneficialAddress: Scalars['String'];
  beneficialCity: Scalars['String'];
  beneficialCountry: Scalars['String'];
  beneficialEmail: Scalars['String'];
  beneficialBirth: Scalars['String'];
  beneficialNationality: Scalars['String'];
};

export type InvestorBuyAlert = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  entityID?: Maybe<Scalars['Int']>;
  shares: Scalars['Float'];
  shareTypeID: Scalars['Int'];
  shareType: ShareType;
  status: BuyAlertStatus;
  date: Scalars['String'];
  isBuySharesSigned: Scalars['Int'];
  purchasePriceOffered?: Maybe<Scalars['Float']>;
  fromCurrencyID?: Maybe<Scalars['Int']>;
  isSellRequest: Scalars['Boolean'];
  isHiddenForInvestor: Scalars['Boolean'];
};

/** Investors buy alert data */
export type InvestorBuyAlertInput = {
  stoID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  shares: Scalars['Float'];
  details?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  /** Optionally set a custom status upon insertion if you have your own purchasing flow. Restricted to API users and platform admins. */
  status?: Maybe<BuyAlertStatus>;
  /** Investor has acknowledged or deliberately invisible */
  isHiddenForInvestor?: Maybe<Scalars['Boolean']>;
  /** Determines if this is a request to sell shares or to buy them */
  isSellBackRequest?: Maybe<Scalars['Boolean']>;
};

/** Investors buy alert data */
export type InvestorBuyAlertInputAdmin = {
  stoID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  shares: Scalars['Float'];
  details?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  /** Optionally set a custom status upon insertion if you have your own purchasing flow. Restricted to API users and platform admins. */
  status?: Maybe<BuyAlertStatus>;
  /** Investor has acknowledged or deliberately invisible */
  isHiddenForInvestor?: Maybe<Scalars['Boolean']>;
  /** Determines if this is a request to sell shares or to buy them */
  isSellBackRequest?: Maybe<Scalars['Boolean']>;
  investorID: Scalars['Int'];
};

export type InvestorBuyAlertMsInput = {
  stoID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  shares: Scalars['Float'];
  details?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  /** Optionally set a custom status upon insertion if you have your own purchasing flow. Restricted to API users and platform admins. */
  status?: Maybe<BuyAlertStatus>;
  /** Investor has acknowledged or deliberately invisible */
  isHiddenForInvestor?: Maybe<Scalars['Boolean']>;
  /** Determines if this is a request to sell shares or to buy them */
  isSellBackRequest?: Maybe<Scalars['Boolean']>;
  entityID: Scalars['Int'];
};

/** Custom flow options for purchasing */
export type InvestorBuyAlertOptions = {
  /** Do not restrict based on wallet balance */
  ignoreWalletBalance?: Maybe<Scalars['Boolean']>;
  /** Will allow you to create multiple requests for the same share type (can lead to spam!). Please be sure to know what you are doing. */
  ignoreAllPreviousRequests?: Maybe<Scalars['Boolean']>;
  /** Will automatically set requests as signed, ignoring all signature requirements */
  ignoreSignatures?: Maybe<Scalars['Boolean']>;
  /** Ignore investing entity */
  ignoreEntity?: Maybe<Scalars['Boolean']>;
};

export type InvestorCategory = {
  value: Scalars['Int'];
  label: Scalars['String'];
};

/** Investor company profile data */
export type InvestorCompanyProfileInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  address: Scalars['String'];
  zip: Scalars['String'];
  town: Scalars['String'];
  state: Scalars['String'];
  country: Scalars['String'];
  phone: Scalars['String'];
  passportNumber: Scalars['String'];
  nationalID: Scalars['String'];
  driversLicenseID: Scalars['String'];
  birthDate: Scalars['String'];
  kinname?: Maybe<Scalars['String']>;
  kinphone?: Maybe<Scalars['String']>;
  kinemail?: Maybe<Scalars['String']>;
  notes: Scalars['String'];
  companyName: Scalars['String'];
  titleWithinCompany: Scalars['String'];
  powerToBindCompany: Scalars['Int'];
};

/** Customization options for creating investor via API */
export type InvestorCreateOptions = {
  /** Assumes you trust and approve the KYC input for this investor. Marks the user as KYC-approved and enables related actions. */
  autoAcceptKyc?: Maybe<Scalars['Boolean']>;
};

export type InvestorDepositAlert = {
  ID: Scalars['Int'];
  isApproved: Scalars['Int'];
  dateReceived: Scalars['String'];
  amount: Scalars['Float'];
  details: Scalars['String'];
  dateApproved: Scalars['String'];
  currencyID: Scalars['Int'];
  currency: Currency;
  isWithdrawFundsRequest: Scalars['Boolean'];
  buyAlertID?: Maybe<Scalars['Int']>;
};

/** Investors buy alert common fields */
export type InvestorDepositWithdrawAlertInput = {
  stoID: Scalars['Int'];
  channelID: Scalars['Int'];
  amount: Scalars['Float'];
  isWithdrawRequest: Scalars['Boolean'];
  details?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  swiftCode?: Maybe<Scalars['String']>;
  bankAccount?: Maybe<Scalars['String']>;
  transactionID?: Maybe<Scalars['String']>;
  buyAlertID?: Maybe<Scalars['Float']>;
};

export type InvestorInvitation = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  investorID: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailText?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type InvestorInvoices = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  buyAlertID: Scalars['Int'];
  investorID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  shareType: ShareType;
  paymentChannelID: Scalars['Int'];
  paymentChannel?: Maybe<PaymentChannel>;
  buyAlert: InvestorBuyAlert;
  shares: Scalars['Float'];
  amountToPay: Scalars['Float'];
  status: InvoiceStatusType;
  isBlockchain: Scalars['Boolean'];
  dateCreated: Scalars['Timestamp'];
  dateUpdated?: Maybe<Scalars['Timestamp']>;
  invoiceDescription?: Maybe<Scalars['String']>;
  investorWallet?: Maybe<Scalars['String']>;
};

/** Investor KYC data that can be updated by the admin. */
export type InvestorKycInput = {
  investorID: Scalars['Int'];
  status: Scalars['Int'];
  isKyc: Scalars['Boolean'];
  kycApplied: Scalars['Boolean'];
};

export type InvestorMarketSpaceInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  companyName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email: Scalars['String'];
  stoID: Scalars['Int'];
  investorType: Scalars['Int'];
  brokerID?: Maybe<Scalars['String']>;
  referredBy?: Maybe<Scalars['String']>;
  referredByID?: Maybe<Scalars['Float']>;
  phone: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
  kyc: Scalars['JSON'];
  options?: Maybe<InvestorCreateOptions>;
};

/** Investor profile data */
export type InvestorProfileInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  address: Scalars['String'];
  zip: Scalars['String'];
  town: Scalars['String'];
  state: Scalars['String'];
  country: Scalars['String'];
  phone: Scalars['String'];
  passportNumber: Scalars['String'];
  nationalID: Scalars['String'];
  driversLicenseID: Scalars['String'];
  birthDate: Scalars['String'];
  kinname?: Maybe<Scalars['String']>;
  kinphone?: Maybe<Scalars['String']>;
  kinemail?: Maybe<Scalars['String']>;
  notes: Scalars['String'];
};

export type InvestorSto = {
  ID: Scalars['Int'];
  isAccountClosed: Scalars['Int'];
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
  expectedShares: Scalars['Int'];
  expectedInvestment: Scalars['Int'];
  isKYC: Scalars['Int'];
  applied: Scalars['Boolean'];
  updateDate?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  inviteFriendEmailText?: Maybe<Scalars['String']>;
  usufructuaryFirstName?: Maybe<Scalars['String']>;
  usufructuaryLastName?: Maybe<Scalars['String']>;
  usufructuaryAddress?: Maybe<Scalars['String']>;
  usufructuaryCity?: Maybe<Scalars['String']>;
  usufructuaryCountry?: Maybe<Scalars['String']>;
  usufructuaryEmail?: Maybe<Scalars['String']>;
  beneficialFirstName?: Maybe<Scalars['String']>;
  beneficialLastName?: Maybe<Scalars['String']>;
  beneficialAddress?: Maybe<Scalars['String']>;
  beneficialCity?: Maybe<Scalars['String']>;
  beneficialCountry?: Maybe<Scalars['String']>;
  beneficialEmail?: Maybe<Scalars['String']>;
  beneficialBirth?: Maybe<Scalars['String']>;
  beneficialNationality?: Maybe<Scalars['String']>;
  isUsufructuary: Scalars['Int'];
  isActive: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  KycExpiryDate?: Maybe<Scalars['String']>;
};

/** Investor usufructuary data */
export type InvestorUsufructuaryInput = {
  ID: Scalars['Float'];
  isUsufructuary: Scalars['Float'];
  usufructuaryFirstName: Scalars['String'];
  usufructuaryLastName: Scalars['String'];
  usufructuaryAddress: Scalars['String'];
  usufructuaryCity: Scalars['String'];
  usufructuaryCountry: Scalars['String'];
  usufructuaryEmail: Scalars['String'];
};

/** KYC data */
export type KycData = {
  /** user ID */
  ID: Scalars['Float'];
  isKYC: Scalars['Boolean'];
  /** denotes if the login info is active */
  isActive: Scalars['Boolean'];
  /** investorSto status */
  status: Scalars['Float'];
};

export type KycField = {
  values?: Maybe<Array<KycFiledValue>>;
  name: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  type: Scalars['String'];
};

export type KycFiledValue = {
  value: Scalars['String'];
  label?: Maybe<Scalars['String']>;
};

export type KycPage = {
  fields: Array<KycField>;
  pages: Array<KycPage>;
  name: Scalars['String'];
  title: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

/** Kyc providers supported by the platform */
export enum KycProviders {
  Internal = 'Internal',
  BlockPass = 'BlockPass',
  SumSub = 'SumSub',
  Netki = 'Netki',
}

/** Denotes the step at which the platform should require the investor to pass KYC */
export enum KycRequirementStep {
  OnRegister = 'OnRegister',
  OnPurchase = 'OnPurchase',
  Ignore = 'Ignore',
  PrePayment = 'PrePayment',
}

/** All Types of Message */
export enum MessageType {
  Message = 'Message',
  File = 'File',
}

export type Meeting = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  title: Scalars['String'];
  type: Scalars['Int'];
  nameResponsiblePerson?: Maybe<Scalars['String']>;
  phoneResponsiblePerson?: Maybe<Scalars['String']>;
  emailResponsiblePerson?: Maybe<Scalars['String']>;
  nameProxyPerson?: Maybe<Scalars['String']>;
  phoneProxyPerson?: Maybe<Scalars['String']>;
  emailProxyPerson?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  openDate?: Maybe<Scalars['DateTime']>;
  opendate?: Maybe<Scalars['String']>;
  closeDate?: Maybe<Scalars['DateTime']>;
  closedate?: Maybe<Scalars['String']>;
  voteType: Scalars['Int'];
  timezone: Scalars['String'];
  timePadding: Scalars['Int'];
};

export type MercuryAccount = {
  accountNumber: Scalars['String'];
  routingNumber: Scalars['String'];
  electronicAccountType: Scalars['String'];
  address: MercuryAddress;
};

export type MercuryAddress = {
  address1: Scalars['String'];
  city: Scalars['String'];
  region: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
};

export type MercuryInfo = {
  accountNumber: Scalars['String'];
  routingNumber: Scalars['String'];
};

export type MercuryRecipient = {
  id: Scalars['String'];
  name: Scalars['String'];
  emails: Array<Scalars['String']>;
  paymentMethod: Scalars['String'];
  electronicRoutingInfo: MercuryAccount;
};

export type MoonpayConfig = {
  /** Enable/disable Moonpay as payment processor. */
  enabled?: Maybe<Scalars['Boolean']>;
  /** Parameter from your Moonpay company account. */
  publishableKey?: Maybe<Scalars['String']>;
  /** Parameter from your Moonpay company account. */
  secretKey?: Maybe<Scalars['String']>;
  /** Parameter from your Moonpay company account. */
  webhookKey?: Maybe<Scalars['String']>;
  /** MoonPay will redirect here on payment completion. */
  redirectUrl?: Maybe<Scalars['String']>;
  /** Will price shares to this cryptocurrency. */
  defaultCurrency?: Maybe<Scalars['String']>;
  /** Can not be set manually. It's the ID of the platform currency automatically matching defaultCurrency. */
  defaultCurrencyID?: Maybe<Scalars['String']>;
  /** Set up wallets for your company Moonpay crypto. Can set one global and/or multiple STO-specific wallets. The system will detect the STO and match it to a wallet when a payment is performed. */
  stoWallets?: Maybe<Array<MoonpayStoWallet>>;
  /** Preferred highlight color for the widget as specified in the MoonPay documentation */
  colorCode?: Maybe<Scalars['String']>;
  /** As specified in the MoonPay documentation */
  lockAmount?: Maybe<Scalars['Boolean']>;
  /** The MoonPay base URL for live-data transactions */
  liveUrl?: Maybe<Scalars['String']>;
  /** The MoonPay base URL for sandboxed transactions */
  sandboxUrl?: Maybe<Scalars['String']>;
  /** Use live data. CAUTION */
  liveMode?: Maybe<Scalars['Boolean']>;
  /** Value between 0-1. Will round up purchased shares whose fractional remainder is above this value. */
  doRoundUpOn?: Maybe<Scalars['Float']>;
  /** Value between 0-1. Will round down purchased shares whose fractional remainder is below this value. */
  doRoundDownOn?: Maybe<Scalars['Float']>;
  /** ISO 639-1 standard language code. Without this, the language used is the user's browser default. */
  language?: Maybe<Scalars['String']>;
};

export type MoonpayConfigInput = {
  /** Enable/disable Moonpay as payment processor. */
  enabled?: Maybe<Scalars['Boolean']>;
  /** Parameter from your Moonpay company account. */
  publishableKey?: Maybe<Scalars['String']>;
  /** Parameter from your Moonpay company account. */
  secretKey?: Maybe<Scalars['String']>;
  /** Parameter from your Moonpay company account. */
  webhookKey?: Maybe<Scalars['String']>;
  /** MoonPay will redirect here on payment completion. */
  redirectUrl?: Maybe<Scalars['String']>;
  /** Will price shares to this cryptocurrency. */
  defaultCurrency?: Maybe<Scalars['String']>;
  /** Can not be set manually. It's the ID of the platform currency automatically matching defaultCurrency. */
  defaultCurrencyID?: Maybe<Scalars['String']>;
  /** Set up wallets for your company Moonpay crypto. Can set one global and/or multiple STO-specific wallets. The system will detect the STO and match it to a wallet when a payment is performed. */
  stoWallets?: Maybe<Array<MoonpayStoWalletInput>>;
  /** Preferred highlight color for the widget as specified in the MoonPay documentation */
  colorCode?: Maybe<Scalars['String']>;
  /** As specified in the MoonPay documentation */
  lockAmount?: Maybe<Scalars['Boolean']>;
  /** The MoonPay base URL for live-data transactions */
  liveUrl?: Maybe<Scalars['String']>;
  /** The MoonPay base URL for sandboxed transactions */
  sandboxUrl?: Maybe<Scalars['String']>;
  /** Use live data. CAUTION */
  liveMode?: Maybe<Scalars['Boolean']>;
  /** Value between 0-1. Will round up purchased shares whose fractional remainder is above this value. */
  doRoundUpOn?: Maybe<Scalars['Float']>;
  /** Value between 0-1. Will round down purchased shares whose fractional remainder is below this value. */
  doRoundDownOn?: Maybe<Scalars['Float']>;
  /** ISO 639-1 standard language code. Without this, the language used is the user's browser default. */
  language?: Maybe<Scalars['String']>;
};

export type MoonpayStoWallet = {
  /** We will use the wallet for this STO ID only, and prefer it over any default wallet. Set stoID to 0 to set as global default wallet, used in case the current STO (when the payment is happening) has no set wallet. */
  stoID: Scalars['Int'];
  /** Use this to configure a single wallet address */
  walletAddress: Scalars['String'];
  /** (optional) The secondary cryptocurrency wallet address identifier for coins such as EOS, XRP and XMR */
  walletAddressTag?: Maybe<Scalars['String']>;
};

export type MoonpayStoWalletInput = {
  /** We will use the wallet for this STO ID only, and prefer it over any default wallet. Set stoID to 0 to set as global default wallet, used in case the current STO (when the payment is happening) has no set wallet. */
  stoID: Scalars['Int'];
  /** Use this to configure a single wallet address */
  walletAddress: Scalars['String'];
  /** (optional) The secondary cryptocurrency wallet address identifier for coins such as EOS, XRP and XMR */
  walletAddressTag?: Maybe<Scalars['String']>;
};

export type MoonpayTransactionData = {
  ID: Scalars['Float'];
  /** Data as we got it from MoonPay. */
  object?: Maybe<Scalars['JSON']>;
  objectType: Scalars['String'];
  dateUpdated: Scalars['DateTime'];
  localStatus: Scalars['String'];
  referenceID?: Maybe<Scalars['Int']>;
  investorID?: Maybe<Scalars['Int']>;
  shareTypeID?: Maybe<Scalars['Int']>;
};

export type MoonpayTransactionJson = {
  /** JSON as gotten from MoonPay. If we have it locally. */
  transactionJSON?: Maybe<Scalars['JSON']>;
  /** Our own data for this transaction. Also contains `object` which == transactionJSON */
  localData: MoonpayTransactionData;
};

export type Mutation = {
  /** Registers a payment sent from MoonPay, after the investor has initiated it. Both admin and investor role possible. */
  moonpayAddTransactionDefault: Scalars['Boolean'];
  /** Modify the platform configuration for Moonpay. Returns a status message on success. */
  moonpayConfigUpdate: Scalars['String'];
  /** Create an investors buy alert */
  investorBuyAlert: Scalars['Int'];
  /** Create an investors sell alert */
  investorSellAlert: Scalars['Int'];
  /** Create an investors buy alert as admin or API */
  investorBuyAlertAdmin: Scalars['Int'];
  /** Mutation for removing/hiding Investor Share Purchase Alert */
  investorBuyAlertRemove: Scalars['Boolean'];
  /** Approves and initiates a share transfer as if invoked from the administration panel */
  investorBuyAlertApprove: Scalars['Boolean'];
  /** Mutation for removing Investor Share Purchase Alert as admin or API */
  investorBuyAlertRemoveAdmin: Scalars['Boolean'];
  /** Mutation for declining Investor Share transaction as admin or API */
  investorBuyAlertDeclineAdmin: Scalars['Boolean'];
  /** Mutation for setting Investor Share Purchase Alert status (NOTE: Only updates status without any other actions) */
  investorBuyAlertSetStatus: Scalars['Boolean'];
  /** Mutation for hiding Investor Share Purchase Alert when no longer needed */
  investorBuyAlertHide: Scalars['Boolean'];
  /** Create an investors deposit or withdraw alert */
  investorDepositWithdrawAlert: Scalars['Boolean'];
  /** Mutation for creating Investing Entities */
  investorInvestingEntityCreate: Scalars['Boolean'];
  /** Mutation for updating Investing Entities */
  investorInvestingEntityUpdate: Scalars['Boolean'];
  /** Mutation for remove Investing Entities */
  investorInvestingEntityRemove: Scalars['Boolean'];
  /** Mutation for creating Investing Entity member */
  investorInvestingEntityMemberCreate: Scalars['Boolean'];
  /** Mutation for updating Investing Entity members */
  investorInvestingEntityMemberUpdate: Scalars['Boolean'];
  /** Mutation for remove Investing Entity members */
  investorInvestingEntityMemberRemove: Scalars['Boolean'];
  /** Mutation for setting status of Accreditation entity on sto admin */
  setStatusOfAccreditationOnStoAdmin: Array<InvestingEntity>;
  /** Mutation for sign up investor for market space */
  signUpMarketSpace: Scalars['Int'];
  /** Create an investors buy alert for market space */
  investorBuyAlertMarketSpace: Scalars['Int'];
  /** Mutation for creation an investor for market space */
  createInvestorMarketSpace: Scalars['Int'];
  /** Mutation for register investor vote */
  investorRegisterVote: Scalars['Boolean'];
  setMercuryRecipient: Scalars['Boolean'];
  createACHPayment: Scalars['Boolean'];
  syncMercuryTransactions: Scalars['Boolean'];
  sendMercuryInstructionalEmail: Scalars['Boolean'];
  /** Set a theme config */
  setThemeConfig: Scalars['Boolean'];
  /** Mutation for upload investors files */
  fileUpload: FileUploaded;
  /** Mutation for delete uploaded files */
  fileRemove: Scalars['Boolean'];
  /** Set DocuSign signature for document. Similar to setSharePurchaseDocumentSignature. */
  setDocuSignSignature: Scalars['Boolean'];
  /** Mutation for document comment creation */
  createComment: Scalars['Int'];
  /** Mutation for document comment updation */
  updateComment: Scalars['Boolean'];
  /** Mutation for document comment deletion */
  deleteComment: Scalars['Boolean'];
  /** Mutation for document setSignature */
  setSignature: Scalars['String'];
  /** Mutation for document sendContract */
  sendContract: Scalars['Boolean'];
  /** Mutation for document setSharePurchaseDocumentSignature */
  setSharePurchaseDocumentSignature: Scalars['String'];
  /** Mutation for document sendSharePurchaseContract */
  sendSharePurchaseContract: Scalars['Boolean'];
  /** Mutation for document deleteSharePurchaseRequest */
  deleteSharePurchaseRequest: Scalars['Boolean'];
  /** Mutation for document setSubmittedDocument */
  setSubmittedDocument: Scalars['Boolean'];
  /** Mutation for document setSubmittedSharePurchaseDocument */
  setSubmittedSharePurchaseDocument: Scalars['Boolean'];
  /** Mutation for create inbox */
  investorInboxCreate: Scalars['Int'];
  /** Mutation for Investor authorization */
  signIn: Scalars['String'];
  /** Mutation for Investor SSO authorization */
  signInSSO: Scalars['String'];
  /** Mutation for Investor 2FA confirmation */
  investor2FAConfirm: Scalars['String'];
  /** Mutation for Investor register */
  signUp: Scalars['Int'];
  /** Mutation for verify account */
  investorVerify: Scalars['Int'];
  /** Mutation for change password */
  investorChangePassword: Scalars['Boolean'];
  /** Mutation for toggle 2FA authorization */
  investorToggleTwoFA: Scalars['Boolean'];
  /** Mutation for reset password */
  investorReset: Scalars['Boolean'];
  /** Mutation for set new password */
  investorSetPassword: Scalars['Boolean'];
  /** Mutation for update usufructuary */
  investorUsufructuaryUpdate: Scalars['Boolean'];
  /** Mutation for update beneficial */
  investorBeneficialUpdate: Scalars['Boolean'];
  /** Mutation for update investor profile */
  investorProfile: Scalars['Boolean'];
  /** Mutation for update investor company profile */
  investorCompanyProfile: Scalars['Boolean'];
  /** Mutation for update investor kyc profile */
  fillKyc: Scalars['Boolean'];
  /** Mutation for apply investor kyc profile */
  applyKyc: Scalars['Boolean'];
  /** Mutation for add public key */
  investorPublicKeyAdd: Scalars['Boolean'];
  /** Mutation for delete public key */
  investorPublicKeyDelete: Scalars['Boolean'];
  /** Increase an investor's share balance and decrease the company's available shares in that type. */
  investorTransferShares: Scalars['Boolean'];
  /** Decrease an investor's available share balance and increase the company's shares in that type. */
  companyTransferShares: Scalars['Boolean'];
  /** Transfer shares between two entities. */
  transferSharesBetween: Scalars['Boolean'];
  /** Enable or disable an STO */
  setSTOStatus: Scalars['Boolean'];
  addMetadataKey: Scalars['Boolean'];
  removeMetadataKey: Scalars['Boolean'];
  /** Mutation for Admin authorization */
  adminSignIn?: Maybe<Scalars['String']>;
  /** Mutation for Investor authorization */
  generateAPIToken: Scalars['String'];
  /** Change Platform Params */
  setPlatformParam: Scalars['Int'];
  /** Mutation for updating Investing Entities Accreditation status */
  setEntityAccreditation: Scalars['Boolean'];
  /** Mutation for updating Investor's KYC data */
  updateInvestorKyc: Scalars['Boolean'];
  /** Mutation for deleting a link between an investor and the project. If the Project ID = 0, the investor will be completly delete from the platform. */
  deleteInvestorSto: Scalars['Boolean'];
  /** Mutation that for copying investors from one project to another (this will only copy the investor data and not their investments) */
  copyInvestorsToOtherProjects: Scalars['Boolean'];
  /** Mutation updates the meta value or creates if the meta value does not exist */
  updateMetadataValue: Scalars['Boolean'];
  /** Add new blockchain */
  addNewBlockchain: Scalars['Boolean'];
  /** Add new blockchain */
  updateBlockchain: Scalars['Boolean'];
  /** Check Blockchain Transaction with hash */
  verifyTransactionFromBlockchain?: Maybe<Scalars['String']>;
  /** Mutation for creating a Fee */
  feeCreate: Scalars['Boolean'];
  /** Mutation for updating a Fee */
  feeUpdate: Scalars['Boolean'];
  /** Mutation for removing a Fee */
  feeDelete: Scalars['Boolean'];
  /** Mutation for removing all Fees */
  feeDeleteAll: Scalars['Boolean'];
  /** Mutation for updating a Fee Commission */
  feeCommissionUpdate: Scalars['Boolean'];
  /** Mutation for removing a Fee Commission */
  feeCommissionDelete: Scalars['Boolean'];
  /** Mutation for removing all Fee Commissions */
  feeCommissionDeleteAll: Scalars['Boolean'];
  /**
   * This mutation triggers a refresh process for the logged in investor. It will re-fetch the data from SumSub servers.
   * Mainly used in order to manually fetch the investor status, in case the webhook never reaches the api,
   * yet the UI element reports the user has been verified
   */
  refreshInvestorData: Scalars['Boolean'];
  /** Create an exchange offer */
  createOffer: Scalars['Boolean'];
  /** Remove an exchange offer */
  deleteOffer: Scalars['Boolean'];
  /** Create an exchange sell order */
  createSellOrder: Scalars['Boolean'];
  /** Update an exchange sell order */
  updateSellOrder: Scalars['Boolean'];
  /** Create an exchange buy order */
  createBuyOrder: Scalars['Boolean'];
  /** Remove an exchange order */
  deleteOrder: Scalars['Boolean'];
  /** update exchange order status */
  updateOrderStatus: Scalars['Boolean'];
  /** Mutation for starting atomic swap */
  startSwap: Scalars['Boolean'];
  /** Mutation for accept atomic swap */
  acceptInternalSwap: Scalars['Boolean'];
  /** Mutation for Accepting Atomic Swap through Blockchain */
  acceptBlockchainSwap: Scalars['Boolean'];
  /** Mutation for blockchain transaction transfer */
  createBlockchainTransactionTransfer: Scalars['Float'];
  /** Delete an investor invoice alert */
  investorInvoiceAlertDelete: Scalars['Boolean'];
  /** Mutation for creating a message */
  messageCreate: Scalars['Int'];
  /** Mutation for updating a message */
  messageUpdate: Scalars['Boolean'];
  /** Mutation for updating Chats to Seen status */
  updateChatsToSeen: Scalars['Boolean'];
  /** Mutation for updating Chats to Seen status in Price Negotiation */
  updatePriceNegotiationChatsToSeen: Scalars['Boolean'];
  /** Mutation for removing one single Message */
  deleteOneMessage: Scalars['Boolean'];
  /** Mutation for removing one single Message Permanently */
  deleteOneMessagePermanently: Scalars['Boolean'];
  /** Mutation for removing Chat History */
  deleteChatHistory: Scalars['Boolean'];
  /** Mutation for removing Customer Support's Chat History */
  deleteCustomerSupportChatHistory: Scalars['Boolean'];
  /** Mutation for removing Chat History Permanently */
  deleteChatHistoryPermanently: Scalars['Boolean'];
  /** Mutation for removing Customer Support's Chat History Permanently */
  deleteCustomerSupportChatHistoryPermanently: Scalars['Boolean'];
  /** Mutation for removing Chat List */
  deleteChatList: Scalars['Boolean'];
  /** Mutation for removing Customer Support's Chat List */
  deleteCustomerSupportChatList: Scalars['Boolean'];
  /** Mutation for removing Chat List Permanently */
  deleteChatListPermanently: Scalars['Boolean'];
  /** Mutation for removing Customer Support's Chat List Permanently */
  deleteCustomerSupportChatListPermanently: Scalars['Boolean'];
  /** Mutation for sending an Email Notification to a group of Investors */
  sendEmailNotification: Scalars['Boolean'];
  /** Mutation for adding new investor bank details */
  addNewInvestorBankAccount: Scalars['String'];
  /** Mutation for inserting a component customization */
  customizedComponentsInsert: Scalars['Boolean'];
  /** Mutation for updating a component customization */
  customizedComponentsUpdate: Scalars['Boolean'];
  /** Mutation for removing a component customization */
  customizedComponentsDelete: Scalars['Boolean'];
};

export type MutationMoonpayAddTransactionDefaultArgs = {
  status: Scalars['String'];
  moonpayID: Scalars['String'];
};

export type MutationMoonpayConfigUpdateArgs = {
  config: MoonpayConfigInput;
};

export type MutationInvestorBuyAlertArgs = {
  query: InvestorBuyAlertInput;
};

export type MutationInvestorSellAlertArgs = {
  data: InvestorBuyAlertInput;
};

export type MutationInvestorBuyAlertAdminArgs = {
  options?: Maybe<InvestorBuyAlertOptions>;
  data: InvestorBuyAlertInputAdmin;
};

export type MutationInvestorBuyAlertRemoveArgs = {
  alertID: Scalars['Int'];
};

export type MutationInvestorBuyAlertApproveArgs = {
  alertID: Scalars['Int'];
};

export type MutationInvestorBuyAlertRemoveAdminArgs = {
  alertID: Scalars['Int'];
};

export type MutationInvestorBuyAlertDeclineAdminArgs = {
  alertID: Scalars['Int'];
};

export type MutationInvestorBuyAlertSetStatusArgs = {
  status: BuyAlertStatus;
  alertID: Scalars['Int'];
};

export type MutationInvestorBuyAlertHideArgs = {
  alertID: Scalars['Int'];
};

export type MutationInvestorDepositWithdrawAlertArgs = {
  data: InvestorDepositWithdrawAlertInput;
};

export type MutationInvestorInvestingEntityCreateArgs = {
  data: InvestingEntityInput;
};

export type MutationInvestorInvestingEntityUpdateArgs = {
  data: InvestingEntityInput;
  entityID: Scalars['Int'];
};

export type MutationInvestorInvestingEntityRemoveArgs = {
  entityID: Scalars['Int'];
};

export type MutationInvestorInvestingEntityMemberCreateArgs = {
  data: InvestingEntityMemberInput;
};

export type MutationInvestorInvestingEntityMemberUpdateArgs = {
  data: InvestingEntityMemberInput;
  memberID: Scalars['Int'];
};

export type MutationInvestorInvestingEntityMemberRemoveArgs = {
  memberID: Scalars['Int'];
};

export type MutationSetStatusOfAccreditationOnStoAdminArgs = {
  status: AccreditionStatus;
  entityID: Scalars['Int'];
};

export type MutationSignUpMarketSpaceArgs = {
  data: SignUpMarketSpaceInput;
};

export type MutationInvestorBuyAlertMarketSpaceArgs = {
  data: InvestorBuyAlertMsInput;
};

export type MutationCreateInvestorMarketSpaceArgs = {
  data: InvestorMarketSpaceInput;
};

export type MutationInvestorRegisterVoteArgs = {
  data: RegisterVoteInput;
};

export type MutationSetMercuryRecipientArgs = {
  routingNumber: Scalars['String'];
  accountNumber: Scalars['String'];
};

export type MutationCreateAchPaymentArgs = {
  idempotencyKey: Scalars['String'];
  amount: Scalars['Float'];
  stoID: Scalars['Int'];
};

export type MutationSendMercuryInstructionalEmailArgs = {
  stoID: Scalars['Int'];
  note: Scalars['String'];
  routingNumber: Scalars['String'];
  accountNumber: Scalars['String'];
};

export type MutationSetThemeConfigArgs = {
  theme: Scalars['String'];
};

export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};

export type MutationFileRemoveArgs = {
  file: Scalars['String'];
};

export type MutationSetDocuSignSignatureArgs = {
  docusignEnvelopeID: Scalars['String'];
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
};

export type MutationCreateCommentArgs = {
  text: Scalars['String'];
  documentID: Scalars['Int'];
};

export type MutationUpdateCommentArgs = {
  text: Scalars['String'];
  commentID: Scalars['Int'];
};

export type MutationDeleteCommentArgs = {
  commentID: Scalars['Int'];
};

export type MutationSetSignatureArgs = {
  base64: Scalars['String'];
  documentID: Scalars['Int'];
};

export type MutationSendContractArgs = {
  documentID: Scalars['Int'];
};

export type MutationSetSharePurchaseDocumentSignatureArgs = {
  investorID?: Maybe<Scalars['Int']>;
  sharePurchaseID: Scalars['Int'];
  base64: Scalars['String'];
  documentID: Scalars['Int'];
};

export type MutationSendSharePurchaseContractArgs = {
  sharePurchaseID: Scalars['Int'];
  documentID: Scalars['Int'];
};

export type MutationDeleteSharePurchaseRequestArgs = {
  documentID: Scalars['Int'];
};

export type MutationSetSubmittedDocumentArgs = {
  fieldValues: Array<DocumentFieldValueDto>;
  documentID: Scalars['Int'];
};

export type MutationSetSubmittedSharePurchaseDocumentArgs = {
  fieldValues: Array<DocumentFieldValueDto>;
  sharePurchaseID: Scalars['Int'];
  documentID: Scalars['Int'];
};

export type MutationInvestorInboxCreateArgs = {
  data: InboxInput;
};

export type MutationSignInArgs = {
  stoID: Scalars['Int'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationSignInSsoArgs = {
  data: SignInSsoInput;
};

export type MutationInvestor2FaConfirmArgs = {
  code: Scalars['Int'];
};

export type MutationSignUpArgs = {
  data: SignUpInput;
};

export type MutationInvestorVerifyArgs = {
  secret: Scalars['String'];
};

export type MutationInvestorChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationInvestorResetArgs = {
  stoID: Scalars['Int'];
  email: Scalars['String'];
};

export type MutationInvestorSetPasswordArgs = {
  data: SetPasswordInput;
};

export type MutationInvestorUsufructuaryUpdateArgs = {
  data: InvestorUsufructuaryInput;
};

export type MutationInvestorBeneficialUpdateArgs = {
  data: InvestorBeneficialInput;
};

export type MutationInvestorProfileArgs = {
  data: InvestorProfileInput;
};

export type MutationInvestorCompanyProfileArgs = {
  data: InvestorCompanyProfileInput;
};

export type MutationFillKycArgs = {
  data: Scalars['JSON'];
};

export type MutationApplyKycArgs = {
  applied: Scalars['Boolean'];
};

export type MutationInvestorPublicKeyAddArgs = {
  blockchainID: Scalars['Int'];
  title: Scalars['String'];
};

export type MutationInvestorPublicKeyDeleteArgs = {
  keyID: Scalars['Int'];
};

export type MutationInvestorTransferSharesArgs = {
  data: TransferShareInput;
};

export type MutationCompanyTransferSharesArgs = {
  data: TransferShareInput;
};

export type MutationTransferSharesBetweenArgs = {
  alert: Scalars['Int'];
  data: TransferShareInput;
  to: TransferEntity;
  from: TransferEntity;
};

export type MutationSetStoStatusArgs = {
  isActive: Scalars['Boolean'];
  stoID: Scalars['Int'];
};

export type MutationAddMetadataKeyArgs = {
  key: Scalars['String'];
};

export type MutationRemoveMetadataKeyArgs = {
  key: Scalars['String'];
};

export type MutationAdminSignInArgs = {
  platform?: Maybe<Scalars['Boolean']>;
  STO?: Maybe<Scalars['Int']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationSetPlatformParamArgs = {
  intValue?: Maybe<Scalars['Int']>;
  stringValue?: Maybe<Scalars['String']>;
  param: Scalars['String'];
};

export type MutationSetEntityAccreditationArgs = {
  isAccredited: Scalars['Boolean'];
  entityID: Scalars['Int'];
};

export type MutationUpdateInvestorKycArgs = {
  kycData: InvestorKycInput;
};

export type MutationDeleteInvestorStoArgs = {
  stoID: Scalars['Int'];
  investorID: Scalars['Int'];
};

export type MutationCopyInvestorsToOtherProjectsArgs = {
  investorIDs: Array<Scalars['Int']>;
  pasteStoID: Scalars['Int'];
  copyStoID: Scalars['Int'];
};

export type MutationUpdateMetadataValueArgs = {
  data: UpdateMetadataValueInput;
};

export type MutationAddNewBlockchainArgs = {
  title: Scalars['String'];
};

export type MutationUpdateBlockchainArgs = {
  title: Scalars['String'];
  ID: Scalars['Int'];
};

export type MutationVerifyTransactionFromBlockchainArgs = {
  data: VerifyCryptoReciepeInput;
};

export type MutationFeeCreateArgs = {
  data: FeeInput;
};

export type MutationFeeUpdateArgs = {
  data: FeeInput;
  feeID: Scalars['Int'];
};

export type MutationFeeDeleteArgs = {
  feeID: Scalars['Int'];
};

export type MutationFeeCommissionUpdateArgs = {
  data: FeeCommissionInput;
  feeCommissionID: Scalars['Int'];
};

export type MutationFeeCommissionDeleteArgs = {
  feeCommissionID: Scalars['Int'];
};

export type MutationCreateOfferArgs = {
  offer: ExchangeOfferInput;
};

export type MutationDeleteOfferArgs = {
  orderID: Scalars['Int'];
};

export type MutationCreateSellOrderArgs = {
  order: ExchangeSellOrderInput;
};

export type MutationUpdateSellOrderArgs = {
  data: ExchangeUpdateOrderInput;
  orderID: Scalars['Int'];
};

export type MutationCreateBuyOrderArgs = {
  order: ExchangeBuyOrderInput;
};

export type MutationDeleteOrderArgs = {
  orderID: Scalars['Int'];
};

export type MutationUpdateOrderStatusArgs = {
  atomicSwapCurrentStatus: AtomicSwapStatus;
  orderID: Scalars['Int'];
};

export type MutationStartSwapArgs = {
  offerID: Scalars['Int'];
};

export type MutationAcceptInternalSwapArgs = {
  offerID: Scalars['Int'];
};

export type MutationAcceptBlockchainSwapArgs = {
  orderID: Scalars['Int'];
  walletAddress: Scalars['String'];
};

export type MutationCreateBlockchainTransactionTransferArgs = {
  data: BlockchainSharesTransferTransactionsInput;
};

export type MutationInvestorInvoiceAlertDeleteArgs = {
  ID: Scalars['Int'];
};

export type MutationMessageCreateArgs = {
  data: ChatInput;
};

export type MutationMessageUpdateArgs = {
  data: ChatInput;
  chatID: Scalars['Int'];
};

export type MutationUpdateChatsToSeenArgs = {
  sender: SenderType;
  stoID: Scalars['Int'];
};

export type MutationUpdatePriceNegotiationChatsToSeenArgs = {
  counterpartID: Scalars['Int'];
  contextID: Scalars['Int'];
  context: ChatContext;
};

export type MutationDeleteOneMessageArgs = {
  chatID: Scalars['Int'];
};

export type MutationDeleteOneMessagePermanentlyArgs = {
  chatID: Scalars['Int'];
};

export type MutationDeleteChatHistoryArgs = {
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
};

export type MutationDeleteCustomerSupportChatHistoryArgs = {
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
};

export type MutationDeleteChatHistoryPermanentlyArgs = {
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
};

export type MutationDeleteCustomerSupportChatHistoryPermanentlyArgs = {
  investorID: Scalars['Int'];
  stoID: Scalars['Int'];
};

export type MutationDeleteChatListArgs = {
  stoID: Scalars['Int'];
};

export type MutationDeleteCustomerSupportChatListArgs = {
  stoID: Scalars['Int'];
};

export type MutationDeleteChatListPermanentlyArgs = {
  stoID: Scalars['Int'];
};

export type MutationDeleteCustomerSupportChatListPermanentlyArgs = {
  stoID: Scalars['Int'];
};

export type MutationSendEmailNotificationArgs = {
  message: Scalars['String'];
  stoID: Scalars['Int'];
  senderType: SenderType;
  investorIDs: Array<Scalars['Int']>;
};

export type MutationAddNewInvestorBankAccountArgs = {
  data: InvestorBankAccountInput;
};

export type MutationCustomizedComponentsInsertArgs = {
  data: ComponentCustomizationInput;
};

export type MutationCustomizedComponentsUpdateArgs = {
  data: ComponentCustomizationInput;
  componentID: Scalars['Int'];
};

export type MutationCustomizedComponentsDeleteArgs = {
  componentID?: Maybe<Scalars['Int']>;
};

/** Represents all the data an investor needs in order to sign up via netki */
export type NetkiSignUpData = {
  /** The access code required by the mobile app in order to start the KYC process */
  accessCode: Scalars['String'];
  /** HTML code that nicely represents where the user can get this the Netki App */
  mobileAppPanel: Scalars['String'];
};

export type NonKycInvestor = {
  ID?: Maybe<Scalars['Int']>;
  investorType?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  updateDate?: Maybe<Scalars['String']>;
};

export type OfferedDocument = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  documentID: Scalars['Int'];
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  document?: Maybe<Document>;
};

/** All Kinds of Payment Channel Types */
export enum PaymentChannelType {
  Mercury = 'Mercury',
  Internal = 'Internal',
  Metamask = 'Metamask',
}

/** The Status of the Commission Fee Payment */
export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export type PaymentChannel = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  channelType: PaymentChannelType;
  title: Scalars['String'];
  details: Scalars['String'];
  currencyID: Scalars['Int'];
  currency: Currency;
  isActive: Scalars['Boolean'];
  canWithdrawFunds: Scalars['Boolean'];
  depositInstructionText: Scalars['String'];
  depositInstructionEmailHeader: Scalars['String'];
  sendInstructionalDepositEmail: Scalars['Boolean'];
  adminEmailHeader: Scalars['String'];
  adminEmailBody: Scalars['String'];
  sendAdminEmail: Scalars['Boolean'];
};

export type Poll = {
  notVoted: Scalars['Int'];
  totalInvestors: Scalars['Int'];
  totalShares: Scalars['Int'];
  totalInvestment: Scalars['Int'];
};

export type PriceNegotiationListItem = {
  counterpartID: Scalars['Int'];
  orderID: Scalars['Int'];
  orderOwnerID: Scalars['Int'];
  isRead?: Maybe<Scalars['Boolean']>;
  dateRead?: Maybe<Scalars['Timestamp']>;
  formattedDateSent: Scalars['String'];
  counterpartFullName: Scalars['String'];
};

export type PropertyFile = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type PublicKey = {
  ID: Scalars['Int'];
  blockchainID: Scalars['Int'];
  title: Scalars['String'];
};

export type PublicSto = {
  settings: Settings;
  stolinkfull: Scalars['String'];
  logo: Scalars['String'];
  registrationText?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Query = {
  /** Get URL for Moonpay widget with configuration. Optionally match to buy alert immediately. (Reserves a transaction) */
  moonpayWidgetUrl: Scalars['String'];
  /** Get URL for Moonpay widget with configuration, as admin or API. Optionally match to buy alert immediately. (Reserves a transaction) */
  moonpayWidgetUrlAdmin: Scalars['String'];
  /** Get all accessible transactions, re-fetch them from MoonPay. Limit for refreshed data is top 50 newest transactions. */
  moonpayAllTransactionsJSON?: Maybe<Array<Scalars['JSON']>>;
  /** Get all accessible transactions as admin or API, re-fetch them from MoonPay. Limit for refreshed data is top 50 newest transactions. */
  moonpayAllTransactionsJSONAdmin?: Maybe<Array<Scalars['JSON']>>;
  /** Get last transaction for investor (where he has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay. */
  moonpayLastTransactionJSON?: Maybe<MoonpayTransactionJson>;
  /** NB: If you want to match a buy alert, use another endpoint. Get last transaction for investor as admin or API (where he has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay. */
  moonpayLastTransactionJSONAdmin?: Maybe<MoonpayTransactionJson>;
  /** Get transaction receipt for buy alert, as investor. */
  moonpayBuyAlertTransactionReceiptUrl?: Maybe<Scalars['String']>;
  /** Get transaction for buy alert as investor (who has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay. */
  moonpayBuyAlertTransactionJSON?: Maybe<MoonpayTransactionJson>;
  /** Get transaction for buy alert as admin or API (where investor has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay. */
  moonpayBuyAlertTransactionJSONAdmin?: Maybe<MoonpayTransactionJson>;
  /** Get transaction by its local ID (externalTransactionId on MoonPay) if accessible, re-fetch from MoonPay. */
  moonpayGetTransactionJSONAdmin?: Maybe<MoonpayTransactionJson>;
  /** Get transaction by its local ID (externalTransactionId) if accessible, re-fetch from MoonPay. */
  moonpayGetTransactionJSON?: Maybe<MoonpayTransactionJson>;
  /** Get the platform configuration for Moonpay. Warning: Contains sensitive information. */
  moonpayConfig: MoonpayConfig;
  /** Get all investors buy alerts */
  investorBuyAlerts?: Maybe<Array<InvestorBuyAlert>>;
  /** Get all investors buy alerts */
  investorBuyAlertsAdmin?: Maybe<Array<InvestorBuyAlert>>;
  /** Get investors deposit history */
  investorDepositHistory: Array<InvestorDepositAlert>;
  /** Get all investors Investing Entities */
  investorInvestingEntities: Array<InvestingEntity>;
  /** Get investors Investing Entity */
  investorInvestingEntity: InvestingEntity;
  /** Get All Investing Entity Types */
  investorInvestingEntityTypes: Array<InvestingEntityTypes>;
  /** Query for fetching all entities with waiting status */
  getAllUnConfirmedEntitiesforStoAdmin: Array<InvestingEntity>;
  /** Get investor selection */
  investorUserVoting: Array<VotingUser>;
  /** Get all meetings */
  investorAllMeeting: AllMeeting;
  /** Get meeting data */
  investorMeeting?: Maybe<Meeting>;
  /** Get poll statistics data */
  investorPoll: Poll;
  /** Get voting user data */
  investorVotingUserData?: Maybe<VotingUserData>;
  /** Get voting options */
  investorVotingOptions: Array<VotingOption>;
  /** Get voting document */
  investorVotingDocument?: Maybe<VotingDocuments>;
  getMercuryRecipient?: Maybe<MercuryRecipient>;
  getMercuryAccountInfo?: Maybe<MercuryInfo>;
  /** Get all countries */
  countries: Array<Scalars['String']>;
  /** Get investors application parameters */
  investorAppParameters: AppParameters;
  /** Get specific currency */
  findCurrency?: Maybe<Currency>;
  /** Get all currencies available */
  findAllCurrencies?: Maybe<Array<Currency>>;
  /** Get documents that are active for investors */
  commentableDocuments: Array<Document>;
  /** Get investors Offered Documents valid currently */
  offeredDocuments: Array<OfferedDocument>;
  /** Get an investors Offered Document by the documentId */
  offeredDocument: OfferedDocument;
  /** Get single document */
  document?: Maybe<Document>;
  /** Get investors Submitted Documents */
  submittedDocuments: Array<DocumentUser>;
  /** Get investors Submitted Document by Id */
  submittedDocument?: Maybe<DocumentUser>;
  /** Get investors Unfinished Documents */
  unfinishedDocument?: Maybe<DocumentUser>;
  /** Get all Document Fields of a Document */
  documentFields: Array<DocumentField>;
  /** Get documents required for purchasing shares */
  sharePurchaseDocuments: Array<SharePurchaseDocument>;
  /** Get Submitted Document corresponding to Share Purchase ID */
  sharePurchaseDocument?: Maybe<DocumentUser>;
  /** Get Submitted Document corresponding to Share Purchase ID */
  getPrefilledDocumentValues: Array<DocumentUserFieldValue>;
  /** Get DocuSign URL for signing redirect */
  getDocuSignUrl: Scalars['String'];
  /** Send a HelloSign contract signing request to the investor */
  sendHelloSignTemplateSignRequest: Scalars['String'];
  /** Get investors Comments */
  comments: Array<DocumentComment>;
  /** Get Url of Signed HelloSign Document */
  downloadSignedHelloSign: Scalars['String'];
  /** Get Signed DocuSign Document base64 */
  downloadSignedDocuSign: Scalars['String'];
  /** Get an investors inbox */
  investorInbox?: Maybe<Inbox>;
  /** Get all investors inboxes */
  investorInboxes?: Maybe<Array<Inbox>>;
  /** Get all users data */
  investorUser?: Maybe<User>;
  /** Query for new, unverified registrations, which will become investor records once verified by email. Only when email verification is required to access the dashbaord. Optionally, can be searched by exact ID, email, or secret */
  unverifiedRegistrations: Array<Register>;
  /** Query For Fetching Invitation Link */
  getInvitationLink: Scalars['String'];
  /** Get an investors balance */
  investorBalance?: Maybe<InvestorBalance>;
  /**
   * Get all investors balances at sto.
   *       Note: if Internal Wallet Mode is set to global, this endpoint will always return values for sto 0
   */
  investorBalances: Array<InvestorBalance>;
  /** Get the investor's portfolio value */
  portfolioValue: Scalars['Float'];
  /** Get investor sto information */
  investorSto: InvestorSto;
  /** Get investor kyc information */
  investorKyc: Scalars['JSON'];
  /** Get Kyc structure */
  kyc: Array<KycPage>;
  /** Get all stos payment channels */
  investorPaymentChannels: Array<PaymentChannel>;
  /** Get investors public keys */
  investorPublicKeys?: Maybe<Array<PublicKey>>;
  /** Check investor's public key to see it is whitelisted */
  isInvestorWhiteListed: Scalars['Boolean'];
  /** Get share types */
  findShareTypes: Array<ShareType>;
  /** Get share types */
  findAllShareTypes: Array<ShareType>;
  /** Get share historical values */
  findShareHistoricalValues: Array<ShareHistoricalData>;
  /** Get investor dividend payouts */
  findInvestorDividendPayouts: Array<DividendInvestorPayout>;
  /** Get an investors share */
  investorShare?: Maybe<Share>;
  /** Get an investor's share balance(s) in a share type(s) */
  investorShareBalance: Array<Share>;
  /** Get share balances for share type */
  shareTypeShares: Array<Share>;
  /** Get all investors shares */
  investorShares: Array<Share>;
  /** Get sto data */
  findSto?: Maybe<Sto>;
  /** Get public sto data */
  publicSto?: Maybe<PublicSto>;
  /** Get all stos */
  findAllSto: Array<Sto>;
  /** Get active properties */
  investorActiveProperties: Array<ActiveProperty>;
  /** Get property details */
  investorDetailProperty: DetailProperty;
  /** Get investor active STOs */
  investorRelatedSto: Array<ActiveProperty>;
  /** Get a one update */
  investorUpdate?: Maybe<Update>;
  /** Get all updates from sto */
  investorUpdates?: Maybe<Array<Update>>;
  /** Mutation for Investor authorization */
  adminMe?: Maybe<Admin>;
  /** Mutation for finding Investor accounts by *one* criterion among: ID, email, taxID, govtID. */
  findInvestor?: Maybe<Investor>;
  /** Mutation for finding multiple Investor accounts by Email array */
  findInvestors?: Maybe<Array<Investor>>;
  /** Mutation for listing all Investor accounts */
  findAllInvestors?: Maybe<Array<Investor>>;
  /** Mutation for Investor authorization */
  findAdmins: Array<AdminUser>;
  /** Gets all the investors that have not finished the KYC process */
  getNonKycInvestors: Array<NonKycInvestor>;
  /** Gets all the investors invitations */
  getInvestorInvitations: Array<InvestorInvitation>;
  /** Get the verifyInvestorCom url set in the database */
  getVerifyInvestorUrl: Scalars['String'];
  /** Get all blockchains available */
  findAllBlockchains?: Maybe<Array<Blockchains>>;
  /** Get all Fees related to a specific STO */
  fetchFees: Array<Fee>;
  /** Get Fee Commission by ID */
  fetchFeeCommissionsByID: FeeCommission;
  /** Get all Fee Commissions */
  fetchFeeCommissions: Array<FeeCommission>;
  /** Get Sum of Fee Commissions by Beneficiary ID and Beneficiary Type */
  getCommissionsSum: Scalars['Float'];
  /** Query for Getting the Sum of Investor's Collected Commissions */
  getInvestorCommissionsSum: Scalars['Float'];
  /** Get sum sub login token */
  getSumSubInvestorToken: Scalars['String'];
  /** Get Block Pass Client ID */
  getBlockPassClientID: Scalars['String'];
  getNetkiSignUpData: NetkiSignUpData;
  /** Get investors exchange offers */
  getExchangeOffers: Array<ExchangeOffer>;
  /** Get exchange orders offers */
  getExchangeOrderOffers: Array<ExchangeOffer>;
  /** Get investors accepted exchange offer */
  getAcceptedExchangeOffer?: Maybe<ExchangeOffer>;
  /** Get investors exchange offer */
  getExchangeOffer?: Maybe<ExchangeOffer>;
  /** Get all exchange orders */
  exchangeOrders: Array<ExchangeOrder>;
  /** Get investors exchange orders */
  getInvestorExchangeOrders: Array<ExchangeOrder>;
  /** Get all stos exchange orders */
  getExchangeOrders: Array<ExchangeOrder>;
  /** Get exchange order by ID */
  getExchangeOrder: ExchangeOrder;
  /** Get investors shares wallet */
  getSharesWallets: Array<SharesWallet>;
  /** Get swap tokens */
  getSwapTokens: Array<SwapToken>;
  /** Get all investor types */
  getInvestorTypes: Array<StoInvestorType>;
  /** Get all unpaid investors invoice alerts */
  investorInvoiceAlerts: Array<InvestorInvoices>;
  /** Get a specific investors invoice alert */
  investorInvoiceAlert: InvestorInvoices;
  /** Get all Chats between two sides */
  getChats: Array<Chat>;
  /** Get Price Negotiation Chat List */
  getPriceNegotiationList: Array<PriceNegotiationListItem>;
  /** Query for Getting the Number of Investor's Unread Messages */
  getUnreadMessagesCount: Scalars['Int'];
  /** Query for Getting the Number of Investor's Unread Messages in Price Negotiation */
  getPriceNegotiationUnreadMessagesCount: Scalars['Int'];
  /** Get Username by ID */
  getUsernameByID: Scalars['String'];
  /** Get Full Name by ID */
  getFullNameByID: Scalars['String'];
  /** Get all translations or translations for locale */
  translations: Array<Translation>;
  /** Get all translations or translations for locale */
  locales: Array<Scalars['String']>;
  /** Get component customization */
  fetchCustomizedComponent: ComponentCustomization;
  /** Get all customized components */
  fetchCustomizedComponents: Array<ComponentCustomization>;
};

export type QueryMoonpayWidgetUrlArgs = {
  alertID?: Maybe<Scalars['Int']>;
  shares: Scalars['Float'];
  shareTypeID: Scalars['Int'];
};

export type QueryMoonpayWidgetUrlAdminArgs = {
  alertID?: Maybe<Scalars['Int']>;
  investorID: Scalars['Int'];
  shares: Scalars['Float'];
  shareTypeID: Scalars['Int'];
};

export type QueryMoonpayAllTransactionsJsonAdminArgs = {
  investorID: Scalars['Int'];
};

export type QueryMoonpayLastTransactionJsonAdminArgs = {
  limit?: Maybe<Scalars['Int']>;
  investorID: Scalars['Int'];
};

export type QueryMoonpayBuyAlertTransactionReceiptUrlArgs = {
  alertID: Scalars['Int'];
};

export type QueryMoonpayBuyAlertTransactionJsonArgs = {
  alertID: Scalars['Int'];
};

export type QueryMoonpayBuyAlertTransactionJsonAdminArgs = {
  alertID: Scalars['Int'];
};

export type QueryMoonpayGetTransactionJsonAdminArgs = {
  transactionID: Scalars['Int'];
  investorID: Scalars['Int'];
};

export type QueryMoonpayGetTransactionJsonArgs = {
  transactionID: Scalars['Int'];
};

export type QueryInvestorBuyAlertsArgs = {
  status: Array<BuyAlertStatus>;
};

export type QueryInvestorBuyAlertsAdminArgs = {
  isSellRequest?: Maybe<Scalars['Boolean']>;
  alertID?: Maybe<Scalars['Int']>;
  status?: Maybe<BuyAlertStatus>;
  investorID?: Maybe<Scalars['Int']>;
};

export type QueryInvestorDepositHistoryArgs = {
  stoID: Scalars['Int'];
};

export type QueryInvestorInvestingEntityArgs = {
  entityID: Scalars['Int'];
};

export type QueryInvestorUserVotingArgs = {
  votingID: Scalars['Int'];
};

export type QueryInvestorAllMeetingArgs = {
  stoID: Scalars['Int'];
};

export type QueryInvestorMeetingArgs = {
  meetingID: Scalars['Int'];
};

export type QueryInvestorPollArgs = {
  meetingID: Scalars['Int'];
};

export type QueryInvestorVotingUserDataArgs = {
  votingID: Scalars['Int'];
};

export type QueryInvestorVotingOptionsArgs = {
  votingID: Scalars['Int'];
};

export type QueryInvestorVotingDocumentArgs = {
  documentID: Scalars['Int'];
};

export type QueryFindCurrencyArgs = {
  currencyID: Scalars['Int'];
};

export type QueryOfferedDocumentArgs = {
  documentID: Scalars['Int'];
};

export type QueryDocumentArgs = {
  documentID: Scalars['Int'];
};

export type QuerySubmittedDocumentsArgs = {
  minStatus: Scalars['Int'];
};

export type QuerySubmittedDocumentArgs = {
  submittedDocumentID: Scalars['Int'];
};

export type QueryUnfinishedDocumentArgs = {
  documentID: Scalars['Int'];
};

export type QueryDocumentFieldsArgs = {
  documentID: Scalars['Int'];
};

export type QuerySharePurchaseDocumentsArgs = {
  investorID?: Maybe<Scalars['Int']>;
  sharePurchaseID: Scalars['Int'];
};

export type QuerySharePurchaseDocumentArgs = {
  investorID?: Maybe<Scalars['Int']>;
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
};

export type QueryGetPrefilledDocumentValuesArgs = {
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
};

export type QueryGetDocuSignUrlArgs = {
  preferredReturnURL: Scalars['String'];
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
};

export type QuerySendHelloSignTemplateSignRequestArgs = {
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
};

export type QueryCommentsArgs = {
  documentID: Scalars['Int'];
};

export type QueryDownloadSignedHelloSignArgs = {
  fileID: Scalars['String'];
};

export type QueryDownloadSignedDocuSignArgs = {
  envelopeID: Scalars['String'];
};

export type QueryInvestorInboxArgs = {
  ID: Scalars['Int'];
};

export type QueryInvestorInboxesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  stoID: Scalars['Int'];
};

export type QueryUnverifiedRegistrationsArgs = {
  secret?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  ID?: Maybe<Scalars['Int']>;
};

export type QueryInvestorBalanceArgs = {
  stoID?: Maybe<Scalars['Int']>;
  currencyID?: Maybe<Scalars['Int']>;
  ID?: Maybe<Scalars['Int']>;
};

export type QueryInvestorBalancesArgs = {
  stoID: Scalars['Int'];
};

export type QueryPortfolioValueArgs = {
  stoID: Scalars['Int'];
};

export type QueryInvestorStoArgs = {
  investorID?: Maybe<Scalars['Int']>;
  stoID?: Maybe<Scalars['Int']>;
};

export type QueryInvestorPaymentChannelsArgs = {
  stoID: Scalars['Int'];
};

export type QueryIsInvestorWhiteListedArgs = {
  walletAddress: Scalars['String'];
};

export type QueryFindShareTypesArgs = {
  stoID?: Maybe<Scalars['Int']>;
};

export type QueryFindShareHistoricalValuesArgs = {
  shareTypeID: Scalars['Int'];
};

export type QueryInvestorShareArgs = {
  shareTypeID?: Maybe<Scalars['Int']>;
  ID?: Maybe<Scalars['Int']>;
};

export type QueryInvestorShareBalanceArgs = {
  shareTypeIDs?: Maybe<Array<Scalars['Int']>>;
  investorID: Scalars['Int'];
};

export type QueryShareTypeSharesArgs = {
  shareTypeID: Scalars['Int'];
};

export type QueryInvestorSharesArgs = {
  stoID?: Maybe<Scalars['Int']>;
  investorID?: Maybe<Scalars['Int']>;
};

export type QueryFindStoArgs = {
  ID: Scalars['Int'];
};

export type QueryPublicStoArgs = {
  stoID: Scalars['Int'];
};

export type QueryInvestorDetailPropertyArgs = {
  stoID: Scalars['Int'];
};

export type QueryInvestorUpdateArgs = {
  ID: Scalars['Int'];
};

export type QueryInvestorUpdatesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  stoID: Scalars['Int'];
};

export type QueryFindInvestorArgs = {
  passportNumber?: Maybe<Scalars['String']>;
  govtID?: Maybe<Scalars['String']>;
  taxID?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  investorID?: Maybe<Scalars['Int']>;
};

export type QueryFindInvestorsArgs = {
  emails: Array<Scalars['String']>;
};

export type QueryFindAdminsArgs = {
  email?: Maybe<Scalars['String']>;
};

export type QueryGetNonKycInvestorsArgs = {
  name?: Maybe<Scalars['String']>;
  stoID: Scalars['Int'];
};

export type QueryGetInvestorInvitationsArgs = {
  stoID: Scalars['Int'];
};

export type QueryFetchFeesArgs = {
  type?: Maybe<FeeType>;
  status?: Maybe<CommissionType>;
  beneficiary?: Maybe<FeeBeneficiary>;
  stoID: Scalars['Int'];
};

export type QueryFetchFeeCommissionsByIdArgs = {
  feeCommissionID: Scalars['Int'];
};

export type QueryFetchFeeCommissionsArgs = {
  status?: Maybe<PaymentStatus>;
  beneficiaryType?: Maybe<BrokerType>;
  beneficiaryID?: Maybe<Scalars['Int']>;
  transactionID?: Maybe<Scalars['Int']>;
  feeID?: Maybe<Scalars['Int']>;
};

export type QueryGetCommissionsSumArgs = {
  status?: Maybe<PaymentStatus>;
  beneficiaryType?: Maybe<BrokerType>;
  beneficiaryID: Scalars['Int'];
};

export type QueryGetInvestorCommissionsSumArgs = {
  status?: Maybe<PaymentStatus>;
};

export type QueryGetExchangeOffersArgs = {
  type: ExchangeType;
  stoID: Scalars['Int'];
};

export type QueryGetExchangeOrderOffersArgs = {
  orderID: Scalars['Int'];
};

export type QueryGetAcceptedExchangeOfferArgs = {
  orderID: Scalars['Int'];
};

export type QueryGetExchangeOfferArgs = {
  orderID: Scalars['Int'];
};

export type QueryGetInvestorExchangeOrdersArgs = {
  stoID?: Maybe<Scalars['Int']>;
  type: ExchangeType;
};

export type QueryGetExchangeOrdersArgs = {
  stoID: Scalars['Int'];
};

export type QueryGetExchangeOrderArgs = {
  orderID: Scalars['Int'];
};

export type QueryGetSharesWalletsArgs = {
  platform?: Maybe<Scalars['Boolean']>;
  stoID?: Maybe<Scalars['Int']>;
  shareTypeID?: Maybe<Scalars['Int']>;
};

export type QueryInvestorInvoiceAlertArgs = {
  ID: Scalars['Int'];
};

export type QueryGetChatsArgs = {
  counterpartID?: Maybe<Scalars['Int']>;
  contextID?: Maybe<Scalars['Int']>;
  context?: Maybe<ChatContext>;
  stoID?: Maybe<Scalars['Int']>;
  chatBetween: ChatBetween;
};

export type QueryGetPriceNegotiationListArgs = {
  orderID: Scalars['Int'];
};

export type QueryGetUnreadMessagesCountArgs = {
  sender: SenderType;
  stoID: Scalars['Int'];
};

export type QueryGetPriceNegotiationUnreadMessagesCountArgs = {
  counterpartID?: Maybe<Scalars['Int']>;
  contextID: Scalars['Int'];
  context: ChatContext;
};

export type QueryGetUsernameByIdArgs = {
  userID: Scalars['Int'];
};

export type QueryGetFullNameByIdArgs = {
  userID: Scalars['Int'];
};

export type QueryTranslationsArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type QueryFetchCustomizedComponentArgs = {
  componentTitle?: Maybe<Scalars['String']>;
  componentID?: Maybe<Scalars['Int']>;
};

/** All Types of Message Receiver */
export enum ReceiverType {
  Investor = 'Investor',
  Admin = 'Admin',
  Platform = 'Platform',
}

export type Register = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  secret?: Maybe<Scalars['String']>;
  investorType: Scalars['Int'];
  companyName?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  referByInvestorID: Scalars['Int'];
  brokerID?: Maybe<Scalars['String']>;
};

/** Register Investor vote data */
export type RegisterVoteInput = {
  type: Scalars['Float'];
  optionID: Scalars['Float'];
  meetingID: Scalars['Float'];
  vote: Scalars['Float'];
};

/** All Types of Message Sender */
export enum SenderType {
  Investor = 'Investor',
  Admin = 'Admin',
  Platform = 'Platform',
}

/** Set password data */
export type SetPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type Settings = {
  investorCategories: Array<InvestorCategory>;
  isInternalExchangeEnabled: Scalars['Int'];
  favicon?: Maybe<Scalars['String']>;
  tabTitle?: Maybe<Scalars['String']>;
};

export type Share = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  shareType: ShareType;
  publicKey?: Maybe<Scalars['String']>;
  isBlockchainFrozen: Scalars['Int'];
  isBlockchainAuthorized: Scalars['Int'];
  shares: Scalars['Float'];
  investorID: Scalars['Int'];
  sharesHistoryID: Scalars['Int'];
};

export type ShareHistoricalData = {
  ID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  stoID: Scalars['Int'];
  premiumValue: Scalars['Float'];
  dateOfChange?: Maybe<Scalars['Timestamp']>;
};

export type SharePurchaseDocument = {
  requireOnce: Scalars['Int'];
  document: Document;
  status: Scalars['Int'];
};

/** Denotes the provider of documents for share purchases */
export enum SharePurchaseModeEnum {
  Internal = 'INTERNAL',
  Docusign = 'DOCUSIGN',
  Hellosign = 'HELLOSIGN',
}

export type ShareType = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  stoID: Scalars['Int'];
  totalShares: Scalars['Float'];
  companyShares: Scalars['Float'];
  custodianShares: Scalars['Float'];
  nominalValue: Scalars['Float'];
  isBlockchain: Scalars['Boolean'];
  ethereumContractAddress?: Maybe<Scalars['String']>;
  premiumValue: Scalars['Float'];
  currencyID: Scalars['Int'];
  currency: Currency;
  ethereumBlockchainPublicAddress?: Maybe<Scalars['String']>;
  minimumSharesToBuyByInvestor: Scalars['Float'];
  blockchainProtocol: Scalars['Int'];
  reduceSharesForPurchase: Scalars['Float'];
  walletCustodyType: Scalars['Int'];
  sellToCompany: Scalars['Boolean'];
  sellValue: Scalars['Float'];
  isShareNosApplicable: Scalars['Boolean'];
  isCertificateNosApplicable: Scalars['Boolean'];
  channelIDForAutoPayments?: Maybe<Scalars['Int']>;
  availableShare: Scalars['Float'];
  totalPrice: Scalars['Float'];
  blockchaindecimals: Scalars['Int'];
};

export type SharesWallet = {
  ID: Scalars['Int'];
  investorID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  shareType: ShareType;
  shares: Scalars['Float'];
  publicKey?: Maybe<Scalars['String']>;
  isBlocked?: Maybe<Scalars['Boolean']>;
  investor?: Maybe<Investor>;
};

/** SSO investor data */
export type SignInSsoInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

/** New investor data */
export type SignUpInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  companyName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email: Scalars['String'];
  stoID: Scalars['Int'];
  investorType: Scalars['Int'];
  brokerID?: Maybe<Scalars['String']>;
};

export type SignUpMarketSpaceInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  companyName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email: Scalars['String'];
  stoID: Scalars['Int'];
  investorType: Scalars['Int'];
  brokerID?: Maybe<Scalars['String']>;
  referredBy?: Maybe<Scalars['String']>;
  referredByID?: Maybe<Scalars['Float']>;
  phone: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
};

export type Sto = {
  ID: Scalars['Int'];
  title: Scalars['String'];
  details: Scalars['String'];
  isActive: Scalars['Int'];
  logo: Scalars['String'];
  ethereumContractAddress: Scalars['String'];
  ethereumWhitelistAddress: Scalars['String'];
  disclaimer: Scalars['String'];
  stolink: Scalars['String'];
  stolinkfull: Scalars['String'];
  stoType: Scalars['Int'];
  stoInvestorTypes: Array<Scalars['Int']>;
  emailFooter: Scalars['String'];
  registrationText?: Maybe<Scalars['String']>;
  website: Scalars['String'];
  stoInvestorTypesNotOnShareRegister: Array<Scalars['Int']>;
  companyType: Scalars['Int'];
  registrationSuccessText: Scalars['String'];
  tellAFriendText: Scalars['String'];
  inviteFriendEmailText: Scalars['String'];
  fullDetails: Scalars['String'];
  exchangeOpenDate: Scalars['String'];
  propertyPicture: Scalars['String'];
  docusign_sto_contract: Scalars['String'];
  docusign_sto_purchase: Scalars['String'];
  externalSystemID: Scalars['Int'];
  projectAddress: Scalars['String'];
  legalDetails: Scalars['String'];
  isBuyButtonEnabled: Scalars['Boolean'];
  isBimountEnabled?: Maybe<Scalars['Int']>;
  projectCost?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Timestamp'];
  verifyInvestorComHostToken?: Maybe<Scalars['String']>;
  helloSignClientID?: Maybe<Scalars['String']>;
  investmentReturn: Scalars['Float'];
  picture: Scalars['String'];
  logoUrl: Scalars['String'];
  parsedSettings: Settings;
  images: Array<PropertyFile>;
  documents: Array<PropertyFile>;
  baseCurrencyID: Scalars['Int'];
  meta: Array<StoMetaValue>;
  popularity: Scalars['Int'];
};

export type StoInvestorType = {
  ID: Scalars['Float'];
  type: Scalars['String'];
};

export type StoMetaValue = {
  stoID: Scalars['Float'];
  key: Scalars['String'];
  value: Scalars['String'];
  order: Scalars['Float'];
  display: Scalars['Boolean'];
};

export type Subscription = {
  /** Get the user's KYC data */
  rootKyc: KycData;
  /** Subscription for getting the last Chat record between two sides */
  getLastChatRecord: Chat;
};

export type SwapToken = {
  ID: Scalars['Int'];
  address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** Terms and Conditions Config */
export type TermsAndConditionsConfig = {
  /** URL to T&C Page */
  link: Scalars['String'];
  /** Text that appears on the hyperlink to T&C */
  text: Scalars['String'];
};

/** Represents an actor type in a share transfer */
export enum TransferEntity {
  Investor = 'Investor',
  Company = 'Company',
  Custodian = 'Custodian',
}

/** Transfer share data */
export type TransferShareInput = {
  stoID: Scalars['Int'];
  investorID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
  tokensToTransfer: Scalars['Float'];
  investment: Scalars['Float'];
  investmentDescription: Scalars['String'];
  certificateNos?: Maybe<Scalars['String']>;
  shareNos?: Maybe<Scalars['String']>;
  /** Idempotency token to verify transfer */
  token?: Maybe<Scalars['String']>;
};

export type Translation = {
  key: Scalars['String'];
  locale: Scalars['String'];
  translation: Scalars['String'];
};

export type Update = {
  ID: Scalars['Int'];
  stoID: Scalars['Int'];
  title: Scalars['String'];
  details: Scalars['String'];
  coverphoto: Scalars['String'];
  date: Scalars['String'];
};

/** Update meta value data */
export type UpdateMetadataValueInput = {
  key: Scalars['String'];
  value: Scalars['String'];
  stoID: Scalars['Int'];
};

export type User = {
  investor: Investor;
  sto: Sto;
  investorSto: InvestorSto;
};

/** Crypto Reciepe data */
export type VerifyCryptoReciepeInput = {
  transactionHash: Scalars['String'];
  details: Scalars['String'];
  currencyID: Scalars['Int'];
  amount: Scalars['Float'];
  channelID: Scalars['Int'];
  stoID: Scalars['Int'];
};

export type VotingDocuments = {
  ID: Scalars['Int'];
  votingID: Scalars['Int'];
  votingOptionID: Scalars['Int'];
  votingOption: VotingOption;
  documentLink: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type VotingOption = {
  ID: Scalars['Int'];
  votingID: Scalars['Int'];
  optionTxt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  companyComments: Scalars['String'];
  isActiveByAdmin: Scalars['Int'];
  documents: Array<VotingDocuments>;
  userVotedOption?: Maybe<VotingUser>;
  votingUserStatistic: VotingUserStatistic;
};

export type VotingUser = {
  ID: Scalars['Int'];
  votingID: Scalars['Int'];
  userID: Scalars['Int'];
  votingOptionID: Scalars['Int'];
  votingOption: VotingOption;
  votingOptionValue: Scalars['Int'];
  votesContributed: Scalars['Int'];
  isCastedByInvestor: Scalars['Int'];
  investmentContributed: Scalars['Int'];
  nominalInvestmentContributed: Scalars['Int'];
};

export type VotingUserData = {
  ID: Scalars['Int'];
  investorID: Scalars['Int'];
  votingID: Scalars['Int'];
  attendMeeting: Scalars['Int'];
  unannouncedDecision: Scalars['Int'];
};

export type VotingUserStatistic = {
  votesYes: Scalars['Int'];
  votesNo: Scalars['Int'];
  votesAbstention: Scalars['Int'];
  count: Scalars['Int'];
};

/** Enum for Status of Accredition */
export enum AccreditionStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Declined = 'DECLINED',
}

export type Blockchains = {
  ID: Scalars['Int'];
  title: Scalars['String'];
};

export type VerifyInvestorQueryVariables = Exact<{ [key: string]: never }>;

export type VerifyInvestorQuery = Pick<Query, 'getVerifyInvestorUrl'> & {
  investorUser?: Maybe<{
    sto: Pick<
      Sto,
      | 'ID'
      | 'title'
      | 'details'
      | 'isActive'
      | 'logo'
      | 'ethereumContractAddress'
      | 'ethereumWhitelistAddress'
      | 'disclaimer'
      | 'stolink'
      | 'stolinkfull'
      | 'stoType'
      | 'stoInvestorTypes'
      | 'registrationText'
      | 'stoInvestorTypesNotOnShareRegister'
      | 'companyType'
      | 'registrationSuccessText'
      | 'fullDetails'
      | 'exchangeOpenDate'
      | 'propertyPicture'
      | 'externalSystemID'
      | 'projectAddress'
      | 'legalDetails'
      | 'picture'
      | 'verifyInvestorComHostToken'
    > & {
      parsedSettings: { investorCategories: Array<Pick<InvestorCategory, 'value' | 'label'>> };
      images: Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>;
      documents: Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>;
    };
    investor: Pick<
      Investor,
      | 'ID'
      | 'firstName'
      | 'lastName'
      | 'address'
      | 'country'
      | 'phone'
      | 'cell'
      | 'zip'
      | 'town'
      | 'state'
      | 'email'
      | 'passportNumber'
      | 'nationalID'
      | 'kinname'
      | 'kinphone'
      | 'kinemail'
      | 'investorType'
      | 'companyName'
      | 'titleWithinCompany'
      | 'powerToBindCompany'
      | 'birthDate'
      | 'isTwoFactorEnabled'
      | 'language'
      | 'middleName'
      | 'socialSecurity'
      | 'mailingAddress'
      | 'faxNumber'
      | 'maritalStatus'
      | 'occupation'
      | 'employerName'
      | 'employerAddress'
      | 'retirementAccount'
      | 'trustOrBusinessEntity'
      | 'dateIncorporation'
      | 'taxID'
      | 'govtID'
      | 'isTax'
      | 'secondaryContactName'
      | 'secondaryContactPhone'
      | 'secondaryContactEmail'
      | 'primaryContactName'
      | 'primaryContactPhone'
      | 'primaryContactEmail'
      | 'countryBusiness'
      | 'countryCitizenship'
      | 'taxCountry'
      | 'userName'
    >;
    investorSto: Pick<
      InvestorSto,
      | 'ID'
      | 'isAccountClosed'
      | 'investorID'
      | 'stoID'
      | 'expectedShares'
      | 'expectedInvestment'
      | 'isKYC'
      | 'applied'
      | 'status'
      | 'usufructuaryFirstName'
      | 'usufructuaryLastName'
      | 'usufructuaryAddress'
      | 'usufructuaryCity'
      | 'usufructuaryCountry'
      | 'usufructuaryEmail'
      | 'beneficialFirstName'
      | 'beneficialLastName'
      | 'beneficialAddress'
      | 'beneficialCity'
      | 'beneficialCountry'
      | 'beneficialEmail'
      | 'beneficialBirth'
      | 'beneficialNationality'
      | 'isUsufructuary'
      | 'isActive'
      | 'notes'
    >;
  }>;
};

export type MessageCreateMutationVariables = Exact<{
  data: ChatInput;
}>;

export type MessageCreateMutation = Pick<Mutation, 'messageCreate'>;

export type UpdateChatsToSeenMutationVariables = Exact<{
  sender: SenderType;
  stoID: Scalars['Int'];
}>;

export type UpdateChatsToSeenMutation = Pick<Mutation, 'updateChatsToSeen'>;

export type UpdatePriceNegotiationChatsToSeenMutationVariables = Exact<{
  context: ChatContext;
  contextID: Scalars['Int'];
  counterpartID: Scalars['Int'];
}>;

export type UpdatePriceNegotiationChatsToSeenMutation = Pick<Mutation, 'updatePriceNegotiationChatsToSeen'>;

export type GetPriceNegotiationListQueryVariables = Exact<{
  orderID: Scalars['Int'];
}>;

export type GetPriceNegotiationListQuery = {
  getPriceNegotiationList: Array<
    Pick<
      PriceNegotiationListItem,
      'counterpartID' | 'orderID' | 'orderOwnerID' | 'isRead' | 'dateRead' | 'formattedDateSent' | 'counterpartFullName'
    >
  >;
};

export type GetChatsQueryVariables = Exact<{
  chatBetween: ChatBetween;
  stoID?: Maybe<Scalars['Int']>;
  context?: Maybe<ChatContext>;
  contextID?: Maybe<Scalars['Int']>;
  counterpartID?: Maybe<Scalars['Int']>;
}>;

export type GetChatsQuery = {
  getChats: Array<
    Pick<
      Chat,
      | 'ID'
      | 'sender'
      | 'receiver'
      | 'investorID'
      | 'adminID'
      | 'stoID'
      | 'message'
      | 'type'
      | 'dateSent'
      | 'isRead'
      | 'dateRead'
      | 'isEdited'
      | 'location'
      | 'isDeleted'
      | 'context'
      | 'contextID'
      | 'contextReceiverID'
    >
  >;
};

export type GetStoInfoQueryVariables = Exact<{
  stoID: Scalars['Int'];
}>;

export type GetStoInfoQuery = { findSto?: Maybe<Pick<Sto, 'ID' | 'title' | 'details'>> };

export type GetUnreadMessagesCountQueryVariables = Exact<{
  sender: SenderType;
  stoID: Scalars['Int'];
}>;

export type GetUnreadMessagesCountQuery = Pick<Query, 'getUnreadMessagesCount'>;

export type GetPriceNegotiationUnreadMessagesCountQueryVariables = Exact<{
  context: ChatContext;
  contextID: Scalars['Int'];
  counterpartID?: Maybe<Scalars['Int']>;
}>;

export type GetPriceNegotiationUnreadMessagesCountQuery = Pick<Query, 'getPriceNegotiationUnreadMessagesCount'>;

export type GetLastChatRecordSubscriptionVariables = Exact<{ [key: string]: never }>;

export type GetLastChatRecordSubscription = {
  getLastChatRecord: Pick<
    Chat,
    | 'ID'
    | 'sender'
    | 'receiver'
    | 'investorID'
    | 'adminID'
    | 'stoID'
    | 'message'
    | 'type'
    | 'dateSent'
    | 'isRead'
    | 'dateRead'
    | 'isEdited'
    | 'location'
    | 'isDeleted'
    | 'context'
    | 'contextID'
    | 'contextReceiverID'
  >;
};

export type GetInvestorCommissionsSumQueryVariables = Exact<{
  status?: Maybe<PaymentStatus>;
}>;

export type GetInvestorCommissionsSumQuery = Pick<Query, 'getInvestorCommissionsSum'>;

export type CustomizationAppDataQueryVariables = Exact<{
  componentTitle?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['Int']>;
}>;

export type CustomizationAppDataQuery = {
  fetchCustomizedComponent: Pick<ComponentCustomization, 'ID' | 'component' | 'body'>;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  sto: Scalars['Int'];
}>;

export type SignInMutation = Pick<Mutation, 'signIn'>;

export type SignInSsoMutationVariables = Exact<{
  data: SignInSsoInput;
}>;

export type SignInSsoMutation = Pick<Mutation, 'signInSSO'>;

export type SignUpMarketSpaceMutationVariables = Exact<{
  data: SignUpMarketSpaceInput;
}>;

export type SignUpMarketSpaceMutation = Pick<Mutation, 'signUpMarketSpace'>;

export type UploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;

export type UploadMutation = { fileUpload: Pick<FileUploaded, 'link' | 'name'> };

export type FileRemoveMutationVariables = Exact<{
  file: Scalars['String'];
}>;

export type FileRemoveMutation = Pick<Mutation, 'fileRemove'>;

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;

export type SignUpMutation = Pick<Mutation, 'signUp'>;

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;

export type ChangePasswordMutation = Pick<Mutation, 'investorChangePassword'>;

export type ToggleTwoFaMutationVariables = Exact<{ [key: string]: never }>;

export type ToggleTwoFaMutation = Pick<Mutation, 'investorToggleTwoFA'>;

export type InvestorPublicKeyAddMutationVariables = Exact<{
  title: Scalars['String'];
  blockchainID: Scalars['Int'];
}>;

export type InvestorPublicKeyAddMutation = Pick<Mutation, 'investorPublicKeyAdd'>;

export type InvestorPublicKeyDeleteMutationVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InvestorPublicKeyDeleteMutation = Pick<Mutation, 'investorPublicKeyDelete'>;

export type InvestorProfileMutationVariables = Exact<{
  data: InvestorProfileInput;
}>;

export type InvestorProfileMutation = Pick<Mutation, 'investorProfile'>;

export type UsufructuaryUpdateMutationVariables = Exact<{
  data: InvestorUsufructuaryInput;
}>;

export type UsufructuaryUpdateMutation = Pick<Mutation, 'investorUsufructuaryUpdate'>;

export type BeneficialUpdateMutationVariables = Exact<{
  data: InvestorBeneficialInput;
}>;

export type BeneficialUpdateMutation = Pick<Mutation, 'investorBeneficialUpdate'>;

export type InvestorVerifyMutationVariables = Exact<{
  secret: Scalars['String'];
}>;

export type InvestorVerifyMutation = Pick<Mutation, 'investorVerify'>;

export type InvestorResetMutationVariables = Exact<{
  email: Scalars['String'];
  STO: Scalars['Int'];
}>;

export type InvestorResetMutation = Pick<Mutation, 'investorReset'>;

export type TwoFaConfirmMutationVariables = Exact<{
  code: Scalars['Int'];
}>;

export type TwoFaConfirmMutation = Pick<Mutation, 'investor2FAConfirm'>;

export type InvestorSetPasswordMutationVariables = Exact<{
  data: SetPasswordInput;
}>;

export type InvestorSetPasswordMutation = Pick<Mutation, 'investorSetPassword'>;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  investorUser?: Maybe<{
    sto: Pick<
      Sto,
      | 'ID'
      | 'title'
      | 'details'
      | 'isActive'
      | 'logo'
      | 'ethereumContractAddress'
      | 'ethereumWhitelistAddress'
      | 'disclaimer'
      | 'stolink'
      | 'stolinkfull'
      | 'stoType'
      | 'stoInvestorTypes'
      | 'registrationText'
      | 'stoInvestorTypesNotOnShareRegister'
      | 'companyType'
      | 'registrationSuccessText'
      | 'fullDetails'
      | 'exchangeOpenDate'
      | 'propertyPicture'
      | 'externalSystemID'
      | 'projectAddress'
      | 'legalDetails'
      | 'picture'
      | 'verifyInvestorComHostToken'
    > & {
      parsedSettings: Pick<Settings, 'favicon' | 'tabTitle'> & {
        investorCategories: Array<Pick<InvestorCategory, 'value' | 'label'>>;
      };
      images: Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>;
      documents: Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>;
    };
    investor: Pick<
      Investor,
      | 'ID'
      | 'firstName'
      | 'lastName'
      | 'address'
      | 'country'
      | 'phone'
      | 'cell'
      | 'zip'
      | 'town'
      | 'state'
      | 'email'
      | 'passportNumber'
      | 'nationalID'
      | 'driversLicenseID'
      | 'kinname'
      | 'kinphone'
      | 'kinemail'
      | 'investorType'
      | 'companyName'
      | 'titleWithinCompany'
      | 'powerToBindCompany'
      | 'birthDate'
      | 'isTwoFactorEnabled'
      | 'language'
      | 'middleName'
      | 'socialSecurity'
      | 'mailingAddress'
      | 'faxNumber'
      | 'maritalStatus'
      | 'occupation'
      | 'employerName'
      | 'employerAddress'
      | 'retirementAccount'
      | 'trustOrBusinessEntity'
      | 'dateIncorporation'
      | 'taxID'
      | 'govtID'
      | 'isTax'
      | 'secondaryContactName'
      | 'secondaryContactPhone'
      | 'secondaryContactEmail'
      | 'primaryContactName'
      | 'primaryContactPhone'
      | 'primaryContactEmail'
      | 'countryBusiness'
      | 'countryCitizenship'
      | 'taxCountry'
      | 'userName'
      | 'investmentLimitUpdateDate'
      | 'allowedTotalInvestment'
      | 'yearlyTotalInvestment'
    >;
    investorSto: Pick<
      InvestorSto,
      | 'ID'
      | 'isAccountClosed'
      | 'investorID'
      | 'stoID'
      | 'expectedShares'
      | 'expectedInvestment'
      | 'isKYC'
      | 'applied'
      | 'status'
      | 'usufructuaryFirstName'
      | 'usufructuaryLastName'
      | 'usufructuaryAddress'
      | 'usufructuaryCity'
      | 'usufructuaryCountry'
      | 'usufructuaryEmail'
      | 'beneficialFirstName'
      | 'beneficialLastName'
      | 'beneficialAddress'
      | 'beneficialCity'
      | 'beneficialCountry'
      | 'beneficialEmail'
      | 'beneficialBirth'
      | 'beneficialNationality'
      | 'isUsufructuary'
      | 'isActive'
      | 'notes'
    >;
  }>;
};

export type InfoQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InfoQuery = {
  publicSto?: Maybe<
    Pick<PublicSto, 'stolinkfull' | 'logo' | 'registrationText' | 'title'> & {
      settings: Pick<Settings, 'favicon' | 'tabTitle'> & {
        investorCategories: Array<Pick<InvestorCategory, 'value' | 'label'>>;
      };
    }
  >;
};

export type InvestorPublicKeysQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorPublicKeysQuery = { investorPublicKeys?: Maybe<Array<Pick<PublicKey, 'ID' | 'title'>>> };

export type InvestorActiveStoQueryVariables = Exact<{
  _id?: Maybe<Scalars['Int']>;
}>;

export type InvestorActiveStoQuery = {
  investorSto: Pick<
    InvestorSto,
    | 'ID'
    | 'isAccountClosed'
    | 'investorID'
    | 'stoID'
    | 'expectedShares'
    | 'expectedInvestment'
    | 'isKYC'
    | 'applied'
    | 'status'
    | 'usufructuaryFirstName'
    | 'usufructuaryLastName'
    | 'usufructuaryAddress'
    | 'usufructuaryCity'
    | 'usufructuaryCountry'
    | 'usufructuaryEmail'
    | 'beneficialFirstName'
    | 'beneficialLastName'
    | 'beneficialAddress'
    | 'beneficialCity'
    | 'beneficialCountry'
    | 'beneficialEmail'
    | 'beneficialBirth'
    | 'beneficialNationality'
    | 'isUsufructuary'
    | 'isActive'
    | 'notes'
  >;
};

export type CountriesQueryVariables = Exact<{ [key: string]: never }>;

export type CountriesQuery = Pick<Query, 'countries'>;

export type InvestorAppDataQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorAppDataQuery = {
  investorAppParameters: Pick<
    AppParameters,
    | 'IsMarketSpace'
    | 'IsDocuSignActive'
    | 'IsHelloSignActive'
    | 'areSTOHostnamesEnabled'
    | 'KycProvider'
    | 'IsDarwSignatureActive'
    | 'IsCheckMarkSignatureActive'
    | 'web3Address'
    | 'polygonWeb3Address'
    | 'binanceWeb3Address'
    | 'IsInternalWalletStoSpecific'
    | 'IsInternalWalletGlobal'
    | 'IsInternalWalletDisabled'
    | 'poweredByLabel'
    | 'isSSOModeEnabled'
    | 'clientKYC'
    | 'SSORedirectFrontEnd'
    | 'KycRequirementStep'
    | 'IsMoonpayEnabled'
    | 'is2FAEnabledByDefault'
    | 'doAutomaticBlockchainTransactionChecks'
    | 'doAutomaticPurchase'
    | 'isInvoicingEnabled'
    | 'atomicSwapContractAddress'
    | 'isAccreditationEnabled'
    | 'AccreditationProvider'
    | 'AccreddRedirectLink'
    | 'isCloudStorageEnabled'
    | 'is2FAForcedForAll'
    | 'isPropertySortingEnabled'
    | 'isWalletManagementModuleEnabled'
    | 'isMyPortfolioModuleEnabled'
    | 'isActiveOfferingsModuleEnabled'
    | 'isNewsModuleEnabled'
    | 'isContractsModuleEnabled'
    | 'isCorporateActionsModuleEnabled'
    | 'isTradingModuleEnabled'
    | 'isChatModuleEnabled'
    | 'isSupportModuleEnabled'
    | 'isInvestorOwnershipModuleEnabled'
    | 'isSettingsModuleEnabled'
    | 'isTellAFriendModuleEnabled'
    | 'isAccreditationModuleEnabled'
    | 'isContactTheSponsorFontSwitchEnabled'
    | 'isSellBackEnabled'
    | 'isBankDetailsSwitchEnabled'
    | 'isBlockchainAddressSwitchEnabled'
    | 'toggleThemeEditor'
    | 'accreditationRequirementStep'
    | 'accreditationRequiringCountries'
    | 'skipDocumentSignScreen'
    | 'allowInvestorsToRegister'
    | 'hideContractsTilPostPurchase'
    | 'isInvestmentReturnCalculationEnabled'
    | 'isDriversLicenseEnabled'
    | 'isInternalTokenizedPurchaseEnabled'
    | 'isAllDocumentsSignedPopUpEnabled'
    | 'isMergingPaymentsSharesRequestsEnabled'
  > & { termsAndConditionsConfig: Pick<TermsAndConditionsConfig, 'link' | 'text'> };
};

export type GetInvestorTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetInvestorTypesQuery = { getInvestorTypes: Array<Pick<StoInvestorType, 'ID' | 'type'>> };

export type SaveContractFieldsMutationVariables = Exact<{
  documentID: Scalars['Int'];
  fieldValues: Array<DocumentFieldValueDto> | DocumentFieldValueDto;
}>;

export type SaveContractFieldsMutation = Pick<Mutation, 'setSubmittedDocument'>;

export type SaveContractSignatureMutationVariables = Exact<{
  documentID: Scalars['Int'];
  signature: Scalars['String'];
}>;

export type SaveContractSignatureMutation = Pick<Mutation, 'setSignature'>;

export type SendContractMutationVariables = Exact<{
  documentID: Scalars['Int'];
}>;

export type SendContractMutation = Pick<Mutation, 'sendContract'>;

export type OfferedDocumentQueryVariables = Exact<{
  documentID: Scalars['Int'];
}>;

export type OfferedDocumentQuery = {
  offeredDocument: { document?: Maybe<Pick<Document, 'ID' | 'title' | 'contents'>> };
  unfinishedDocument?: Maybe<
    Pick<DocumentUser, 'status'> & {
      fieldValues?: Maybe<Array<Pick<DocumentUserFieldValue, 'ID' | 'value'>>>;
      signature?: Maybe<Pick<CloudFiles, 'url' | 'modified'>>;
    }
  >;
  documentFields: Array<Pick<DocumentField, 'ID' | 'title' | 'type' | 'helperText'>>;
};

export type SubmittedDocumentQueryVariables = Exact<{
  submittedDocumentID: Scalars['Int'];
}>;

export type SubmittedDocumentQuery = {
  submittedDocument?: Maybe<
    Pick<DocumentUser, 'contents' | 'status'> & {
      fieldValues?: Maybe<Array<Pick<DocumentUserFieldValue, 'ID' | 'value'>>>;
      signature?: Maybe<Pick<CloudFiles, 'url' | 'modified'>>;
      document: Pick<Document, 'title'>;
    }
  >;
};

export type ContractsPageQueryVariables = Exact<{ [key: string]: never }>;

export type ContractsPageQuery = {
  offeredDocuments: Array<Pick<OfferedDocument, 'title' | 'to'> & { document?: Maybe<Pick<Document, 'ID' | 'title'>> }>;
  submittedDocuments: Array<
    Pick<DocumentUser, 'ID' | 'status' | 'signatureFilePath'> & {
      document: Pick<Document, 'ID' | 'title' | 'docusignDocumentID' | 'helloSignDocumentID'>;
      signature?: Maybe<Pick<CloudFiles, 'modified'>>;
    }
  >;
};

export type DownloadSignedHelloSignQueryVariables = Exact<{
  fileID: Scalars['String'];
}>;

export type DownloadSignedHelloSignQuery = Pick<Query, 'downloadSignedHelloSign'>;

export type DownloadSignedDocuSignQueryVariables = Exact<{
  envelopeID: Scalars['String'];
}>;

export type DownloadSignedDocuSignQuery = Pick<Query, 'downloadSignedDocuSign'>;

export type CreateNewBuyOrderMutationVariables = Exact<{
  order: ExchangeBuyOrderInput;
}>;

export type CreateNewBuyOrderMutation = Pick<Mutation, 'createBuyOrder'>;

export type CreateNewSellOrderMutationVariables = Exact<{
  order: ExchangeSellOrderInput;
}>;

export type CreateNewSellOrderMutation = Pick<Mutation, 'createSellOrder'>;

export type UpdateSellOrderMutationVariables = Exact<{
  orderID: Scalars['Int'];
  data: ExchangeUpdateOrderInput;
}>;

export type UpdateSellOrderMutation = Pick<Mutation, 'updateSellOrder'>;

export type DeleteOrderMutationVariables = Exact<{
  orderID: Scalars['Int'];
}>;

export type DeleteOrderMutation = Pick<Mutation, 'deleteOrder'>;

export type DeleteOfferMutationVariables = Exact<{
  orderID: Scalars['Int'];
}>;

export type DeleteOfferMutation = Pick<Mutation, 'deleteOffer'>;

export type StartSwapMutationVariables = Exact<{
  offerID: Scalars['Int'];
}>;

export type StartSwapMutation = Pick<Mutation, 'startSwap'>;

export type CreateNewOfferMutationVariables = Exact<{
  offer: ExchangeOfferInput;
}>;

export type CreateNewOfferMutation = Pick<Mutation, 'createOffer'>;

export type AcceptInternalSwapMutationVariables = Exact<{
  offerID: Scalars['Int'];
}>;

export type AcceptInternalSwapMutation = Pick<Mutation, 'acceptInternalSwap'>;

export type AcceptBlockchainSwapMutationVariables = Exact<{
  walletAddress: Scalars['String'];
  orderID: Scalars['Int'];
}>;

export type AcceptBlockchainSwapMutation = Pick<Mutation, 'acceptBlockchainSwap'>;

export type CompanyTransferSharesMutationVariables = Exact<{
  data: TransferShareInput;
}>;

export type CompanyTransferSharesMutation = Pick<Mutation, 'companyTransferShares'>;

export type UpdateOrderStatusMutationVariables = Exact<{
  atomicSwapCurrentStatus: AtomicSwapStatus;
  orderId: Scalars['Int'];
}>;

export type UpdateOrderStatusMutation = Pick<Mutation, 'updateOrderStatus'>;

export type GetInvestorExchangeOrdersQueryVariables = Exact<{
  type: ExchangeType;
  stoID?: Maybe<Scalars['Int']>;
}>;

export type GetInvestorExchangeOrdersQuery = {
  getInvestorExchangeOrders: Array<
    Pick<
      ExchangeOrder,
      | 'ID'
      | 'atomicSwapAcceptable'
      | 'atomicSwapCurrentStatus'
      | 'dateFrom'
      | 'dateTo'
      | 'rateFrom'
      | 'rateTo'
      | 'shares'
      | 'type'
    > & { shareType: Pick<ShareType, 'title'> & { currency: Pick<Currency, 'ID' | 'symbol'> } }
  >;
};

export type GetExchangeOrdersQueryVariables = Exact<{
  stoID: Scalars['Int'];
}>;

export type GetExchangeOrdersQuery = {
  getExchangeOrders: Array<
    Pick<
      ExchangeOrder,
      'ID' | 'atomicSwapAcceptable' | 'atomicSwapCurrentStatus' | 'dateFrom' | 'rateFrom' | 'rateTo' | 'shares' | 'type'
    > & { shareType: Pick<ShareType, 'title'> & { currency: Pick<Currency, 'ID' | 'symbol'> } }
  >;
};

export type GetMyOffersQueryVariables = Exact<{
  stoID: Scalars['Int'];
  type: ExchangeType;
}>;

export type GetMyOffersQuery = {
  getExchangeOffers: Array<
    Pick<ExchangeOffer, 'ID' | 'rateFrom' | 'sharesPartial'> & {
      exchangeOrder: Pick<
        ExchangeOrder,
        'ID' | 'dateFrom' | 'dateTo' | 'rateFrom' | 'atomicSwapAcceptable' | 'atomicSwapCurrentStatus'
      > & { shareType: Pick<ShareType, 'title'> & { currency: Pick<Currency, 'ID' | 'symbol'> } };
    }
  >;
};

export type FindShareTypesQueryVariables = Exact<{
  stoID: Scalars['Int'];
}>;

export type FindShareTypesQuery = {
  findShareTypes: Array<
    Pick<ShareType, 'ID' | 'stoID' | 'title' | 'nominalValue' | 'premiumValue'> & { currency: Pick<Currency, 'symbol'> }
  >;
};

export type GetExchangeOrderDetailQueryVariables = Exact<{
  orderID: Scalars['Int'];
}>;

export type GetExchangeOrderDetailQuery = {
  getExchangeOrderOffers: Array<
    Pick<
      ExchangeOffer,
      | 'sharesPartial'
      | 'rateFrom'
      | 'rateTo'
      | 'description'
      | 'atomicSwapAccepted'
      | 'atomicSwapSecret'
      | 'atomicBuyerPublicKey'
      | 'atomicSwapExpireDate'
      | 'investorID'
      | 'ID'
    >
  >;
  getExchangeOrder: Pick<
    ExchangeOrder,
    'ID' | 'type' | 'dateFrom' | 'dateTo' | 'shares' | 'rateFrom' | 'atomicSwapAcceptable' | 'investorID' | 'stoID'
  > & { shareType: Pick<ShareType, 'title'> & { currency: Pick<Currency, 'symbol'> } };
};

export type GetExchangeOfferDetailQueryVariables = Exact<{
  orderID: Scalars['Int'];
}>;

export type GetExchangeOfferDetailQuery = {
  getExchangeOffer?: Maybe<
    Pick<
      ExchangeOffer,
      | 'sharesPartial'
      | 'rateFrom'
      | 'rateTo'
      | 'description'
      | 'atomicSwapAccepted'
      | 'atomicSwapSecret'
      | 'atomicBuyerPublicKey'
      | 'atomicSwapExpireDate'
      | 'investorID'
      | 'ID'
    >
  >;
  getExchangeOrder: Pick<
    ExchangeOrder,
    | 'ID'
    | 'type'
    | 'stoID'
    | 'dateFrom'
    | 'dateTo'
    | 'shares'
    | 'rateFrom'
    | 'atomicSwapAcceptable'
    | 'atomicSwapCurrentStatus'
    | 'atomicSwapTokenAddressAcceptable'
    | 'investorID'
  > & {
    atomicSwapSharesWallet?: Maybe<Pick<SharesWallet, 'publicKey'>>;
    shareType: Pick<
      ShareType,
      'ID' | 'title' | 'isBlockchain' | 'ethereumBlockchainPublicAddress' | 'ethereumContractAddress'
    > & { currency: Pick<Currency, 'ID' | 'symbol'> };
  };
};

export type GetAcceptedExchangeOfferQueryVariables = Exact<{
  orderID: Scalars['Int'];
}>;

export type GetAcceptedExchangeOfferQuery = {
  getAcceptedExchangeOffer?: Maybe<
    Pick<
      ExchangeOffer,
      | 'ID'
      | 'exchangeOrderID'
      | 'investorID'
      | 'stoID'
      | 'sharesPartial'
      | 'rateFrom'
      | 'rateTo'
      | 'description'
      | 'atomicSwapAccepted'
      | 'atomicSwapSecret'
      | 'atomicBuyerPublicKey'
      | 'atomicSwapExpireDate'
    >
  >;
};

export type GetExchangeNewOfferQueryVariables = Exact<{
  currencyID: Scalars['Int'];
  stoID: Scalars['Int'];
  shareTypeID: Scalars['Int'];
}>;

export type GetExchangeNewOfferQuery = {
  investorBalance?: Maybe<Pick<InvestorBalance, 'amount'>>;
  getSharesWallets: Array<Pick<SharesWallet, 'ID' | 'isBlocked' | 'publicKey' | 'shares'>>;
};

export type GetInvestorPlatformBalanceQueryVariables = Exact<{
  shareTypeID: Scalars['Int'];
}>;

export type GetInvestorPlatformBalanceQuery = {
  getSharesWallets: Array<Pick<SharesWallet, 'shares'>>;
  investorShare?: Maybe<Pick<Share, 'shares'>>;
};

export type RefreshInvestorDataMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshInvestorDataMutation = Pick<Mutation, 'refreshInvestorData'>;

export type GetSumSubInvestorTokenQueryVariables = Exact<{ [key: string]: never }>;

export type GetSumSubInvestorTokenQuery = Pick<Query, 'getSumSubInvestorToken'>;

export type GetBlockPassClientIdQueryVariables = Exact<{ [key: string]: never }>;

export type GetBlockPassClientIdQuery = Pick<Query, 'getBlockPassClientID'>;

export type GetNetkiSignUpDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetNetkiSignUpDataQuery = { getNetkiSignUpData: Pick<NetkiSignUpData, 'accessCode' | 'mobileAppPanel'> };

export type RootKycSubscriptionVariables = Exact<{ [key: string]: never }>;

export type RootKycSubscription = { rootKyc: Pick<KycData, 'isKYC' | 'isActive' | 'status' | 'ID'> };

export type FetchFeesQueryVariables = Exact<{
  stoID: Scalars['Int'];
  beneficiary?: Maybe<FeeBeneficiary>;
  type?: Maybe<FeeType>;
  status?: Maybe<CommissionType>;
}>;

export type FetchFeesQuery = { fetchFees: Array<Pick<Fee, 'ID' | 'beneficiary' | 'type' | 'amount' | 'status'>> };

export type GetInvitationLinkQueryVariables = Exact<{ [key: string]: never }>;

export type GetInvitationLinkQuery = Pick<Query, 'getInvitationLink'>;

export type CreateInboxMutationVariables = Exact<{
  data: InboxInput;
}>;

export type CreateInboxMutation = Pick<Mutation, 'investorInboxCreate'>;

export type InboxDataQueryVariables = Exact<{
  sto: Scalars['Int'];
  offset: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
}>;

export type InboxDataQuery = {
  investorInboxes?: Maybe<
    Array<
      Pick<
        Inbox,
        'ID' | 'stoID' | 'investorID' | 'title' | 'details' | 'date' | 'isResponded' | 'response' | 'responseDate'
      >
    >
  >;
};

export type InboxMessageQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InboxMessageQuery = {
  investorInbox?: Maybe<
    Pick<
      Inbox,
      'ID' | 'stoID' | 'investorID' | 'title' | 'details' | 'date' | 'response' | 'isResponded' | 'responseDate'
    >
  >;
};

export type InvestorInvestingEntityCreateMutationVariables = Exact<{
  data: InvestingEntityInput;
}>;

export type InvestorInvestingEntityCreateMutation = Pick<Mutation, 'investorInvestingEntityCreate'>;

export type InvestorInvestingEntityUpdateMutationVariables = Exact<{
  data: InvestingEntityInput;
  entityID: Scalars['Int'];
}>;

export type InvestorInvestingEntityUpdateMutation = Pick<Mutation, 'investorInvestingEntityUpdate'>;

export type InvestorInvestingEntityRemoveMutationVariables = Exact<{
  entityID: Scalars['Int'];
}>;

export type InvestorInvestingEntityRemoveMutation = Pick<Mutation, 'investorInvestingEntityRemove'>;

export type InvestorInvestingEntityMemberCreateMutationVariables = Exact<{
  data: InvestingEntityMemberInput;
}>;

export type InvestorInvestingEntityMemberCreateMutation = Pick<Mutation, 'investorInvestingEntityMemberCreate'>;

export type InvestorInvestingEntityMemberUpdateMutationVariables = Exact<{
  data: InvestingEntityMemberInput;
  memberID: Scalars['Int'];
}>;

export type InvestorInvestingEntityMemberUpdateMutation = Pick<Mutation, 'investorInvestingEntityMemberUpdate'>;

export type InvestorInvestingEntityMemberRemoveMutationVariables = Exact<{
  memberID: Scalars['Int'];
}>;

export type InvestorInvestingEntityMemberRemoveMutation = Pick<Mutation, 'investorInvestingEntityMemberRemove'>;

export type InvestorBuyAlertMarketSpaceMutationVariables = Exact<{
  data: InvestorBuyAlertMsInput;
}>;

export type InvestorBuyAlertMarketSpaceMutation = Pick<Mutation, 'investorBuyAlertMarketSpace'>;

export type InvestorInvestingEntitiesQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorInvestingEntitiesQuery = {
  investorInvestingEntities: Array<
    Pick<
      InvestingEntity,
      | 'ID'
      | 'investorID'
      | 'typeID'
      | 'taxId'
      | 'name'
      | 'nickname'
      | 'accredited'
      | 'paymentMethod'
      | 'address'
      | 'city'
      | 'postalCode'
      | 'country'
      | 'state'
      | 'isApprovedByAdmin'
    > & {
      type: Pick<InvestingEntityTypes, 'ID' | 'title' | 'countries'>;
      members: Array<
        Pick<
          InvestingEntityMember,
          'ID' | 'investorID' | 'entityID' | 'firstName' | 'lastName' | 'role' | 'signatory' | 'email'
        >
      >;
    }
  >;
};

export type InvestorEntityTypesQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorEntityTypesQuery = {
  investorInvestingEntityTypes: Array<Pick<InvestingEntityTypes, 'ID' | 'title' | 'countries'>>;
};

export type GetInvestingEntityQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type GetInvestingEntityQuery = {
  investorInvestingEntity: Pick<InvestingEntity, 'name' | 'address' | 'city' | 'country' | 'nickname'>;
};

export type IsInvestorWhiteListedQueryVariables = Exact<{
  walletAddress: Scalars['String'];
}>;

export type IsInvestorWhiteListedQuery = Pick<Query, 'isInvestorWhiteListed'>;

export type AddNewInvestorBankAccountMutationVariables = Exact<{
  data: InvestorBankAccountInput;
}>;

export type AddNewInvestorBankAccountMutation = Pick<Mutation, 'addNewInvestorBankAccount'>;

export type FillKycMutationVariables = Exact<{
  data: Scalars['JSON'];
}>;

export type FillKycMutation = Pick<Mutation, 'fillKyc'>;

export type ApplyKycMutationVariables = Exact<{
  applied: Scalars['Boolean'];
}>;

export type ApplyKycMutation = Pick<Mutation, 'applyKyc'>;

export type JsonKycQueryVariables = Exact<{ [key: string]: never }>;

export type JsonKycQuery = {
  kyc: Array<
    Pick<KycPage, 'name' | 'title' | 'icon'> & {
      pages: Array<
        Pick<KycPage, 'name' | 'title' | 'icon'> & {
          fields: Array<
            Pick<KycField, 'name' | 'label' | 'placeholder' | 'description' | 'error' | 'required' | 'type'> & {
              values?: Maybe<Array<Pick<KycFiledValue, 'value' | 'label'>>>;
            }
          >;
        }
      >;
    }
  >;
};

export type InvestorKycQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorKycQuery = Pick<Query, 'investorKyc'>;

export type InvestorRegisterVoteMutationVariables = Exact<{
  data: RegisterVoteInput;
}>;

export type InvestorRegisterVoteMutation = Pick<Mutation, 'investorRegisterVote'>;

export type GetMeetingsQueryVariables = Exact<{
  stoId: Scalars['Int'];
}>;

export type GetMeetingsQuery = {
  investorAllMeeting: {
    past: Array<
      Pick<
        Meeting,
        | 'ID'
        | 'stoID'
        | 'title'
        | 'type'
        | 'nameResponsiblePerson'
        | 'phoneResponsiblePerson'
        | 'emailResponsiblePerson'
        | 'nameProxyPerson'
        | 'phoneProxyPerson'
        | 'emailProxyPerson'
        | 'place'
        | 'openDate'
        | 'opendate'
        | 'closeDate'
        | 'closedate'
        | 'voteType'
        | 'timezone'
        | 'timePadding'
      >
    >;
    current: Array<
      Pick<
        Meeting,
        | 'ID'
        | 'stoID'
        | 'title'
        | 'type'
        | 'nameResponsiblePerson'
        | 'phoneResponsiblePerson'
        | 'emailResponsiblePerson'
        | 'nameProxyPerson'
        | 'phoneProxyPerson'
        | 'emailProxyPerson'
        | 'place'
        | 'openDate'
        | 'opendate'
        | 'closeDate'
        | 'closedate'
        | 'voteType'
        | 'timezone'
        | 'timePadding'
      >
    >;
    future: Array<
      Pick<
        Meeting,
        | 'ID'
        | 'stoID'
        | 'title'
        | 'type'
        | 'phoneResponsiblePerson'
        | 'nameResponsiblePerson'
        | 'emailResponsiblePerson'
        | 'phoneProxyPerson'
        | 'nameProxyPerson'
        | 'emailProxyPerson'
        | 'place'
        | 'openDate'
        | 'opendate'
        | 'closeDate'
        | 'closedate'
        | 'voteType'
        | 'timezone'
        | 'timePadding'
      >
    >;
  };
};

export type InvestorMeetingQueryVariables = Exact<{
  meetingId: Scalars['Int'];
  _id: Scalars['Int'];
}>;

export type InvestorMeetingQuery = {
  investorMeeting?: Maybe<
    Pick<
      Meeting,
      | 'ID'
      | 'stoID'
      | 'title'
      | 'type'
      | 'nameResponsiblePerson'
      | 'phoneResponsiblePerson'
      | 'emailResponsiblePerson'
      | 'nameProxyPerson'
      | 'phoneProxyPerson'
      | 'emailProxyPerson'
      | 'place'
      | 'openDate'
      | 'opendate'
      | 'closeDate'
      | 'closedate'
      | 'voteType'
      | 'timezone'
      | 'timePadding'
    >
  >;
  findSto?: Maybe<Pick<Sto, 'companyType'>>;
};

export type InvestorVoteOptionsQueryVariables = Exact<{
  meetingId: Scalars['Int'];
}>;

export type InvestorVoteOptionsQuery = {
  investorVotingOptions: Array<
    Pick<VotingOption, 'ID' | 'votingID' | 'optionTxt' | 'description' | 'companyComments' | 'isActiveByAdmin'> & {
      documents: Array<
        Pick<VotingDocuments, 'ID' | 'votingID' | 'votingOptionID' | 'documentLink' | 'title' | 'description'>
      >;
    }
  >;
};

export type UserVotingDataQueryVariables = Exact<{
  votingId: Scalars['Int'];
}>;

export type UserVotingDataQuery = {
  investorUserVoting: Array<
    Pick<
      VotingUser,
      | 'ID'
      | 'votingID'
      | 'userID'
      | 'votingOptionID'
      | 'investmentContributed'
      | 'isCastedByInvestor'
      | 'votingOptionValue'
    >
  >;
};

export type OptionsVoteStatisticQueryVariables = Exact<{
  votingId: Scalars['Int'];
}>;

export type OptionsVoteStatisticQuery = {
  investorVotingOptions: Array<
    Pick<VotingOption, 'ID'> & {
      votingUserStatistic: Pick<VotingUserStatistic, 'votesYes' | 'votesNo' | 'votesAbstention' | 'count'>;
    }
  >;
};

export type SendMercuryInstructionalEmailMutationVariables = Exact<{
  stoId: Scalars['Int'];
  note: Scalars['String'];
  routingNumber: Scalars['String'];
  accountNumber: Scalars['String'];
}>;

export type SendMercuryInstructionalEmailMutation = Pick<Mutation, 'sendMercuryInstructionalEmail'>;

export type GetMercuryAccountInfoQueryVariables = Exact<{ [key: string]: never }>;

export type GetMercuryAccountInfoQuery = {
  getMercuryAccountInfo?: Maybe<Pick<MercuryInfo, 'accountNumber' | 'routingNumber'>>;
};

export type GetMercuryRecipientQueryVariables = Exact<{ [key: string]: never }>;

export type GetMercuryRecipientQuery = {
  getMercuryRecipient?: Maybe<
    Pick<MercuryRecipient, 'id' | 'name' | 'emails' | 'paymentMethod'> & {
      electronicRoutingInfo: Pick<MercuryAccount, 'accountNumber' | 'electronicAccountType' | 'routingNumber'> & {
        address: Pick<MercuryAddress, 'address1' | 'city' | 'region' | 'postalCode' | 'country'>;
      };
    }
  >;
};

export type MoonpayAddTransactionDefaultMutationVariables = Exact<{
  status: Scalars['String'];
  moonpayId: Scalars['String'];
}>;

export type MoonpayAddTransactionDefaultMutation = Pick<Mutation, 'moonpayAddTransactionDefault'>;

export type MoonpayWidgetUrlQueryVariables = Exact<{
  shares: Scalars['Float'];
  shareTypeId: Scalars['Int'];
  alertId?: Maybe<Scalars['Int']>;
}>;

export type MoonpayWidgetUrlQuery = Pick<Query, 'moonpayWidgetUrl'>;

export type MoonpayBuyAlertTransactionReceiptUrlQueryVariables = Exact<{
  alertId: Scalars['Int'];
}>;

export type MoonpayBuyAlertTransactionReceiptUrlQuery = Pick<Query, 'moonpayBuyAlertTransactionReceiptUrl'>;

export type InvestorDepositWithdrawAlertMutationVariables = Exact<{
  data: InvestorDepositWithdrawAlertInput;
}>;

export type InvestorDepositWithdrawAlertMutation = Pick<Mutation, 'investorDepositWithdrawAlert'>;

export type InvestorBuyAlertMutationVariables = Exact<{
  query: InvestorBuyAlertInput;
}>;

export type InvestorBuyAlertMutation = Pick<Mutation, 'investorBuyAlert'>;

export type InvestorInvoiceAlertDeleteMutationVariables = Exact<{
  ID: Scalars['Int'];
}>;

export type InvestorInvoiceAlertDeleteMutation = Pick<Mutation, 'investorInvoiceAlertDelete'>;

export type VerifyTransactionFromBlockchainMutationVariables = Exact<{
  data: VerifyCryptoReciepeInput;
}>;

export type VerifyTransactionFromBlockchainMutation = Pick<Mutation, 'verifyTransactionFromBlockchain'>;

export type InvestorSellAlertMutationVariables = Exact<{
  data: InvestorBuyAlertInput;
}>;

export type InvestorSellAlertMutation = Pick<Mutation, 'investorSellAlert'>;

export type InvestorActivePropertiesQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorActivePropertiesQuery = {
  investorActiveProperties: Array<
    Pick<
      ActiveProperty,
      'ID' | 'details' | 'picture' | 'title' | 'projectCost' | 'createdAt' | 'popularity' | 'isBuyButtonEnabled'
    >
  >;
};

export type InvestorRelatedStoQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorRelatedStoQuery = {
  investorRelatedSto: Array<Pick<ActiveProperty, 'ID' | 'title' | 'details' | 'picture'>>;
  investorUser?: Maybe<{ sto: Pick<Sto, 'ID' | 'title'> }>;
};

export type InvestorStoDetailQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InvestorStoDetailQuery = {
  findSto?: Maybe<
    Pick<
      Sto,
      | 'ID'
      | 'title'
      | 'details'
      | 'picture'
      | 'fullDetails'
      | 'stolinkfull'
      | 'logo'
      | 'registrationText'
      | 'isBuyButtonEnabled'
    > & {
      images: Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>;
      documents: Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>;
      parsedSettings: { investorCategories: Array<Pick<InvestorCategory, 'value' | 'label'>> };
      meta: Array<Pick<StoMetaValue, 'stoID' | 'key' | 'value' | 'order' | 'display'>>;
    }
  >;
};

export type InvestorWalletQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InvestorWalletQuery = {
  investorBalances: Array<
    Pick<InvestorBalance, 'ID' | 'stoID' | 'investorID' | 'currencyID' | 'amount'> & {
      currency: Pick<Currency, 'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased'>;
    }
  >;
  investorPaymentChannels: Array<
    Pick<
      PaymentChannel,
      'ID' | 'stoID' | 'title' | 'details' | 'currencyID' | 'canWithdrawFunds' | 'channelType' | 'isActive'
    > & {
      currency: Pick<
        Currency,
        'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased' | 'Address' | 'cryptoReceivingAddress'
      >;
    }
  >;
  investorDepositHistory: Array<
    Pick<
      InvestorDepositAlert,
      'ID' | 'isApproved' | 'dateReceived' | 'dateApproved' | 'amount' | 'details' | 'currencyID'
    > & { currency: Pick<Currency, 'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased'> }
  >;
};

export type InvestorPortfolioQueryVariables = Exact<{
  _id?: Maybe<Scalars['Int']>;
  status: Array<BuyAlertStatus> | BuyAlertStatus;
}>;

export type InvestorPortfolioQuery = {
  investorShares: Array<
    Pick<
      Share,
      | 'sharesHistoryID'
      | 'investorID'
      | 'shares'
      | 'isBlockchainAuthorized'
      | 'isBlockchainFrozen'
      | 'shareTypeID'
      | 'stoID'
      | 'ID'
    > & {
      shareType: Pick<
        ShareType,
        | 'ID'
        | 'title'
        | 'stoID'
        | 'totalShares'
        | 'companyShares'
        | 'nominalValue'
        | 'custodianShares'
        | 'isBlockchain'
        | 'premiumValue'
        | 'currencyID'
        | 'sellToCompany'
        | 'sellValue'
        | 'isShareNosApplicable'
        | 'isCertificateNosApplicable'
        | 'minimumSharesToBuyByInvestor'
        | 'availableShare'
        | 'totalPrice'
        | 'blockchaindecimals'
        | 'blockchainProtocol'
        | 'reduceSharesForPurchase'
        | 'walletCustodyType'
      > & { currency: Pick<Currency, 'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased'> };
    }
  >;
  investorBuyAlerts?: Maybe<
    Array<
      Pick<
        InvestorBuyAlert,
        | 'ID'
        | 'status'
        | 'stoID'
        | 'shares'
        | 'shareTypeID'
        | 'isHiddenForInvestor'
        | 'date'
        | 'isBuySharesSigned'
        | 'purchasePriceOffered'
        | 'fromCurrencyID'
        | 'isSellRequest'
      > & {
        shareType: Pick<
          ShareType,
          | 'ID'
          | 'title'
          | 'stoID'
          | 'totalShares'
          | 'companyShares'
          | 'nominalValue'
          | 'custodianShares'
          | 'isBlockchain'
          | 'premiumValue'
          | 'currencyID'
          | 'minimumSharesToBuyByInvestor'
          | 'sellToCompany'
          | 'sellValue'
          | 'isShareNosApplicable'
          | 'isCertificateNosApplicable'
          | 'availableShare'
          | 'totalPrice'
          | 'blockchaindecimals'
          | 'blockchainProtocol'
          | 'reduceSharesForPurchase'
          | 'walletCustodyType'
        > & { currency: Pick<Currency, 'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased'> };
      }
    >
  >;
};

export type InvestorInvoiceAlertsQueryVariables = Exact<{ [key: string]: never }>;

export type InvestorInvoiceAlertsQuery = {
  investorInvoiceAlerts: Array<
    Pick<
      InvestorInvoices,
      | 'ID'
      | 'buyAlertID'
      | 'investorID'
      | 'shareTypeID'
      | 'stoID'
      | 'shares'
      | 'status'
      | 'amountToPay'
      | 'isBlockchain'
      | 'dateCreated'
      | 'invoiceDescription'
      | 'dateUpdated'
      | 'investorWallet'
      | 'paymentChannelID'
    > & {
      buyAlert: Pick<InvestorBuyAlert, 'ID' | 'entityID'>;
      shareType: Pick<
        ShareType,
        | 'ID'
        | 'title'
        | 'stoID'
        | 'totalShares'
        | 'companyShares'
        | 'ethereumBlockchainPublicAddress'
        | 'custodianShares'
        | 'nominalValue'
        | 'isBlockchain'
        | 'premiumValue'
        | 'currencyID'
        | 'minimumSharesToBuyByInvestor'
        | 'sellToCompany'
        | 'sellValue'
        | 'isShareNosApplicable'
        | 'isCertificateNosApplicable'
        | 'channelIDForAutoPayments'
        | 'availableShare'
        | 'totalPrice'
        | 'blockchaindecimals'
        | 'blockchainProtocol'
        | 'reduceSharesForPurchase'
        | 'walletCustodyType'
      > & {
        currency: Pick<
          Currency,
          | 'ID'
          | 'currency'
          | 'abbreviation'
          | 'symbol'
          | 'isBlockchainBased'
          | 'blockchainID'
          | 'isNative'
          | 'cryptoReceivingAddress'
          | 'Address'
        >;
      };
      paymentChannel?: Maybe<
        Pick<PaymentChannel, 'title' | 'details' | 'currencyID' | 'canWithdrawFunds'> & {
          currency: Pick<Currency, 'ID'>;
        }
      >;
    }
  >;
};

export type InvestorBuyAlertsQueryVariables = Exact<{
  status: Array<BuyAlertStatus> | BuyAlertStatus;
}>;

export type InvestorBuyAlertsQuery = {
  investorBuyAlerts?: Maybe<
    Array<
      Pick<
        InvestorBuyAlert,
        | 'ID'
        | 'entityID'
        | 'status'
        | 'stoID'
        | 'shares'
        | 'shareTypeID'
        | 'isHiddenForInvestor'
        | 'date'
        | 'isBuySharesSigned'
        | 'purchasePriceOffered'
        | 'fromCurrencyID'
        | 'isSellRequest'
      > & {
        shareType: Pick<
          ShareType,
          | 'ID'
          | 'title'
          | 'stoID'
          | 'totalShares'
          | 'companyShares'
          | 'nominalValue'
          | 'custodianShares'
          | 'isBlockchain'
          | 'premiumValue'
          | 'currencyID'
          | 'minimumSharesToBuyByInvestor'
          | 'sellToCompany'
          | 'sellValue'
          | 'isShareNosApplicable'
          | 'isCertificateNosApplicable'
          | 'availableShare'
          | 'totalPrice'
          | 'blockchaindecimals'
          | 'blockchainProtocol'
          | 'reduceSharesForPurchase'
          | 'walletCustodyType'
        > & {
          currency: Pick<
            Currency,
            | 'ID'
            | 'currency'
            | 'abbreviation'
            | 'symbol'
            | 'isBlockchainBased'
            | 'blockchainID'
            | 'isNative'
            | 'cryptoReceivingAddress'
          >;
        };
      }
    >
  >;
};

export type InvestorBuyPropertyQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InvestorBuyPropertyQuery = {
  investorDetailProperty: Pick<DetailProperty, 'ID' | 'title' | 'details' | 'picture' | 'fullDetails'> & {
    images?: Maybe<Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>>;
    documents?: Maybe<Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>>;
  };
  investorBalances: Array<
    Pick<InvestorBalance, 'ID' | 'stoID' | 'investorID' | 'currencyID' | 'amount'> & {
      currency: Pick<Currency, 'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased'>;
    }
  >;
  findShareTypes: Array<
    Pick<
      ShareType,
      | 'ID'
      | 'stoID'
      | 'title'
      | 'totalShares'
      | 'companyShares'
      | 'nominalValue'
      | 'isBlockchain'
      | 'premiumValue'
      | 'custodianShares'
      | 'availableShare'
      | 'totalPrice'
      | 'currencyID'
      | 'sellToCompany'
      | 'sellValue'
      | 'isShareNosApplicable'
      | 'isCertificateNosApplicable'
      | 'minimumSharesToBuyByInvestor'
      | 'channelIDForAutoPayments'
      | 'blockchaindecimals'
      | 'blockchainProtocol'
      | 'reduceSharesForPurchase'
      | 'walletCustodyType'
    > & { currency: Pick<Currency, 'ID' | 'abbreviation' | 'currency' | 'symbol' | 'isBlockchainBased'> }
  >;
};

export type FindInvestorDividendPayoutsQueryVariables = Exact<{ [key: string]: never }>;

export type FindInvestorDividendPayoutsQuery = {
  findInvestorDividendPayouts: Array<
    Pick<
      DividendInvestorPayout,
      'ID' | 'investorID' | 'payoutID' | 'amount' | 'investorShares' | 'lastUpdatedAt' | 'status'
    >
  >;
};

export type FindShareHistoricalValuesQueryVariables = Exact<{
  shareTypeID: Scalars['Int'];
}>;

export type FindShareHistoricalValuesQuery = {
  findShareHistoricalValues: Array<
    Pick<ShareHistoricalData, 'ID' | 'shareTypeID' | 'stoID' | 'premiumValue' | 'dateOfChange'>
  >;
};

export type InvestorDetailPropertyQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type InvestorDetailPropertyQuery = {
  investorDetailProperty: Pick<DetailProperty, 'ID' | 'title' | 'details' | 'picture' | 'fullDetails'> & {
    images?: Maybe<Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>>;
    documents?: Maybe<Array<Pick<PropertyFile, 'ID' | 'title' | 'url'>>>;
  };
};

export type InvestorInvoiceAlertQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type InvestorInvoiceAlertQuery = {
  investorInvoiceAlert: Pick<
    InvestorInvoices,
    | 'stoID'
    | 'buyAlertID'
    | 'investorID'
    | 'shareTypeID'
    | 'shares'
    | 'amountToPay'
    | 'status'
    | 'isBlockchain'
    | 'dateCreated'
    | 'dateUpdated'
    | 'invoiceDescription'
    | 'investorWallet'
    | 'paymentChannelID'
  > & {
    shareType: Pick<
      ShareType,
      | 'ethereumBlockchainPublicAddress'
      | 'channelIDForAutoPayments'
      | 'premiumValue'
      | 'currencyID'
      | 'sellValue'
      | 'sellToCompany'
      | 'title'
      | 'blockchaindecimals'
      | 'blockchainProtocol'
      | 'reduceSharesForPurchase'
      | 'walletCustodyType'
    > & {
      currency: Pick<
        Currency,
        | 'ID'
        | 'currency'
        | 'abbreviation'
        | 'symbol'
        | 'isBlockchainBased'
        | 'blockchainID'
        | 'isNative'
        | 'cryptoReceivingAddress'
        | 'Address'
      >;
    };
    paymentChannel?: Maybe<
      Pick<PaymentChannel, 'title' | 'details' | 'currencyID'> & {
        currency: Pick<
          Currency,
          | 'ID'
          | 'currency'
          | 'abbreviation'
          | 'symbol'
          | 'isBlockchainBased'
          | 'blockchainID'
          | 'isNative'
          | 'cryptoReceivingAddress'
          | 'Address'
        >;
      }
    >;
    buyAlert: Pick<InvestorBuyAlert, 'ID' | 'entityID'>;
  };
};

export type PortfolioValueQueryVariables = Exact<{
  stoID: Scalars['Int'];
}>;

export type PortfolioValueQuery = Pick<Query, 'portfolioValue'>;

export type SaveSharePurchaseContractFieldsMutationVariables = Exact<{
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
  fieldValues: Array<DocumentFieldValueDto> | DocumentFieldValueDto;
}>;

export type SaveSharePurchaseContractFieldsMutation = Pick<Mutation, 'setSubmittedSharePurchaseDocument'>;

export type SaveSharePurchaseContractSignatureMutationVariables = Exact<{
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
  signature: Scalars['String'];
}>;

export type SaveSharePurchaseContractSignatureMutation = Pick<Mutation, 'setSharePurchaseDocumentSignature'>;

export type SendSharePurchaseContractMutationVariables = Exact<{
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
}>;

export type SendSharePurchaseContractMutation = Pick<Mutation, 'sendSharePurchaseContract'>;

export type DeleteSharePurchaseRequestMutationVariables = Exact<{
  documentID: Scalars['Int'];
}>;

export type DeleteSharePurchaseRequestMutation = Pick<Mutation, 'deleteSharePurchaseRequest'>;

export type InvestorBuyAlertRemoveMutationVariables = Exact<{
  alertID: Scalars['Int'];
}>;

export type InvestorBuyAlertRemoveMutation = Pick<Mutation, 'investorBuyAlertRemove'>;

export type InvestorBuyAlertHideMutationVariables = Exact<{
  alertID: Scalars['Int'];
}>;

export type InvestorBuyAlertHideMutation = Pick<Mutation, 'investorBuyAlertHide'>;

export type SetDocuSignSignatureMutationVariables = Exact<{
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
  docusignEnvelopeID: Scalars['String'];
}>;

export type SetDocuSignSignatureMutation = Pick<Mutation, 'setDocuSignSignature'>;

export type CreateBlockchainTransactionTransferMutationVariables = Exact<{
  data: BlockchainSharesTransferTransactionsInput;
}>;

export type CreateBlockchainTransactionTransferMutation = Pick<Mutation, 'createBlockchainTransactionTransfer'>;

export type SharePurchaseDocumentsQueryVariables = Exact<{
  sharePurchaseID: Scalars['Int'];
}>;

export type SharePurchaseDocumentsQuery = {
  sharePurchaseDocuments: Array<
    Pick<SharePurchaseDocument, 'requireOnce' | 'status'> & { document: Pick<Document, 'ID' | 'title'> }
  >;
};

export type GetInternalSigningDataQueryVariables = Exact<{
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
}>;

export type GetInternalSigningDataQuery = {
  document?: Maybe<Pick<Document, 'ID' | 'title' | 'contents'>>;
  sharePurchaseDocument?: Maybe<
    Pick<DocumentUser, 'status' | 'signatureFilePath'> & {
      fieldValues?: Maybe<Array<Pick<DocumentUserFieldValue, 'ID' | 'value'>>>;
      signature?: Maybe<Pick<CloudFiles, 'url' | 'modified'>>;
    }
  >;
  documentFields: Array<Pick<DocumentField, 'ID' | 'title' | 'type' | 'helperText'>>;
  getPrefilledDocumentValues: Array<Pick<DocumentUserFieldValue, 'ID' | 'value'>>;
  investorAppParameters: Pick<
    AppParameters,
    'IsDarwSignatureActive' | 'IsCheckMarkSignatureActive' | 'drawSignaturePrefillFonts'
  >;
};

export type GetDocuSignUrlQueryVariables = Exact<{
  preferredReturnURL: Scalars['String'];
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
}>;

export type GetDocuSignUrlQuery = Pick<Query, 'getDocuSignUrl'>;

export type SendHelloSignTemplateSignRequestQueryVariables = Exact<{
  documentID: Scalars['Int'];
  sharePurchaseID: Scalars['Int'];
}>;

export type SendHelloSignTemplateSignRequestQuery = Pick<Query, 'sendHelloSignTemplateSignRequest'> & {
  findSto?: Maybe<Pick<Sto, 'helloSignClientID'>>;
};

export type InvestorSharesQueryVariables = Exact<{
  stoID?: Maybe<Scalars['Int']>;
}>;

export type InvestorSharesQuery = {
  investorShares: Array<
    Pick<
      Share,
      | 'ID'
      | 'stoID'
      | 'sharesHistoryID'
      | 'investorID'
      | 'shares'
      | 'isBlockchainAuthorized'
      | 'isBlockchainFrozen'
      | 'shareTypeID'
    > & {
      shareType: Pick<
        ShareType,
        | 'ID'
        | 'title'
        | 'stoID'
        | 'totalShares'
        | 'companyShares'
        | 'nominalValue'
        | 'custodianShares'
        | 'isBlockchain'
        | 'premiumValue'
        | 'currencyID'
        | 'sellToCompany'
        | 'sellValue'
        | 'isShareNosApplicable'
        | 'isCertificateNosApplicable'
        | 'minimumSharesToBuyByInvestor'
        | 'availableShare'
        | 'totalPrice'
        | 'blockchaindecimals'
      > & { currency: Pick<Currency, 'ID' | 'currency' | 'abbreviation' | 'symbol' | 'isBlockchainBased'> };
    }
  >;
};

export type GetInvestorShareQueryVariables = Exact<{
  ID: Scalars['Int'];
}>;

export type GetInvestorShareQuery = {
  investorShare?: Maybe<
    Pick<Share, 'shares'> & {
      shareType: Pick<ShareType, 'ID' | 'title' | 'stoID' | 'nominalValue' | 'premiumValue' | 'isBlockchain'> & {
        currency: Pick<Currency, 'ID' | 'symbol'>;
      };
    }
  >;
};

export type GetSharesWalletsQueryVariables = Exact<{
  shareTypeID: Scalars['Int'];
}>;

export type GetSharesWalletsQuery = {
  getSharesWallets: Array<Pick<SharesWallet, 'ID' | 'isBlocked' | 'publicKey' | 'shares'>>;
};

export type GetSwapTokensQueryVariables = Exact<{ [key: string]: never }>;

export type GetSwapTokensQuery = { getSwapTokens: Array<Pick<SwapToken, 'ID' | 'address' | 'name' | 'symbol'>> };

export type SetThemeConfigMutationVariables = Exact<{
  theme: Scalars['String'];
}>;

export type SetThemeConfigMutation = Pick<Mutation, 'setThemeConfig'>;

export type GetThemeConfigQueryVariables = Exact<{ [key: string]: never }>;

export type GetThemeConfigQuery = {
  investorAppParameters: Pick<AppParameters, 'investorDashboardTheme' | 'leftSideMenuFont' | 'poweredByLabel'>;
};

export type TranslationLoadQueryVariables = Exact<{
  locale?: Maybe<Scalars['String']>;
}>;

export type TranslationLoadQuery = Pick<Query, 'locales'> & {
  translations: Array<Pick<Translation, 'key' | 'locale' | 'translation'>>;
};

export type UpdatesQueryVariables = Exact<{
  _id: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;

export type UpdatesQuery = {
  investorUpdates?: Maybe<Array<Pick<Update, 'ID' | 'stoID' | 'title' | 'details' | 'date' | 'coverphoto'>>>;
};

export type UpdateQueryVariables = Exact<{
  _id: Scalars['Int'];
}>;

export type UpdateQuery = { investorUpdate?: Maybe<Pick<Update, 'ID' | 'title' | 'stoID' | 'details' | 'date'>> };

export type GetUsernameByIdQueryVariables = Exact<{
  userID: Scalars['Int'];
}>;

export type GetUsernameByIdQuery = Pick<Query, 'getUsernameByID'>;

export type GetFullNameByIdQueryVariables = Exact<{
  userID: Scalars['Int'];
}>;

export type GetFullNameByIdQuery = Pick<Query, 'getFullNameByID'>;

export const VerifyInvestorDocument = gql`
  query verifyInvestor {
    investorUser {
      sto {
        ID
        title
        details
        isActive
        logo
        ethereumContractAddress
        ethereumWhitelistAddress
        disclaimer
        stolink
        stolinkfull
        stoType
        stoInvestorTypes
        registrationText
        stoInvestorTypesNotOnShareRegister
        companyType
        registrationSuccessText
        fullDetails
        exchangeOpenDate
        propertyPicture
        externalSystemID
        projectAddress
        legalDetails
        picture
        verifyInvestorComHostToken
        parsedSettings {
          investorCategories {
            value
            label
          }
        }
        images {
          ID
          title
          url
        }
        documents {
          ID
          title
          url
        }
      }
      investor {
        ID
        firstName
        lastName
        address
        country
        phone
        cell
        zip
        town
        state
        email
        passportNumber
        nationalID
        kinname
        kinphone
        kinemail
        investorType
        companyName
        titleWithinCompany
        powerToBindCompany
        birthDate
        isTwoFactorEnabled
        language
        middleName
        socialSecurity
        mailingAddress
        faxNumber
        maritalStatus
        occupation
        employerName
        employerAddress
        retirementAccount
        trustOrBusinessEntity
        dateIncorporation
        taxID
        govtID
        isTax
        secondaryContactName
        secondaryContactPhone
        secondaryContactEmail
        primaryContactName
        primaryContactPhone
        primaryContactEmail
        countryBusiness
        countryCitizenship
        taxCountry
        userName
      }
      investorSto {
        ID
        isAccountClosed
        investorID
        stoID
        expectedShares
        expectedInvestment
        isKYC
        applied
        status
        usufructuaryFirstName
        usufructuaryLastName
        usufructuaryAddress
        usufructuaryCity
        usufructuaryCountry
        usufructuaryEmail
        beneficialFirstName
        beneficialLastName
        beneficialAddress
        beneficialCity
        beneficialCountry
        beneficialEmail
        beneficialBirth
        beneficialNationality
        isUsufructuary
        isActive
        notes
      }
    }
    getVerifyInvestorUrl
  }
`;

/**
 * __useVerifyInvestorQuery__
 *
 * To run a query within a React component, call `useVerifyInvestorQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyInvestorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyInvestorQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyInvestorQuery(
  baseOptions?: Apollo.QueryHookOptions<VerifyInvestorQuery, VerifyInvestorQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VerifyInvestorQuery, VerifyInvestorQueryVariables>(VerifyInvestorDocument, options);
}
export function useVerifyInvestorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VerifyInvestorQuery, VerifyInvestorQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VerifyInvestorQuery, VerifyInvestorQueryVariables>(VerifyInvestorDocument, options);
}
export type VerifyInvestorQueryHookResult = ReturnType<typeof useVerifyInvestorQuery>;
export type VerifyInvestorLazyQueryHookResult = ReturnType<typeof useVerifyInvestorLazyQuery>;
export type VerifyInvestorQueryResult = Apollo.QueryResult<VerifyInvestorQuery, VerifyInvestorQueryVariables>;
export const MessageCreateDocument = gql`
  mutation MessageCreate($data: ChatInput!) {
    messageCreate(data: $data)
  }
`;
export type MessageCreateMutationFn = Apollo.MutationFunction<MessageCreateMutation, MessageCreateMutationVariables>;

/**
 * __useMessageCreateMutation__
 *
 * To run a mutation, you first call `useMessageCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessageCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messageCreateMutation, { data, loading, error }] = useMessageCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMessageCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<MessageCreateMutation, MessageCreateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MessageCreateMutation, MessageCreateMutationVariables>(MessageCreateDocument, options);
}
export type MessageCreateMutationHookResult = ReturnType<typeof useMessageCreateMutation>;
export type MessageCreateMutationResult = Apollo.MutationResult<MessageCreateMutation>;
export type MessageCreateMutationOptions = Apollo.BaseMutationOptions<
  MessageCreateMutation,
  MessageCreateMutationVariables
>;
export const UpdateChatsToSeenDocument = gql`
  mutation UpdateChatsToSeen($sender: SENDER_TYPE!, $stoID: Int!) {
    updateChatsToSeen(sender: $sender, stoID: $stoID)
  }
`;
export type UpdateChatsToSeenMutationFn = Apollo.MutationFunction<
  UpdateChatsToSeenMutation,
  UpdateChatsToSeenMutationVariables
>;

/**
 * __useUpdateChatsToSeenMutation__
 *
 * To run a mutation, you first call `useUpdateChatsToSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatsToSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatsToSeenMutation, { data, loading, error }] = useUpdateChatsToSeenMutation({
 *   variables: {
 *      sender: // value for 'sender'
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useUpdateChatsToSeenMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateChatsToSeenMutation, UpdateChatsToSeenMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateChatsToSeenMutation, UpdateChatsToSeenMutationVariables>(
    UpdateChatsToSeenDocument,
    options,
  );
}
export type UpdateChatsToSeenMutationHookResult = ReturnType<typeof useUpdateChatsToSeenMutation>;
export type UpdateChatsToSeenMutationResult = Apollo.MutationResult<UpdateChatsToSeenMutation>;
export type UpdateChatsToSeenMutationOptions = Apollo.BaseMutationOptions<
  UpdateChatsToSeenMutation,
  UpdateChatsToSeenMutationVariables
>;
export const UpdatePriceNegotiationChatsToSeenDocument = gql`
  mutation UpdatePriceNegotiationChatsToSeen($context: CHAT_CONTEXT!, $contextID: Int!, $counterpartID: Int!) {
    updatePriceNegotiationChatsToSeen(context: $context, contextID: $contextID, counterpartID: $counterpartID)
  }
`;
export type UpdatePriceNegotiationChatsToSeenMutationFn = Apollo.MutationFunction<
  UpdatePriceNegotiationChatsToSeenMutation,
  UpdatePriceNegotiationChatsToSeenMutationVariables
>;

/**
 * __useUpdatePriceNegotiationChatsToSeenMutation__
 *
 * To run a mutation, you first call `useUpdatePriceNegotiationChatsToSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePriceNegotiationChatsToSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePriceNegotiationChatsToSeenMutation, { data, loading, error }] = useUpdatePriceNegotiationChatsToSeenMutation({
 *   variables: {
 *      context: // value for 'context'
 *      contextID: // value for 'contextID'
 *      counterpartID: // value for 'counterpartID'
 *   },
 * });
 */
export function useUpdatePriceNegotiationChatsToSeenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePriceNegotiationChatsToSeenMutation,
    UpdatePriceNegotiationChatsToSeenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePriceNegotiationChatsToSeenMutation,
    UpdatePriceNegotiationChatsToSeenMutationVariables
  >(UpdatePriceNegotiationChatsToSeenDocument, options);
}
export type UpdatePriceNegotiationChatsToSeenMutationHookResult = ReturnType<
  typeof useUpdatePriceNegotiationChatsToSeenMutation
>;
export type UpdatePriceNegotiationChatsToSeenMutationResult =
  Apollo.MutationResult<UpdatePriceNegotiationChatsToSeenMutation>;
export type UpdatePriceNegotiationChatsToSeenMutationOptions = Apollo.BaseMutationOptions<
  UpdatePriceNegotiationChatsToSeenMutation,
  UpdatePriceNegotiationChatsToSeenMutationVariables
>;
export const GetPriceNegotiationListDocument = gql`
  query GetPriceNegotiationList($orderID: Int!) {
    getPriceNegotiationList(orderID: $orderID) {
      counterpartID
      orderID
      orderOwnerID
      isRead
      dateRead
      formattedDateSent
      counterpartFullName
    }
  }
`;

/**
 * __useGetPriceNegotiationListQuery__
 *
 * To run a query within a React component, call `useGetPriceNegotiationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceNegotiationListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceNegotiationListQuery({
 *   variables: {
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useGetPriceNegotiationListQuery(
  baseOptions: Apollo.QueryHookOptions<GetPriceNegotiationListQuery, GetPriceNegotiationListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPriceNegotiationListQuery, GetPriceNegotiationListQueryVariables>(
    GetPriceNegotiationListDocument,
    options,
  );
}
export function useGetPriceNegotiationListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPriceNegotiationListQuery, GetPriceNegotiationListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPriceNegotiationListQuery, GetPriceNegotiationListQueryVariables>(
    GetPriceNegotiationListDocument,
    options,
  );
}
export type GetPriceNegotiationListQueryHookResult = ReturnType<typeof useGetPriceNegotiationListQuery>;
export type GetPriceNegotiationListLazyQueryHookResult = ReturnType<typeof useGetPriceNegotiationListLazyQuery>;
export type GetPriceNegotiationListQueryResult = Apollo.QueryResult<
  GetPriceNegotiationListQuery,
  GetPriceNegotiationListQueryVariables
>;
export const GetChatsDocument = gql`
  query GetChats(
    $chatBetween: CHAT_BETWEEN!
    $stoID: Int
    $context: CHAT_CONTEXT
    $contextID: Int
    $counterpartID: Int
  ) {
    getChats(
      chatBetween: $chatBetween
      stoID: $stoID
      context: $context
      contextID: $contextID
      counterpartID: $counterpartID
    ) {
      ID
      sender
      receiver
      investorID
      adminID
      stoID
      message
      type
      dateSent
      isRead
      dateRead
      isEdited
      location
      isDeleted
      context
      contextID
      contextReceiverID
    }
  }
`;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *      chatBetween: // value for 'chatBetween'
 *      stoID: // value for 'stoID'
 *      context: // value for 'context'
 *      contextID: // value for 'contextID'
 *      counterpartID: // value for 'counterpartID'
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
}
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
}
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetStoInfoDocument = gql`
  query GetStoInfo($stoID: Int!) {
    findSto(ID: $stoID) {
      ID
      title
      details
    }
  }
`;

/**
 * __useGetStoInfoQuery__
 *
 * To run a query within a React component, call `useGetStoInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoInfoQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useGetStoInfoQuery(baseOptions: Apollo.QueryHookOptions<GetStoInfoQuery, GetStoInfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStoInfoQuery, GetStoInfoQueryVariables>(GetStoInfoDocument, options);
}
export function useGetStoInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetStoInfoQuery, GetStoInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStoInfoQuery, GetStoInfoQueryVariables>(GetStoInfoDocument, options);
}
export type GetStoInfoQueryHookResult = ReturnType<typeof useGetStoInfoQuery>;
export type GetStoInfoLazyQueryHookResult = ReturnType<typeof useGetStoInfoLazyQuery>;
export type GetStoInfoQueryResult = Apollo.QueryResult<GetStoInfoQuery, GetStoInfoQueryVariables>;
export const GetUnreadMessagesCountDocument = gql`
  query GetUnreadMessagesCount($sender: SENDER_TYPE!, $stoID: Int!) {
    getUnreadMessagesCount(sender: $sender, stoID: $stoID)
  }
`;

/**
 * __useGetUnreadMessagesCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadMessagesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadMessagesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadMessagesCountQuery({
 *   variables: {
 *      sender: // value for 'sender'
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useGetUnreadMessagesCountQuery(
  baseOptions: Apollo.QueryHookOptions<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(
    GetUnreadMessagesCountDocument,
    options,
  );
}
export function useGetUnreadMessagesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(
    GetUnreadMessagesCountDocument,
    options,
  );
}
export type GetUnreadMessagesCountQueryHookResult = ReturnType<typeof useGetUnreadMessagesCountQuery>;
export type GetUnreadMessagesCountLazyQueryHookResult = ReturnType<typeof useGetUnreadMessagesCountLazyQuery>;
export type GetUnreadMessagesCountQueryResult = Apollo.QueryResult<
  GetUnreadMessagesCountQuery,
  GetUnreadMessagesCountQueryVariables
>;
export const GetPriceNegotiationUnreadMessagesCountDocument = gql`
  query GetPriceNegotiationUnreadMessagesCount($context: CHAT_CONTEXT!, $contextID: Int!, $counterpartID: Int) {
    getPriceNegotiationUnreadMessagesCount(context: $context, contextID: $contextID, counterpartID: $counterpartID)
  }
`;

/**
 * __useGetPriceNegotiationUnreadMessagesCountQuery__
 *
 * To run a query within a React component, call `useGetPriceNegotiationUnreadMessagesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceNegotiationUnreadMessagesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceNegotiationUnreadMessagesCountQuery({
 *   variables: {
 *      context: // value for 'context'
 *      contextID: // value for 'contextID'
 *      counterpartID: // value for 'counterpartID'
 *   },
 * });
 */
export function useGetPriceNegotiationUnreadMessagesCountQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPriceNegotiationUnreadMessagesCountQuery,
    GetPriceNegotiationUnreadMessagesCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPriceNegotiationUnreadMessagesCountQuery,
    GetPriceNegotiationUnreadMessagesCountQueryVariables
  >(GetPriceNegotiationUnreadMessagesCountDocument, options);
}
export function useGetPriceNegotiationUnreadMessagesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPriceNegotiationUnreadMessagesCountQuery,
    GetPriceNegotiationUnreadMessagesCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPriceNegotiationUnreadMessagesCountQuery,
    GetPriceNegotiationUnreadMessagesCountQueryVariables
  >(GetPriceNegotiationUnreadMessagesCountDocument, options);
}
export type GetPriceNegotiationUnreadMessagesCountQueryHookResult = ReturnType<
  typeof useGetPriceNegotiationUnreadMessagesCountQuery
>;
export type GetPriceNegotiationUnreadMessagesCountLazyQueryHookResult = ReturnType<
  typeof useGetPriceNegotiationUnreadMessagesCountLazyQuery
>;
export type GetPriceNegotiationUnreadMessagesCountQueryResult = Apollo.QueryResult<
  GetPriceNegotiationUnreadMessagesCountQuery,
  GetPriceNegotiationUnreadMessagesCountQueryVariables
>;
export const GetLastChatRecordDocument = gql`
  subscription GetLastChatRecord {
    getLastChatRecord {
      ID
      sender
      receiver
      investorID
      adminID
      stoID
      message
      type
      dateSent
      isRead
      dateRead
      isEdited
      location
      isDeleted
      context
      contextID
      contextReceiverID
    }
  }
`;

/**
 * __useGetLastChatRecordSubscription__
 *
 * To run a query within a React component, call `useGetLastChatRecordSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetLastChatRecordSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastChatRecordSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetLastChatRecordSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<GetLastChatRecordSubscription, GetLastChatRecordSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<GetLastChatRecordSubscription, GetLastChatRecordSubscriptionVariables>(
    GetLastChatRecordDocument,
    options,
  );
}
export type GetLastChatRecordSubscriptionHookResult = ReturnType<typeof useGetLastChatRecordSubscription>;
export type GetLastChatRecordSubscriptionResult = Apollo.SubscriptionResult<GetLastChatRecordSubscription>;
export const GetInvestorCommissionsSumDocument = gql`
  query getInvestorCommissionsSum($status: PAYMENT_STATUS) {
    getInvestorCommissionsSum(status: $status)
  }
`;

/**
 * __useGetInvestorCommissionsSumQuery__
 *
 * To run a query within a React component, call `useGetInvestorCommissionsSumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestorCommissionsSumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestorCommissionsSumQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetInvestorCommissionsSumQuery(
  baseOptions?: Apollo.QueryHookOptions<GetInvestorCommissionsSumQuery, GetInvestorCommissionsSumQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestorCommissionsSumQuery, GetInvestorCommissionsSumQueryVariables>(
    GetInvestorCommissionsSumDocument,
    options,
  );
}
export function useGetInvestorCommissionsSumLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvestorCommissionsSumQuery, GetInvestorCommissionsSumQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvestorCommissionsSumQuery, GetInvestorCommissionsSumQueryVariables>(
    GetInvestorCommissionsSumDocument,
    options,
  );
}
export type GetInvestorCommissionsSumQueryHookResult = ReturnType<typeof useGetInvestorCommissionsSumQuery>;
export type GetInvestorCommissionsSumLazyQueryHookResult = ReturnType<typeof useGetInvestorCommissionsSumLazyQuery>;
export type GetInvestorCommissionsSumQueryResult = Apollo.QueryResult<
  GetInvestorCommissionsSumQuery,
  GetInvestorCommissionsSumQueryVariables
>;
export const CustomizationAppDataDocument = gql`
  query customizationAppData($componentTitle: String, $componentId: Int) {
    fetchCustomizedComponent(componentTitle: $componentTitle, componentID: $componentId) {
      ID
      component
      body
    }
  }
`;

/**
 * __useCustomizationAppDataQuery__
 *
 * To run a query within a React component, call `useCustomizationAppDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomizationAppDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomizationAppDataQuery({
 *   variables: {
 *      componentTitle: // value for 'componentTitle'
 *      componentId: // value for 'componentId'
 *   },
 * });
 */
export function useCustomizationAppDataQuery(
  baseOptions?: Apollo.QueryHookOptions<CustomizationAppDataQuery, CustomizationAppDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CustomizationAppDataQuery, CustomizationAppDataQueryVariables>(
    CustomizationAppDataDocument,
    options,
  );
}
export function useCustomizationAppDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CustomizationAppDataQuery, CustomizationAppDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CustomizationAppDataQuery, CustomizationAppDataQueryVariables>(
    CustomizationAppDataDocument,
    options,
  );
}
export type CustomizationAppDataQueryHookResult = ReturnType<typeof useCustomizationAppDataQuery>;
export type CustomizationAppDataLazyQueryHookResult = ReturnType<typeof useCustomizationAppDataLazyQuery>;
export type CustomizationAppDataQueryResult = Apollo.QueryResult<
  CustomizationAppDataQuery,
  CustomizationAppDataQueryVariables
>;
export const SignInDocument = gql`
  mutation signIn($email: String!, $password: String!, $sto: Int!) {
    signIn(email: $email, password: $password, stoID: $sto)
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      sto: // value for 'sto'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignInSsoDocument = gql`
  mutation signInSSO($data: SignInSSOInput!) {
    signInSSO(data: $data)
  }
`;
export type SignInSsoMutationFn = Apollo.MutationFunction<SignInSsoMutation, SignInSsoMutationVariables>;

/**
 * __useSignInSsoMutation__
 *
 * To run a mutation, you first call `useSignInSsoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInSsoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInSsoMutation, { data, loading, error }] = useSignInSsoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInSsoMutation(
  baseOptions?: Apollo.MutationHookOptions<SignInSsoMutation, SignInSsoMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInSsoMutation, SignInSsoMutationVariables>(SignInSsoDocument, options);
}
export type SignInSsoMutationHookResult = ReturnType<typeof useSignInSsoMutation>;
export type SignInSsoMutationResult = Apollo.MutationResult<SignInSsoMutation>;
export type SignInSsoMutationOptions = Apollo.BaseMutationOptions<SignInSsoMutation, SignInSsoMutationVariables>;
export const SignUpMarketSpaceDocument = gql`
  mutation SignUpMarketSpace($data: SignUpMarketSpaceInput!) {
    signUpMarketSpace(data: $data)
  }
`;
export type SignUpMarketSpaceMutationFn = Apollo.MutationFunction<
  SignUpMarketSpaceMutation,
  SignUpMarketSpaceMutationVariables
>;

/**
 * __useSignUpMarketSpaceMutation__
 *
 * To run a mutation, you first call `useSignUpMarketSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMarketSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMarketSpaceMutation, { data, loading, error }] = useSignUpMarketSpaceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMarketSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<SignUpMarketSpaceMutation, SignUpMarketSpaceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMarketSpaceMutation, SignUpMarketSpaceMutationVariables>(
    SignUpMarketSpaceDocument,
    options,
  );
}
export type SignUpMarketSpaceMutationHookResult = ReturnType<typeof useSignUpMarketSpaceMutation>;
export type SignUpMarketSpaceMutationResult = Apollo.MutationResult<SignUpMarketSpaceMutation>;
export type SignUpMarketSpaceMutationOptions = Apollo.BaseMutationOptions<
  SignUpMarketSpaceMutation,
  SignUpMarketSpaceMutationVariables
>;
export const UploadDocument = gql`
  mutation upload($file: Upload!) {
    fileUpload(file: $file) {
      link
      name
    }
  }
`;
export type UploadMutationFn = Apollo.MutationFunction<UploadMutation, UploadMutationVariables>;

/**
 * __useUploadMutation__
 *
 * To run a mutation, you first call `useUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMutation, { data, loading, error }] = useUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadMutation(baseOptions?: Apollo.MutationHookOptions<UploadMutation, UploadMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadMutation, UploadMutationVariables>(UploadDocument, options);
}
export type UploadMutationHookResult = ReturnType<typeof useUploadMutation>;
export type UploadMutationResult = Apollo.MutationResult<UploadMutation>;
export type UploadMutationOptions = Apollo.BaseMutationOptions<UploadMutation, UploadMutationVariables>;
export const FileRemoveDocument = gql`
  mutation FileRemove($file: String!) {
    fileRemove(file: $file)
  }
`;
export type FileRemoveMutationFn = Apollo.MutationFunction<FileRemoveMutation, FileRemoveMutationVariables>;

/**
 * __useFileRemoveMutation__
 *
 * To run a mutation, you first call `useFileRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileRemoveMutation, { data, loading, error }] = useFileRemoveMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useFileRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<FileRemoveMutation, FileRemoveMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FileRemoveMutation, FileRemoveMutationVariables>(FileRemoveDocument, options);
}
export type FileRemoveMutationHookResult = ReturnType<typeof useFileRemoveMutation>;
export type FileRemoveMutationResult = Apollo.MutationResult<FileRemoveMutation>;
export type FileRemoveMutationOptions = Apollo.BaseMutationOptions<FileRemoveMutation, FileRemoveMutationVariables>;
export const SignUpDocument = gql`
  mutation signUp($data: SignUpInput!) {
    signUp(data: $data)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ChangePasswordDocument = gql`
  mutation changePassword($data: ChangePasswordInput!) {
    investorChangePassword(data: $data)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const ToggleTwoFaDocument = gql`
  mutation toggleTwoFA {
    investorToggleTwoFA
  }
`;
export type ToggleTwoFaMutationFn = Apollo.MutationFunction<ToggleTwoFaMutation, ToggleTwoFaMutationVariables>;

/**
 * __useToggleTwoFaMutation__
 *
 * To run a mutation, you first call `useToggleTwoFaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTwoFaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTwoFaMutation, { data, loading, error }] = useToggleTwoFaMutation({
 *   variables: {
 *   },
 * });
 */
export function useToggleTwoFaMutation(
  baseOptions?: Apollo.MutationHookOptions<ToggleTwoFaMutation, ToggleTwoFaMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ToggleTwoFaMutation, ToggleTwoFaMutationVariables>(ToggleTwoFaDocument, options);
}
export type ToggleTwoFaMutationHookResult = ReturnType<typeof useToggleTwoFaMutation>;
export type ToggleTwoFaMutationResult = Apollo.MutationResult<ToggleTwoFaMutation>;
export type ToggleTwoFaMutationOptions = Apollo.BaseMutationOptions<ToggleTwoFaMutation, ToggleTwoFaMutationVariables>;
export const InvestorPublicKeyAddDocument = gql`
  mutation investorPublicKeyAdd($title: String!, $blockchainID: Int!) {
    investorPublicKeyAdd(title: $title, blockchainID: $blockchainID)
  }
`;
export type InvestorPublicKeyAddMutationFn = Apollo.MutationFunction<
  InvestorPublicKeyAddMutation,
  InvestorPublicKeyAddMutationVariables
>;

/**
 * __useInvestorPublicKeyAddMutation__
 *
 * To run a mutation, you first call `useInvestorPublicKeyAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorPublicKeyAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorPublicKeyAddMutation, { data, loading, error }] = useInvestorPublicKeyAddMutation({
 *   variables: {
 *      title: // value for 'title'
 *      blockchainID: // value for 'blockchainID'
 *   },
 * });
 */
export function useInvestorPublicKeyAddMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorPublicKeyAddMutation, InvestorPublicKeyAddMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorPublicKeyAddMutation, InvestorPublicKeyAddMutationVariables>(
    InvestorPublicKeyAddDocument,
    options,
  );
}
export type InvestorPublicKeyAddMutationHookResult = ReturnType<typeof useInvestorPublicKeyAddMutation>;
export type InvestorPublicKeyAddMutationResult = Apollo.MutationResult<InvestorPublicKeyAddMutation>;
export type InvestorPublicKeyAddMutationOptions = Apollo.BaseMutationOptions<
  InvestorPublicKeyAddMutation,
  InvestorPublicKeyAddMutationVariables
>;
export const InvestorPublicKeyDeleteDocument = gql`
  mutation investorPublicKeyDelete($_id: Int!) {
    investorPublicKeyDelete(keyID: $_id)
  }
`;
export type InvestorPublicKeyDeleteMutationFn = Apollo.MutationFunction<
  InvestorPublicKeyDeleteMutation,
  InvestorPublicKeyDeleteMutationVariables
>;

/**
 * __useInvestorPublicKeyDeleteMutation__
 *
 * To run a mutation, you first call `useInvestorPublicKeyDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorPublicKeyDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorPublicKeyDeleteMutation, { data, loading, error }] = useInvestorPublicKeyDeleteMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorPublicKeyDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorPublicKeyDeleteMutation, InvestorPublicKeyDeleteMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorPublicKeyDeleteMutation, InvestorPublicKeyDeleteMutationVariables>(
    InvestorPublicKeyDeleteDocument,
    options,
  );
}
export type InvestorPublicKeyDeleteMutationHookResult = ReturnType<typeof useInvestorPublicKeyDeleteMutation>;
export type InvestorPublicKeyDeleteMutationResult = Apollo.MutationResult<InvestorPublicKeyDeleteMutation>;
export type InvestorPublicKeyDeleteMutationOptions = Apollo.BaseMutationOptions<
  InvestorPublicKeyDeleteMutation,
  InvestorPublicKeyDeleteMutationVariables
>;
export const InvestorProfileDocument = gql`
  mutation InvestorProfile($data: InvestorProfileInput!) {
    investorProfile(data: $data)
  }
`;
export type InvestorProfileMutationFn = Apollo.MutationFunction<
  InvestorProfileMutation,
  InvestorProfileMutationVariables
>;

/**
 * __useInvestorProfileMutation__
 *
 * To run a mutation, you first call `useInvestorProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorProfileMutation, { data, loading, error }] = useInvestorProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorProfileMutation, InvestorProfileMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorProfileMutation, InvestorProfileMutationVariables>(
    InvestorProfileDocument,
    options,
  );
}
export type InvestorProfileMutationHookResult = ReturnType<typeof useInvestorProfileMutation>;
export type InvestorProfileMutationResult = Apollo.MutationResult<InvestorProfileMutation>;
export type InvestorProfileMutationOptions = Apollo.BaseMutationOptions<
  InvestorProfileMutation,
  InvestorProfileMutationVariables
>;
export const UsufructuaryUpdateDocument = gql`
  mutation usufructuaryUpdate($data: InvestorUsufructuaryInput!) {
    investorUsufructuaryUpdate(data: $data)
  }
`;
export type UsufructuaryUpdateMutationFn = Apollo.MutationFunction<
  UsufructuaryUpdateMutation,
  UsufructuaryUpdateMutationVariables
>;

/**
 * __useUsufructuaryUpdateMutation__
 *
 * To run a mutation, you first call `useUsufructuaryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsufructuaryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usufructuaryUpdateMutation, { data, loading, error }] = useUsufructuaryUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUsufructuaryUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<UsufructuaryUpdateMutation, UsufructuaryUpdateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UsufructuaryUpdateMutation, UsufructuaryUpdateMutationVariables>(
    UsufructuaryUpdateDocument,
    options,
  );
}
export type UsufructuaryUpdateMutationHookResult = ReturnType<typeof useUsufructuaryUpdateMutation>;
export type UsufructuaryUpdateMutationResult = Apollo.MutationResult<UsufructuaryUpdateMutation>;
export type UsufructuaryUpdateMutationOptions = Apollo.BaseMutationOptions<
  UsufructuaryUpdateMutation,
  UsufructuaryUpdateMutationVariables
>;
export const BeneficialUpdateDocument = gql`
  mutation beneficialUpdate($data: InvestorBeneficialInput!) {
    investorBeneficialUpdate(data: $data)
  }
`;
export type BeneficialUpdateMutationFn = Apollo.MutationFunction<
  BeneficialUpdateMutation,
  BeneficialUpdateMutationVariables
>;

/**
 * __useBeneficialUpdateMutation__
 *
 * To run a mutation, you first call `useBeneficialUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBeneficialUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [beneficialUpdateMutation, { data, loading, error }] = useBeneficialUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBeneficialUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<BeneficialUpdateMutation, BeneficialUpdateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BeneficialUpdateMutation, BeneficialUpdateMutationVariables>(
    BeneficialUpdateDocument,
    options,
  );
}
export type BeneficialUpdateMutationHookResult = ReturnType<typeof useBeneficialUpdateMutation>;
export type BeneficialUpdateMutationResult = Apollo.MutationResult<BeneficialUpdateMutation>;
export type BeneficialUpdateMutationOptions = Apollo.BaseMutationOptions<
  BeneficialUpdateMutation,
  BeneficialUpdateMutationVariables
>;
export const InvestorVerifyDocument = gql`
  mutation investorVerify($secret: String!) {
    investorVerify(secret: $secret)
  }
`;
export type InvestorVerifyMutationFn = Apollo.MutationFunction<InvestorVerifyMutation, InvestorVerifyMutationVariables>;

/**
 * __useInvestorVerifyMutation__
 *
 * To run a mutation, you first call `useInvestorVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorVerifyMutation, { data, loading, error }] = useInvestorVerifyMutation({
 *   variables: {
 *      secret: // value for 'secret'
 *   },
 * });
 */
export function useInvestorVerifyMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorVerifyMutation, InvestorVerifyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorVerifyMutation, InvestorVerifyMutationVariables>(InvestorVerifyDocument, options);
}
export type InvestorVerifyMutationHookResult = ReturnType<typeof useInvestorVerifyMutation>;
export type InvestorVerifyMutationResult = Apollo.MutationResult<InvestorVerifyMutation>;
export type InvestorVerifyMutationOptions = Apollo.BaseMutationOptions<
  InvestorVerifyMutation,
  InvestorVerifyMutationVariables
>;
export const InvestorResetDocument = gql`
  mutation investorReset($email: String!, $STO: Int!) {
    investorReset(email: $email, stoID: $STO)
  }
`;
export type InvestorResetMutationFn = Apollo.MutationFunction<InvestorResetMutation, InvestorResetMutationVariables>;

/**
 * __useInvestorResetMutation__
 *
 * To run a mutation, you first call `useInvestorResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorResetMutation, { data, loading, error }] = useInvestorResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *      STO: // value for 'STO'
 *   },
 * });
 */
export function useInvestorResetMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorResetMutation, InvestorResetMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorResetMutation, InvestorResetMutationVariables>(InvestorResetDocument, options);
}
export type InvestorResetMutationHookResult = ReturnType<typeof useInvestorResetMutation>;
export type InvestorResetMutationResult = Apollo.MutationResult<InvestorResetMutation>;
export type InvestorResetMutationOptions = Apollo.BaseMutationOptions<
  InvestorResetMutation,
  InvestorResetMutationVariables
>;
export const TwoFaConfirmDocument = gql`
  mutation twoFaConfirm($code: Int!) {
    investor2FAConfirm(code: $code)
  }
`;
export type TwoFaConfirmMutationFn = Apollo.MutationFunction<TwoFaConfirmMutation, TwoFaConfirmMutationVariables>;

/**
 * __useTwoFaConfirmMutation__
 *
 * To run a mutation, you first call `useTwoFaConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTwoFaConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [twoFaConfirmMutation, { data, loading, error }] = useTwoFaConfirmMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useTwoFaConfirmMutation(
  baseOptions?: Apollo.MutationHookOptions<TwoFaConfirmMutation, TwoFaConfirmMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<TwoFaConfirmMutation, TwoFaConfirmMutationVariables>(TwoFaConfirmDocument, options);
}
export type TwoFaConfirmMutationHookResult = ReturnType<typeof useTwoFaConfirmMutation>;
export type TwoFaConfirmMutationResult = Apollo.MutationResult<TwoFaConfirmMutation>;
export type TwoFaConfirmMutationOptions = Apollo.BaseMutationOptions<
  TwoFaConfirmMutation,
  TwoFaConfirmMutationVariables
>;
export const InvestorSetPasswordDocument = gql`
  mutation investorSetPassword($data: SetPasswordInput!) {
    investorSetPassword(data: $data)
  }
`;
export type InvestorSetPasswordMutationFn = Apollo.MutationFunction<
  InvestorSetPasswordMutation,
  InvestorSetPasswordMutationVariables
>;

/**
 * __useInvestorSetPasswordMutation__
 *
 * To run a mutation, you first call `useInvestorSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorSetPasswordMutation, { data, loading, error }] = useInvestorSetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorSetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorSetPasswordMutation, InvestorSetPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorSetPasswordMutation, InvestorSetPasswordMutationVariables>(
    InvestorSetPasswordDocument,
    options,
  );
}
export type InvestorSetPasswordMutationHookResult = ReturnType<typeof useInvestorSetPasswordMutation>;
export type InvestorSetPasswordMutationResult = Apollo.MutationResult<InvestorSetPasswordMutation>;
export type InvestorSetPasswordMutationOptions = Apollo.BaseMutationOptions<
  InvestorSetPasswordMutation,
  InvestorSetPasswordMutationVariables
>;
export const MeDocument = gql`
  query me {
    investorUser {
      sto {
        ID
        title
        details
        isActive
        logo
        ethereumContractAddress
        ethereumWhitelistAddress
        disclaimer
        stolink
        stolinkfull
        stoType
        stoInvestorTypes
        registrationText
        stoInvestorTypesNotOnShareRegister
        companyType
        registrationSuccessText
        fullDetails
        exchangeOpenDate
        propertyPicture
        externalSystemID
        projectAddress
        legalDetails
        picture
        verifyInvestorComHostToken
        parsedSettings {
          investorCategories {
            value
            label
          }
          favicon
          tabTitle
        }
        images {
          ID
          title
          url
        }
        documents {
          ID
          title
          url
        }
      }
      investor {
        ID
        firstName
        lastName
        address
        country
        phone
        cell
        zip
        town
        state
        email
        passportNumber
        nationalID
        driversLicenseID
        kinname
        kinphone
        kinemail
        investorType
        companyName
        titleWithinCompany
        powerToBindCompany
        birthDate
        isTwoFactorEnabled
        language
        middleName
        socialSecurity
        mailingAddress
        faxNumber
        maritalStatus
        occupation
        employerName
        employerAddress
        retirementAccount
        trustOrBusinessEntity
        dateIncorporation
        taxID
        govtID
        isTax
        secondaryContactName
        secondaryContactPhone
        secondaryContactEmail
        primaryContactName
        primaryContactPhone
        primaryContactEmail
        countryBusiness
        countryCitizenship
        taxCountry
        userName
        investmentLimitUpdateDate
        allowedTotalInvestment
        yearlyTotalInvestment
      }
      investorSto {
        ID
        isAccountClosed
        investorID
        stoID
        expectedShares
        expectedInvestment
        isKYC
        applied
        status
        usufructuaryFirstName
        usufructuaryLastName
        usufructuaryAddress
        usufructuaryCity
        usufructuaryCountry
        usufructuaryEmail
        beneficialFirstName
        beneficialLastName
        beneficialAddress
        beneficialCity
        beneficialCountry
        beneficialEmail
        beneficialBirth
        beneficialNationality
        isUsufructuary
        isActive
        notes
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const InfoDocument = gql`
  query info($_id: Int!) {
    publicSto(stoID: $_id) {
      settings {
        investorCategories {
          value
          label
        }
        favicon
        tabTitle
      }
      stolinkfull
      logo
      registrationText
      title
    }
  }
`;

/**
 * __useInfoQuery__
 *
 * To run a query within a React component, call `useInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInfoQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInfoQuery(baseOptions: Apollo.QueryHookOptions<InfoQuery, InfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InfoQuery, InfoQueryVariables>(InfoDocument, options);
}
export function useInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InfoQuery, InfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InfoQuery, InfoQueryVariables>(InfoDocument, options);
}
export type InfoQueryHookResult = ReturnType<typeof useInfoQuery>;
export type InfoLazyQueryHookResult = ReturnType<typeof useInfoLazyQuery>;
export type InfoQueryResult = Apollo.QueryResult<InfoQuery, InfoQueryVariables>;
export const InvestorPublicKeysDocument = gql`
  query investorPublicKeys {
    investorPublicKeys {
      ID
      title
    }
  }
`;

/**
 * __useInvestorPublicKeysQuery__
 *
 * To run a query within a React component, call `useInvestorPublicKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorPublicKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorPublicKeysQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorPublicKeysQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorPublicKeysQuery, InvestorPublicKeysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorPublicKeysQuery, InvestorPublicKeysQueryVariables>(
    InvestorPublicKeysDocument,
    options,
  );
}
export function useInvestorPublicKeysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorPublicKeysQuery, InvestorPublicKeysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorPublicKeysQuery, InvestorPublicKeysQueryVariables>(
    InvestorPublicKeysDocument,
    options,
  );
}
export type InvestorPublicKeysQueryHookResult = ReturnType<typeof useInvestorPublicKeysQuery>;
export type InvestorPublicKeysLazyQueryHookResult = ReturnType<typeof useInvestorPublicKeysLazyQuery>;
export type InvestorPublicKeysQueryResult = Apollo.QueryResult<
  InvestorPublicKeysQuery,
  InvestorPublicKeysQueryVariables
>;
export const InvestorActiveStoDocument = gql`
  query investorActiveSto($_id: Int) {
    investorSto(stoID: $_id) {
      ID
      isAccountClosed
      investorID
      stoID
      expectedShares
      expectedInvestment
      isKYC
      applied
      status
      usufructuaryFirstName
      usufructuaryLastName
      usufructuaryAddress
      usufructuaryCity
      usufructuaryCountry
      usufructuaryEmail
      beneficialFirstName
      beneficialLastName
      beneficialAddress
      beneficialCity
      beneficialCountry
      beneficialEmail
      beneficialBirth
      beneficialNationality
      isUsufructuary
      isActive
      notes
    }
  }
`;

/**
 * __useInvestorActiveStoQuery__
 *
 * To run a query within a React component, call `useInvestorActiveStoQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorActiveStoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorActiveStoQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorActiveStoQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorActiveStoQuery, InvestorActiveStoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorActiveStoQuery, InvestorActiveStoQueryVariables>(InvestorActiveStoDocument, options);
}
export function useInvestorActiveStoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorActiveStoQuery, InvestorActiveStoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorActiveStoQuery, InvestorActiveStoQueryVariables>(
    InvestorActiveStoDocument,
    options,
  );
}
export type InvestorActiveStoQueryHookResult = ReturnType<typeof useInvestorActiveStoQuery>;
export type InvestorActiveStoLazyQueryHookResult = ReturnType<typeof useInvestorActiveStoLazyQuery>;
export type InvestorActiveStoQueryResult = Apollo.QueryResult<InvestorActiveStoQuery, InvestorActiveStoQueryVariables>;
export const CountriesDocument = gql`
  query Countries {
    countries
  }
`;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
}
export function useCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
}
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const InvestorAppDataDocument = gql`
  query investorAppData {
    investorAppParameters {
      IsMarketSpace
      IsDocuSignActive
      IsHelloSignActive
      areSTOHostnamesEnabled
      KycProvider
      IsDarwSignatureActive
      IsCheckMarkSignatureActive
      web3Address
      polygonWeb3Address
      binanceWeb3Address
      IsInternalWalletStoSpecific
      IsInternalWalletGlobal
      IsInternalWalletDisabled
      poweredByLabel
      isSSOModeEnabled
      clientKYC
      SSORedirectFrontEnd
      KycRequirementStep
      IsMoonpayEnabled
      is2FAEnabledByDefault
      doAutomaticBlockchainTransactionChecks
      doAutomaticPurchase
      isInvoicingEnabled
      atomicSwapContractAddress
      isAccreditationEnabled
      AccreditationProvider
      AccreddRedirectLink
      isCloudStorageEnabled
      is2FAForcedForAll
      isPropertySortingEnabled
      isWalletManagementModuleEnabled
      isMyPortfolioModuleEnabled
      isActiveOfferingsModuleEnabled
      isNewsModuleEnabled
      isContractsModuleEnabled
      isCorporateActionsModuleEnabled
      isTradingModuleEnabled
      isChatModuleEnabled
      isSupportModuleEnabled
      isInvestorOwnershipModuleEnabled
      isSettingsModuleEnabled
      isTellAFriendModuleEnabled
      isAccreditationModuleEnabled
      isContactTheSponsorFontSwitchEnabled
      isSellBackEnabled
      isBankDetailsSwitchEnabled
      isBlockchainAddressSwitchEnabled
      toggleThemeEditor
      accreditationRequirementStep
      accreditationRequiringCountries
      skipDocumentSignScreen
      allowInvestorsToRegister
      hideContractsTilPostPurchase
      isInvestmentReturnCalculationEnabled
      isDriversLicenseEnabled
      isInternalTokenizedPurchaseEnabled
      termsAndConditionsConfig {
        link
        text
      }
      isAllDocumentsSignedPopUpEnabled
      isMergingPaymentsSharesRequestsEnabled
    }
  }
`;

/**
 * __useInvestorAppDataQuery__
 *
 * To run a query within a React component, call `useInvestorAppDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorAppDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorAppDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorAppDataQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorAppDataQuery, InvestorAppDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorAppDataQuery, InvestorAppDataQueryVariables>(InvestorAppDataDocument, options);
}
export function useInvestorAppDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorAppDataQuery, InvestorAppDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorAppDataQuery, InvestorAppDataQueryVariables>(InvestorAppDataDocument, options);
}
export type InvestorAppDataQueryHookResult = ReturnType<typeof useInvestorAppDataQuery>;
export type InvestorAppDataLazyQueryHookResult = ReturnType<typeof useInvestorAppDataLazyQuery>;
export type InvestorAppDataQueryResult = Apollo.QueryResult<InvestorAppDataQuery, InvestorAppDataQueryVariables>;
export const GetInvestorTypesDocument = gql`
  query getInvestorTypes {
    getInvestorTypes {
      ID
      type
    }
  }
`;

/**
 * __useGetInvestorTypesQuery__
 *
 * To run a query within a React component, call `useGetInvestorTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestorTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestorTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvestorTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetInvestorTypesQuery, GetInvestorTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestorTypesQuery, GetInvestorTypesQueryVariables>(GetInvestorTypesDocument, options);
}
export function useGetInvestorTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvestorTypesQuery, GetInvestorTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvestorTypesQuery, GetInvestorTypesQueryVariables>(GetInvestorTypesDocument, options);
}
export type GetInvestorTypesQueryHookResult = ReturnType<typeof useGetInvestorTypesQuery>;
export type GetInvestorTypesLazyQueryHookResult = ReturnType<typeof useGetInvestorTypesLazyQuery>;
export type GetInvestorTypesQueryResult = Apollo.QueryResult<GetInvestorTypesQuery, GetInvestorTypesQueryVariables>;
export const SaveContractFieldsDocument = gql`
  mutation saveContractFields($documentID: Int!, $fieldValues: [DocumentFieldValueDTO!]!) {
    setSubmittedDocument(documentID: $documentID, fieldValues: $fieldValues)
  }
`;
export type SaveContractFieldsMutationFn = Apollo.MutationFunction<
  SaveContractFieldsMutation,
  SaveContractFieldsMutationVariables
>;

/**
 * __useSaveContractFieldsMutation__
 *
 * To run a mutation, you first call `useSaveContractFieldsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveContractFieldsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveContractFieldsMutation, { data, loading, error }] = useSaveContractFieldsMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      fieldValues: // value for 'fieldValues'
 *   },
 * });
 */
export function useSaveContractFieldsMutation(
  baseOptions?: Apollo.MutationHookOptions<SaveContractFieldsMutation, SaveContractFieldsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveContractFieldsMutation, SaveContractFieldsMutationVariables>(
    SaveContractFieldsDocument,
    options,
  );
}
export type SaveContractFieldsMutationHookResult = ReturnType<typeof useSaveContractFieldsMutation>;
export type SaveContractFieldsMutationResult = Apollo.MutationResult<SaveContractFieldsMutation>;
export type SaveContractFieldsMutationOptions = Apollo.BaseMutationOptions<
  SaveContractFieldsMutation,
  SaveContractFieldsMutationVariables
>;
export const SaveContractSignatureDocument = gql`
  mutation saveContractSignature($documentID: Int!, $signature: String!) {
    setSignature(documentID: $documentID, base64: $signature)
  }
`;
export type SaveContractSignatureMutationFn = Apollo.MutationFunction<
  SaveContractSignatureMutation,
  SaveContractSignatureMutationVariables
>;

/**
 * __useSaveContractSignatureMutation__
 *
 * To run a mutation, you first call `useSaveContractSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveContractSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveContractSignatureMutation, { data, loading, error }] = useSaveContractSignatureMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useSaveContractSignatureMutation(
  baseOptions?: Apollo.MutationHookOptions<SaveContractSignatureMutation, SaveContractSignatureMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveContractSignatureMutation, SaveContractSignatureMutationVariables>(
    SaveContractSignatureDocument,
    options,
  );
}
export type SaveContractSignatureMutationHookResult = ReturnType<typeof useSaveContractSignatureMutation>;
export type SaveContractSignatureMutationResult = Apollo.MutationResult<SaveContractSignatureMutation>;
export type SaveContractSignatureMutationOptions = Apollo.BaseMutationOptions<
  SaveContractSignatureMutation,
  SaveContractSignatureMutationVariables
>;
export const SendContractDocument = gql`
  mutation sendContract($documentID: Int!) {
    sendContract(documentID: $documentID)
  }
`;
export type SendContractMutationFn = Apollo.MutationFunction<SendContractMutation, SendContractMutationVariables>;

/**
 * __useSendContractMutation__
 *
 * To run a mutation, you first call `useSendContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendContractMutation, { data, loading, error }] = useSendContractMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *   },
 * });
 */
export function useSendContractMutation(
  baseOptions?: Apollo.MutationHookOptions<SendContractMutation, SendContractMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendContractMutation, SendContractMutationVariables>(SendContractDocument, options);
}
export type SendContractMutationHookResult = ReturnType<typeof useSendContractMutation>;
export type SendContractMutationResult = Apollo.MutationResult<SendContractMutation>;
export type SendContractMutationOptions = Apollo.BaseMutationOptions<
  SendContractMutation,
  SendContractMutationVariables
>;
export const OfferedDocumentDocument = gql`
  query offeredDocument($documentID: Int!) {
    offeredDocument(documentID: $documentID) {
      document {
        ID
        title
        contents
      }
    }
    unfinishedDocument(documentID: $documentID) {
      fieldValues {
        ID
        value
      }
      signature {
        url
        modified
      }
      status
    }
    documentFields(documentID: $documentID) {
      ID
      title
      type
      helperText
    }
  }
`;

/**
 * __useOfferedDocumentQuery__
 *
 * To run a query within a React component, call `useOfferedDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfferedDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfferedDocumentQuery({
 *   variables: {
 *      documentID: // value for 'documentID'
 *   },
 * });
 */
export function useOfferedDocumentQuery(
  baseOptions: Apollo.QueryHookOptions<OfferedDocumentQuery, OfferedDocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OfferedDocumentQuery, OfferedDocumentQueryVariables>(OfferedDocumentDocument, options);
}
export function useOfferedDocumentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OfferedDocumentQuery, OfferedDocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OfferedDocumentQuery, OfferedDocumentQueryVariables>(OfferedDocumentDocument, options);
}
export type OfferedDocumentQueryHookResult = ReturnType<typeof useOfferedDocumentQuery>;
export type OfferedDocumentLazyQueryHookResult = ReturnType<typeof useOfferedDocumentLazyQuery>;
export type OfferedDocumentQueryResult = Apollo.QueryResult<OfferedDocumentQuery, OfferedDocumentQueryVariables>;
export const SubmittedDocumentDocument = gql`
  query submittedDocument($submittedDocumentID: Int!) {
    submittedDocument(submittedDocumentID: $submittedDocumentID) {
      fieldValues {
        ID
        value
      }
      contents
      signature {
        url
        modified
      }
      document {
        title
      }
      status
    }
  }
`;

/**
 * __useSubmittedDocumentQuery__
 *
 * To run a query within a React component, call `useSubmittedDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubmittedDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubmittedDocumentQuery({
 *   variables: {
 *      submittedDocumentID: // value for 'submittedDocumentID'
 *   },
 * });
 */
export function useSubmittedDocumentQuery(
  baseOptions: Apollo.QueryHookOptions<SubmittedDocumentQuery, SubmittedDocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SubmittedDocumentQuery, SubmittedDocumentQueryVariables>(SubmittedDocumentDocument, options);
}
export function useSubmittedDocumentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SubmittedDocumentQuery, SubmittedDocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SubmittedDocumentQuery, SubmittedDocumentQueryVariables>(
    SubmittedDocumentDocument,
    options,
  );
}
export type SubmittedDocumentQueryHookResult = ReturnType<typeof useSubmittedDocumentQuery>;
export type SubmittedDocumentLazyQueryHookResult = ReturnType<typeof useSubmittedDocumentLazyQuery>;
export type SubmittedDocumentQueryResult = Apollo.QueryResult<SubmittedDocumentQuery, SubmittedDocumentQueryVariables>;
export const ContractsPageDocument = gql`
  query contractsPage {
    offeredDocuments {
      title
      to
      document {
        ID
        title
      }
    }
    submittedDocuments(minStatus: 2) {
      ID
      status
      signatureFilePath
      document {
        ID
        title
        docusignDocumentID
        helloSignDocumentID
      }
      signature {
        modified
      }
    }
  }
`;

/**
 * __useContractsPageQuery__
 *
 * To run a query within a React component, call `useContractsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useContractsPageQuery(
  baseOptions?: Apollo.QueryHookOptions<ContractsPageQuery, ContractsPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ContractsPageQuery, ContractsPageQueryVariables>(ContractsPageDocument, options);
}
export function useContractsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ContractsPageQuery, ContractsPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ContractsPageQuery, ContractsPageQueryVariables>(ContractsPageDocument, options);
}
export type ContractsPageQueryHookResult = ReturnType<typeof useContractsPageQuery>;
export type ContractsPageLazyQueryHookResult = ReturnType<typeof useContractsPageLazyQuery>;
export type ContractsPageQueryResult = Apollo.QueryResult<ContractsPageQuery, ContractsPageQueryVariables>;
export const DownloadSignedHelloSignDocument = gql`
  query downloadSignedHelloSign($fileID: String!) {
    downloadSignedHelloSign(fileID: $fileID)
  }
`;

/**
 * __useDownloadSignedHelloSignQuery__
 *
 * To run a query within a React component, call `useDownloadSignedHelloSignQuery` and pass it any options that fit your needs.
 * When your component renders, `useDownloadSignedHelloSignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDownloadSignedHelloSignQuery({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useDownloadSignedHelloSignQuery(
  baseOptions: Apollo.QueryHookOptions<DownloadSignedHelloSignQuery, DownloadSignedHelloSignQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DownloadSignedHelloSignQuery, DownloadSignedHelloSignQueryVariables>(
    DownloadSignedHelloSignDocument,
    options,
  );
}
export function useDownloadSignedHelloSignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DownloadSignedHelloSignQuery, DownloadSignedHelloSignQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DownloadSignedHelloSignQuery, DownloadSignedHelloSignQueryVariables>(
    DownloadSignedHelloSignDocument,
    options,
  );
}
export type DownloadSignedHelloSignQueryHookResult = ReturnType<typeof useDownloadSignedHelloSignQuery>;
export type DownloadSignedHelloSignLazyQueryHookResult = ReturnType<typeof useDownloadSignedHelloSignLazyQuery>;
export type DownloadSignedHelloSignQueryResult = Apollo.QueryResult<
  DownloadSignedHelloSignQuery,
  DownloadSignedHelloSignQueryVariables
>;
export const DownloadSignedDocuSignDocument = gql`
  query downloadSignedDocuSign($envelopeID: String!) {
    downloadSignedDocuSign(envelopeID: $envelopeID)
  }
`;

/**
 * __useDownloadSignedDocuSignQuery__
 *
 * To run a query within a React component, call `useDownloadSignedDocuSignQuery` and pass it any options that fit your needs.
 * When your component renders, `useDownloadSignedDocuSignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDownloadSignedDocuSignQuery({
 *   variables: {
 *      envelopeID: // value for 'envelopeID'
 *   },
 * });
 */
export function useDownloadSignedDocuSignQuery(
  baseOptions: Apollo.QueryHookOptions<DownloadSignedDocuSignQuery, DownloadSignedDocuSignQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DownloadSignedDocuSignQuery, DownloadSignedDocuSignQueryVariables>(
    DownloadSignedDocuSignDocument,
    options,
  );
}
export function useDownloadSignedDocuSignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DownloadSignedDocuSignQuery, DownloadSignedDocuSignQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DownloadSignedDocuSignQuery, DownloadSignedDocuSignQueryVariables>(
    DownloadSignedDocuSignDocument,
    options,
  );
}
export type DownloadSignedDocuSignQueryHookResult = ReturnType<typeof useDownloadSignedDocuSignQuery>;
export type DownloadSignedDocuSignLazyQueryHookResult = ReturnType<typeof useDownloadSignedDocuSignLazyQuery>;
export type DownloadSignedDocuSignQueryResult = Apollo.QueryResult<
  DownloadSignedDocuSignQuery,
  DownloadSignedDocuSignQueryVariables
>;
export const CreateNewBuyOrderDocument = gql`
  mutation createNewBuyOrder($order: ExchangeBuyOrderInput!) {
    createBuyOrder(order: $order)
  }
`;
export type CreateNewBuyOrderMutationFn = Apollo.MutationFunction<
  CreateNewBuyOrderMutation,
  CreateNewBuyOrderMutationVariables
>;

/**
 * __useCreateNewBuyOrderMutation__
 *
 * To run a mutation, you first call `useCreateNewBuyOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewBuyOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewBuyOrderMutation, { data, loading, error }] = useCreateNewBuyOrderMutation({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateNewBuyOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateNewBuyOrderMutation, CreateNewBuyOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateNewBuyOrderMutation, CreateNewBuyOrderMutationVariables>(
    CreateNewBuyOrderDocument,
    options,
  );
}
export type CreateNewBuyOrderMutationHookResult = ReturnType<typeof useCreateNewBuyOrderMutation>;
export type CreateNewBuyOrderMutationResult = Apollo.MutationResult<CreateNewBuyOrderMutation>;
export type CreateNewBuyOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateNewBuyOrderMutation,
  CreateNewBuyOrderMutationVariables
>;
export const CreateNewSellOrderDocument = gql`
  mutation createNewSellOrder($order: ExchangeSellOrderInput!) {
    createSellOrder(order: $order)
  }
`;
export type CreateNewSellOrderMutationFn = Apollo.MutationFunction<
  CreateNewSellOrderMutation,
  CreateNewSellOrderMutationVariables
>;

/**
 * __useCreateNewSellOrderMutation__
 *
 * To run a mutation, you first call `useCreateNewSellOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewSellOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewSellOrderMutation, { data, loading, error }] = useCreateNewSellOrderMutation({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateNewSellOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateNewSellOrderMutation, CreateNewSellOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateNewSellOrderMutation, CreateNewSellOrderMutationVariables>(
    CreateNewSellOrderDocument,
    options,
  );
}
export type CreateNewSellOrderMutationHookResult = ReturnType<typeof useCreateNewSellOrderMutation>;
export type CreateNewSellOrderMutationResult = Apollo.MutationResult<CreateNewSellOrderMutation>;
export type CreateNewSellOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateNewSellOrderMutation,
  CreateNewSellOrderMutationVariables
>;
export const UpdateSellOrderDocument = gql`
  mutation updateSellOrder($orderID: Int!, $data: ExchangeUpdateOrderInput!) {
    updateSellOrder(orderID: $orderID, data: $data)
  }
`;
export type UpdateSellOrderMutationFn = Apollo.MutationFunction<
  UpdateSellOrderMutation,
  UpdateSellOrderMutationVariables
>;

/**
 * __useUpdateSellOrderMutation__
 *
 * To run a mutation, you first call `useUpdateSellOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSellOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSellOrderMutation, { data, loading, error }] = useUpdateSellOrderMutation({
 *   variables: {
 *      orderID: // value for 'orderID'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSellOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSellOrderMutation, UpdateSellOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateSellOrderMutation, UpdateSellOrderMutationVariables>(
    UpdateSellOrderDocument,
    options,
  );
}
export type UpdateSellOrderMutationHookResult = ReturnType<typeof useUpdateSellOrderMutation>;
export type UpdateSellOrderMutationResult = Apollo.MutationResult<UpdateSellOrderMutation>;
export type UpdateSellOrderMutationOptions = Apollo.BaseMutationOptions<
  UpdateSellOrderMutation,
  UpdateSellOrderMutationVariables
>;
export const DeleteOrderDocument = gql`
  mutation deleteOrder($orderID: Int!) {
    deleteOrder(orderID: $orderID)
  }
`;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useDeleteOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
}
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const DeleteOfferDocument = gql`
  mutation deleteOffer($orderID: Int!) {
    deleteOffer(orderID: $orderID)
  }
`;
export type DeleteOfferMutationFn = Apollo.MutationFunction<DeleteOfferMutation, DeleteOfferMutationVariables>;

/**
 * __useDeleteOfferMutation__
 *
 * To run a mutation, you first call `useDeleteOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOfferMutation, { data, loading, error }] = useDeleteOfferMutation({
 *   variables: {
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useDeleteOfferMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteOfferMutation, DeleteOfferMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteOfferMutation, DeleteOfferMutationVariables>(DeleteOfferDocument, options);
}
export type DeleteOfferMutationHookResult = ReturnType<typeof useDeleteOfferMutation>;
export type DeleteOfferMutationResult = Apollo.MutationResult<DeleteOfferMutation>;
export type DeleteOfferMutationOptions = Apollo.BaseMutationOptions<DeleteOfferMutation, DeleteOfferMutationVariables>;
export const StartSwapDocument = gql`
  mutation startSwap($offerID: Int!) {
    startSwap(offerID: $offerID)
  }
`;
export type StartSwapMutationFn = Apollo.MutationFunction<StartSwapMutation, StartSwapMutationVariables>;

/**
 * __useStartSwapMutation__
 *
 * To run a mutation, you first call `useStartSwapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartSwapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startSwapMutation, { data, loading, error }] = useStartSwapMutation({
 *   variables: {
 *      offerID: // value for 'offerID'
 *   },
 * });
 */
export function useStartSwapMutation(
  baseOptions?: Apollo.MutationHookOptions<StartSwapMutation, StartSwapMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<StartSwapMutation, StartSwapMutationVariables>(StartSwapDocument, options);
}
export type StartSwapMutationHookResult = ReturnType<typeof useStartSwapMutation>;
export type StartSwapMutationResult = Apollo.MutationResult<StartSwapMutation>;
export type StartSwapMutationOptions = Apollo.BaseMutationOptions<StartSwapMutation, StartSwapMutationVariables>;
export const CreateNewOfferDocument = gql`
  mutation createNewOffer($offer: ExchangeOfferInput!) {
    createOffer(offer: $offer)
  }
`;
export type CreateNewOfferMutationFn = Apollo.MutationFunction<CreateNewOfferMutation, CreateNewOfferMutationVariables>;

/**
 * __useCreateNewOfferMutation__
 *
 * To run a mutation, you first call `useCreateNewOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewOfferMutation, { data, loading, error }] = useCreateNewOfferMutation({
 *   variables: {
 *      offer: // value for 'offer'
 *   },
 * });
 */
export function useCreateNewOfferMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateNewOfferMutation, CreateNewOfferMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateNewOfferMutation, CreateNewOfferMutationVariables>(CreateNewOfferDocument, options);
}
export type CreateNewOfferMutationHookResult = ReturnType<typeof useCreateNewOfferMutation>;
export type CreateNewOfferMutationResult = Apollo.MutationResult<CreateNewOfferMutation>;
export type CreateNewOfferMutationOptions = Apollo.BaseMutationOptions<
  CreateNewOfferMutation,
  CreateNewOfferMutationVariables
>;
export const AcceptInternalSwapDocument = gql`
  mutation acceptInternalSwap($offerID: Int!) {
    acceptInternalSwap(offerID: $offerID)
  }
`;
export type AcceptInternalSwapMutationFn = Apollo.MutationFunction<
  AcceptInternalSwapMutation,
  AcceptInternalSwapMutationVariables
>;

/**
 * __useAcceptInternalSwapMutation__
 *
 * To run a mutation, you first call `useAcceptInternalSwapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInternalSwapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInternalSwapMutation, { data, loading, error }] = useAcceptInternalSwapMutation({
 *   variables: {
 *      offerID: // value for 'offerID'
 *   },
 * });
 */
export function useAcceptInternalSwapMutation(
  baseOptions?: Apollo.MutationHookOptions<AcceptInternalSwapMutation, AcceptInternalSwapMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AcceptInternalSwapMutation, AcceptInternalSwapMutationVariables>(
    AcceptInternalSwapDocument,
    options,
  );
}
export type AcceptInternalSwapMutationHookResult = ReturnType<typeof useAcceptInternalSwapMutation>;
export type AcceptInternalSwapMutationResult = Apollo.MutationResult<AcceptInternalSwapMutation>;
export type AcceptInternalSwapMutationOptions = Apollo.BaseMutationOptions<
  AcceptInternalSwapMutation,
  AcceptInternalSwapMutationVariables
>;
export const AcceptBlockchainSwapDocument = gql`
  mutation acceptBlockchainSwap($walletAddress: String!, $orderID: Int!) {
    acceptBlockchainSwap(walletAddress: $walletAddress, orderID: $orderID)
  }
`;
export type AcceptBlockchainSwapMutationFn = Apollo.MutationFunction<
  AcceptBlockchainSwapMutation,
  AcceptBlockchainSwapMutationVariables
>;

/**
 * __useAcceptBlockchainSwapMutation__
 *
 * To run a mutation, you first call `useAcceptBlockchainSwapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptBlockchainSwapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptBlockchainSwapMutation, { data, loading, error }] = useAcceptBlockchainSwapMutation({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useAcceptBlockchainSwapMutation(
  baseOptions?: Apollo.MutationHookOptions<AcceptBlockchainSwapMutation, AcceptBlockchainSwapMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AcceptBlockchainSwapMutation, AcceptBlockchainSwapMutationVariables>(
    AcceptBlockchainSwapDocument,
    options,
  );
}
export type AcceptBlockchainSwapMutationHookResult = ReturnType<typeof useAcceptBlockchainSwapMutation>;
export type AcceptBlockchainSwapMutationResult = Apollo.MutationResult<AcceptBlockchainSwapMutation>;
export type AcceptBlockchainSwapMutationOptions = Apollo.BaseMutationOptions<
  AcceptBlockchainSwapMutation,
  AcceptBlockchainSwapMutationVariables
>;
export const CompanyTransferSharesDocument = gql`
  mutation CompanyTransferShares($data: TransferShareInput!) {
    companyTransferShares(data: $data)
  }
`;
export type CompanyTransferSharesMutationFn = Apollo.MutationFunction<
  CompanyTransferSharesMutation,
  CompanyTransferSharesMutationVariables
>;

/**
 * __useCompanyTransferSharesMutation__
 *
 * To run a mutation, you first call `useCompanyTransferSharesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyTransferSharesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyTransferSharesMutation, { data, loading, error }] = useCompanyTransferSharesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCompanyTransferSharesMutation(
  baseOptions?: Apollo.MutationHookOptions<CompanyTransferSharesMutation, CompanyTransferSharesMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CompanyTransferSharesMutation, CompanyTransferSharesMutationVariables>(
    CompanyTransferSharesDocument,
    options,
  );
}
export type CompanyTransferSharesMutationHookResult = ReturnType<typeof useCompanyTransferSharesMutation>;
export type CompanyTransferSharesMutationResult = Apollo.MutationResult<CompanyTransferSharesMutation>;
export type CompanyTransferSharesMutationOptions = Apollo.BaseMutationOptions<
  CompanyTransferSharesMutation,
  CompanyTransferSharesMutationVariables
>;
export const UpdateOrderStatusDocument = gql`
  mutation UpdateOrderStatus($atomicSwapCurrentStatus: AtomicSwapStatus!, $orderId: Int!) {
    updateOrderStatus(atomicSwapCurrentStatus: $atomicSwapCurrentStatus, orderID: $orderId)
  }
`;
export type UpdateOrderStatusMutationFn = Apollo.MutationFunction<
  UpdateOrderStatusMutation,
  UpdateOrderStatusMutationVariables
>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      atomicSwapCurrentStatus: // value for 'atomicSwapCurrentStatus'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(
    UpdateOrderStatusDocument,
    options,
  );
}
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = Apollo.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrderStatusMutation,
  UpdateOrderStatusMutationVariables
>;
export const GetInvestorExchangeOrdersDocument = gql`
  query getInvestorExchangeOrders($type: ExchangeType!, $stoID: Int) {
    getInvestorExchangeOrders(type: $type, stoID: $stoID) {
      shareType {
        title
        currency {
          ID
          symbol
        }
      }
      ID
      atomicSwapAcceptable
      atomicSwapCurrentStatus
      dateFrom
      dateTo
      rateFrom
      rateTo
      shares
      type
    }
  }
`;

/**
 * __useGetInvestorExchangeOrdersQuery__
 *
 * To run a query within a React component, call `useGetInvestorExchangeOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestorExchangeOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestorExchangeOrdersQuery({
 *   variables: {
 *      type: // value for 'type'
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useGetInvestorExchangeOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<GetInvestorExchangeOrdersQuery, GetInvestorExchangeOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestorExchangeOrdersQuery, GetInvestorExchangeOrdersQueryVariables>(
    GetInvestorExchangeOrdersDocument,
    options,
  );
}
export function useGetInvestorExchangeOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvestorExchangeOrdersQuery, GetInvestorExchangeOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvestorExchangeOrdersQuery, GetInvestorExchangeOrdersQueryVariables>(
    GetInvestorExchangeOrdersDocument,
    options,
  );
}
export type GetInvestorExchangeOrdersQueryHookResult = ReturnType<typeof useGetInvestorExchangeOrdersQuery>;
export type GetInvestorExchangeOrdersLazyQueryHookResult = ReturnType<typeof useGetInvestorExchangeOrdersLazyQuery>;
export type GetInvestorExchangeOrdersQueryResult = Apollo.QueryResult<
  GetInvestorExchangeOrdersQuery,
  GetInvestorExchangeOrdersQueryVariables
>;
export const GetExchangeOrdersDocument = gql`
  query getExchangeOrders($stoID: Int!) {
    getExchangeOrders(stoID: $stoID) {
      shareType {
        title
        currency {
          ID
          symbol
        }
      }
      ID
      atomicSwapAcceptable
      atomicSwapCurrentStatus
      dateFrom
      rateFrom
      rateTo
      shares
      type
    }
  }
`;

/**
 * __useGetExchangeOrdersQuery__
 *
 * To run a query within a React component, call `useGetExchangeOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeOrdersQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useGetExchangeOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<GetExchangeOrdersQuery, GetExchangeOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExchangeOrdersQuery, GetExchangeOrdersQueryVariables>(GetExchangeOrdersDocument, options);
}
export function useGetExchangeOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeOrdersQuery, GetExchangeOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetExchangeOrdersQuery, GetExchangeOrdersQueryVariables>(
    GetExchangeOrdersDocument,
    options,
  );
}
export type GetExchangeOrdersQueryHookResult = ReturnType<typeof useGetExchangeOrdersQuery>;
export type GetExchangeOrdersLazyQueryHookResult = ReturnType<typeof useGetExchangeOrdersLazyQuery>;
export type GetExchangeOrdersQueryResult = Apollo.QueryResult<GetExchangeOrdersQuery, GetExchangeOrdersQueryVariables>;
export const GetMyOffersDocument = gql`
  query getMyOffers($stoID: Int!, $type: ExchangeType!) {
    getExchangeOffers(stoID: $stoID, type: $type) {
      ID
      exchangeOrder {
        ID
        dateFrom
        dateTo
        rateFrom
        atomicSwapAcceptable
        atomicSwapCurrentStatus
        shareType {
          title
          currency {
            ID
            symbol
          }
        }
      }
      rateFrom
      sharesPartial
    }
  }
`;

/**
 * __useGetMyOffersQuery__
 *
 * To run a query within a React component, call `useGetMyOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOffersQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetMyOffersQuery(baseOptions: Apollo.QueryHookOptions<GetMyOffersQuery, GetMyOffersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyOffersQuery, GetMyOffersQueryVariables>(GetMyOffersDocument, options);
}
export function useGetMyOffersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyOffersQuery, GetMyOffersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyOffersQuery, GetMyOffersQueryVariables>(GetMyOffersDocument, options);
}
export type GetMyOffersQueryHookResult = ReturnType<typeof useGetMyOffersQuery>;
export type GetMyOffersLazyQueryHookResult = ReturnType<typeof useGetMyOffersLazyQuery>;
export type GetMyOffersQueryResult = Apollo.QueryResult<GetMyOffersQuery, GetMyOffersQueryVariables>;
export const FindShareTypesDocument = gql`
  query findShareTypes($stoID: Int!) {
    findShareTypes(stoID: $stoID) {
      currency {
        symbol
      }
      ID
      stoID
      title
      nominalValue
      premiumValue
    }
  }
`;

/**
 * __useFindShareTypesQuery__
 *
 * To run a query within a React component, call `useFindShareTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindShareTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindShareTypesQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useFindShareTypesQuery(
  baseOptions: Apollo.QueryHookOptions<FindShareTypesQuery, FindShareTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindShareTypesQuery, FindShareTypesQueryVariables>(FindShareTypesDocument, options);
}
export function useFindShareTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindShareTypesQuery, FindShareTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindShareTypesQuery, FindShareTypesQueryVariables>(FindShareTypesDocument, options);
}
export type FindShareTypesQueryHookResult = ReturnType<typeof useFindShareTypesQuery>;
export type FindShareTypesLazyQueryHookResult = ReturnType<typeof useFindShareTypesLazyQuery>;
export type FindShareTypesQueryResult = Apollo.QueryResult<FindShareTypesQuery, FindShareTypesQueryVariables>;
export const GetExchangeOrderDetailDocument = gql`
  query getExchangeOrderDetail($orderID: Int!) {
    getExchangeOrderOffers(orderID: $orderID) {
      sharesPartial
      rateFrom
      rateTo
      description
      atomicSwapAccepted
      atomicSwapSecret
      atomicBuyerPublicKey
      atomicSwapExpireDate
      investorID
      ID
    }
    getExchangeOrder(orderID: $orderID) {
      ID
      type
      dateFrom
      dateTo
      shares
      rateFrom
      atomicSwapAcceptable
      investorID
      stoID
      shareType {
        title
        currency {
          symbol
        }
      }
    }
  }
`;

/**
 * __useGetExchangeOrderDetailQuery__
 *
 * To run a query within a React component, call `useGetExchangeOrderDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeOrderDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeOrderDetailQuery({
 *   variables: {
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useGetExchangeOrderDetailQuery(
  baseOptions: Apollo.QueryHookOptions<GetExchangeOrderDetailQuery, GetExchangeOrderDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExchangeOrderDetailQuery, GetExchangeOrderDetailQueryVariables>(
    GetExchangeOrderDetailDocument,
    options,
  );
}
export function useGetExchangeOrderDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeOrderDetailQuery, GetExchangeOrderDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetExchangeOrderDetailQuery, GetExchangeOrderDetailQueryVariables>(
    GetExchangeOrderDetailDocument,
    options,
  );
}
export type GetExchangeOrderDetailQueryHookResult = ReturnType<typeof useGetExchangeOrderDetailQuery>;
export type GetExchangeOrderDetailLazyQueryHookResult = ReturnType<typeof useGetExchangeOrderDetailLazyQuery>;
export type GetExchangeOrderDetailQueryResult = Apollo.QueryResult<
  GetExchangeOrderDetailQuery,
  GetExchangeOrderDetailQueryVariables
>;
export const GetExchangeOfferDetailDocument = gql`
  query getExchangeOfferDetail($orderID: Int!) {
    getExchangeOffer(orderID: $orderID) {
      sharesPartial
      rateFrom
      rateTo
      description
      atomicSwapAccepted
      atomicSwapSecret
      atomicBuyerPublicKey
      atomicSwapExpireDate
      investorID
      ID
    }
    getExchangeOrder(orderID: $orderID) {
      ID
      type
      stoID
      dateFrom
      dateTo
      shares
      rateFrom
      atomicSwapAcceptable
      atomicSwapCurrentStatus
      atomicSwapTokenAddressAcceptable
      investorID
      atomicSwapSharesWallet {
        publicKey
      }
      shareType {
        ID
        title
        isBlockchain
        ethereumBlockchainPublicAddress
        ethereumContractAddress
        currency {
          ID
          symbol
        }
      }
    }
  }
`;

/**
 * __useGetExchangeOfferDetailQuery__
 *
 * To run a query within a React component, call `useGetExchangeOfferDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeOfferDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeOfferDetailQuery({
 *   variables: {
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useGetExchangeOfferDetailQuery(
  baseOptions: Apollo.QueryHookOptions<GetExchangeOfferDetailQuery, GetExchangeOfferDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExchangeOfferDetailQuery, GetExchangeOfferDetailQueryVariables>(
    GetExchangeOfferDetailDocument,
    options,
  );
}
export function useGetExchangeOfferDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeOfferDetailQuery, GetExchangeOfferDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetExchangeOfferDetailQuery, GetExchangeOfferDetailQueryVariables>(
    GetExchangeOfferDetailDocument,
    options,
  );
}
export type GetExchangeOfferDetailQueryHookResult = ReturnType<typeof useGetExchangeOfferDetailQuery>;
export type GetExchangeOfferDetailLazyQueryHookResult = ReturnType<typeof useGetExchangeOfferDetailLazyQuery>;
export type GetExchangeOfferDetailQueryResult = Apollo.QueryResult<
  GetExchangeOfferDetailQuery,
  GetExchangeOfferDetailQueryVariables
>;
export const GetAcceptedExchangeOfferDocument = gql`
  query GetAcceptedExchangeOffer($orderID: Int!) {
    getAcceptedExchangeOffer(orderID: $orderID) {
      ID
      exchangeOrderID
      investorID
      stoID
      sharesPartial
      rateFrom
      rateTo
      description
      atomicSwapAccepted
      atomicSwapSecret
      atomicBuyerPublicKey
      atomicSwapExpireDate
    }
  }
`;

/**
 * __useGetAcceptedExchangeOfferQuery__
 *
 * To run a query within a React component, call `useGetAcceptedExchangeOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcceptedExchangeOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcceptedExchangeOfferQuery({
 *   variables: {
 *      orderID: // value for 'orderID'
 *   },
 * });
 */
export function useGetAcceptedExchangeOfferQuery(
  baseOptions: Apollo.QueryHookOptions<GetAcceptedExchangeOfferQuery, GetAcceptedExchangeOfferQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAcceptedExchangeOfferQuery, GetAcceptedExchangeOfferQueryVariables>(
    GetAcceptedExchangeOfferDocument,
    options,
  );
}
export function useGetAcceptedExchangeOfferLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAcceptedExchangeOfferQuery, GetAcceptedExchangeOfferQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAcceptedExchangeOfferQuery, GetAcceptedExchangeOfferQueryVariables>(
    GetAcceptedExchangeOfferDocument,
    options,
  );
}
export type GetAcceptedExchangeOfferQueryHookResult = ReturnType<typeof useGetAcceptedExchangeOfferQuery>;
export type GetAcceptedExchangeOfferLazyQueryHookResult = ReturnType<typeof useGetAcceptedExchangeOfferLazyQuery>;
export type GetAcceptedExchangeOfferQueryResult = Apollo.QueryResult<
  GetAcceptedExchangeOfferQuery,
  GetAcceptedExchangeOfferQueryVariables
>;
export const GetExchangeNewOfferDocument = gql`
  query getExchangeNewOffer($currencyID: Int!, $stoID: Int!, $shareTypeID: Int!) {
    investorBalance(currencyID: $currencyID, stoID: $stoID) {
      amount
    }
    getSharesWallets(shareTypeID: $shareTypeID) {
      ID
      isBlocked
      publicKey
      shares
    }
  }
`;

/**
 * __useGetExchangeNewOfferQuery__
 *
 * To run a query within a React component, call `useGetExchangeNewOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeNewOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeNewOfferQuery({
 *   variables: {
 *      currencyID: // value for 'currencyID'
 *      stoID: // value for 'stoID'
 *      shareTypeID: // value for 'shareTypeID'
 *   },
 * });
 */
export function useGetExchangeNewOfferQuery(
  baseOptions: Apollo.QueryHookOptions<GetExchangeNewOfferQuery, GetExchangeNewOfferQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExchangeNewOfferQuery, GetExchangeNewOfferQueryVariables>(
    GetExchangeNewOfferDocument,
    options,
  );
}
export function useGetExchangeNewOfferLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeNewOfferQuery, GetExchangeNewOfferQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetExchangeNewOfferQuery, GetExchangeNewOfferQueryVariables>(
    GetExchangeNewOfferDocument,
    options,
  );
}
export type GetExchangeNewOfferQueryHookResult = ReturnType<typeof useGetExchangeNewOfferQuery>;
export type GetExchangeNewOfferLazyQueryHookResult = ReturnType<typeof useGetExchangeNewOfferLazyQuery>;
export type GetExchangeNewOfferQueryResult = Apollo.QueryResult<
  GetExchangeNewOfferQuery,
  GetExchangeNewOfferQueryVariables
>;
export const GetInvestorPlatformBalanceDocument = gql`
  query getInvestorPlatformBalance($shareTypeID: Int!) {
    getSharesWallets(shareTypeID: $shareTypeID, platform: true) {
      shares
    }
    investorShare(shareTypeID: $shareTypeID) {
      shares
    }
  }
`;

/**
 * __useGetInvestorPlatformBalanceQuery__
 *
 * To run a query within a React component, call `useGetInvestorPlatformBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestorPlatformBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestorPlatformBalanceQuery({
 *   variables: {
 *      shareTypeID: // value for 'shareTypeID'
 *   },
 * });
 */
export function useGetInvestorPlatformBalanceQuery(
  baseOptions: Apollo.QueryHookOptions<GetInvestorPlatformBalanceQuery, GetInvestorPlatformBalanceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestorPlatformBalanceQuery, GetInvestorPlatformBalanceQueryVariables>(
    GetInvestorPlatformBalanceDocument,
    options,
  );
}
export function useGetInvestorPlatformBalanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvestorPlatformBalanceQuery, GetInvestorPlatformBalanceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvestorPlatformBalanceQuery, GetInvestorPlatformBalanceQueryVariables>(
    GetInvestorPlatformBalanceDocument,
    options,
  );
}
export type GetInvestorPlatformBalanceQueryHookResult = ReturnType<typeof useGetInvestorPlatformBalanceQuery>;
export type GetInvestorPlatformBalanceLazyQueryHookResult = ReturnType<typeof useGetInvestorPlatformBalanceLazyQuery>;
export type GetInvestorPlatformBalanceQueryResult = Apollo.QueryResult<
  GetInvestorPlatformBalanceQuery,
  GetInvestorPlatformBalanceQueryVariables
>;
export const RefreshInvestorDataDocument = gql`
  mutation refreshInvestorData {
    refreshInvestorData
  }
`;
export type RefreshInvestorDataMutationFn = Apollo.MutationFunction<
  RefreshInvestorDataMutation,
  RefreshInvestorDataMutationVariables
>;

/**
 * __useRefreshInvestorDataMutation__
 *
 * To run a mutation, you first call `useRefreshInvestorDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshInvestorDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshInvestorDataMutation, { data, loading, error }] = useRefreshInvestorDataMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshInvestorDataMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshInvestorDataMutation, RefreshInvestorDataMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshInvestorDataMutation, RefreshInvestorDataMutationVariables>(
    RefreshInvestorDataDocument,
    options,
  );
}
export type RefreshInvestorDataMutationHookResult = ReturnType<typeof useRefreshInvestorDataMutation>;
export type RefreshInvestorDataMutationResult = Apollo.MutationResult<RefreshInvestorDataMutation>;
export type RefreshInvestorDataMutationOptions = Apollo.BaseMutationOptions<
  RefreshInvestorDataMutation,
  RefreshInvestorDataMutationVariables
>;
export const GetSumSubInvestorTokenDocument = gql`
  query getSumSubInvestorToken {
    getSumSubInvestorToken
  }
`;

/**
 * __useGetSumSubInvestorTokenQuery__
 *
 * To run a query within a React component, call `useGetSumSubInvestorTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSumSubInvestorTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSumSubInvestorTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSumSubInvestorTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSumSubInvestorTokenQuery, GetSumSubInvestorTokenQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSumSubInvestorTokenQuery, GetSumSubInvestorTokenQueryVariables>(
    GetSumSubInvestorTokenDocument,
    options,
  );
}
export function useGetSumSubInvestorTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSumSubInvestorTokenQuery, GetSumSubInvestorTokenQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSumSubInvestorTokenQuery, GetSumSubInvestorTokenQueryVariables>(
    GetSumSubInvestorTokenDocument,
    options,
  );
}
export type GetSumSubInvestorTokenQueryHookResult = ReturnType<typeof useGetSumSubInvestorTokenQuery>;
export type GetSumSubInvestorTokenLazyQueryHookResult = ReturnType<typeof useGetSumSubInvestorTokenLazyQuery>;
export type GetSumSubInvestorTokenQueryResult = Apollo.QueryResult<
  GetSumSubInvestorTokenQuery,
  GetSumSubInvestorTokenQueryVariables
>;
export const GetBlockPassClientIdDocument = gql`
  query getBlockPassClientID {
    getBlockPassClientID
  }
`;

/**
 * __useGetBlockPassClientIdQuery__
 *
 * To run a query within a React component, call `useGetBlockPassClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockPassClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockPassClientIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlockPassClientIdQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBlockPassClientIdQuery, GetBlockPassClientIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBlockPassClientIdQuery, GetBlockPassClientIdQueryVariables>(
    GetBlockPassClientIdDocument,
    options,
  );
}
export function useGetBlockPassClientIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBlockPassClientIdQuery, GetBlockPassClientIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBlockPassClientIdQuery, GetBlockPassClientIdQueryVariables>(
    GetBlockPassClientIdDocument,
    options,
  );
}
export type GetBlockPassClientIdQueryHookResult = ReturnType<typeof useGetBlockPassClientIdQuery>;
export type GetBlockPassClientIdLazyQueryHookResult = ReturnType<typeof useGetBlockPassClientIdLazyQuery>;
export type GetBlockPassClientIdQueryResult = Apollo.QueryResult<
  GetBlockPassClientIdQuery,
  GetBlockPassClientIdQueryVariables
>;
export const GetNetkiSignUpDataDocument = gql`
  query getNetkiSignUpData {
    getNetkiSignUpData {
      accessCode
      mobileAppPanel
    }
  }
`;

/**
 * __useGetNetkiSignUpDataQuery__
 *
 * To run a query within a React component, call `useGetNetkiSignUpDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetkiSignUpDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetkiSignUpDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNetkiSignUpDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetNetkiSignUpDataQuery, GetNetkiSignUpDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNetkiSignUpDataQuery, GetNetkiSignUpDataQueryVariables>(
    GetNetkiSignUpDataDocument,
    options,
  );
}
export function useGetNetkiSignUpDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetNetkiSignUpDataQuery, GetNetkiSignUpDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNetkiSignUpDataQuery, GetNetkiSignUpDataQueryVariables>(
    GetNetkiSignUpDataDocument,
    options,
  );
}
export type GetNetkiSignUpDataQueryHookResult = ReturnType<typeof useGetNetkiSignUpDataQuery>;
export type GetNetkiSignUpDataLazyQueryHookResult = ReturnType<typeof useGetNetkiSignUpDataLazyQuery>;
export type GetNetkiSignUpDataQueryResult = Apollo.QueryResult<
  GetNetkiSignUpDataQuery,
  GetNetkiSignUpDataQueryVariables
>;
export const RootKycDocument = gql`
  subscription rootKyc {
    rootKyc {
      isKYC
      isActive
      status
      ID
    }
  }
`;

/**
 * __useRootKycSubscription__
 *
 * To run a query within a React component, call `useRootKycSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRootKycSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRootKycSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRootKycSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<RootKycSubscription, RootKycSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<RootKycSubscription, RootKycSubscriptionVariables>(RootKycDocument, options);
}
export type RootKycSubscriptionHookResult = ReturnType<typeof useRootKycSubscription>;
export type RootKycSubscriptionResult = Apollo.SubscriptionResult<RootKycSubscription>;
export const FetchFeesDocument = gql`
  query fetchFees($stoID: Int!, $beneficiary: FEE_BENEFICIARY, $type: FEE_TYPE, $status: COMMISSION_TYPE) {
    fetchFees(stoID: $stoID, beneficiary: $beneficiary, type: $type, status: $status) {
      ID
      beneficiary
      type
      amount
      status
    }
  }
`;

/**
 * __useFetchFeesQuery__
 *
 * To run a query within a React component, call `useFetchFeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchFeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchFeesQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *      beneficiary: // value for 'beneficiary'
 *      type: // value for 'type'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useFetchFeesQuery(baseOptions: Apollo.QueryHookOptions<FetchFeesQuery, FetchFeesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchFeesQuery, FetchFeesQueryVariables>(FetchFeesDocument, options);
}
export function useFetchFeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchFeesQuery, FetchFeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchFeesQuery, FetchFeesQueryVariables>(FetchFeesDocument, options);
}
export type FetchFeesQueryHookResult = ReturnType<typeof useFetchFeesQuery>;
export type FetchFeesLazyQueryHookResult = ReturnType<typeof useFetchFeesLazyQuery>;
export type FetchFeesQueryResult = Apollo.QueryResult<FetchFeesQuery, FetchFeesQueryVariables>;
export const GetInvitationLinkDocument = gql`
  query getInvitationLink {
    getInvitationLink
  }
`;

/**
 * __useGetInvitationLinkQuery__
 *
 * To run a query within a React component, call `useGetInvitationLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitationLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitationLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvitationLinkQuery(
  baseOptions?: Apollo.QueryHookOptions<GetInvitationLinkQuery, GetInvitationLinkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvitationLinkQuery, GetInvitationLinkQueryVariables>(GetInvitationLinkDocument, options);
}
export function useGetInvitationLinkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvitationLinkQuery, GetInvitationLinkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvitationLinkQuery, GetInvitationLinkQueryVariables>(
    GetInvitationLinkDocument,
    options,
  );
}
export type GetInvitationLinkQueryHookResult = ReturnType<typeof useGetInvitationLinkQuery>;
export type GetInvitationLinkLazyQueryHookResult = ReturnType<typeof useGetInvitationLinkLazyQuery>;
export type GetInvitationLinkQueryResult = Apollo.QueryResult<GetInvitationLinkQuery, GetInvitationLinkQueryVariables>;
export const CreateInboxDocument = gql`
  mutation createInbox($data: InboxInput!) {
    investorInboxCreate(data: $data)
  }
`;
export type CreateInboxMutationFn = Apollo.MutationFunction<CreateInboxMutation, CreateInboxMutationVariables>;

/**
 * __useCreateInboxMutation__
 *
 * To run a mutation, you first call `useCreateInboxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInboxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInboxMutation, { data, loading, error }] = useCreateInboxMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInboxMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateInboxMutation, CreateInboxMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateInboxMutation, CreateInboxMutationVariables>(CreateInboxDocument, options);
}
export type CreateInboxMutationHookResult = ReturnType<typeof useCreateInboxMutation>;
export type CreateInboxMutationResult = Apollo.MutationResult<CreateInboxMutation>;
export type CreateInboxMutationOptions = Apollo.BaseMutationOptions<CreateInboxMutation, CreateInboxMutationVariables>;
export const InboxDataDocument = gql`
  query inboxData($sto: Int!, $offset: Int!, $limit: Int) {
    investorInboxes(stoID: $sto, offset: $offset, limit: $limit) {
      ID
      stoID
      investorID
      title
      details
      date
      isResponded
      response
      responseDate
    }
  }
`;

/**
 * __useInboxDataQuery__
 *
 * To run a query within a React component, call `useInboxDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useInboxDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInboxDataQuery({
 *   variables: {
 *      sto: // value for 'sto'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useInboxDataQuery(baseOptions: Apollo.QueryHookOptions<InboxDataQuery, InboxDataQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InboxDataQuery, InboxDataQueryVariables>(InboxDataDocument, options);
}
export function useInboxDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InboxDataQuery, InboxDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InboxDataQuery, InboxDataQueryVariables>(InboxDataDocument, options);
}
export type InboxDataQueryHookResult = ReturnType<typeof useInboxDataQuery>;
export type InboxDataLazyQueryHookResult = ReturnType<typeof useInboxDataLazyQuery>;
export type InboxDataQueryResult = Apollo.QueryResult<InboxDataQuery, InboxDataQueryVariables>;
export const InboxMessageDocument = gql`
  query inboxMessage($_id: Int!) {
    investorInbox(ID: $_id) {
      ID
      stoID
      investorID
      title
      details
      date
      response
      isResponded
      responseDate
    }
  }
`;

/**
 * __useInboxMessageQuery__
 *
 * To run a query within a React component, call `useInboxMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useInboxMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInboxMessageQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInboxMessageQuery(
  baseOptions: Apollo.QueryHookOptions<InboxMessageQuery, InboxMessageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InboxMessageQuery, InboxMessageQueryVariables>(InboxMessageDocument, options);
}
export function useInboxMessageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InboxMessageQuery, InboxMessageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InboxMessageQuery, InboxMessageQueryVariables>(InboxMessageDocument, options);
}
export type InboxMessageQueryHookResult = ReturnType<typeof useInboxMessageQuery>;
export type InboxMessageLazyQueryHookResult = ReturnType<typeof useInboxMessageLazyQuery>;
export type InboxMessageQueryResult = Apollo.QueryResult<InboxMessageQuery, InboxMessageQueryVariables>;
export const InvestorInvestingEntityCreateDocument = gql`
  mutation InvestorInvestingEntityCreate($data: InvestingEntityInput!) {
    investorInvestingEntityCreate(data: $data)
  }
`;
export type InvestorInvestingEntityCreateMutationFn = Apollo.MutationFunction<
  InvestorInvestingEntityCreateMutation,
  InvestorInvestingEntityCreateMutationVariables
>;

/**
 * __useInvestorInvestingEntityCreateMutation__
 *
 * To run a mutation, you first call `useInvestorInvestingEntityCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntityCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvestingEntityCreateMutation, { data, loading, error }] = useInvestorInvestingEntityCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorInvestingEntityCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvestingEntityCreateMutation,
    InvestorInvestingEntityCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorInvestingEntityCreateMutation, InvestorInvestingEntityCreateMutationVariables>(
    InvestorInvestingEntityCreateDocument,
    options,
  );
}
export type InvestorInvestingEntityCreateMutationHookResult = ReturnType<
  typeof useInvestorInvestingEntityCreateMutation
>;
export type InvestorInvestingEntityCreateMutationResult = Apollo.MutationResult<InvestorInvestingEntityCreateMutation>;
export type InvestorInvestingEntityCreateMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvestingEntityCreateMutation,
  InvestorInvestingEntityCreateMutationVariables
>;
export const InvestorInvestingEntityUpdateDocument = gql`
  mutation InvestorInvestingEntityUpdate($data: InvestingEntityInput!, $entityID: Int!) {
    investorInvestingEntityUpdate(data: $data, entityID: $entityID)
  }
`;
export type InvestorInvestingEntityUpdateMutationFn = Apollo.MutationFunction<
  InvestorInvestingEntityUpdateMutation,
  InvestorInvestingEntityUpdateMutationVariables
>;

/**
 * __useInvestorInvestingEntityUpdateMutation__
 *
 * To run a mutation, you first call `useInvestorInvestingEntityUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntityUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvestingEntityUpdateMutation, { data, loading, error }] = useInvestorInvestingEntityUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *      entityID: // value for 'entityID'
 *   },
 * });
 */
export function useInvestorInvestingEntityUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvestingEntityUpdateMutation,
    InvestorInvestingEntityUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorInvestingEntityUpdateMutation, InvestorInvestingEntityUpdateMutationVariables>(
    InvestorInvestingEntityUpdateDocument,
    options,
  );
}
export type InvestorInvestingEntityUpdateMutationHookResult = ReturnType<
  typeof useInvestorInvestingEntityUpdateMutation
>;
export type InvestorInvestingEntityUpdateMutationResult = Apollo.MutationResult<InvestorInvestingEntityUpdateMutation>;
export type InvestorInvestingEntityUpdateMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvestingEntityUpdateMutation,
  InvestorInvestingEntityUpdateMutationVariables
>;
export const InvestorInvestingEntityRemoveDocument = gql`
  mutation InvestorInvestingEntityRemove($entityID: Int!) {
    investorInvestingEntityRemove(entityID: $entityID)
  }
`;
export type InvestorInvestingEntityRemoveMutationFn = Apollo.MutationFunction<
  InvestorInvestingEntityRemoveMutation,
  InvestorInvestingEntityRemoveMutationVariables
>;

/**
 * __useInvestorInvestingEntityRemoveMutation__
 *
 * To run a mutation, you first call `useInvestorInvestingEntityRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntityRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvestingEntityRemoveMutation, { data, loading, error }] = useInvestorInvestingEntityRemoveMutation({
 *   variables: {
 *      entityID: // value for 'entityID'
 *   },
 * });
 */
export function useInvestorInvestingEntityRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvestingEntityRemoveMutation,
    InvestorInvestingEntityRemoveMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorInvestingEntityRemoveMutation, InvestorInvestingEntityRemoveMutationVariables>(
    InvestorInvestingEntityRemoveDocument,
    options,
  );
}
export type InvestorInvestingEntityRemoveMutationHookResult = ReturnType<
  typeof useInvestorInvestingEntityRemoveMutation
>;
export type InvestorInvestingEntityRemoveMutationResult = Apollo.MutationResult<InvestorInvestingEntityRemoveMutation>;
export type InvestorInvestingEntityRemoveMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvestingEntityRemoveMutation,
  InvestorInvestingEntityRemoveMutationVariables
>;
export const InvestorInvestingEntityMemberCreateDocument = gql`
  mutation InvestorInvestingEntityMemberCreate($data: InvestingEntityMemberInput!) {
    investorInvestingEntityMemberCreate(data: $data)
  }
`;
export type InvestorInvestingEntityMemberCreateMutationFn = Apollo.MutationFunction<
  InvestorInvestingEntityMemberCreateMutation,
  InvestorInvestingEntityMemberCreateMutationVariables
>;

/**
 * __useInvestorInvestingEntityMemberCreateMutation__
 *
 * To run a mutation, you first call `useInvestorInvestingEntityMemberCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntityMemberCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvestingEntityMemberCreateMutation, { data, loading, error }] = useInvestorInvestingEntityMemberCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorInvestingEntityMemberCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvestingEntityMemberCreateMutation,
    InvestorInvestingEntityMemberCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InvestorInvestingEntityMemberCreateMutation,
    InvestorInvestingEntityMemberCreateMutationVariables
  >(InvestorInvestingEntityMemberCreateDocument, options);
}
export type InvestorInvestingEntityMemberCreateMutationHookResult = ReturnType<
  typeof useInvestorInvestingEntityMemberCreateMutation
>;
export type InvestorInvestingEntityMemberCreateMutationResult =
  Apollo.MutationResult<InvestorInvestingEntityMemberCreateMutation>;
export type InvestorInvestingEntityMemberCreateMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvestingEntityMemberCreateMutation,
  InvestorInvestingEntityMemberCreateMutationVariables
>;
export const InvestorInvestingEntityMemberUpdateDocument = gql`
  mutation InvestorInvestingEntityMemberUpdate($data: InvestingEntityMemberInput!, $memberID: Int!) {
    investorInvestingEntityMemberUpdate(data: $data, memberID: $memberID)
  }
`;
export type InvestorInvestingEntityMemberUpdateMutationFn = Apollo.MutationFunction<
  InvestorInvestingEntityMemberUpdateMutation,
  InvestorInvestingEntityMemberUpdateMutationVariables
>;

/**
 * __useInvestorInvestingEntityMemberUpdateMutation__
 *
 * To run a mutation, you first call `useInvestorInvestingEntityMemberUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntityMemberUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvestingEntityMemberUpdateMutation, { data, loading, error }] = useInvestorInvestingEntityMemberUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *      memberID: // value for 'memberID'
 *   },
 * });
 */
export function useInvestorInvestingEntityMemberUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvestingEntityMemberUpdateMutation,
    InvestorInvestingEntityMemberUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InvestorInvestingEntityMemberUpdateMutation,
    InvestorInvestingEntityMemberUpdateMutationVariables
  >(InvestorInvestingEntityMemberUpdateDocument, options);
}
export type InvestorInvestingEntityMemberUpdateMutationHookResult = ReturnType<
  typeof useInvestorInvestingEntityMemberUpdateMutation
>;
export type InvestorInvestingEntityMemberUpdateMutationResult =
  Apollo.MutationResult<InvestorInvestingEntityMemberUpdateMutation>;
export type InvestorInvestingEntityMemberUpdateMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvestingEntityMemberUpdateMutation,
  InvestorInvestingEntityMemberUpdateMutationVariables
>;
export const InvestorInvestingEntityMemberRemoveDocument = gql`
  mutation InvestorInvestingEntityMemberRemove($memberID: Int!) {
    investorInvestingEntityMemberRemove(memberID: $memberID)
  }
`;
export type InvestorInvestingEntityMemberRemoveMutationFn = Apollo.MutationFunction<
  InvestorInvestingEntityMemberRemoveMutation,
  InvestorInvestingEntityMemberRemoveMutationVariables
>;

/**
 * __useInvestorInvestingEntityMemberRemoveMutation__
 *
 * To run a mutation, you first call `useInvestorInvestingEntityMemberRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntityMemberRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvestingEntityMemberRemoveMutation, { data, loading, error }] = useInvestorInvestingEntityMemberRemoveMutation({
 *   variables: {
 *      memberID: // value for 'memberID'
 *   },
 * });
 */
export function useInvestorInvestingEntityMemberRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvestingEntityMemberRemoveMutation,
    InvestorInvestingEntityMemberRemoveMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InvestorInvestingEntityMemberRemoveMutation,
    InvestorInvestingEntityMemberRemoveMutationVariables
  >(InvestorInvestingEntityMemberRemoveDocument, options);
}
export type InvestorInvestingEntityMemberRemoveMutationHookResult = ReturnType<
  typeof useInvestorInvestingEntityMemberRemoveMutation
>;
export type InvestorInvestingEntityMemberRemoveMutationResult =
  Apollo.MutationResult<InvestorInvestingEntityMemberRemoveMutation>;
export type InvestorInvestingEntityMemberRemoveMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvestingEntityMemberRemoveMutation,
  InvestorInvestingEntityMemberRemoveMutationVariables
>;
export const InvestorBuyAlertMarketSpaceDocument = gql`
  mutation InvestorBuyAlertMarketSpace($data: InvestorBuyAlertMSInput!) {
    investorBuyAlertMarketSpace(data: $data)
  }
`;
export type InvestorBuyAlertMarketSpaceMutationFn = Apollo.MutationFunction<
  InvestorBuyAlertMarketSpaceMutation,
  InvestorBuyAlertMarketSpaceMutationVariables
>;

/**
 * __useInvestorBuyAlertMarketSpaceMutation__
 *
 * To run a mutation, you first call `useInvestorBuyAlertMarketSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorBuyAlertMarketSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorBuyAlertMarketSpaceMutation, { data, loading, error }] = useInvestorBuyAlertMarketSpaceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorBuyAlertMarketSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorBuyAlertMarketSpaceMutation,
    InvestorBuyAlertMarketSpaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorBuyAlertMarketSpaceMutation, InvestorBuyAlertMarketSpaceMutationVariables>(
    InvestorBuyAlertMarketSpaceDocument,
    options,
  );
}
export type InvestorBuyAlertMarketSpaceMutationHookResult = ReturnType<typeof useInvestorBuyAlertMarketSpaceMutation>;
export type InvestorBuyAlertMarketSpaceMutationResult = Apollo.MutationResult<InvestorBuyAlertMarketSpaceMutation>;
export type InvestorBuyAlertMarketSpaceMutationOptions = Apollo.BaseMutationOptions<
  InvestorBuyAlertMarketSpaceMutation,
  InvestorBuyAlertMarketSpaceMutationVariables
>;
export const InvestorInvestingEntitiesDocument = gql`
  query InvestorInvestingEntities {
    investorInvestingEntities {
      ID
      investorID
      typeID
      type {
        ID
        title
        countries
      }
      taxId
      name
      nickname
      accredited
      paymentMethod
      address
      city
      postalCode
      country
      state
      isApprovedByAdmin
      members {
        ID
        investorID
        entityID
        firstName
        lastName
        role
        signatory
        email
      }
      isApprovedByAdmin
    }
  }
`;

/**
 * __useInvestorInvestingEntitiesQuery__
 *
 * To run a query within a React component, call `useInvestorInvestingEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvestingEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorInvestingEntitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorInvestingEntitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorInvestingEntitiesQuery, InvestorInvestingEntitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorInvestingEntitiesQuery, InvestorInvestingEntitiesQueryVariables>(
    InvestorInvestingEntitiesDocument,
    options,
  );
}
export function useInvestorInvestingEntitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorInvestingEntitiesQuery, InvestorInvestingEntitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorInvestingEntitiesQuery, InvestorInvestingEntitiesQueryVariables>(
    InvestorInvestingEntitiesDocument,
    options,
  );
}
export type InvestorInvestingEntitiesQueryHookResult = ReturnType<typeof useInvestorInvestingEntitiesQuery>;
export type InvestorInvestingEntitiesLazyQueryHookResult = ReturnType<typeof useInvestorInvestingEntitiesLazyQuery>;
export type InvestorInvestingEntitiesQueryResult = Apollo.QueryResult<
  InvestorInvestingEntitiesQuery,
  InvestorInvestingEntitiesQueryVariables
>;
export const InvestorEntityTypesDocument = gql`
  query InvestorEntityTypes {
    investorInvestingEntityTypes {
      ID
      title
      countries
    }
  }
`;

/**
 * __useInvestorEntityTypesQuery__
 *
 * To run a query within a React component, call `useInvestorEntityTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorEntityTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorEntityTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorEntityTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorEntityTypesQuery, InvestorEntityTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorEntityTypesQuery, InvestorEntityTypesQueryVariables>(
    InvestorEntityTypesDocument,
    options,
  );
}
export function useInvestorEntityTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorEntityTypesQuery, InvestorEntityTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorEntityTypesQuery, InvestorEntityTypesQueryVariables>(
    InvestorEntityTypesDocument,
    options,
  );
}
export type InvestorEntityTypesQueryHookResult = ReturnType<typeof useInvestorEntityTypesQuery>;
export type InvestorEntityTypesLazyQueryHookResult = ReturnType<typeof useInvestorEntityTypesLazyQuery>;
export type InvestorEntityTypesQueryResult = Apollo.QueryResult<
  InvestorEntityTypesQuery,
  InvestorEntityTypesQueryVariables
>;
export const GetInvestingEntityDocument = gql`
  query GetInvestingEntity($id: Int!) {
    investorInvestingEntity(entityID: $id) {
      name
      address
      city
      country
      nickname
    }
  }
`;

/**
 * __useGetInvestingEntityQuery__
 *
 * To run a query within a React component, call `useGetInvestingEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestingEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestingEntityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvestingEntityQuery(
  baseOptions: Apollo.QueryHookOptions<GetInvestingEntityQuery, GetInvestingEntityQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestingEntityQuery, GetInvestingEntityQueryVariables>(
    GetInvestingEntityDocument,
    options,
  );
}
export function useGetInvestingEntityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvestingEntityQuery, GetInvestingEntityQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvestingEntityQuery, GetInvestingEntityQueryVariables>(
    GetInvestingEntityDocument,
    options,
  );
}
export type GetInvestingEntityQueryHookResult = ReturnType<typeof useGetInvestingEntityQuery>;
export type GetInvestingEntityLazyQueryHookResult = ReturnType<typeof useGetInvestingEntityLazyQuery>;
export type GetInvestingEntityQueryResult = Apollo.QueryResult<
  GetInvestingEntityQuery,
  GetInvestingEntityQueryVariables
>;
export const IsInvestorWhiteListedDocument = gql`
  query IsInvestorWhiteListed($walletAddress: String!) {
    isInvestorWhiteListed(walletAddress: $walletAddress)
  }
`;

/**
 * __useIsInvestorWhiteListedQuery__
 *
 * To run a query within a React component, call `useIsInvestorWhiteListedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsInvestorWhiteListedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsInvestorWhiteListedQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *   },
 * });
 */
export function useIsInvestorWhiteListedQuery(
  baseOptions: Apollo.QueryHookOptions<IsInvestorWhiteListedQuery, IsInvestorWhiteListedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IsInvestorWhiteListedQuery, IsInvestorWhiteListedQueryVariables>(
    IsInvestorWhiteListedDocument,
    options,
  );
}
export function useIsInvestorWhiteListedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IsInvestorWhiteListedQuery, IsInvestorWhiteListedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IsInvestorWhiteListedQuery, IsInvestorWhiteListedQueryVariables>(
    IsInvestorWhiteListedDocument,
    options,
  );
}
export type IsInvestorWhiteListedQueryHookResult = ReturnType<typeof useIsInvestorWhiteListedQuery>;
export type IsInvestorWhiteListedLazyQueryHookResult = ReturnType<typeof useIsInvestorWhiteListedLazyQuery>;
export type IsInvestorWhiteListedQueryResult = Apollo.QueryResult<
  IsInvestorWhiteListedQuery,
  IsInvestorWhiteListedQueryVariables
>;
export const AddNewInvestorBankAccountDocument = gql`
  mutation AddNewInvestorBankAccount($data: InvestorBankAccountInput!) {
    addNewInvestorBankAccount(data: $data)
  }
`;
export type AddNewInvestorBankAccountMutationFn = Apollo.MutationFunction<
  AddNewInvestorBankAccountMutation,
  AddNewInvestorBankAccountMutationVariables
>;

/**
 * __useAddNewInvestorBankAccountMutation__
 *
 * To run a mutation, you first call `useAddNewInvestorBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewInvestorBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewInvestorBankAccountMutation, { data, loading, error }] = useAddNewInvestorBankAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewInvestorBankAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddNewInvestorBankAccountMutation,
    AddNewInvestorBankAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddNewInvestorBankAccountMutation, AddNewInvestorBankAccountMutationVariables>(
    AddNewInvestorBankAccountDocument,
    options,
  );
}
export type AddNewInvestorBankAccountMutationHookResult = ReturnType<typeof useAddNewInvestorBankAccountMutation>;
export type AddNewInvestorBankAccountMutationResult = Apollo.MutationResult<AddNewInvestorBankAccountMutation>;
export type AddNewInvestorBankAccountMutationOptions = Apollo.BaseMutationOptions<
  AddNewInvestorBankAccountMutation,
  AddNewInvestorBankAccountMutationVariables
>;
export const FillKycDocument = gql`
  mutation FillKyc($data: JSON!) {
    fillKyc(data: $data)
  }
`;
export type FillKycMutationFn = Apollo.MutationFunction<FillKycMutation, FillKycMutationVariables>;

/**
 * __useFillKycMutation__
 *
 * To run a mutation, you first call `useFillKycMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFillKycMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fillKycMutation, { data, loading, error }] = useFillKycMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFillKycMutation(
  baseOptions?: Apollo.MutationHookOptions<FillKycMutation, FillKycMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FillKycMutation, FillKycMutationVariables>(FillKycDocument, options);
}
export type FillKycMutationHookResult = ReturnType<typeof useFillKycMutation>;
export type FillKycMutationResult = Apollo.MutationResult<FillKycMutation>;
export type FillKycMutationOptions = Apollo.BaseMutationOptions<FillKycMutation, FillKycMutationVariables>;
export const ApplyKycDocument = gql`
  mutation ApplyKyc($applied: Boolean!) {
    applyKyc(applied: $applied)
  }
`;
export type ApplyKycMutationFn = Apollo.MutationFunction<ApplyKycMutation, ApplyKycMutationVariables>;

/**
 * __useApplyKycMutation__
 *
 * To run a mutation, you first call `useApplyKycMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyKycMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyKycMutation, { data, loading, error }] = useApplyKycMutation({
 *   variables: {
 *      applied: // value for 'applied'
 *   },
 * });
 */
export function useApplyKycMutation(
  baseOptions?: Apollo.MutationHookOptions<ApplyKycMutation, ApplyKycMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ApplyKycMutation, ApplyKycMutationVariables>(ApplyKycDocument, options);
}
export type ApplyKycMutationHookResult = ReturnType<typeof useApplyKycMutation>;
export type ApplyKycMutationResult = Apollo.MutationResult<ApplyKycMutation>;
export type ApplyKycMutationOptions = Apollo.BaseMutationOptions<ApplyKycMutation, ApplyKycMutationVariables>;
export const JsonKycDocument = gql`
  query JsonKYC {
    kyc {
      name
      title
      icon
      pages {
        fields {
          values {
            value
            label
          }
          name
          label
          placeholder
          description
          error
          required
          type
        }
        name
        title
        icon
      }
    }
  }
`;

/**
 * __useJsonKycQuery__
 *
 * To run a query within a React component, call `useJsonKycQuery` and pass it any options that fit your needs.
 * When your component renders, `useJsonKycQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJsonKycQuery({
 *   variables: {
 *   },
 * });
 */
export function useJsonKycQuery(baseOptions?: Apollo.QueryHookOptions<JsonKycQuery, JsonKycQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<JsonKycQuery, JsonKycQueryVariables>(JsonKycDocument, options);
}
export function useJsonKycLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JsonKycQuery, JsonKycQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<JsonKycQuery, JsonKycQueryVariables>(JsonKycDocument, options);
}
export type JsonKycQueryHookResult = ReturnType<typeof useJsonKycQuery>;
export type JsonKycLazyQueryHookResult = ReturnType<typeof useJsonKycLazyQuery>;
export type JsonKycQueryResult = Apollo.QueryResult<JsonKycQuery, JsonKycQueryVariables>;
export const InvestorKycDocument = gql`
  query investorKyc {
    investorKyc
  }
`;

/**
 * __useInvestorKycQuery__
 *
 * To run a query within a React component, call `useInvestorKycQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorKycQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorKycQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorKycQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorKycQuery, InvestorKycQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorKycQuery, InvestorKycQueryVariables>(InvestorKycDocument, options);
}
export function useInvestorKycLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorKycQuery, InvestorKycQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorKycQuery, InvestorKycQueryVariables>(InvestorKycDocument, options);
}
export type InvestorKycQueryHookResult = ReturnType<typeof useInvestorKycQuery>;
export type InvestorKycLazyQueryHookResult = ReturnType<typeof useInvestorKycLazyQuery>;
export type InvestorKycQueryResult = Apollo.QueryResult<InvestorKycQuery, InvestorKycQueryVariables>;
export const InvestorRegisterVoteDocument = gql`
  mutation InvestorRegisterVote($data: RegisterVoteInput!) {
    investorRegisterVote(data: $data)
  }
`;
export type InvestorRegisterVoteMutationFn = Apollo.MutationFunction<
  InvestorRegisterVoteMutation,
  InvestorRegisterVoteMutationVariables
>;

/**
 * __useInvestorRegisterVoteMutation__
 *
 * To run a mutation, you first call `useInvestorRegisterVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorRegisterVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorRegisterVoteMutation, { data, loading, error }] = useInvestorRegisterVoteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorRegisterVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorRegisterVoteMutation, InvestorRegisterVoteMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorRegisterVoteMutation, InvestorRegisterVoteMutationVariables>(
    InvestorRegisterVoteDocument,
    options,
  );
}
export type InvestorRegisterVoteMutationHookResult = ReturnType<typeof useInvestorRegisterVoteMutation>;
export type InvestorRegisterVoteMutationResult = Apollo.MutationResult<InvestorRegisterVoteMutation>;
export type InvestorRegisterVoteMutationOptions = Apollo.BaseMutationOptions<
  InvestorRegisterVoteMutation,
  InvestorRegisterVoteMutationVariables
>;
export const GetMeetingsDocument = gql`
  query GetMeetings($stoId: Int!) {
    investorAllMeeting(stoID: $stoId) {
      past {
        ID
        stoID
        title
        type
        nameResponsiblePerson
        phoneResponsiblePerson
        emailResponsiblePerson
        nameProxyPerson
        phoneProxyPerson
        emailProxyPerson
        place
        openDate
        opendate
        closeDate
        closedate
        voteType
        timezone
        timePadding
      }
      current {
        ID
        stoID
        title
        type
        nameResponsiblePerson
        phoneResponsiblePerson
        emailResponsiblePerson
        nameProxyPerson
        phoneProxyPerson
        emailProxyPerson
        place
        openDate
        opendate
        closeDate
        closedate
        voteType
        timezone
        timePadding
      }
      future {
        ID
        stoID
        title
        type
        phoneResponsiblePerson
        nameResponsiblePerson
        emailResponsiblePerson
        phoneProxyPerson
        nameProxyPerson
        emailProxyPerson
        place
        openDate
        opendate
        closeDate
        closedate
        voteType
        timezone
        timePadding
      }
    }
  }
`;

/**
 * __useGetMeetingsQuery__
 *
 * To run a query within a React component, call `useGetMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingsQuery({
 *   variables: {
 *      stoId: // value for 'stoId'
 *   },
 * });
 */
export function useGetMeetingsQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingsQuery, GetMeetingsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMeetingsQuery, GetMeetingsQueryVariables>(GetMeetingsDocument, options);
}
export function useGetMeetingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingsQuery, GetMeetingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMeetingsQuery, GetMeetingsQueryVariables>(GetMeetingsDocument, options);
}
export type GetMeetingsQueryHookResult = ReturnType<typeof useGetMeetingsQuery>;
export type GetMeetingsLazyQueryHookResult = ReturnType<typeof useGetMeetingsLazyQuery>;
export type GetMeetingsQueryResult = Apollo.QueryResult<GetMeetingsQuery, GetMeetingsQueryVariables>;
export const InvestorMeetingDocument = gql`
  query InvestorMeeting($meetingId: Int!, $_id: Int!) {
    investorMeeting(meetingID: $meetingId) {
      ID
      stoID
      title
      type
      nameResponsiblePerson
      phoneResponsiblePerson
      emailResponsiblePerson
      nameProxyPerson
      phoneProxyPerson
      emailProxyPerson
      place
      openDate
      opendate
      closeDate
      closedate
      voteType
      timezone
      timePadding
    }
    findSto(ID: $_id) {
      companyType
    }
  }
`;

/**
 * __useInvestorMeetingQuery__
 *
 * To run a query within a React component, call `useInvestorMeetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorMeetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorMeetingQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorMeetingQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorMeetingQuery, InvestorMeetingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorMeetingQuery, InvestorMeetingQueryVariables>(InvestorMeetingDocument, options);
}
export function useInvestorMeetingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorMeetingQuery, InvestorMeetingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorMeetingQuery, InvestorMeetingQueryVariables>(InvestorMeetingDocument, options);
}
export type InvestorMeetingQueryHookResult = ReturnType<typeof useInvestorMeetingQuery>;
export type InvestorMeetingLazyQueryHookResult = ReturnType<typeof useInvestorMeetingLazyQuery>;
export type InvestorMeetingQueryResult = Apollo.QueryResult<InvestorMeetingQuery, InvestorMeetingQueryVariables>;
export const InvestorVoteOptionsDocument = gql`
  query InvestorVoteOptions($meetingId: Int!) {
    investorVotingOptions(votingID: $meetingId) {
      ID
      votingID
      optionTxt
      description
      companyComments
      isActiveByAdmin
      documents {
        ID
        votingID
        votingOptionID
        documentLink
        title
        description
      }
    }
  }
`;

/**
 * __useInvestorVoteOptionsQuery__
 *
 * To run a query within a React component, call `useInvestorVoteOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorVoteOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorVoteOptionsQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useInvestorVoteOptionsQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorVoteOptionsQuery, InvestorVoteOptionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorVoteOptionsQuery, InvestorVoteOptionsQueryVariables>(
    InvestorVoteOptionsDocument,
    options,
  );
}
export function useInvestorVoteOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorVoteOptionsQuery, InvestorVoteOptionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorVoteOptionsQuery, InvestorVoteOptionsQueryVariables>(
    InvestorVoteOptionsDocument,
    options,
  );
}
export type InvestorVoteOptionsQueryHookResult = ReturnType<typeof useInvestorVoteOptionsQuery>;
export type InvestorVoteOptionsLazyQueryHookResult = ReturnType<typeof useInvestorVoteOptionsLazyQuery>;
export type InvestorVoteOptionsQueryResult = Apollo.QueryResult<
  InvestorVoteOptionsQuery,
  InvestorVoteOptionsQueryVariables
>;
export const UserVotingDataDocument = gql`
  query UserVotingData($votingId: Int!) {
    investorUserVoting(votingID: $votingId) {
      ID
      votingID
      userID
      votingOptionID
      investmentContributed
      isCastedByInvestor
      votingOptionValue
    }
  }
`;

/**
 * __useUserVotingDataQuery__
 *
 * To run a query within a React component, call `useUserVotingDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserVotingDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserVotingDataQuery({
 *   variables: {
 *      votingId: // value for 'votingId'
 *   },
 * });
 */
export function useUserVotingDataQuery(
  baseOptions: Apollo.QueryHookOptions<UserVotingDataQuery, UserVotingDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserVotingDataQuery, UserVotingDataQueryVariables>(UserVotingDataDocument, options);
}
export function useUserVotingDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserVotingDataQuery, UserVotingDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserVotingDataQuery, UserVotingDataQueryVariables>(UserVotingDataDocument, options);
}
export type UserVotingDataQueryHookResult = ReturnType<typeof useUserVotingDataQuery>;
export type UserVotingDataLazyQueryHookResult = ReturnType<typeof useUserVotingDataLazyQuery>;
export type UserVotingDataQueryResult = Apollo.QueryResult<UserVotingDataQuery, UserVotingDataQueryVariables>;
export const OptionsVoteStatisticDocument = gql`
  query OptionsVoteStatistic($votingId: Int!) {
    investorVotingOptions(votingID: $votingId) {
      ID
      votingUserStatistic {
        votesYes
        votesNo
        votesAbstention
        count
      }
    }
  }
`;

/**
 * __useOptionsVoteStatisticQuery__
 *
 * To run a query within a React component, call `useOptionsVoteStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useOptionsVoteStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOptionsVoteStatisticQuery({
 *   variables: {
 *      votingId: // value for 'votingId'
 *   },
 * });
 */
export function useOptionsVoteStatisticQuery(
  baseOptions: Apollo.QueryHookOptions<OptionsVoteStatisticQuery, OptionsVoteStatisticQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OptionsVoteStatisticQuery, OptionsVoteStatisticQueryVariables>(
    OptionsVoteStatisticDocument,
    options,
  );
}
export function useOptionsVoteStatisticLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OptionsVoteStatisticQuery, OptionsVoteStatisticQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OptionsVoteStatisticQuery, OptionsVoteStatisticQueryVariables>(
    OptionsVoteStatisticDocument,
    options,
  );
}
export type OptionsVoteStatisticQueryHookResult = ReturnType<typeof useOptionsVoteStatisticQuery>;
export type OptionsVoteStatisticLazyQueryHookResult = ReturnType<typeof useOptionsVoteStatisticLazyQuery>;
export type OptionsVoteStatisticQueryResult = Apollo.QueryResult<
  OptionsVoteStatisticQuery,
  OptionsVoteStatisticQueryVariables
>;
export const SendMercuryInstructionalEmailDocument = gql`
  mutation SendMercuryInstructionalEmail(
    $stoId: Int!
    $note: String!
    $routingNumber: String!
    $accountNumber: String!
  ) {
    sendMercuryInstructionalEmail(
      stoID: $stoId
      note: $note
      routingNumber: $routingNumber
      accountNumber: $accountNumber
    )
  }
`;
export type SendMercuryInstructionalEmailMutationFn = Apollo.MutationFunction<
  SendMercuryInstructionalEmailMutation,
  SendMercuryInstructionalEmailMutationVariables
>;

/**
 * __useSendMercuryInstructionalEmailMutation__
 *
 * To run a mutation, you first call `useSendMercuryInstructionalEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMercuryInstructionalEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMercuryInstructionalEmailMutation, { data, loading, error }] = useSendMercuryInstructionalEmailMutation({
 *   variables: {
 *      stoId: // value for 'stoId'
 *      note: // value for 'note'
 *      routingNumber: // value for 'routingNumber'
 *      accountNumber: // value for 'accountNumber'
 *   },
 * });
 */
export function useSendMercuryInstructionalEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendMercuryInstructionalEmailMutation,
    SendMercuryInstructionalEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendMercuryInstructionalEmailMutation, SendMercuryInstructionalEmailMutationVariables>(
    SendMercuryInstructionalEmailDocument,
    options,
  );
}
export type SendMercuryInstructionalEmailMutationHookResult = ReturnType<
  typeof useSendMercuryInstructionalEmailMutation
>;
export type SendMercuryInstructionalEmailMutationResult = Apollo.MutationResult<SendMercuryInstructionalEmailMutation>;
export type SendMercuryInstructionalEmailMutationOptions = Apollo.BaseMutationOptions<
  SendMercuryInstructionalEmailMutation,
  SendMercuryInstructionalEmailMutationVariables
>;
export const GetMercuryAccountInfoDocument = gql`
  query GetMercuryAccountInfo {
    getMercuryAccountInfo {
      accountNumber
      routingNumber
    }
  }
`;

/**
 * __useGetMercuryAccountInfoQuery__
 *
 * To run a query within a React component, call `useGetMercuryAccountInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMercuryAccountInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMercuryAccountInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMercuryAccountInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMercuryAccountInfoQuery, GetMercuryAccountInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMercuryAccountInfoQuery, GetMercuryAccountInfoQueryVariables>(
    GetMercuryAccountInfoDocument,
    options,
  );
}
export function useGetMercuryAccountInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMercuryAccountInfoQuery, GetMercuryAccountInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMercuryAccountInfoQuery, GetMercuryAccountInfoQueryVariables>(
    GetMercuryAccountInfoDocument,
    options,
  );
}
export type GetMercuryAccountInfoQueryHookResult = ReturnType<typeof useGetMercuryAccountInfoQuery>;
export type GetMercuryAccountInfoLazyQueryHookResult = ReturnType<typeof useGetMercuryAccountInfoLazyQuery>;
export type GetMercuryAccountInfoQueryResult = Apollo.QueryResult<
  GetMercuryAccountInfoQuery,
  GetMercuryAccountInfoQueryVariables
>;
export const GetMercuryRecipientDocument = gql`
  query GetMercuryRecipient {
    getMercuryRecipient {
      id
      name
      emails
      paymentMethod
      electronicRoutingInfo {
        accountNumber
        electronicAccountType
        routingNumber
        address {
          address1
          city
          region
          postalCode
          country
        }
      }
    }
  }
`;

/**
 * __useGetMercuryRecipientQuery__
 *
 * To run a query within a React component, call `useGetMercuryRecipientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMercuryRecipientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMercuryRecipientQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMercuryRecipientQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMercuryRecipientQuery, GetMercuryRecipientQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMercuryRecipientQuery, GetMercuryRecipientQueryVariables>(
    GetMercuryRecipientDocument,
    options,
  );
}
export function useGetMercuryRecipientLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMercuryRecipientQuery, GetMercuryRecipientQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMercuryRecipientQuery, GetMercuryRecipientQueryVariables>(
    GetMercuryRecipientDocument,
    options,
  );
}
export type GetMercuryRecipientQueryHookResult = ReturnType<typeof useGetMercuryRecipientQuery>;
export type GetMercuryRecipientLazyQueryHookResult = ReturnType<typeof useGetMercuryRecipientLazyQuery>;
export type GetMercuryRecipientQueryResult = Apollo.QueryResult<
  GetMercuryRecipientQuery,
  GetMercuryRecipientQueryVariables
>;
export const MoonpayAddTransactionDefaultDocument = gql`
  mutation MoonpayAddTransactionDefault($status: String!, $moonpayId: String!) {
    moonpayAddTransactionDefault(status: $status, moonpayID: $moonpayId)
  }
`;
export type MoonpayAddTransactionDefaultMutationFn = Apollo.MutationFunction<
  MoonpayAddTransactionDefaultMutation,
  MoonpayAddTransactionDefaultMutationVariables
>;

/**
 * __useMoonpayAddTransactionDefaultMutation__
 *
 * To run a mutation, you first call `useMoonpayAddTransactionDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoonpayAddTransactionDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moonpayAddTransactionDefaultMutation, { data, loading, error }] = useMoonpayAddTransactionDefaultMutation({
 *   variables: {
 *      status: // value for 'status'
 *      moonpayId: // value for 'moonpayId'
 *   },
 * });
 */
export function useMoonpayAddTransactionDefaultMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoonpayAddTransactionDefaultMutation,
    MoonpayAddTransactionDefaultMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MoonpayAddTransactionDefaultMutation, MoonpayAddTransactionDefaultMutationVariables>(
    MoonpayAddTransactionDefaultDocument,
    options,
  );
}
export type MoonpayAddTransactionDefaultMutationHookResult = ReturnType<typeof useMoonpayAddTransactionDefaultMutation>;
export type MoonpayAddTransactionDefaultMutationResult = Apollo.MutationResult<MoonpayAddTransactionDefaultMutation>;
export type MoonpayAddTransactionDefaultMutationOptions = Apollo.BaseMutationOptions<
  MoonpayAddTransactionDefaultMutation,
  MoonpayAddTransactionDefaultMutationVariables
>;
export const MoonpayWidgetUrlDocument = gql`
  query MoonpayWidgetUrl($shares: Float!, $shareTypeId: Int!, $alertId: Int) {
    moonpayWidgetUrl(shares: $shares, shareTypeID: $shareTypeId, alertID: $alertId)
  }
`;

/**
 * __useMoonpayWidgetUrlQuery__
 *
 * To run a query within a React component, call `useMoonpayWidgetUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoonpayWidgetUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoonpayWidgetUrlQuery({
 *   variables: {
 *      shares: // value for 'shares'
 *      shareTypeId: // value for 'shareTypeId'
 *      alertId: // value for 'alertId'
 *   },
 * });
 */
export function useMoonpayWidgetUrlQuery(
  baseOptions: Apollo.QueryHookOptions<MoonpayWidgetUrlQuery, MoonpayWidgetUrlQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MoonpayWidgetUrlQuery, MoonpayWidgetUrlQueryVariables>(MoonpayWidgetUrlDocument, options);
}
export function useMoonpayWidgetUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MoonpayWidgetUrlQuery, MoonpayWidgetUrlQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MoonpayWidgetUrlQuery, MoonpayWidgetUrlQueryVariables>(MoonpayWidgetUrlDocument, options);
}
export type MoonpayWidgetUrlQueryHookResult = ReturnType<typeof useMoonpayWidgetUrlQuery>;
export type MoonpayWidgetUrlLazyQueryHookResult = ReturnType<typeof useMoonpayWidgetUrlLazyQuery>;
export type MoonpayWidgetUrlQueryResult = Apollo.QueryResult<MoonpayWidgetUrlQuery, MoonpayWidgetUrlQueryVariables>;
export const MoonpayBuyAlertTransactionReceiptUrlDocument = gql`
  query MoonpayBuyAlertTransactionReceiptUrl($alertId: Int!) {
    moonpayBuyAlertTransactionReceiptUrl(alertID: $alertId)
  }
`;

/**
 * __useMoonpayBuyAlertTransactionReceiptUrlQuery__
 *
 * To run a query within a React component, call `useMoonpayBuyAlertTransactionReceiptUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoonpayBuyAlertTransactionReceiptUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoonpayBuyAlertTransactionReceiptUrlQuery({
 *   variables: {
 *      alertId: // value for 'alertId'
 *   },
 * });
 */
export function useMoonpayBuyAlertTransactionReceiptUrlQuery(
  baseOptions: Apollo.QueryHookOptions<
    MoonpayBuyAlertTransactionReceiptUrlQuery,
    MoonpayBuyAlertTransactionReceiptUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MoonpayBuyAlertTransactionReceiptUrlQuery, MoonpayBuyAlertTransactionReceiptUrlQueryVariables>(
    MoonpayBuyAlertTransactionReceiptUrlDocument,
    options,
  );
}
export function useMoonpayBuyAlertTransactionReceiptUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MoonpayBuyAlertTransactionReceiptUrlQuery,
    MoonpayBuyAlertTransactionReceiptUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MoonpayBuyAlertTransactionReceiptUrlQuery,
    MoonpayBuyAlertTransactionReceiptUrlQueryVariables
  >(MoonpayBuyAlertTransactionReceiptUrlDocument, options);
}
export type MoonpayBuyAlertTransactionReceiptUrlQueryHookResult = ReturnType<
  typeof useMoonpayBuyAlertTransactionReceiptUrlQuery
>;
export type MoonpayBuyAlertTransactionReceiptUrlLazyQueryHookResult = ReturnType<
  typeof useMoonpayBuyAlertTransactionReceiptUrlLazyQuery
>;
export type MoonpayBuyAlertTransactionReceiptUrlQueryResult = Apollo.QueryResult<
  MoonpayBuyAlertTransactionReceiptUrlQuery,
  MoonpayBuyAlertTransactionReceiptUrlQueryVariables
>;
export const InvestorDepositWithdrawAlertDocument = gql`
  mutation investorDepositWithdrawAlert($data: InvestorDepositWithdrawAlertInput!) {
    investorDepositWithdrawAlert(data: $data)
  }
`;
export type InvestorDepositWithdrawAlertMutationFn = Apollo.MutationFunction<
  InvestorDepositWithdrawAlertMutation,
  InvestorDepositWithdrawAlertMutationVariables
>;

/**
 * __useInvestorDepositWithdrawAlertMutation__
 *
 * To run a mutation, you first call `useInvestorDepositWithdrawAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorDepositWithdrawAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorDepositWithdrawAlertMutation, { data, loading, error }] = useInvestorDepositWithdrawAlertMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorDepositWithdrawAlertMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorDepositWithdrawAlertMutation,
    InvestorDepositWithdrawAlertMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorDepositWithdrawAlertMutation, InvestorDepositWithdrawAlertMutationVariables>(
    InvestorDepositWithdrawAlertDocument,
    options,
  );
}
export type InvestorDepositWithdrawAlertMutationHookResult = ReturnType<typeof useInvestorDepositWithdrawAlertMutation>;
export type InvestorDepositWithdrawAlertMutationResult = Apollo.MutationResult<InvestorDepositWithdrawAlertMutation>;
export type InvestorDepositWithdrawAlertMutationOptions = Apollo.BaseMutationOptions<
  InvestorDepositWithdrawAlertMutation,
  InvestorDepositWithdrawAlertMutationVariables
>;
export const InvestorBuyAlertDocument = gql`
  mutation InvestorBuyAlert($query: InvestorBuyAlertInput!) {
    investorBuyAlert(query: $query)
  }
`;
export type InvestorBuyAlertMutationFn = Apollo.MutationFunction<
  InvestorBuyAlertMutation,
  InvestorBuyAlertMutationVariables
>;

/**
 * __useInvestorBuyAlertMutation__
 *
 * To run a mutation, you first call `useInvestorBuyAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorBuyAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorBuyAlertMutation, { data, loading, error }] = useInvestorBuyAlertMutation({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useInvestorBuyAlertMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorBuyAlertMutation, InvestorBuyAlertMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorBuyAlertMutation, InvestorBuyAlertMutationVariables>(
    InvestorBuyAlertDocument,
    options,
  );
}
export type InvestorBuyAlertMutationHookResult = ReturnType<typeof useInvestorBuyAlertMutation>;
export type InvestorBuyAlertMutationResult = Apollo.MutationResult<InvestorBuyAlertMutation>;
export type InvestorBuyAlertMutationOptions = Apollo.BaseMutationOptions<
  InvestorBuyAlertMutation,
  InvestorBuyAlertMutationVariables
>;
export const InvestorInvoiceAlertDeleteDocument = gql`
  mutation InvestorInvoiceAlertDelete($ID: Int!) {
    investorInvoiceAlertDelete(ID: $ID)
  }
`;
export type InvestorInvoiceAlertDeleteMutationFn = Apollo.MutationFunction<
  InvestorInvoiceAlertDeleteMutation,
  InvestorInvoiceAlertDeleteMutationVariables
>;

/**
 * __useInvestorInvoiceAlertDeleteMutation__
 *
 * To run a mutation, you first call `useInvestorInvoiceAlertDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvoiceAlertDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorInvoiceAlertDeleteMutation, { data, loading, error }] = useInvestorInvoiceAlertDeleteMutation({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useInvestorInvoiceAlertDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InvestorInvoiceAlertDeleteMutation,
    InvestorInvoiceAlertDeleteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorInvoiceAlertDeleteMutation, InvestorInvoiceAlertDeleteMutationVariables>(
    InvestorInvoiceAlertDeleteDocument,
    options,
  );
}
export type InvestorInvoiceAlertDeleteMutationHookResult = ReturnType<typeof useInvestorInvoiceAlertDeleteMutation>;
export type InvestorInvoiceAlertDeleteMutationResult = Apollo.MutationResult<InvestorInvoiceAlertDeleteMutation>;
export type InvestorInvoiceAlertDeleteMutationOptions = Apollo.BaseMutationOptions<
  InvestorInvoiceAlertDeleteMutation,
  InvestorInvoiceAlertDeleteMutationVariables
>;
export const VerifyTransactionFromBlockchainDocument = gql`
  mutation VerifyTransactionFromBlockchain($data: VerifyCryptoReciepeInput!) {
    verifyTransactionFromBlockchain(data: $data)
  }
`;
export type VerifyTransactionFromBlockchainMutationFn = Apollo.MutationFunction<
  VerifyTransactionFromBlockchainMutation,
  VerifyTransactionFromBlockchainMutationVariables
>;

/**
 * __useVerifyTransactionFromBlockchainMutation__
 *
 * To run a mutation, you first call `useVerifyTransactionFromBlockchainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTransactionFromBlockchainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTransactionFromBlockchainMutation, { data, loading, error }] = useVerifyTransactionFromBlockchainMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyTransactionFromBlockchainMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyTransactionFromBlockchainMutation,
    VerifyTransactionFromBlockchainMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyTransactionFromBlockchainMutation, VerifyTransactionFromBlockchainMutationVariables>(
    VerifyTransactionFromBlockchainDocument,
    options,
  );
}
export type VerifyTransactionFromBlockchainMutationHookResult = ReturnType<
  typeof useVerifyTransactionFromBlockchainMutation
>;
export type VerifyTransactionFromBlockchainMutationResult =
  Apollo.MutationResult<VerifyTransactionFromBlockchainMutation>;
export type VerifyTransactionFromBlockchainMutationOptions = Apollo.BaseMutationOptions<
  VerifyTransactionFromBlockchainMutation,
  VerifyTransactionFromBlockchainMutationVariables
>;
export const InvestorSellAlertDocument = gql`
  mutation InvestorSellAlert($data: InvestorBuyAlertInput!) {
    investorSellAlert(data: $data)
  }
`;
export type InvestorSellAlertMutationFn = Apollo.MutationFunction<
  InvestorSellAlertMutation,
  InvestorSellAlertMutationVariables
>;

/**
 * __useInvestorSellAlertMutation__
 *
 * To run a mutation, you first call `useInvestorSellAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorSellAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorSellAlertMutation, { data, loading, error }] = useInvestorSellAlertMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvestorSellAlertMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorSellAlertMutation, InvestorSellAlertMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorSellAlertMutation, InvestorSellAlertMutationVariables>(
    InvestorSellAlertDocument,
    options,
  );
}
export type InvestorSellAlertMutationHookResult = ReturnType<typeof useInvestorSellAlertMutation>;
export type InvestorSellAlertMutationResult = Apollo.MutationResult<InvestorSellAlertMutation>;
export type InvestorSellAlertMutationOptions = Apollo.BaseMutationOptions<
  InvestorSellAlertMutation,
  InvestorSellAlertMutationVariables
>;
export const InvestorActivePropertiesDocument = gql`
  query investorActiveProperties {
    investorActiveProperties {
      ID
      details
      picture
      title
      projectCost
      createdAt
      popularity
      isBuyButtonEnabled
    }
  }
`;

/**
 * __useInvestorActivePropertiesQuery__
 *
 * To run a query within a React component, call `useInvestorActivePropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorActivePropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorActivePropertiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorActivePropertiesQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorActivePropertiesQuery, InvestorActivePropertiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorActivePropertiesQuery, InvestorActivePropertiesQueryVariables>(
    InvestorActivePropertiesDocument,
    options,
  );
}
export function useInvestorActivePropertiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorActivePropertiesQuery, InvestorActivePropertiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorActivePropertiesQuery, InvestorActivePropertiesQueryVariables>(
    InvestorActivePropertiesDocument,
    options,
  );
}
export type InvestorActivePropertiesQueryHookResult = ReturnType<typeof useInvestorActivePropertiesQuery>;
export type InvestorActivePropertiesLazyQueryHookResult = ReturnType<typeof useInvestorActivePropertiesLazyQuery>;
export type InvestorActivePropertiesQueryResult = Apollo.QueryResult<
  InvestorActivePropertiesQuery,
  InvestorActivePropertiesQueryVariables
>;
export const InvestorRelatedStoDocument = gql`
  query investorRelatedSto {
    investorRelatedSto {
      ID
      title
      details
      picture
    }
    investorUser {
      sto {
        ID
        title
      }
    }
  }
`;

/**
 * __useInvestorRelatedStoQuery__
 *
 * To run a query within a React component, call `useInvestorRelatedStoQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorRelatedStoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorRelatedStoQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorRelatedStoQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorRelatedStoQuery, InvestorRelatedStoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorRelatedStoQuery, InvestorRelatedStoQueryVariables>(
    InvestorRelatedStoDocument,
    options,
  );
}
export function useInvestorRelatedStoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorRelatedStoQuery, InvestorRelatedStoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorRelatedStoQuery, InvestorRelatedStoQueryVariables>(
    InvestorRelatedStoDocument,
    options,
  );
}
export type InvestorRelatedStoQueryHookResult = ReturnType<typeof useInvestorRelatedStoQuery>;
export type InvestorRelatedStoLazyQueryHookResult = ReturnType<typeof useInvestorRelatedStoLazyQuery>;
export type InvestorRelatedStoQueryResult = Apollo.QueryResult<
  InvestorRelatedStoQuery,
  InvestorRelatedStoQueryVariables
>;
export const InvestorStoDetailDocument = gql`
  query investorStoDetail($_id: Int!) {
    findSto(ID: $_id) {
      ID
      title
      details
      picture
      fullDetails
      images {
        ID
        title
        url
      }
      documents {
        ID
        title
        url
      }
      parsedSettings {
        investorCategories {
          value
          label
        }
      }
      stolinkfull
      logo
      registrationText
      meta {
        stoID
        key
        value
        order
        display
      }
      isBuyButtonEnabled
    }
  }
`;

/**
 * __useInvestorStoDetailQuery__
 *
 * To run a query within a React component, call `useInvestorStoDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorStoDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorStoDetailQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorStoDetailQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorStoDetailQuery, InvestorStoDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorStoDetailQuery, InvestorStoDetailQueryVariables>(InvestorStoDetailDocument, options);
}
export function useInvestorStoDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorStoDetailQuery, InvestorStoDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorStoDetailQuery, InvestorStoDetailQueryVariables>(
    InvestorStoDetailDocument,
    options,
  );
}
export type InvestorStoDetailQueryHookResult = ReturnType<typeof useInvestorStoDetailQuery>;
export type InvestorStoDetailLazyQueryHookResult = ReturnType<typeof useInvestorStoDetailLazyQuery>;
export type InvestorStoDetailQueryResult = Apollo.QueryResult<InvestorStoDetailQuery, InvestorStoDetailQueryVariables>;
export const InvestorWalletDocument = gql`
  query investorWallet($_id: Int!) {
    investorBalances(stoID: $_id) {
      ID
      stoID
      investorID
      currencyID
      currency {
        ID
        currency
        abbreviation
        symbol
        isBlockchainBased
      }
      amount
    }
    investorPaymentChannels(stoID: $_id) {
      ID
      stoID
      title
      details
      currencyID
      currency {
        ID
        currency
        abbreviation
        symbol
        isBlockchainBased
        Address
        cryptoReceivingAddress
      }
      canWithdrawFunds
      channelType
      isActive
    }
    investorDepositHistory(stoID: $_id) {
      ID
      isApproved
      dateReceived
      dateApproved
      amount
      details
      currencyID
      currency {
        ID
        currency
        abbreviation
        symbol
        isBlockchainBased
      }
    }
  }
`;

/**
 * __useInvestorWalletQuery__
 *
 * To run a query within a React component, call `useInvestorWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorWalletQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorWalletQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorWalletQuery, InvestorWalletQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorWalletQuery, InvestorWalletQueryVariables>(InvestorWalletDocument, options);
}
export function useInvestorWalletLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorWalletQuery, InvestorWalletQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorWalletQuery, InvestorWalletQueryVariables>(InvestorWalletDocument, options);
}
export type InvestorWalletQueryHookResult = ReturnType<typeof useInvestorWalletQuery>;
export type InvestorWalletLazyQueryHookResult = ReturnType<typeof useInvestorWalletLazyQuery>;
export type InvestorWalletQueryResult = Apollo.QueryResult<InvestorWalletQuery, InvestorWalletQueryVariables>;
export const InvestorPortfolioDocument = gql`
  query investorPortfolio($_id: Int, $status: [BuyAlertStatus!]!) {
    investorShares(investorID: $_id) {
      sharesHistoryID
      investorID
      shares
      isBlockchainAuthorized
      isBlockchainFrozen
      shareType {
        ID
        title
        stoID
        totalShares
        companyShares
        nominalValue
        custodianShares
        isBlockchain
        premiumValue
        currencyID
        sellToCompany
        sellValue
        isShareNosApplicable
        isCertificateNosApplicable
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
        }
        minimumSharesToBuyByInvestor
        availableShare
        totalPrice
        blockchaindecimals
        blockchainProtocol
        reduceSharesForPurchase
        walletCustodyType
      }
      shareTypeID
      stoID
      ID
    }
    investorBuyAlerts(status: $status) {
      ID
      status
      stoID
      shares
      shareTypeID
      isHiddenForInvestor
      shareType {
        ID
        title
        stoID
        totalShares
        companyShares
        nominalValue
        custodianShares
        isBlockchain
        premiumValue
        currencyID
        minimumSharesToBuyByInvestor
        sellToCompany
        sellValue
        isShareNosApplicable
        isCertificateNosApplicable
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
        }
        availableShare
        totalPrice
        blockchaindecimals
        blockchainProtocol
        reduceSharesForPurchase
        walletCustodyType
      }
      date
      isBuySharesSigned
      purchasePriceOffered
      fromCurrencyID
      isSellRequest
    }
  }
`;

/**
 * __useInvestorPortfolioQuery__
 *
 * To run a query within a React component, call `useInvestorPortfolioQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorPortfolioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorPortfolioQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useInvestorPortfolioQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>(InvestorPortfolioDocument, options);
}
export function useInvestorPortfolioLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>(
    InvestorPortfolioDocument,
    options,
  );
}
export type InvestorPortfolioQueryHookResult = ReturnType<typeof useInvestorPortfolioQuery>;
export type InvestorPortfolioLazyQueryHookResult = ReturnType<typeof useInvestorPortfolioLazyQuery>;
export type InvestorPortfolioQueryResult = Apollo.QueryResult<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>;
export const InvestorInvoiceAlertsDocument = gql`
  query InvestorInvoiceAlerts {
    investorInvoiceAlerts {
      ID
      buyAlert {
        ID
        entityID
      }
      buyAlertID
      investorID
      shareTypeID
      shareType {
        ID
        title
        stoID
        totalShares
        companyShares
        ethereumBlockchainPublicAddress
        custodianShares
        nominalValue
        isBlockchain
        premiumValue
        currencyID
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
          blockchainID
          isNative
          cryptoReceivingAddress
          Address
        }
        minimumSharesToBuyByInvestor
        sellToCompany
        sellValue
        isShareNosApplicable
        isCertificateNosApplicable
        channelIDForAutoPayments
        availableShare
        totalPrice
        blockchaindecimals
        blockchainProtocol
        reduceSharesForPurchase
        walletCustodyType
      }
      paymentChannel {
        title
        details
        currencyID
        currency {
          ID
        }
        canWithdrawFunds
      }
      stoID
      ID
      shares
      status
      amountToPay
      isBlockchain
      dateCreated
      invoiceDescription
      dateUpdated
      investorWallet
      paymentChannelID
    }
  }
`;

/**
 * __useInvestorInvoiceAlertsQuery__
 *
 * To run a query within a React component, call `useInvestorInvoiceAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvoiceAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorInvoiceAlertsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvestorInvoiceAlertsQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorInvoiceAlertsQuery, InvestorInvoiceAlertsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorInvoiceAlertsQuery, InvestorInvoiceAlertsQueryVariables>(
    InvestorInvoiceAlertsDocument,
    options,
  );
}
export function useInvestorInvoiceAlertsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorInvoiceAlertsQuery, InvestorInvoiceAlertsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorInvoiceAlertsQuery, InvestorInvoiceAlertsQueryVariables>(
    InvestorInvoiceAlertsDocument,
    options,
  );
}
export type InvestorInvoiceAlertsQueryHookResult = ReturnType<typeof useInvestorInvoiceAlertsQuery>;
export type InvestorInvoiceAlertsLazyQueryHookResult = ReturnType<typeof useInvestorInvoiceAlertsLazyQuery>;
export type InvestorInvoiceAlertsQueryResult = Apollo.QueryResult<
  InvestorInvoiceAlertsQuery,
  InvestorInvoiceAlertsQueryVariables
>;
export const InvestorBuyAlertsDocument = gql`
  query investorBuyAlerts($status: [BuyAlertStatus!]!) {
    investorBuyAlerts(status: $status) {
      ID
      entityID
      status
      stoID
      shares
      shareTypeID
      isHiddenForInvestor
      shareType {
        ID
        title
        stoID
        totalShares
        companyShares
        nominalValue
        custodianShares
        isBlockchain
        premiumValue
        currencyID
        minimumSharesToBuyByInvestor
        sellToCompany
        sellValue
        isShareNosApplicable
        isCertificateNosApplicable
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
          blockchainID
          isNative
          cryptoReceivingAddress
        }
        availableShare
        totalPrice
        blockchaindecimals
        blockchainProtocol
        reduceSharesForPurchase
        walletCustodyType
      }
      date
      isBuySharesSigned
      purchasePriceOffered
      fromCurrencyID
      isSellRequest
    }
  }
`;

/**
 * __useInvestorBuyAlertsQuery__
 *
 * To run a query within a React component, call `useInvestorBuyAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorBuyAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorBuyAlertsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useInvestorBuyAlertsQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorBuyAlertsQuery, InvestorBuyAlertsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorBuyAlertsQuery, InvestorBuyAlertsQueryVariables>(InvestorBuyAlertsDocument, options);
}
export function useInvestorBuyAlertsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorBuyAlertsQuery, InvestorBuyAlertsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorBuyAlertsQuery, InvestorBuyAlertsQueryVariables>(
    InvestorBuyAlertsDocument,
    options,
  );
}
export type InvestorBuyAlertsQueryHookResult = ReturnType<typeof useInvestorBuyAlertsQuery>;
export type InvestorBuyAlertsLazyQueryHookResult = ReturnType<typeof useInvestorBuyAlertsLazyQuery>;
export type InvestorBuyAlertsQueryResult = Apollo.QueryResult<InvestorBuyAlertsQuery, InvestorBuyAlertsQueryVariables>;
export const InvestorBuyPropertyDocument = gql`
  query investorBuyProperty($_id: Int!) {
    investorDetailProperty(stoID: $_id) {
      ID
      title
      details
      picture
      fullDetails
      images {
        ID
        title
        url
      }
      documents {
        ID
        title
        url
      }
    }
    investorBalances(stoID: $_id) {
      ID
      stoID
      investorID
      currencyID
      currency {
        ID
        currency
        abbreviation
        symbol
        isBlockchainBased
      }
      amount
    }
    findShareTypes(stoID: $_id) {
      ID
      stoID
      title
      totalShares
      companyShares
      nominalValue
      isBlockchain
      premiumValue
      custodianShares
      availableShare
      totalPrice
      currencyID
      sellToCompany
      sellValue
      isShareNosApplicable
      isCertificateNosApplicable
      currency {
        ID
        abbreviation
        currency
        symbol
        isBlockchainBased
      }
      minimumSharesToBuyByInvestor
      channelIDForAutoPayments
      blockchaindecimals
      blockchainProtocol
      reduceSharesForPurchase
      walletCustodyType
    }
  }
`;

/**
 * __useInvestorBuyPropertyQuery__
 *
 * To run a query within a React component, call `useInvestorBuyPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorBuyPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorBuyPropertyQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorBuyPropertyQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorBuyPropertyQuery, InvestorBuyPropertyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorBuyPropertyQuery, InvestorBuyPropertyQueryVariables>(
    InvestorBuyPropertyDocument,
    options,
  );
}
export function useInvestorBuyPropertyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorBuyPropertyQuery, InvestorBuyPropertyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorBuyPropertyQuery, InvestorBuyPropertyQueryVariables>(
    InvestorBuyPropertyDocument,
    options,
  );
}
export type InvestorBuyPropertyQueryHookResult = ReturnType<typeof useInvestorBuyPropertyQuery>;
export type InvestorBuyPropertyLazyQueryHookResult = ReturnType<typeof useInvestorBuyPropertyLazyQuery>;
export type InvestorBuyPropertyQueryResult = Apollo.QueryResult<
  InvestorBuyPropertyQuery,
  InvestorBuyPropertyQueryVariables
>;
export const FindInvestorDividendPayoutsDocument = gql`
  query FindInvestorDividendPayouts {
    findInvestorDividendPayouts {
      ID
      investorID
      payoutID
      amount
      investorShares
      lastUpdatedAt
      status
    }
  }
`;

/**
 * __useFindInvestorDividendPayoutsQuery__
 *
 * To run a query within a React component, call `useFindInvestorDividendPayoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindInvestorDividendPayoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindInvestorDividendPayoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindInvestorDividendPayoutsQuery(
  baseOptions?: Apollo.QueryHookOptions<FindInvestorDividendPayoutsQuery, FindInvestorDividendPayoutsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindInvestorDividendPayoutsQuery, FindInvestorDividendPayoutsQueryVariables>(
    FindInvestorDividendPayoutsDocument,
    options,
  );
}
export function useFindInvestorDividendPayoutsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindInvestorDividendPayoutsQuery,
    FindInvestorDividendPayoutsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindInvestorDividendPayoutsQuery, FindInvestorDividendPayoutsQueryVariables>(
    FindInvestorDividendPayoutsDocument,
    options,
  );
}
export type FindInvestorDividendPayoutsQueryHookResult = ReturnType<typeof useFindInvestorDividendPayoutsQuery>;
export type FindInvestorDividendPayoutsLazyQueryHookResult = ReturnType<typeof useFindInvestorDividendPayoutsLazyQuery>;
export type FindInvestorDividendPayoutsQueryResult = Apollo.QueryResult<
  FindInvestorDividendPayoutsQuery,
  FindInvestorDividendPayoutsQueryVariables
>;
export const FindShareHistoricalValuesDocument = gql`
  query FindShareHistoricalValues($shareTypeID: Int!) {
    findShareHistoricalValues(shareTypeID: $shareTypeID) {
      ID
      shareTypeID
      stoID
      premiumValue
      dateOfChange
    }
  }
`;

/**
 * __useFindShareHistoricalValuesQuery__
 *
 * To run a query within a React component, call `useFindShareHistoricalValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindShareHistoricalValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindShareHistoricalValuesQuery({
 *   variables: {
 *      shareTypeID: // value for 'shareTypeID'
 *   },
 * });
 */
export function useFindShareHistoricalValuesQuery(
  baseOptions: Apollo.QueryHookOptions<FindShareHistoricalValuesQuery, FindShareHistoricalValuesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindShareHistoricalValuesQuery, FindShareHistoricalValuesQueryVariables>(
    FindShareHistoricalValuesDocument,
    options,
  );
}
export function useFindShareHistoricalValuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindShareHistoricalValuesQuery, FindShareHistoricalValuesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindShareHistoricalValuesQuery, FindShareHistoricalValuesQueryVariables>(
    FindShareHistoricalValuesDocument,
    options,
  );
}
export type FindShareHistoricalValuesQueryHookResult = ReturnType<typeof useFindShareHistoricalValuesQuery>;
export type FindShareHistoricalValuesLazyQueryHookResult = ReturnType<typeof useFindShareHistoricalValuesLazyQuery>;
export type FindShareHistoricalValuesQueryResult = Apollo.QueryResult<
  FindShareHistoricalValuesQuery,
  FindShareHistoricalValuesQueryVariables
>;
export const InvestorDetailPropertyDocument = gql`
  query investorDetailProperty($_id: Int!) {
    investorDetailProperty(stoID: $_id) {
      ID
      title
      details
      picture
      fullDetails
      images {
        ID
        title
        url
      }
      documents {
        ID
        title
        url
      }
    }
  }
`;

/**
 * __useInvestorDetailPropertyQuery__
 *
 * To run a query within a React component, call `useInvestorDetailPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorDetailPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorDetailPropertyQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useInvestorDetailPropertyQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorDetailPropertyQuery, InvestorDetailPropertyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorDetailPropertyQuery, InvestorDetailPropertyQueryVariables>(
    InvestorDetailPropertyDocument,
    options,
  );
}
export function useInvestorDetailPropertyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorDetailPropertyQuery, InvestorDetailPropertyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorDetailPropertyQuery, InvestorDetailPropertyQueryVariables>(
    InvestorDetailPropertyDocument,
    options,
  );
}
export type InvestorDetailPropertyQueryHookResult = ReturnType<typeof useInvestorDetailPropertyQuery>;
export type InvestorDetailPropertyLazyQueryHookResult = ReturnType<typeof useInvestorDetailPropertyLazyQuery>;
export type InvestorDetailPropertyQueryResult = Apollo.QueryResult<
  InvestorDetailPropertyQuery,
  InvestorDetailPropertyQueryVariables
>;
export const InvestorInvoiceAlertDocument = gql`
  query InvestorInvoiceAlert($id: Int!) {
    investorInvoiceAlert(ID: $id) {
      stoID
      buyAlertID
      investorID
      shareTypeID
      shareType {
        ethereumBlockchainPublicAddress
        channelIDForAutoPayments
        premiumValue
        currencyID
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
          blockchainID
          isNative
          cryptoReceivingAddress
          Address
        }
        sellValue
        sellToCompany
        title
        blockchaindecimals
        blockchainProtocol
        reduceSharesForPurchase
        walletCustodyType
      }
      shares
      amountToPay
      status
      isBlockchain
      dateCreated
      dateUpdated
      invoiceDescription
      investorWallet
      paymentChannelID
      paymentChannel {
        title
        details
        currencyID
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
          blockchainID
          isNative
          cryptoReceivingAddress
          Address
        }
      }
      buyAlert {
        ID
        entityID
      }
    }
  }
`;

/**
 * __useInvestorInvoiceAlertQuery__
 *
 * To run a query within a React component, call `useInvestorInvoiceAlertQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorInvoiceAlertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorInvoiceAlertQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvestorInvoiceAlertQuery(
  baseOptions: Apollo.QueryHookOptions<InvestorInvoiceAlertQuery, InvestorInvoiceAlertQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorInvoiceAlertQuery, InvestorInvoiceAlertQueryVariables>(
    InvestorInvoiceAlertDocument,
    options,
  );
}
export function useInvestorInvoiceAlertLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorInvoiceAlertQuery, InvestorInvoiceAlertQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorInvoiceAlertQuery, InvestorInvoiceAlertQueryVariables>(
    InvestorInvoiceAlertDocument,
    options,
  );
}
export type InvestorInvoiceAlertQueryHookResult = ReturnType<typeof useInvestorInvoiceAlertQuery>;
export type InvestorInvoiceAlertLazyQueryHookResult = ReturnType<typeof useInvestorInvoiceAlertLazyQuery>;
export type InvestorInvoiceAlertQueryResult = Apollo.QueryResult<
  InvestorInvoiceAlertQuery,
  InvestorInvoiceAlertQueryVariables
>;
export const PortfolioValueDocument = gql`
  query portfolioValue($stoID: Int!) {
    portfolioValue(stoID: $stoID)
  }
`;

/**
 * __usePortfolioValueQuery__
 *
 * To run a query within a React component, call `usePortfolioValueQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioValueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioValueQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function usePortfolioValueQuery(
  baseOptions: Apollo.QueryHookOptions<PortfolioValueQuery, PortfolioValueQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PortfolioValueQuery, PortfolioValueQueryVariables>(PortfolioValueDocument, options);
}
export function usePortfolioValueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PortfolioValueQuery, PortfolioValueQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PortfolioValueQuery, PortfolioValueQueryVariables>(PortfolioValueDocument, options);
}
export type PortfolioValueQueryHookResult = ReturnType<typeof usePortfolioValueQuery>;
export type PortfolioValueLazyQueryHookResult = ReturnType<typeof usePortfolioValueLazyQuery>;
export type PortfolioValueQueryResult = Apollo.QueryResult<PortfolioValueQuery, PortfolioValueQueryVariables>;
export const SaveSharePurchaseContractFieldsDocument = gql`
  mutation saveSharePurchaseContractFields(
    $documentID: Int!
    $sharePurchaseID: Int!
    $fieldValues: [DocumentFieldValueDTO!]!
  ) {
    setSubmittedSharePurchaseDocument(
      documentID: $documentID
      sharePurchaseID: $sharePurchaseID
      fieldValues: $fieldValues
    )
  }
`;
export type SaveSharePurchaseContractFieldsMutationFn = Apollo.MutationFunction<
  SaveSharePurchaseContractFieldsMutation,
  SaveSharePurchaseContractFieldsMutationVariables
>;

/**
 * __useSaveSharePurchaseContractFieldsMutation__
 *
 * To run a mutation, you first call `useSaveSharePurchaseContractFieldsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSharePurchaseContractFieldsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSharePurchaseContractFieldsMutation, { data, loading, error }] = useSaveSharePurchaseContractFieldsMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *      fieldValues: // value for 'fieldValues'
 *   },
 * });
 */
export function useSaveSharePurchaseContractFieldsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveSharePurchaseContractFieldsMutation,
    SaveSharePurchaseContractFieldsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveSharePurchaseContractFieldsMutation, SaveSharePurchaseContractFieldsMutationVariables>(
    SaveSharePurchaseContractFieldsDocument,
    options,
  );
}
export type SaveSharePurchaseContractFieldsMutationHookResult = ReturnType<
  typeof useSaveSharePurchaseContractFieldsMutation
>;
export type SaveSharePurchaseContractFieldsMutationResult =
  Apollo.MutationResult<SaveSharePurchaseContractFieldsMutation>;
export type SaveSharePurchaseContractFieldsMutationOptions = Apollo.BaseMutationOptions<
  SaveSharePurchaseContractFieldsMutation,
  SaveSharePurchaseContractFieldsMutationVariables
>;
export const SaveSharePurchaseContractSignatureDocument = gql`
  mutation saveSharePurchaseContractSignature($documentID: Int!, $sharePurchaseID: Int!, $signature: String!) {
    setSharePurchaseDocumentSignature(documentID: $documentID, sharePurchaseID: $sharePurchaseID, base64: $signature)
  }
`;
export type SaveSharePurchaseContractSignatureMutationFn = Apollo.MutationFunction<
  SaveSharePurchaseContractSignatureMutation,
  SaveSharePurchaseContractSignatureMutationVariables
>;

/**
 * __useSaveSharePurchaseContractSignatureMutation__
 *
 * To run a mutation, you first call `useSaveSharePurchaseContractSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSharePurchaseContractSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSharePurchaseContractSignatureMutation, { data, loading, error }] = useSaveSharePurchaseContractSignatureMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useSaveSharePurchaseContractSignatureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveSharePurchaseContractSignatureMutation,
    SaveSharePurchaseContractSignatureMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SaveSharePurchaseContractSignatureMutation,
    SaveSharePurchaseContractSignatureMutationVariables
  >(SaveSharePurchaseContractSignatureDocument, options);
}
export type SaveSharePurchaseContractSignatureMutationHookResult = ReturnType<
  typeof useSaveSharePurchaseContractSignatureMutation
>;
export type SaveSharePurchaseContractSignatureMutationResult =
  Apollo.MutationResult<SaveSharePurchaseContractSignatureMutation>;
export type SaveSharePurchaseContractSignatureMutationOptions = Apollo.BaseMutationOptions<
  SaveSharePurchaseContractSignatureMutation,
  SaveSharePurchaseContractSignatureMutationVariables
>;
export const SendSharePurchaseContractDocument = gql`
  mutation sendSharePurchaseContract($documentID: Int!, $sharePurchaseID: Int!) {
    sendSharePurchaseContract(documentID: $documentID, sharePurchaseID: $sharePurchaseID)
  }
`;
export type SendSharePurchaseContractMutationFn = Apollo.MutationFunction<
  SendSharePurchaseContractMutation,
  SendSharePurchaseContractMutationVariables
>;

/**
 * __useSendSharePurchaseContractMutation__
 *
 * To run a mutation, you first call `useSendSharePurchaseContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSharePurchaseContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSharePurchaseContractMutation, { data, loading, error }] = useSendSharePurchaseContractMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *   },
 * });
 */
export function useSendSharePurchaseContractMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendSharePurchaseContractMutation,
    SendSharePurchaseContractMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendSharePurchaseContractMutation, SendSharePurchaseContractMutationVariables>(
    SendSharePurchaseContractDocument,
    options,
  );
}
export type SendSharePurchaseContractMutationHookResult = ReturnType<typeof useSendSharePurchaseContractMutation>;
export type SendSharePurchaseContractMutationResult = Apollo.MutationResult<SendSharePurchaseContractMutation>;
export type SendSharePurchaseContractMutationOptions = Apollo.BaseMutationOptions<
  SendSharePurchaseContractMutation,
  SendSharePurchaseContractMutationVariables
>;
export const DeleteSharePurchaseRequestDocument = gql`
  mutation deleteSharePurchaseRequest($documentID: Int!) {
    deleteSharePurchaseRequest(documentID: $documentID)
  }
`;
export type DeleteSharePurchaseRequestMutationFn = Apollo.MutationFunction<
  DeleteSharePurchaseRequestMutation,
  DeleteSharePurchaseRequestMutationVariables
>;

/**
 * __useDeleteSharePurchaseRequestMutation__
 *
 * To run a mutation, you first call `useDeleteSharePurchaseRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSharePurchaseRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSharePurchaseRequestMutation, { data, loading, error }] = useDeleteSharePurchaseRequestMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *   },
 * });
 */
export function useDeleteSharePurchaseRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSharePurchaseRequestMutation,
    DeleteSharePurchaseRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteSharePurchaseRequestMutation, DeleteSharePurchaseRequestMutationVariables>(
    DeleteSharePurchaseRequestDocument,
    options,
  );
}
export type DeleteSharePurchaseRequestMutationHookResult = ReturnType<typeof useDeleteSharePurchaseRequestMutation>;
export type DeleteSharePurchaseRequestMutationResult = Apollo.MutationResult<DeleteSharePurchaseRequestMutation>;
export type DeleteSharePurchaseRequestMutationOptions = Apollo.BaseMutationOptions<
  DeleteSharePurchaseRequestMutation,
  DeleteSharePurchaseRequestMutationVariables
>;
export const InvestorBuyAlertRemoveDocument = gql`
  mutation InvestorBuyAlertRemove($alertID: Int!) {
    investorBuyAlertRemove(alertID: $alertID)
  }
`;
export type InvestorBuyAlertRemoveMutationFn = Apollo.MutationFunction<
  InvestorBuyAlertRemoveMutation,
  InvestorBuyAlertRemoveMutationVariables
>;

/**
 * __useInvestorBuyAlertRemoveMutation__
 *
 * To run a mutation, you first call `useInvestorBuyAlertRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorBuyAlertRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorBuyAlertRemoveMutation, { data, loading, error }] = useInvestorBuyAlertRemoveMutation({
 *   variables: {
 *      alertID: // value for 'alertID'
 *   },
 * });
 */
export function useInvestorBuyAlertRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorBuyAlertRemoveMutation, InvestorBuyAlertRemoveMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorBuyAlertRemoveMutation, InvestorBuyAlertRemoveMutationVariables>(
    InvestorBuyAlertRemoveDocument,
    options,
  );
}
export type InvestorBuyAlertRemoveMutationHookResult = ReturnType<typeof useInvestorBuyAlertRemoveMutation>;
export type InvestorBuyAlertRemoveMutationResult = Apollo.MutationResult<InvestorBuyAlertRemoveMutation>;
export type InvestorBuyAlertRemoveMutationOptions = Apollo.BaseMutationOptions<
  InvestorBuyAlertRemoveMutation,
  InvestorBuyAlertRemoveMutationVariables
>;
export const InvestorBuyAlertHideDocument = gql`
  mutation InvestorBuyAlertHide($alertID: Int!) {
    investorBuyAlertHide(alertID: $alertID)
  }
`;
export type InvestorBuyAlertHideMutationFn = Apollo.MutationFunction<
  InvestorBuyAlertHideMutation,
  InvestorBuyAlertHideMutationVariables
>;

/**
 * __useInvestorBuyAlertHideMutation__
 *
 * To run a mutation, you first call `useInvestorBuyAlertHideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestorBuyAlertHideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investorBuyAlertHideMutation, { data, loading, error }] = useInvestorBuyAlertHideMutation({
 *   variables: {
 *      alertID: // value for 'alertID'
 *   },
 * });
 */
export function useInvestorBuyAlertHideMutation(
  baseOptions?: Apollo.MutationHookOptions<InvestorBuyAlertHideMutation, InvestorBuyAlertHideMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InvestorBuyAlertHideMutation, InvestorBuyAlertHideMutationVariables>(
    InvestorBuyAlertHideDocument,
    options,
  );
}
export type InvestorBuyAlertHideMutationHookResult = ReturnType<typeof useInvestorBuyAlertHideMutation>;
export type InvestorBuyAlertHideMutationResult = Apollo.MutationResult<InvestorBuyAlertHideMutation>;
export type InvestorBuyAlertHideMutationOptions = Apollo.BaseMutationOptions<
  InvestorBuyAlertHideMutation,
  InvestorBuyAlertHideMutationVariables
>;
export const SetDocuSignSignatureDocument = gql`
  mutation SetDocuSignSignature($documentID: Int!, $sharePurchaseID: Int!, $docusignEnvelopeID: String!) {
    setDocuSignSignature(
      documentID: $documentID
      sharePurchaseID: $sharePurchaseID
      docusignEnvelopeID: $docusignEnvelopeID
    )
  }
`;
export type SetDocuSignSignatureMutationFn = Apollo.MutationFunction<
  SetDocuSignSignatureMutation,
  SetDocuSignSignatureMutationVariables
>;

/**
 * __useSetDocuSignSignatureMutation__
 *
 * To run a mutation, you first call `useSetDocuSignSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDocuSignSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDocuSignSignatureMutation, { data, loading, error }] = useSetDocuSignSignatureMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *      docusignEnvelopeID: // value for 'docusignEnvelopeID'
 *   },
 * });
 */
export function useSetDocuSignSignatureMutation(
  baseOptions?: Apollo.MutationHookOptions<SetDocuSignSignatureMutation, SetDocuSignSignatureMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetDocuSignSignatureMutation, SetDocuSignSignatureMutationVariables>(
    SetDocuSignSignatureDocument,
    options,
  );
}
export type SetDocuSignSignatureMutationHookResult = ReturnType<typeof useSetDocuSignSignatureMutation>;
export type SetDocuSignSignatureMutationResult = Apollo.MutationResult<SetDocuSignSignatureMutation>;
export type SetDocuSignSignatureMutationOptions = Apollo.BaseMutationOptions<
  SetDocuSignSignatureMutation,
  SetDocuSignSignatureMutationVariables
>;
export const CreateBlockchainTransactionTransferDocument = gql`
  mutation CreateBlockchainTransactionTransfer($data: BlockchainSharesTransferTransactionsInput!) {
    createBlockchainTransactionTransfer(data: $data)
  }
`;
export type CreateBlockchainTransactionTransferMutationFn = Apollo.MutationFunction<
  CreateBlockchainTransactionTransferMutation,
  CreateBlockchainTransactionTransferMutationVariables
>;

/**
 * __useCreateBlockchainTransactionTransferMutation__
 *
 * To run a mutation, you first call `useCreateBlockchainTransactionTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlockchainTransactionTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlockchainTransactionTransferMutation, { data, loading, error }] = useCreateBlockchainTransactionTransferMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBlockchainTransactionTransferMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBlockchainTransactionTransferMutation,
    CreateBlockchainTransactionTransferMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBlockchainTransactionTransferMutation,
    CreateBlockchainTransactionTransferMutationVariables
  >(CreateBlockchainTransactionTransferDocument, options);
}
export type CreateBlockchainTransactionTransferMutationHookResult = ReturnType<
  typeof useCreateBlockchainTransactionTransferMutation
>;
export type CreateBlockchainTransactionTransferMutationResult =
  Apollo.MutationResult<CreateBlockchainTransactionTransferMutation>;
export type CreateBlockchainTransactionTransferMutationOptions = Apollo.BaseMutationOptions<
  CreateBlockchainTransactionTransferMutation,
  CreateBlockchainTransactionTransferMutationVariables
>;
export const SharePurchaseDocumentsDocument = gql`
  query sharePurchaseDocuments($sharePurchaseID: Int!) {
    sharePurchaseDocuments(sharePurchaseID: $sharePurchaseID) {
      requireOnce
      document {
        ID
        title
      }
      status
    }
  }
`;

/**
 * __useSharePurchaseDocumentsQuery__
 *
 * To run a query within a React component, call `useSharePurchaseDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharePurchaseDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharePurchaseDocumentsQuery({
 *   variables: {
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *   },
 * });
 */
export function useSharePurchaseDocumentsQuery(
  baseOptions: Apollo.QueryHookOptions<SharePurchaseDocumentsQuery, SharePurchaseDocumentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SharePurchaseDocumentsQuery, SharePurchaseDocumentsQueryVariables>(
    SharePurchaseDocumentsDocument,
    options,
  );
}
export function useSharePurchaseDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SharePurchaseDocumentsQuery, SharePurchaseDocumentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SharePurchaseDocumentsQuery, SharePurchaseDocumentsQueryVariables>(
    SharePurchaseDocumentsDocument,
    options,
  );
}
export type SharePurchaseDocumentsQueryHookResult = ReturnType<typeof useSharePurchaseDocumentsQuery>;
export type SharePurchaseDocumentsLazyQueryHookResult = ReturnType<typeof useSharePurchaseDocumentsLazyQuery>;
export type SharePurchaseDocumentsQueryResult = Apollo.QueryResult<
  SharePurchaseDocumentsQuery,
  SharePurchaseDocumentsQueryVariables
>;
export const GetInternalSigningDataDocument = gql`
  query getInternalSigningData($documentID: Int!, $sharePurchaseID: Int!) {
    document(documentID: $documentID) {
      ID
      title
      contents
    }
    sharePurchaseDocument(sharePurchaseID: $sharePurchaseID, documentID: $documentID) {
      fieldValues {
        ID
        value
      }
      signature {
        url
        modified
      }
      status
      signatureFilePath
    }
    documentFields(documentID: $documentID) {
      ID
      title
      type
      helperText
    }
    getPrefilledDocumentValues(sharePurchaseID: $sharePurchaseID, documentID: $documentID) {
      ID
      value
    }
    investorAppParameters {
      IsDarwSignatureActive
      IsCheckMarkSignatureActive
      drawSignaturePrefillFonts
    }
  }
`;

/**
 * __useGetInternalSigningDataQuery__
 *
 * To run a query within a React component, call `useGetInternalSigningDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInternalSigningDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInternalSigningDataQuery({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *   },
 * });
 */
export function useGetInternalSigningDataQuery(
  baseOptions: Apollo.QueryHookOptions<GetInternalSigningDataQuery, GetInternalSigningDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInternalSigningDataQuery, GetInternalSigningDataQueryVariables>(
    GetInternalSigningDataDocument,
    options,
  );
}
export function useGetInternalSigningDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInternalSigningDataQuery, GetInternalSigningDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInternalSigningDataQuery, GetInternalSigningDataQueryVariables>(
    GetInternalSigningDataDocument,
    options,
  );
}
export type GetInternalSigningDataQueryHookResult = ReturnType<typeof useGetInternalSigningDataQuery>;
export type GetInternalSigningDataLazyQueryHookResult = ReturnType<typeof useGetInternalSigningDataLazyQuery>;
export type GetInternalSigningDataQueryResult = Apollo.QueryResult<
  GetInternalSigningDataQuery,
  GetInternalSigningDataQueryVariables
>;
export const GetDocuSignUrlDocument = gql`
  query getDocuSignUrl($preferredReturnURL: String!, $documentID: Int!, $sharePurchaseID: Int!) {
    getDocuSignUrl(preferredReturnURL: $preferredReturnURL, documentID: $documentID, sharePurchaseID: $sharePurchaseID)
  }
`;

/**
 * __useGetDocuSignUrlQuery__
 *
 * To run a query within a React component, call `useGetDocuSignUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocuSignUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocuSignUrlQuery({
 *   variables: {
 *      preferredReturnURL: // value for 'preferredReturnURL'
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *   },
 * });
 */
export function useGetDocuSignUrlQuery(
  baseOptions: Apollo.QueryHookOptions<GetDocuSignUrlQuery, GetDocuSignUrlQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDocuSignUrlQuery, GetDocuSignUrlQueryVariables>(GetDocuSignUrlDocument, options);
}
export function useGetDocuSignUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDocuSignUrlQuery, GetDocuSignUrlQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDocuSignUrlQuery, GetDocuSignUrlQueryVariables>(GetDocuSignUrlDocument, options);
}
export type GetDocuSignUrlQueryHookResult = ReturnType<typeof useGetDocuSignUrlQuery>;
export type GetDocuSignUrlLazyQueryHookResult = ReturnType<typeof useGetDocuSignUrlLazyQuery>;
export type GetDocuSignUrlQueryResult = Apollo.QueryResult<GetDocuSignUrlQuery, GetDocuSignUrlQueryVariables>;
export const SendHelloSignTemplateSignRequestDocument = gql`
  query sendHelloSignTemplateSignRequest($documentID: Int!, $sharePurchaseID: Int!) {
    sendHelloSignTemplateSignRequest(documentID: $documentID, sharePurchaseID: $sharePurchaseID)
    findSto(ID: 0) {
      helloSignClientID
    }
  }
`;

/**
 * __useSendHelloSignTemplateSignRequestQuery__
 *
 * To run a query within a React component, call `useSendHelloSignTemplateSignRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendHelloSignTemplateSignRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendHelloSignTemplateSignRequestQuery({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      sharePurchaseID: // value for 'sharePurchaseID'
 *   },
 * });
 */
export function useSendHelloSignTemplateSignRequestQuery(
  baseOptions: Apollo.QueryHookOptions<
    SendHelloSignTemplateSignRequestQuery,
    SendHelloSignTemplateSignRequestQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SendHelloSignTemplateSignRequestQuery, SendHelloSignTemplateSignRequestQueryVariables>(
    SendHelloSignTemplateSignRequestDocument,
    options,
  );
}
export function useSendHelloSignTemplateSignRequestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SendHelloSignTemplateSignRequestQuery,
    SendHelloSignTemplateSignRequestQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SendHelloSignTemplateSignRequestQuery, SendHelloSignTemplateSignRequestQueryVariables>(
    SendHelloSignTemplateSignRequestDocument,
    options,
  );
}
export type SendHelloSignTemplateSignRequestQueryHookResult = ReturnType<
  typeof useSendHelloSignTemplateSignRequestQuery
>;
export type SendHelloSignTemplateSignRequestLazyQueryHookResult = ReturnType<
  typeof useSendHelloSignTemplateSignRequestLazyQuery
>;
export type SendHelloSignTemplateSignRequestQueryResult = Apollo.QueryResult<
  SendHelloSignTemplateSignRequestQuery,
  SendHelloSignTemplateSignRequestQueryVariables
>;
export const InvestorSharesDocument = gql`
  query investorShares($stoID: Int) {
    investorShares(stoID: $stoID) {
      ID
      stoID
      sharesHistoryID
      investorID
      shares
      isBlockchainAuthorized
      isBlockchainFrozen
      shareTypeID
      shareType {
        ID
        title
        stoID
        totalShares
        companyShares
        nominalValue
        custodianShares
        isBlockchain
        premiumValue
        currencyID
        sellToCompany
        sellValue
        isShareNosApplicable
        isCertificateNosApplicable
        currency {
          ID
          currency
          abbreviation
          symbol
          isBlockchainBased
        }
        minimumSharesToBuyByInvestor
        availableShare
        totalPrice
        blockchaindecimals
      }
    }
  }
`;

/**
 * __useInvestorSharesQuery__
 *
 * To run a query within a React component, call `useInvestorSharesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestorSharesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestorSharesQuery({
 *   variables: {
 *      stoID: // value for 'stoID'
 *   },
 * });
 */
export function useInvestorSharesQuery(
  baseOptions?: Apollo.QueryHookOptions<InvestorSharesQuery, InvestorSharesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvestorSharesQuery, InvestorSharesQueryVariables>(InvestorSharesDocument, options);
}
export function useInvestorSharesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<InvestorSharesQuery, InvestorSharesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvestorSharesQuery, InvestorSharesQueryVariables>(InvestorSharesDocument, options);
}
export type InvestorSharesQueryHookResult = ReturnType<typeof useInvestorSharesQuery>;
export type InvestorSharesLazyQueryHookResult = ReturnType<typeof useInvestorSharesLazyQuery>;
export type InvestorSharesQueryResult = Apollo.QueryResult<InvestorSharesQuery, InvestorSharesQueryVariables>;
export const GetInvestorShareDocument = gql`
  query getInvestorShare($ID: Int!) {
    investorShare(ID: $ID) {
      shareType {
        ID
        title
        stoID
        nominalValue
        premiumValue
        isBlockchain
        currency {
          ID
          symbol
        }
      }
      shares
    }
  }
`;

/**
 * __useGetInvestorShareQuery__
 *
 * To run a query within a React component, call `useGetInvestorShareQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestorShareQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestorShareQuery({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useGetInvestorShareQuery(
  baseOptions: Apollo.QueryHookOptions<GetInvestorShareQuery, GetInvestorShareQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestorShareQuery, GetInvestorShareQueryVariables>(GetInvestorShareDocument, options);
}
export function useGetInvestorShareLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetInvestorShareQuery, GetInvestorShareQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvestorShareQuery, GetInvestorShareQueryVariables>(GetInvestorShareDocument, options);
}
export type GetInvestorShareQueryHookResult = ReturnType<typeof useGetInvestorShareQuery>;
export type GetInvestorShareLazyQueryHookResult = ReturnType<typeof useGetInvestorShareLazyQuery>;
export type GetInvestorShareQueryResult = Apollo.QueryResult<GetInvestorShareQuery, GetInvestorShareQueryVariables>;
export const GetSharesWalletsDocument = gql`
  query getSharesWallets($shareTypeID: Int!) {
    getSharesWallets(shareTypeID: $shareTypeID) {
      ID
      isBlocked
      publicKey
      shares
    }
  }
`;

/**
 * __useGetSharesWalletsQuery__
 *
 * To run a query within a React component, call `useGetSharesWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSharesWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSharesWalletsQuery({
 *   variables: {
 *      shareTypeID: // value for 'shareTypeID'
 *   },
 * });
 */
export function useGetSharesWalletsQuery(
  baseOptions: Apollo.QueryHookOptions<GetSharesWalletsQuery, GetSharesWalletsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSharesWalletsQuery, GetSharesWalletsQueryVariables>(GetSharesWalletsDocument, options);
}
export function useGetSharesWalletsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSharesWalletsQuery, GetSharesWalletsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSharesWalletsQuery, GetSharesWalletsQueryVariables>(GetSharesWalletsDocument, options);
}
export type GetSharesWalletsQueryHookResult = ReturnType<typeof useGetSharesWalletsQuery>;
export type GetSharesWalletsLazyQueryHookResult = ReturnType<typeof useGetSharesWalletsLazyQuery>;
export type GetSharesWalletsQueryResult = Apollo.QueryResult<GetSharesWalletsQuery, GetSharesWalletsQueryVariables>;
export const GetSwapTokensDocument = gql`
  query getSwapTokens {
    getSwapTokens {
      ID
      address
      name
      symbol
    }
  }
`;

/**
 * __useGetSwapTokensQuery__
 *
 * To run a query within a React component, call `useGetSwapTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSwapTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSwapTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSwapTokensQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSwapTokensQuery, GetSwapTokensQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSwapTokensQuery, GetSwapTokensQueryVariables>(GetSwapTokensDocument, options);
}
export function useGetSwapTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSwapTokensQuery, GetSwapTokensQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSwapTokensQuery, GetSwapTokensQueryVariables>(GetSwapTokensDocument, options);
}
export type GetSwapTokensQueryHookResult = ReturnType<typeof useGetSwapTokensQuery>;
export type GetSwapTokensLazyQueryHookResult = ReturnType<typeof useGetSwapTokensLazyQuery>;
export type GetSwapTokensQueryResult = Apollo.QueryResult<GetSwapTokensQuery, GetSwapTokensQueryVariables>;
export const SetThemeConfigDocument = gql`
  mutation setThemeConfig($theme: String!) {
    setThemeConfig(theme: $theme)
  }
`;
export type SetThemeConfigMutationFn = Apollo.MutationFunction<SetThemeConfigMutation, SetThemeConfigMutationVariables>;

/**
 * __useSetThemeConfigMutation__
 *
 * To run a mutation, you first call `useSetThemeConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetThemeConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setThemeConfigMutation, { data, loading, error }] = useSetThemeConfigMutation({
 *   variables: {
 *      theme: // value for 'theme'
 *   },
 * });
 */
export function useSetThemeConfigMutation(
  baseOptions?: Apollo.MutationHookOptions<SetThemeConfigMutation, SetThemeConfigMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetThemeConfigMutation, SetThemeConfigMutationVariables>(SetThemeConfigDocument, options);
}
export type SetThemeConfigMutationHookResult = ReturnType<typeof useSetThemeConfigMutation>;
export type SetThemeConfigMutationResult = Apollo.MutationResult<SetThemeConfigMutation>;
export type SetThemeConfigMutationOptions = Apollo.BaseMutationOptions<
  SetThemeConfigMutation,
  SetThemeConfigMutationVariables
>;
export const GetThemeConfigDocument = gql`
  query getThemeConfig {
    investorAppParameters {
      investorDashboardTheme
      leftSideMenuFont
      poweredByLabel
    }
  }
`;

/**
 * __useGetThemeConfigQuery__
 *
 * To run a query within a React component, call `useGetThemeConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThemeConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThemeConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThemeConfigQuery(
  baseOptions?: Apollo.QueryHookOptions<GetThemeConfigQuery, GetThemeConfigQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetThemeConfigQuery, GetThemeConfigQueryVariables>(GetThemeConfigDocument, options);
}
export function useGetThemeConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetThemeConfigQuery, GetThemeConfigQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetThemeConfigQuery, GetThemeConfigQueryVariables>(GetThemeConfigDocument, options);
}
export type GetThemeConfigQueryHookResult = ReturnType<typeof useGetThemeConfigQuery>;
export type GetThemeConfigLazyQueryHookResult = ReturnType<typeof useGetThemeConfigLazyQuery>;
export type GetThemeConfigQueryResult = Apollo.QueryResult<GetThemeConfigQuery, GetThemeConfigQueryVariables>;
export const TranslationLoadDocument = gql`
  query translationLoad($locale: String) {
    translations(locale: $locale) {
      key
      locale
      translation
    }
    locales
  }
`;

/**
 * __useTranslationLoadQuery__
 *
 * To run a query within a React component, call `useTranslationLoadQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslationLoadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslationLoadQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useTranslationLoadQuery(
  baseOptions?: Apollo.QueryHookOptions<TranslationLoadQuery, TranslationLoadQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TranslationLoadQuery, TranslationLoadQueryVariables>(TranslationLoadDocument, options);
}
export function useTranslationLoadLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TranslationLoadQuery, TranslationLoadQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TranslationLoadQuery, TranslationLoadQueryVariables>(TranslationLoadDocument, options);
}
export type TranslationLoadQueryHookResult = ReturnType<typeof useTranslationLoadQuery>;
export type TranslationLoadLazyQueryHookResult = ReturnType<typeof useTranslationLoadLazyQuery>;
export type TranslationLoadQueryResult = Apollo.QueryResult<TranslationLoadQuery, TranslationLoadQueryVariables>;
export const UpdatesDocument = gql`
  query updates($_id: Int!, $offset: Int, $limit: Int) {
    investorUpdates(stoID: $_id, offset: $offset, limit: $limit) {
      ID
      stoID
      title
      details
      date
      coverphoto
    }
  }
`;

/**
 * __useUpdatesQuery__
 *
 * To run a query within a React component, call `useUpdatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdatesQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUpdatesQuery(baseOptions: Apollo.QueryHookOptions<UpdatesQuery, UpdatesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UpdatesQuery, UpdatesQueryVariables>(UpdatesDocument, options);
}
export function useUpdatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdatesQuery, UpdatesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UpdatesQuery, UpdatesQueryVariables>(UpdatesDocument, options);
}
export type UpdatesQueryHookResult = ReturnType<typeof useUpdatesQuery>;
export type UpdatesLazyQueryHookResult = ReturnType<typeof useUpdatesLazyQuery>;
export type UpdatesQueryResult = Apollo.QueryResult<UpdatesQuery, UpdatesQueryVariables>;
export const UpdateDocument = gql`
  query update($_id: Int!) {
    investorUpdate(ID: $_id) {
      ID
      title
      stoID
      details
      date
    }
  }
`;

/**
 * __useUpdateQuery__
 *
 * To run a query within a React component, call `useUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUpdateQuery(baseOptions: Apollo.QueryHookOptions<UpdateQuery, UpdateQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UpdateQuery, UpdateQueryVariables>(UpdateDocument, options);
}
export function useUpdateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateQuery, UpdateQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UpdateQuery, UpdateQueryVariables>(UpdateDocument, options);
}
export type UpdateQueryHookResult = ReturnType<typeof useUpdateQuery>;
export type UpdateLazyQueryHookResult = ReturnType<typeof useUpdateLazyQuery>;
export type UpdateQueryResult = Apollo.QueryResult<UpdateQuery, UpdateQueryVariables>;
export const GetUsernameByIdDocument = gql`
  query GetUsernameByID($userID: Int!) {
    getUsernameByID(userID: $userID)
  }
`;

/**
 * __useGetUsernameByIdQuery__
 *
 * To run a query within a React component, call `useGetUsernameByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsernameByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsernameByIdQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useGetUsernameByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsernameByIdQuery, GetUsernameByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsernameByIdQuery, GetUsernameByIdQueryVariables>(GetUsernameByIdDocument, options);
}
export function useGetUsernameByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsernameByIdQuery, GetUsernameByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsernameByIdQuery, GetUsernameByIdQueryVariables>(GetUsernameByIdDocument, options);
}
export type GetUsernameByIdQueryHookResult = ReturnType<typeof useGetUsernameByIdQuery>;
export type GetUsernameByIdLazyQueryHookResult = ReturnType<typeof useGetUsernameByIdLazyQuery>;
export type GetUsernameByIdQueryResult = Apollo.QueryResult<GetUsernameByIdQuery, GetUsernameByIdQueryVariables>;
export const GetFullNameByIdDocument = gql`
  query GetFullNameByID($userID: Int!) {
    getFullNameByID(userID: $userID)
  }
`;

/**
 * __useGetFullNameByIdQuery__
 *
 * To run a query within a React component, call `useGetFullNameByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFullNameByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFullNameByIdQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useGetFullNameByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetFullNameByIdQuery, GetFullNameByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFullNameByIdQuery, GetFullNameByIdQueryVariables>(GetFullNameByIdDocument, options);
}
export function useGetFullNameByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFullNameByIdQuery, GetFullNameByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFullNameByIdQuery, GetFullNameByIdQueryVariables>(GetFullNameByIdDocument, options);
}
export type GetFullNameByIdQueryHookResult = ReturnType<typeof useGetFullNameByIdQuery>;
export type GetFullNameByIdLazyQueryHookResult = ReturnType<typeof useGetFullNameByIdLazyQuery>;
export type GetFullNameByIdQueryResult = Apollo.QueryResult<GetFullNameByIdQuery, GetFullNameByIdQueryVariables>;
