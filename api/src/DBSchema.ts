/**
 Schema Generated with mysql-schema-ts 1.8.1
*/

/**
 * Exposes all fields present in activitytype as a typescript
 * interface.
 */
export interface Activitytype {
  ID: number;
  Activity?: string | null;
}

/**
 * Exposes the same fields as Activitytype,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ActivitytypeWithDefaults {
  ID: number;
  Activity?: string | null;
}
/**
 * Exposes all fields present in affiliateincomes as a typescript
 * interface.
 */
export interface Affiliateincomes {
  id: number;
  investorId: number;
  amount: number;
  tokens: number;
  remark: string;
  /**  Defaults to: 0. */
  stoId: number;
  /**  Defaults to: 0. */
  awarded: number;
  dateEarned?: Date | null;
  dateAwarded?: Date | null;
  affiliateId?: number | null;
  investmentId?: number | null;
  purchaseAmount?: number | null;
  purchaseTokens?: number | null;
  affiliateLevel?: number | null;
}

/**
 * Exposes the same fields as Affiliateincomes,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AffiliateincomesWithDefaults {
  id?: number;
  investorId: number;
  amount: number;
  tokens: number;
  remark: string;
  /**  Defaults to: 0. */
  stoId?: number;
  /**  Defaults to: 0. */
  awarded?: number;
  dateEarned?: Date | null;
  dateAwarded?: Date | null;
  affiliateId?: number | null;
  investmentId?: number | null;
  purchaseAmount?: number | null;
  purchaseTokens?: number | null;
  affiliateLevel?: number | null;
}
/**
 * Exposes all fields present in affiliateplans as a typescript
 * interface.
 */
export interface Affiliateplans {
  /**  Defaults to: 0. */
  id: number;
  name: string;
}

/**
 * Exposes the same fields as Affiliateplans,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AffiliateplansWithDefaults {
  /**  Defaults to: 0. */
  id?: number;
  name: string;
}
/**
 * Exposes all fields present in AffiliateReportView as a typescript
 * interface.
 */
export interface AffiliateReportView {
  ID: number;
  stoid?: number | null;
  rootInvestorId?: number | null;
  lineInvestorId?: number | null;
  lineName?: string | null;
  /**  Defaults to: 0.00000000. */
  armVolume?: number | null;
  /**  Defaults to: 0.00000000. */
  rootInvestorTotalPersonalInvestmentVolume?: number | null;
  tokenVolume?: number | null;
}

/**
 * Exposes the same fields as AffiliateReportView,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AffiliateReportViewWithDefaults {
  ID?: number;
  stoid?: number | null;
  rootInvestorId?: number | null;
  lineInvestorId?: number | null;
  lineName?: string | null;
  /**  Defaults to: 0.00000000. */
  armVolume?: number | null;
  /**  Defaults to: 0.00000000. */
  rootInvestorTotalPersonalInvestmentVolume?: number | null;
  tokenVolume?: number | null;
}
/**
 * Exposes all fields present in api_migration_table as a typescript
 * interface.
 */
export interface ApiMigrationTable {
  id: number;
  timestamp: number;
  name: string;
}

/**
 * Exposes the same fields as ApiMigrationTable,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ApiMigrationTableWithDefaults {
  id?: number;
  timestamp: number;
  name: string;
}
/**
 * Exposes all fields present in app_parameters as a typescript
 * interface.
 */
export interface AppParameters {
  ID: number;
  stoid?: number | null;
  Param: string;
  ValueString: string;
  /**  Defaults to: 0. */
  ValueInt: number;
}

/**
 * Exposes the same fields as AppParameters,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AppParametersWithDefaults {
  ID?: number;
  stoid?: number | null;
  Param: string;
  ValueString: string;
  /**  Defaults to: 0. */
  ValueInt?: number;
}
/**
 * Exposes all fields present in blockchainSharesTransferTransactions as a typescript
 * interface.
 */
export interface BlockchainSharesTransferTransactions {
  ID: number;
  hostname?: string | null;
  toAddress?: string | null;
  stoid?: number | null;
  adminid?: number | null;
  investorID?: number | null;
  shareTypeID?: number | null;
  /**  Defaults to: 0.000. */
  amountToSend?: number | null;
  investmentDetails?: string | null;
  /**  Defaults to: 0.000. */
  investmentAmount?: number | null;
  reduceInvestorBalance?: number | null;
  status?: number | null;
  recordDate?: Date | null;
  transactionID?: string | null;
  errorMessage?: string | null;
}

/**
 * Exposes the same fields as BlockchainSharesTransferTransactions,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface BlockchainSharesTransferTransactionsWithDefaults {
  ID?: number;
  hostname?: string | null;
  toAddress?: string | null;
  stoid?: number | null;
  adminid?: number | null;
  investorID?: number | null;
  shareTypeID?: number | null;
  /**  Defaults to: 0.000. */
  amountToSend?: number | null;
  investmentDetails?: string | null;
  /**  Defaults to: 0.000. */
  investmentAmount?: number | null;
  reduceInvestorBalance?: number | null;
  status?: number | null;
  recordDate?: Date | null;
  transactionID?: string | null;
  errorMessage?: string | null;
}
/**
 * Exposes all fields present in brokerrights as a typescript
 * interface.
 */
export interface Brokerrights {
  ID: number;
  /**  Defaults to: 0. */
  brokerID?: number | null;
  /**  Defaults to: 0. */
  stoid?: number | null;
}

/**
 * Exposes the same fields as Brokerrights,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface BrokerrightsWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  brokerID?: number | null;
  /**  Defaults to: 0. */
  stoid?: number | null;
}
/**
 * Exposes all fields present in brokers as a typescript
 * interface.
 */
export interface Brokers {
  ID: number;
  FirstName?: string | null;
  LastName: string;
  /**  Defaults to: 0. */
  isActive: number;
  Username: string;
  Password: string;
  /**  Defaults to: 0. */
  twofactorenable?: number | null;
  email?: string | null;
}

/**
 * Exposes the same fields as Brokers,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface BrokersWithDefaults {
  ID?: number;
  FirstName?: string | null;
  LastName: string;
  /**  Defaults to: 0. */
  isActive?: number;
  Username: string;
  Password: string;
  /**  Defaults to: 0. */
  twofactorenable?: number | null;
  email?: string | null;
}
/**
 * Exposes all fields present in bulkemails as a typescript
 * interface.
 */
export interface Bulkemails {
  ID: number;
  stoid?: number | null;
  hostname?: string | null;
  title?: string | null;
  typeOfQuery?: number | null;
  InvestorsSelectionSQL?: string | null;
  BulkEmailsCommaSeperated?: string | null;
  emailText?: string | null;
  fromEmail?: string | null;
}

/**
 * Exposes the same fields as Bulkemails,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface BulkemailsWithDefaults {
  ID?: number;
  stoid?: number | null;
  hostname?: string | null;
  title?: string | null;
  typeOfQuery?: number | null;
  InvestorsSelectionSQL?: string | null;
  BulkEmailsCommaSeperated?: string | null;
  emailText?: string | null;
  fromEmail?: string | null;
}
/**
 * Exposes all fields present in changeaddresserequest as a typescript
 * interface.
 */
export interface Changeaddresserequest {
  ID: number;
  stoid?: number | null;
  InvestorID: number;
  PublicKey?: string | null;
  Tokens: number;
  /**  Defaults to: 0. */
  isActivated: number;
  ActivatedDate?: Date | null;
}

/**
 * Exposes the same fields as Changeaddresserequest,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ChangeaddresserequestWithDefaults {
  ID?: number;
  stoid?: number | null;
  InvestorID: number;
  PublicKey?: string | null;
  Tokens: number;
  /**  Defaults to: 0. */
  isActivated?: number;
  ActivatedDate?: Date | null;
}
/**
 * Exposes all fields present in changepassword as a typescript
 * interface.
 */
export interface Changepassword {
  id: number;
  userid: number;
  date: Date;
  securelink: string;
  securecode: string;
}

/**
 * Exposes the same fields as Changepassword,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ChangepasswordWithDefaults {
  id?: number;
  userid: number;
  date: Date;
  securelink: string;
  securecode: string;
}
/**
 * Exposes all fields present in chats as a typescript
 * interface.
 */
export interface Chats {
  adminID: number;
  dateRead?: Date | null;
  /**  Defaults to: CURRENT_TIMESTAMP. */
  dateSent: Date;
  ID: number;
  investorID: number;
  /**  Defaults to: 0. */
  isDeleted: number;
  /**  Defaults to: 0. */
  isEdited: number;
  /**  Defaults to: 0. */
  isRead: number;
  location?: string | null;
  message: string;
  receiver: 'INVESTOR' | 'ADMIN' | 'PLATFORM';
  sender: 'INVESTOR' | 'ADMIN' | 'PLATFORM';
  /**  Defaults to: 0. */
  stoID: number;
  /**  Defaults to: MESSAGE. */
  type: 'MESSAGE' | 'FILE';
  context?: 'EXCHANGE ORDER' | null;
  contextID?: number | null;
  contextReceiverID?: number | null;
}

/**
 * Exposes the same fields as Chats,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ChatsWithDefaults {
  adminID: number;
  dateRead?: Date | null;
  /**  Defaults to: CURRENT_TIMESTAMP. */
  dateSent?: Date;
  ID?: number;
  investorID: number;
  /**  Defaults to: 0. */
  isDeleted?: number;
  /**  Defaults to: 0. */
  isEdited?: number;
  /**  Defaults to: 0. */
  isRead?: number;
  location?: string | null;
  message: string;
  receiver: 'INVESTOR' | 'ADMIN' | 'PLATFORM';
  sender: 'INVESTOR' | 'ADMIN' | 'PLATFORM';
  /**  Defaults to: 0. */
  stoID?: number;
  /**  Defaults to: MESSAGE. */
  type?: 'MESSAGE' | 'FILE';
  context?: 'EXCHANGE ORDER' | null;
  contextID?: number | null;
  contextReceiverID?: number | null;
}
/**
 * Exposes all fields present in closedaccounts as a typescript
 * interface.
 */
export interface Closedaccounts {
  ID: number;
  stoid?: number | null;
  InvestorID: number;
  DateClosed?: Date | null;
  CaseTitle?: string | null;
  CaseDetails?: string | null;
  CaseNotes?: string | null;
  CaseFilePath?: string | null;
  tokens: number;
  /**  Defaults to: 0. */
  isPartial: number;
}

/**
 * Exposes the same fields as Closedaccounts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ClosedaccountsWithDefaults {
  ID?: number;
  stoid?: number | null;
  InvestorID: number;
  DateClosed?: Date | null;
  CaseTitle?: string | null;
  CaseDetails?: string | null;
  CaseNotes?: string | null;
  CaseFilePath?: string | null;
  tokens: number;
  /**  Defaults to: 0. */
  isPartial?: number;
}
/**
 * Exposes all fields present in cloudFiles as a typescript
 * interface.
 */
export interface CloudFiles {
  ID: number;
  filename: string;
  url?: string | null;
}

/**
 * Exposes the same fields as CloudFiles,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface CloudFilesWithDefaults {
  ID?: number;
  filename: string;
  url?: string | null;
}

/**
 * Exposes all fields present in contracts as a typescript
 * interface.
 */
export interface Contracts {
  ID: number;
  stoid?: number | null;
  InvestorID: number;
  DateOffered?: Date | null;
  ContractTitle?: string | null;
  ContractDetails?: string | null;
  DateSigned?: Date | null;
  UserID: number;
  CurrentStatus: number;
  ContractFilePath?: string | null;
  SignedFilePath?: string | null;
  contractid: number;
}

/**
 * Exposes the same fields as Contracts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ContractsWithDefaults {
  ID?: number;
  stoid?: number | null;
  InvestorID: number;
  DateOffered?: Date | null;
  ContractTitle?: string | null;
  ContractDetails?: string | null;
  DateSigned?: Date | null;
  UserID: number;
  CurrentStatus: number;
  ContractFilePath?: string | null;
  SignedFilePath?: string | null;
  contractid: number;
}
/**
 * Exposes all fields present in ConversionRateLocks as a typescript
 * interface.
 */
export interface ConversionRateLocks {
  id: number;
  stoId: number;
  investorId: number;
  currencyFrom: number;
  currencyTo: number;
  rate: number;
  lockedAt: Date;
  status: 'temporary' | 'pending' | 'historical';
}

/**
 * Exposes the same fields as ConversionRateLocks,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ConversionRateLocksWithDefaults {
  id?: number;
  stoId: number;
  investorId: number;
  currencyFrom: number;
  currencyTo: number;
  rate: number;
  lockedAt: Date;
  status: 'temporary' | 'pending' | 'historical';
}
/**
 * Exposes all fields present in currency as a typescript
 * interface.
 */
export interface Currency {
  ID: number;
  Country?: string | null;
  Currency?: string | null;
  Abbreviation?: string | null;
  Symbol?: string | null;
  /**  Defaults to: 0. */
  isBlockchainBased?: number | null;
}

/**
 * Exposes the same fields as Currency,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface CurrencyWithDefaults {
  ID?: number;
  Country?: string | null;
  Currency?: string | null;
  Abbreviation?: string | null;
  Symbol?: string | null;
  /**  Defaults to: 0. */
  isBlockchainBased?: number | null;
}
/**
 * Exposes all fields present in dividend as a typescript
 * interface.
 */
export interface Dividend {
  ID: number;
  title?: string | null;
  stoid?: number | null;
  adminid?: number | null;
  ShareTypeID?: number | null;
  status?: number | null;
  Details?: string | null;
  DateReport?: Date | null;
  /**  Defaults to: 0.000. */
  totalamount?: number | null;
  /**  Defaults to: 0.000. */
  investorTotalShares?: number | null;
  /**  Defaults to: 0.000. */
  companyTotalShares?: number | null;
  /**  Defaults to: 0. */
  totalInvestors?: number | null;
  currencyid?: number | null;
  payouttype?: number | null;
}

/**
 * Exposes the same fields as Dividend,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendWithDefaults {
  ID?: number;
  title?: string | null;
  stoid?: number | null;
  adminid?: number | null;
  ShareTypeID?: number | null;
  status?: number | null;
  Details?: string | null;
  DateReport?: Date | null;
  /**  Defaults to: 0.000. */
  totalamount?: number | null;
  /**  Defaults to: 0.000. */
  investorTotalShares?: number | null;
  /**  Defaults to: 0.000. */
  companyTotalShares?: number | null;
  /**  Defaults to: 0. */
  totalInvestors?: number | null;
  currencyid?: number | null;
  payouttype?: number | null;
}
/**
 * Exposes all fields present in DividendInvestorPayouts as a typescript
 * interface.
 */
export interface DividendInvestorPayouts {
  id: number;
  investorId: number;
  payoutId: number;
  amount: number;
  investorShares: number;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
}

/**
 * Exposes the same fields as DividendInvestorPayouts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendInvestorPayoutsWithDefaults {
  id?: number;
  investorId: number;
  payoutId: number;
  amount: number;
  investorShares: number;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
}
/**
 * Exposes all fields present in dividendinvestorpayoutsview as a typescript
 * interface.
 */
export interface Dividendinvestorpayoutsview {
  /**  Defaults to: 0. */
  id: number;
  templateId: number;
  investorId: number;
  payoutId: number;
  amount: number;
  investorShares: number;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
  dateTimeFrom: Date;
  dateTimeDue: Date;
  totalLastUpdatedAt?: Date | null;
  totalStatus:
    | 'future'
    | 'pending'
    | 'completed'
    | 'rejected'
    | 'reverting'
    | 'reverted'
    | 'exception';
  totalAmount: number;
  companyShares: number;
  totalInvestorShares: number;
  investors?: number | null;
  stoId: number;
  shareTypeId?: number | null;
  currencyId?: number | null;
  channelId?: number | null;
  isActive: number;
  periodUnit: 'days' | 'months';
  period: number;
  awardValue: number;
  title?: string | null;
  awardStrategy:
    | 'formula'
    | 'feePerShare'
    | 'percentPremiumValuePerShare'
    | 'dividendAmountDistributed';
  /**  Defaults to: unused. */
  templateStatus: 'unused' | 'used' | 'historical';
}

/**
 * Exposes the same fields as Dividendinvestorpayoutsview,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendinvestorpayoutsviewWithDefaults {
  /**  Defaults to: 0. */
  id?: number;
  templateId: number;
  investorId: number;
  payoutId: number;
  amount: number;
  investorShares: number;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
  dateTimeFrom: Date;
  dateTimeDue: Date;
  totalLastUpdatedAt?: Date | null;
  totalStatus:
    | 'future'
    | 'pending'
    | 'completed'
    | 'rejected'
    | 'reverting'
    | 'reverted'
    | 'exception';
  totalAmount: number;
  companyShares: number;
  totalInvestorShares: number;
  investors?: number | null;
  stoId: number;
  shareTypeId?: number | null;
  currencyId?: number | null;
  channelId?: number | null;
  isActive: number;
  periodUnit: 'days' | 'months';
  period: number;
  awardValue: number;
  title?: string | null;
  awardStrategy:
    | 'formula'
    | 'feePerShare'
    | 'percentPremiumValuePerShare'
    | 'dividendAmountDistributed';
  /**  Defaults to: unused. */
  templateStatus?: 'unused' | 'used' | 'historical';
}
/**
 * Exposes all fields present in DividendPayouts as a typescript
 * interface.
 */
export interface DividendPayouts {
  id: number;
  templateId: number;
  dateTimeFrom: Date;
  dateTimeDue: Date;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
  totalAmount: number;
  companyShares: number;
  totalInvestorShares: number;
  investors?: number | null;
}

/**
 * Exposes the same fields as DividendPayouts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendPayoutsWithDefaults {
  id?: number;
  templateId: number;
  dateTimeFrom: Date;
  dateTimeDue: Date;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
  totalAmount: number;
  companyShares: number;
  totalInvestorShares: number;
  investors?: number | null;
}
/**
 * Exposes all fields present in dividendpayoutsview as a typescript
 * interface.
 */
export interface Dividendpayoutsview {
  /**  Defaults to: 0. */
  id: number;
  templateId: number;
  dateTimeFrom: Date;
  dateTimeDue: Date;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
  totalAmount: number;
  companyShares: number;
  totalInvestorShares: number;
  investors?: number | null;
  stoId: number;
  shareTypeId?: number | null;
  currencyId?: number | null;
  channelId?: number | null;
  isActive: number;
  periodUnit: 'days' | 'months';
  period: number;
  awardValue: number;
  title?: string | null;
  awardStrategy:
    | 'formula'
    | 'feePerShare'
    | 'percentPremiumValuePerShare'
    | 'dividendAmountDistributed';
  /**  Defaults to: unused. */
  templateStatus: 'unused' | 'used' | 'historical';
}

/**
 * Exposes the same fields as Dividendpayoutsview,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendpayoutsviewWithDefaults {
  /**  Defaults to: 0. */
  id?: number;
  templateId: number;
  dateTimeFrom: Date;
  dateTimeDue: Date;
  lastUpdatedAt?: Date | null;
  status: 'future' | 'pending' | 'completed' | 'rejected' | 'reverting' | 'reverted' | 'exception';
  totalAmount: number;
  companyShares: number;
  totalInvestorShares: number;
  investors?: number | null;
  stoId: number;
  shareTypeId?: number | null;
  currencyId?: number | null;
  channelId?: number | null;
  isActive: number;
  periodUnit: 'days' | 'months';
  period: number;
  awardValue: number;
  title?: string | null;
  awardStrategy:
    | 'formula'
    | 'feePerShare'
    | 'percentPremiumValuePerShare'
    | 'dividendAmountDistributed';
  /**  Defaults to: unused. */
  templateStatus?: 'unused' | 'used' | 'historical';
}
/**
 * Exposes all fields present in dividendreceivers as a typescript
 * interface.
 */
export interface Dividendreceivers {
  ID: number;
  dividendid?: number | null;
  investorid?: number | null;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  /**  Defaults to: 0.000. */
  amounttopaid?: number | null;
  status?: number | null;
  Details?: string | null;
  BankPaidDetails?: string | null;
  CryptoPaidDetails?: string | null;
  DatePaid?: Date | null;
  /**  Defaults to: 0.000. */
  AffiliateAmount?: number | null;
}

/**
 * Exposes the same fields as Dividendreceivers,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendreceiversWithDefaults {
  ID?: number;
  dividendid?: number | null;
  investorid?: number | null;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  /**  Defaults to: 0.000. */
  amounttopaid?: number | null;
  status?: number | null;
  Details?: string | null;
  BankPaidDetails?: string | null;
  CryptoPaidDetails?: string | null;
  DatePaid?: Date | null;
  /**  Defaults to: 0.000. */
  AffiliateAmount?: number | null;
}
/**
 * Exposes all fields present in DividendTemplates as a typescript
 * interface.
 */
export interface DividendTemplates {
  id: number;
  historyId?: number | null;
  stoId: number;
  shareTypeId?: number | null;
  currencyId?: number | null;
  channelId?: number | null;
  isActive: number;
  periodUnit: 'days' | 'months';
  period: number;
  awardValue: number;
  title?: string | null;
  awardStrategy:
    | 'formula'
    | 'feePerShare'
    | 'percentPremiumValuePerShare'
    | 'dividendAmountDistributed';
  awardFormula?: string | null;
  /**  Defaults to: unused. */
  status: 'unused' | 'used' | 'historical';
}

/**
 * Exposes the same fields as DividendTemplates,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DividendTemplatesWithDefaults {
  id?: number;
  historyId?: number | null;
  stoId: number;
  shareTypeId?: number | null;
  currencyId?: number | null;
  channelId?: number | null;
  isActive: number;
  periodUnit: 'days' | 'months';
  period: number;
  awardValue: number;
  title?: string | null;
  awardStrategy:
    | 'formula'
    | 'feePerShare'
    | 'percentPremiumValuePerShare'
    | 'dividendAmountDistributed';
  awardFormula?: string | null;
  /**  Defaults to: unused. */
  status?: 'unused' | 'used' | 'historical';
}
/**
 * Exposes all fields present in doclinks as a typescript
 * interface.
 */
export interface Doclinks {
  ID: number;
  isEnabled?: number | null;
  title?: string | null;
  secret?: string | null;
}

/**
 * Exposes the same fields as Doclinks,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DoclinksWithDefaults {
  ID?: number;
  isEnabled?: number | null;
  title?: string | null;
  secret?: string | null;
}
/**
 * Exposes all fields present in doclinksdocuments as a typescript
 * interface.
 */
export interface Doclinksdocuments {
  ID: number;
  DocLinksID: number;
  title?: string | null;
  dateuploaded?: Date | null;
  details?: string | null;
  files?: string | null;
  /**  Defaults to: 1. */
  isNew?: number | null;
}

/**
 * Exposes the same fields as Doclinksdocuments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DoclinksdocumentsWithDefaults {
  ID?: number;
  DocLinksID: number;
  title?: string | null;
  dateuploaded?: Date | null;
  details?: string | null;
  files?: string | null;
  /**  Defaults to: 1. */
  isNew?: number | null;
}
/**
 * Exposes all fields present in docu_sign_sto_contracts as a typescript
 * interface.
 */
export interface DocuSignStoContracts {
  id: number;
  stoid?: number | null;
  /**  Defaults to: 0. */
  investor_id?: number | null;
  docusign_contract_signed_id?: string | null;
  /**  Defaults to: 0. */
  is_docusign_contract_signed?: number | null;
}

/**
 * Exposes the same fields as DocuSignStoContracts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocuSignStoContractsWithDefaults {
  id?: number;
  stoid?: number | null;
  /**  Defaults to: 0. */
  investor_id?: number | null;
  docusign_contract_signed_id?: string | null;
  /**  Defaults to: 0. */
  is_docusign_contract_signed?: number | null;
}
/**
 * Exposes all fields present in documentcomments as a typescript
 * interface.
 */
export interface Documentcomments {
  ID: number;
  stoid?: number | null;
  documentid?: number | null;
  comment?: string | null;
  investorid?: number | null;
  datecomment?: Date | null;
  reply?: string | null;
  /**  Defaults to: -1. */
  replybyid?: number | null;
  datereplycomment?: Date | null;
  /**  Defaults to: 0. */
  isaccepted?: number | null;
  /**  Defaults to: 1. */
  isnew?: number | null;
}

/**
 * Exposes the same fields as Documentcomments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentcommentsWithDefaults {
  ID?: number;
  stoid?: number | null;
  documentid?: number | null;
  comment?: string | null;
  investorid?: number | null;
  datecomment?: Date | null;
  reply?: string | null;
  /**  Defaults to: -1. */
  replybyid?: number | null;
  datereplycomment?: Date | null;
  /**  Defaults to: 0. */
  isaccepted?: number | null;
  /**  Defaults to: 1. */
  isnew?: number | null;
}
/**
 * Exposes all fields present in documentdirectories as a typescript
 * interface.
 */
export interface Documentdirectories {
  ID: number;
  title?: string | null;
  stoid?: number | null;
  parentid?: number | null;
}

/**
 * Exposes the same fields as Documentdirectories,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentdirectoriesWithDefaults {
  ID?: number;
  title?: string | null;
  stoid?: number | null;
  parentid?: number | null;
}
/**
 * Exposes all fields present in documentfields as a typescript
 * interface.
 */
export interface Documentfields {
  ID: number;
  title?: string | null;
  fieldtype?: number | null;
  stoid?: number | null;
  documentid?: number | null;
  fieldid?: string | null;
  fieldhelpertext?: string | null;
  docusignFieldDataLabel?: string | null;
}

/**
 * Exposes the same fields as Documentfields,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentfieldsWithDefaults {
  ID?: number;
  title?: string | null;
  fieldtype?: number | null;
  stoid?: number | null;
  documentid?: number | null;
  fieldid?: string | null;
  fieldhelpertext?: string | null;
  docusignFieldDataLabel?: string | null;
}
/**
 * Exposes all fields present in documentfieldvalues as a typescript
 * interface.
 */
export interface Documentfieldvalues {
  ID: number;
  userid?: number | null;
  fieldid?: number | null;
  documentid?: number | null;
  value?: string | null;
}

/**
 * Exposes the same fields as Documentfieldvalues,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentfieldvaluesWithDefaults {
  ID?: number;
  userid?: number | null;
  fieldid?: number | null;
  documentid?: number | null;
  value?: string | null;
}
/**
 * Exposes all fields present in documentofferinvestor as a typescript
 * interface.
 */
export interface Documentofferinvestor {
  ID: number;
  stoid?: number | null;
  title?: string | null;
  documentid?: number | null;
  DateFrom?: Date | null;
  DataTo?: Date | null;
  contents?: string | null;
  documentOffetType?: number | null;
  investorStatusID?: number | null;
  InvestorsName?: string | null;
}

/**
 * Exposes the same fields as Documentofferinvestor,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentofferinvestorWithDefaults {
  ID?: number;
  stoid?: number | null;
  title?: string | null;
  documentid?: number | null;
  DateFrom?: Date | null;
  DataTo?: Date | null;
  contents?: string | null;
  documentOffetType?: number | null;
  investorStatusID?: number | null;
  InvestorsName?: string | null;
}
/**
 * Exposes all fields present in documents as a typescript
 * interface.
 */
export interface Documents {
  ID: number;
  title?: string | null;
  contents?: string | null;
  stoid?: number | null;
  directoryid?: number | null;
  /**  Defaults to: 0. */
  isactiveforinvestors: number;
  /**  Defaults to: 0. */
  filetype?: number | null;
  /**  Defaults to: 0. */
  offerID: number;
  isactiveforinvestorsType?: number | null;
  isactiveforinvestorsNames?: string | null;
  /**  Defaults to: ["ALL"]. */
  countriesWhitelist?: string | null;
  docusignDocumentID?: string | null;
  /**  Defaults to: ["ALL"]. */
  investorTypesWhitelist?: string | null;
}

/**
 * Exposes the same fields as Documents,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentsWithDefaults {
  ID?: number;
  title?: string | null;
  contents?: string | null;
  stoid?: number | null;
  directoryid?: number | null;
  /**  Defaults to: 0. */
  isactiveforinvestors?: number;
  /**  Defaults to: 0. */
  filetype?: number | null;
  /**  Defaults to: 0. */
  offerID?: number;
  isactiveforinvestorsType?: number | null;
  isactiveforinvestorsNames?: string | null;
  /**  Defaults to: ["ALL"]. */
  countriesWhitelist?: string | null;
  docusignDocumentID?: string | null;
  /**  Defaults to: ["ALL"]. */
  investorTypesWhitelist?: string | null;
}
/**
 * Exposes all fields present in documentuser as a typescript
 * interface.
 */
export interface Documentuser {
  ID: number;
  contents?: string | null;
  investorID?: number | null;
  stoid?: number | null;
  directoryid?: number | null;
  documentid: number;
  DocumentStatus: number;
  fieldValuesJson?: string | null;
  documentofferinvestorid: number;
  signaturefilepath?: string | null;
  signaturedate?: Date | null;
  signatureFileID?: number | null;
}

/**
 * Exposes the same fields as Documentuser,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface DocumentuserWithDefaults {
  ID?: number;
  contents?: string | null;
  investorID?: number | null;
  stoid?: number | null;
  directoryid?: number | null;
  documentid: number;
  DocumentStatus: number;
  fieldValuesJson?: string | null;
  documentofferinvestorid: number;
  signaturefilepath?: string | null;
  signaturedate?: Date | null;
  signatureFileID?: number | null;
}
/**
 * Exposes all fields present in exchangeoffers as a typescript
 * interface.
 */
export interface Exchangeoffers {
  ID: number;
  exchangeOrderID: number;
  investorID?: number | null;
  /**  Defaults to: 0.000. */
  sharesPartial?: number | null;
  /**  Defaults to: 0.000. */
  rateFrom?: number | null;
  /**  Defaults to: 0.000. */
  rateTo?: number | null;
  offerDescription?: string | null;
  atomicSwapAccepted?: number | null;
  atomicSwapSecret?: string | null;
  atomicBuyerPublicKey?: string | null;
  atomicSwapExpireData?: Date | null;
}

/**
 * Exposes the same fields as Exchangeoffers,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ExchangeoffersWithDefaults {
  ID?: number;
  exchangeOrderID: number;
  investorID?: number | null;
  /**  Defaults to: 0.000. */
  sharesPartial?: number | null;
  /**  Defaults to: 0.000. */
  rateFrom?: number | null;
  /**  Defaults to: 0.000. */
  rateTo?: number | null;
  offerDescription?: string | null;
  atomicSwapAccepted?: number | null;
  atomicSwapSecret?: string | null;
  atomicBuyerPublicKey?: string | null;
  atomicSwapExpireData?: Date | null;
}
/**
 * Exposes all fields present in exchangeorders as a typescript
 * interface.
 */
export interface Exchangeorders {
  ID: number;
  /**  Defaults to: 0. */
  type?: number | null;
  investorID?: number | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  sharesTypeID?: number | null;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  /**  Defaults to: 0.000. */
  rateFrom?: number | null;
  /**  Defaults to: 0.000. */
  rateTo?: number | null;
  description?: string | null;
  atomicSwapCurrentStatus?: number | null;
  atomicSwapExchangeOffersID?: number | null;
  atomicSwapTokenAddressAcceptable?: string | null;
  /**  Defaults to: 0. */
  atomicSwapAcceptable?: number | null;
  /**  Defaults to: 0. */
  atomicSwapSharesWalletID?: number | null;
}

/**
 * Exposes the same fields as Exchangeorders,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ExchangeordersWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  type?: number | null;
  investorID?: number | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  sharesTypeID?: number | null;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  /**  Defaults to: 0.000. */
  rateFrom?: number | null;
  /**  Defaults to: 0.000. */
  rateTo?: number | null;
  description?: string | null;
  atomicSwapCurrentStatus?: number | null;
  atomicSwapExchangeOffersID?: number | null;
  atomicSwapTokenAddressAcceptable?: string | null;
  /**  Defaults to: 0. */
  atomicSwapAcceptable?: number | null;
  /**  Defaults to: 0. */
  atomicSwapSharesWalletID?: number | null;
}
/**
 * Exposes all fields present in fee_commissions as a typescript
 * interface.
 */
export interface FeeCommissions {
  ID: number;
  feeID: number;
  /**  Defaults to: 0.000. */
  amount: number;
  transactionID: number;
  beneficiaryID: number;
  beneficiaryType?: 'USER' | 'INVESTOR' | null;
  /**  Defaults to: CURRENT_TIMESTAMP. */
  dateEarned: Date;
  /**  Defaults to: PENDING. */
  status: 'PENDING' | 'COMPLETED' | 'REJECTED';
}

/**
 * Exposes the same fields as FeeCommissions,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface FeeCommissionsWithDefaults {
  ID?: number;
  feeID: number;
  /**  Defaults to: 0.000. */
  amount?: number;
  transactionID: number;
  beneficiaryID: number;
  beneficiaryType?: 'USER' | 'INVESTOR' | null;
  /**  Defaults to: CURRENT_TIMESTAMP. */
  dateEarned?: Date;
  /**  Defaults to: PENDING. */
  status?: 'PENDING' | 'COMPLETED' | 'REJECTED';
}
/**
 * Exposes all fields present in fees as a typescript
 * interface.
 */
export interface Fees {
  ID: number;
  stoID: number;
  beneficiary: 'BROKER' | 'PLATFORM';
  type: 'REGISTRATION' | 'DEPOSIT' | 'BUY SHARES' | 'BUY EXCHANGE' | 'SELL EXCHANGE' | 'SELL BACK';
  /**  Defaults to: 0.000. */
  amount: number;
  /**  Defaults to: FLAT. */
  status: 'FLAT' | 'PERCENTAGE';
}

/**
 * Exposes the same fields as Fees,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface FeesWithDefaults {
  ID?: number;
  stoID: number;
  beneficiary: 'BROKER' | 'PLATFORM';
  type: 'REGISTRATION' | 'DEPOSIT' | 'BUY SHARES' | 'BUY EXCHANGE' | 'SELL EXCHANGE' | 'SELL BACK';
  /**  Defaults to: 0.000. */
  amount?: number;
  /**  Defaults to: FLAT. */
  status?: 'FLAT' | 'PERCENTAGE';
}
/**
 * Exposes all fields present in hellosignsignatures as a typescript
 * interface.
 */
export interface Hellosignsignatures {
  ID: number;
  signatureID: string;
  investorBuyPropertyAlertID: number;
  investorID: number;
  documentID: number;
}

/**
 * Exposes the same fields as Hellosignsignatures,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface HellosignsignaturesWithDefaults {
  ID?: number;
  signatureID: string;
  investorBuyPropertyAlertID: number;
  investorID: number;
  documentID: number;
}
/**
 * Exposes all fields present in inbox as a typescript
 * interface.
 */
export interface Inbox {
  ID: number;
  stoid?: number | null;
  InvestorID: number;
  Title?: string | null;
  Details?: string | null;
  DateEmail?: Date | null;
  /**  Defaults to: 0. */
  isResponded: number;
  Response?: string | null;
  ResponseDate?: Date | null;
}

/**
 * Exposes the same fields as Inbox,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InboxWithDefaults {
  ID?: number;
  stoid?: number | null;
  InvestorID: number;
  Title?: string | null;
  Details?: string | null;
  DateEmail?: Date | null;
  /**  Defaults to: 0. */
  isResponded?: number;
  Response?: string | null;
  ResponseDate?: Date | null;
}
/**
 * Exposes all fields present in investing_entity as a typescript
 * interface.
 */
export interface InvestingEntity {
  ID: number;
  investorID: number;
  type: string;
  taxId: string;
  name: string;
  nickname: string;
  accredited: number;
  paymentMethod: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
  ach?: string | null;
  wire?: string | null;
}

/**
 * Exposes the same fields as InvestingEntity,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestingEntityWithDefaults {
  ID?: number;
  investorID: number;
  type: string;
  taxId: string;
  name: string;
  nickname: string;
  accredited: number;
  paymentMethod: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
  ach?: string | null;
  wire?: string | null;
}
/**
 * Exposes all fields present in investing_entity_member as a typescript
 * interface.
 */
export interface InvestingEntityMember {
  ID: number;
  investorID: number;
  entityID: number;
  firstName: string;
  lastName: string;
  role: string;
  signatory: number;
  email: string;
}

/**
 * Exposes the same fields as InvestingEntityMember,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestingEntityMemberWithDefaults {
  ID?: number;
  investorID: number;
  entityID: number;
  firstName: string;
  lastName: string;
  role: string;
  signatory: number;
  email: string;
}
/**
 * Exposes all fields present in investments as a typescript
 * interface.
 */
export interface Investments {
  ID: number;
  stoid?: number | null;
  UserID: number;
  InvestorID: number;
  /**  Defaults to: 0.000. */
  TokensTransferred?: number | null;
  AmountInvested?: number | null;
  CurrencyID: number;
  Description?: string | null;
  sharetypeid: number;
  DateTime?: Date | null;
}

/**
 * Exposes the same fields as Investments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestmentsWithDefaults {
  ID?: number;
  stoid?: number | null;
  UserID: number;
  InvestorID: number;
  /**  Defaults to: 0.000. */
  TokensTransferred?: number | null;
  AmountInvested?: number | null;
  CurrencyID: number;
  Description?: string | null;
  sharetypeid: number;
  DateTime?: Date | null;
}
/**
 * Exposes all fields present in investor as a typescript
 * interface.
 */
export interface Investor {
  ID: number;
  FirstName?: string | null;
  LastName?: string | null;
  Address?: string | null;
  country?: string | null;
  phone?: string | null;
  cell?: string | null;
  zip?: string | null;
  town?: string | null;
  state?: string | null;
  Password: string;
  email: string;
  PassportNumber?: string | null;
  NationalID?: string | null;
  /**  Defaults to: 0. */
  receiveEmails?: number | null;
  kinname?: string | null;
  kinphone?: string | null;
  kinemail?: string | null;
  /**  Defaults to: 0. */
  investorType: number;
  CompanyName?: string | null;
  TitleWithinCompany?: string | null;
  /**  Defaults to: 0. */
  PowerToBindCompany?: number | null;
  DOB?: Date | null;
  /**  Defaults to: 0. */
  twofactorenable?: number | null;
  /**  Defaults to: 0. */
  investorBulkUploadStatus?: number | null;
  /**  Defaults to: en. */
  language?: string | null;
  MiddleName?: string | null;
  SocialSecurity?: string | null;
  MailingAddress?: string | null;
  FaxNumber?: string | null;
  /**  Defaults to: 0. */
  MaritalStatus?: number | null;
  Occupation?: string | null;
  EmployerName?: string | null;
  EmployerAddress?: string | null;
  /**  Defaults to: 0. */
  RetirementAccount?: number | null;
  /**  Defaults to: 0. */
  TrustOrBusinessEntity?: number | null;
  DateIncorporation?: Date | null;
  TaxIDNo?: string | null;
  GovtIDNo?: string | null;
  /**  Defaults to: 0. */
  GovtIDNoIsTaxNo?: number | null;
  NameSecondaryContact?: string | null;
  PhoneSecondaryContact?: string | null;
  EmailSecondaryContact?: string | null;
  NamePrimaryContact?: string | null;
  PhonePrimaryContact?: string | null;
  EmailPrimaryContact?: string | null;
  PrincipalCountryOfBusiness?: string | null;
  countryOfCitizenship?: string | null;
  /**  Defaults to: 0. */
  referByInvestorID?: number | null;
  kyc?: string | null;
  /**  Defaults to: 1. */
  dividendPeriod?: number | null;
  DOBCountry?: string | null;
  taxResidencyCountry?: string | null;
  /**  Defaults to: 0. */
  affiliateStatus: number;
  brokerID?: string | null;
  /**  Defaults to: 0. */
  PoliticallyExposedPerson: number;
  PoliticallyExposedPersonPost?: string | null;
  mercuryID?: string | null;
  uploadDate?: Date | null;
}

/**
 * Exposes the same fields as Investor,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorWithDefaults {
  ID?: number;
  FirstName?: string | null;
  LastName?: string | null;
  Address?: string | null;
  country?: string | null;
  phone?: string | null;
  cell?: string | null;
  zip?: string | null;
  town?: string | null;
  state?: string | null;
  Password: string;
  email: string;
  PassportNumber?: string | null;
  NationalID?: string | null;
  /**  Defaults to: 0. */
  receiveEmails?: number | null;
  kinname?: string | null;
  kinphone?: string | null;
  kinemail?: string | null;
  /**  Defaults to: 0. */
  investorType?: number;
  CompanyName?: string | null;
  TitleWithinCompany?: string | null;
  /**  Defaults to: 0. */
  PowerToBindCompany?: number | null;
  DOB?: Date | null;
  /**  Defaults to: 0. */
  twofactorenable?: number | null;
  /**  Defaults to: 0. */
  investorBulkUploadStatus?: number | null;
  /**  Defaults to: en. */
  language?: string | null;
  MiddleName?: string | null;
  SocialSecurity?: string | null;
  MailingAddress?: string | null;
  FaxNumber?: string | null;
  /**  Defaults to: 0. */
  MaritalStatus?: number | null;
  Occupation?: string | null;
  EmployerName?: string | null;
  EmployerAddress?: string | null;
  /**  Defaults to: 0. */
  RetirementAccount?: number | null;
  /**  Defaults to: 0. */
  TrustOrBusinessEntity?: number | null;
  DateIncorporation?: Date | null;
  TaxIDNo?: string | null;
  GovtIDNo?: string | null;
  /**  Defaults to: 0. */
  GovtIDNoIsTaxNo?: number | null;
  NameSecondaryContact?: string | null;
  PhoneSecondaryContact?: string | null;
  EmailSecondaryContact?: string | null;
  NamePrimaryContact?: string | null;
  PhonePrimaryContact?: string | null;
  EmailPrimaryContact?: string | null;
  PrincipalCountryOfBusiness?: string | null;
  countryOfCitizenship?: string | null;
  /**  Defaults to: 0. */
  referByInvestorID?: number | null;
  kyc?: string | null;
  /**  Defaults to: 1. */
  dividendPeriod?: number | null;
  DOBCountry?: string | null;
  taxResidencyCountry?: string | null;
  /**  Defaults to: 0. */
  affiliateStatus?: number;
  brokerID?: string | null;
  /**  Defaults to: 0. */
  PoliticallyExposedPerson?: number;
  PoliticallyExposedPersonPost?: string | null;
  mercuryID?: string | null;
  uploadDate?: Date | null;
}
/**
 * Exposes all fields present in InvestorBalancesInCompanyAccounts as a typescript
 * interface.
 */
export interface InvestorBalancesInCompanyAccounts {
  ID: number;
  stoid?: number | null;
  investorID?: number | null;
  currencyID?: number | null;
  Amount?: number | null;
}

/**
 * Exposes the same fields as InvestorBalancesInCompanyAccounts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorBalancesInCompanyAccountsWithDefaults {
  ID?: number;
  stoid?: number | null;
  investorID?: number | null;
  currencyID?: number | null;
  Amount?: number | null;
}
/**
 * Exposes all fields present in InvestorBanks as a typescript
 * interface.
 */
export interface InvestorBanks {
  ID: number;
  investorid?: number | null;
  accountTitle?: string | null;
  accountNo?: string | null;
  routingNumber?: string | null;
  iban?: string | null;
  accountHolderName?: string | null;
  accountHolderCity?: string | null;
  accountHolderCountry?: string | null;
  accountHolderAddress?: string | null;
  accountPostalCode?: string | null;
  bankName?: string | null;
  bankCity?: string | null;
  bankCountry?: string | null;
  bankAddress?: string | null;
  swift?: string | null;
}

/**
 * Exposes the same fields as InvestorBanks,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorBanksWithDefaults {
  ID?: number;
  investorid?: number | null;
  accountTitle?: string | null;
  accountNo?: string | null;
  routingNumber?: string | null;
  iban?: string | null;
  accountHolderName?: string | null;
  accountHolderCity?: string | null;
  accountHolderCountry?: string | null;
  accountHolderAddress?: string | null;
  accountPostalCode?: string | null;
  bankName?: string | null;
  bankCity?: string | null;
  bankCountry?: string | null;
  bankAddress?: string | null;
  swift?: string | null;
}
/**
 * Exposes all fields present in InvestorBanksDividend as a typescript
 * interface.
 */
export interface InvestorBanksDividend {
  ID: number;
  InvestorBanksID?: number | null;
  stoid?: number | null;
}

/**
 * Exposes the same fields as InvestorBanksDividend,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorBanksDividendWithDefaults {
  ID?: number;
  InvestorBanksID?: number | null;
  stoid?: number | null;
}
/**
 * Exposes all fields present in InvestorBankssto as a typescript
 * interface.
 */
export interface InvestorBankssto {
  ID: number;
  InvestorBanksID?: number | null;
  stoid?: number | null;
}

/**
 * Exposes the same fields as InvestorBankssto,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorBanksstoWithDefaults {
  ID?: number;
  InvestorBanksID?: number | null;
  stoid?: number | null;
}
/**
 * Exposes all fields present in InvestorBuyPropertyAlert as a typescript
 * interface.
 */
export interface InvestorBuyPropertyAlert {
  ID: number;
  stoid?: number | null;
  investorID?: number | null;
  /**  Defaults to: 0.000. */
  Shares?: number | null;
  ShareTypeID?: number | null;
  status?: number | null;
  Details?: string | null;
  DateReceived?: Date | null;
  /**  Defaults to: 0. */
  isSubScriptionFormSigned?: number | null;
  SubScriptionFormPath?: string | null;
  SubScriptionFormContents?: string | null;
  publickey?: string | null;
  isblockchain?: number | null;
  /**  Defaults to: 0. */
  isBuySharesFormSigned?: number | null;
  BuySharesFormPath?: string | null;
  purchasePriceOffered?: number | null;
  conversionRateLock?: number | null;
  entityID?: number | null;
  fromCurrencyID?: number | null;
  isSellRequest?: number;
}

/**
 * Exposes the same fields as InvestorBuyPropertyAlert,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorBuyPropertyAlertWithDefaults {
  ID?: number;
  stoid?: number | null;
  investorID?: number | null;
  /**  Defaults to: 0.000. */
  Shares?: number | null;
  ShareTypeID?: number | null;
  status?: number | null;
  Details?: string | null;
  DateReceived?: Date | null;
  /**  Defaults to: 0. */
  isSubScriptionFormSigned?: number | null;
  SubScriptionFormPath?: string | null;
  SubScriptionFormContents?: string | null;
  publickey?: string | null;
  isblockchain?: number | null;
  /**  Defaults to: 0. */
  isBuySharesFormSigned?: number | null;
  BuySharesFormPath?: string | null;
  purchasePriceOffered?: number | null;
  conversionRateLock?: number | null;
  entityID?: number | null;
  fromCurrencyID?: number | null;
}
/**
 * Exposes all fields present in InvestorDepositReceivedAlert as a typescript
 * interface.
 */
export interface InvestorDepositReceivedAlert {
  ID: number;
  investorID?: number | null;
  isApproved?: number | null;
  storid?: number | null;
  DateReceived?: Date | null;
  ChannelID?: number | null;
  Amount?: number | null;
  Details?: string | null;
  DateApproved?: Date | null;
  ApprovedByUserID?: number | null;
  /**  Defaults to: 0.000. */
  runningBalance?: number | null;
  currencyID?: number | null;
  transactionID?: string | null;
  idempotencyKey?: string | null;
  /**  Defaults to: 0. */
  isWithdrawFundsRequest?: number | null;
  conversionRateLock?: number | null;
}

/**
 * Exposes the same fields as InvestorDepositReceivedAlert,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorDepositReceivedAlertWithDefaults {
  ID?: number;
  investorID?: number | null;
  isApproved?: number | null;
  storid?: number | null;
  DateReceived?: Date | null;
  ChannelID?: number | null;
  Amount?: number | null;
  Details?: string | null;
  DateApproved?: Date | null;
  ApprovedByUserID?: number | null;
  /**  Defaults to: 0.000. */
  runningBalance?: number | null;
  currencyID?: number | null;
  transactionID?: string | null;
  idempotencyKey?: string | null;
  /**  Defaults to: 0. */
  isWithdrawFundsRequest?: number | null;
  conversionRateLock?: number | null;
}
/**
 * Exposes all fields present in investordocuments as a typescript
 * interface.
 */
export interface Investordocuments {
  ID: number;
  stoid?: number | null;
  InvestorID?: string | null;
  DocumentTitle?: string | null;
  UploadDate?: Date | null;
  Link?: string | null;
}

/**
 * Exposes the same fields as Investordocuments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestordocumentsWithDefaults {
  ID?: number;
  stoid?: number | null;
  InvestorID?: string | null;
  DocumentTitle?: string | null;
  UploadDate?: Date | null;
  Link?: string | null;
}
/**
 * Exposes all fields present in investorinvitation as a typescript
 * interface.
 */
export interface Investorinvitation {
  ID: number;
  stoid?: number | null;
  FirstName?: string | null;
  LastName?: string | null;
  email?: string | null;
  emailtext: string;
  city?: string | null;
  country?: string | null;
  /**  Defaults to: 0. */
  currentStatus?: number | null;
  investorID?: number | null;
}

/**
 * Exposes the same fields as Investorinvitation,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorinvitationWithDefaults {
  ID?: number;
  stoid?: number | null;
  FirstName?: string | null;
  LastName?: string | null;
  email?: string | null;
  emailtext: string;
  city?: string | null;
  country?: string | null;
  /**  Defaults to: 0. */
  currentStatus?: number | null;
  investorID?: number | null;
}
/**
 * Exposes all fields present in investorpublickeys as a typescript
 * interface.
 */
export interface Investorpublickeys {
  ID: number;
  /**  Defaults to: 0. */
  investorID?: number | null;
  title?: string | null;
}

/**
 * Exposes the same fields as Investorpublickeys,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorpublickeysWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  investorID?: number | null;
  title?: string | null;
}
/**
 * Exposes all fields present in investorsto as a typescript
 * interface.
 */
export interface Investorsto {
  /**  Defaults to: 0. */
  investorid: number;
  /**  Defaults to: 0. */
  isAccountClosed?: number | null;
  id: number;
  stoid: number;
  /**  Defaults to: 0. */
  expectedShares: number;
  /**  Defaults to: 0. */
  expectedInvestment: number;
  /**  Defaults to: 0. */
  isKYC: number;
  /**  Defaults to: 0. */
  KYCApplied: number;
  KYCUpdateDate?: Date | null;
  /**  Defaults to: 0. */
  KYCCurrentStatus: number;
  inviteFriendEmailText?: string | null;
  UsufructuariesFirstName: string;
  UsufructuariesLastName: string;
  UsufructuariesAddress: string;
  UsufructuariesCity: string;
  UsufructuariesCountry: string;
  UsufructuariesEmail: string;
  BeneificalFirstName: string;
  BeneificalLastName: string;
  BeneificalAddress: string;
  BeneificalCity: string;
  BeneificalCountry: string;
  BeneificalEmail: string;
  BeneificalDOB?: Date | null;
  BeneificalNationality: string;
  /**  Defaults to: 0. */
  isUsufructuary: number;
  /**  Defaults to: 1. */
  isActive: number;
  notes?: string | null;
  dividendbank?: string | null;
  dividendcrypto?: string | null;
  KycExpiryDate?: Date | null;
}

/**
 * Exposes the same fields as Investorsto,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface InvestorstoWithDefaults {
  /**  Defaults to: 0. */
  investorid?: number;
  /**  Defaults to: 0. */
  isAccountClosed?: number | null;
  id?: number;
  stoid: number;
  /**  Defaults to: 0. */
  expectedShares?: number;
  /**  Defaults to: 0. */
  expectedInvestment?: number;
  /**  Defaults to: 0. */
  isKYC?: number;
  /**  Defaults to: 0. */
  KYCApplied?: number;
  KYCUpdateDate?: Date | null;
  /**  Defaults to: 0. */
  KYCCurrentStatus?: number;
  inviteFriendEmailText?: string | null;
  UsufructuariesFirstName: string;
  UsufructuariesLastName: string;
  UsufructuariesAddress: string;
  UsufructuariesCity: string;
  UsufructuariesCountry: string;
  UsufructuariesEmail: string;
  BeneificalFirstName: string;
  BeneificalLastName: string;
  BeneificalAddress: string;
  BeneificalCity: string;
  BeneificalCountry: string;
  BeneificalEmail: string;
  BeneificalDOB?: Date | null;
  BeneificalNationality: string;
  /**  Defaults to: 0. */
  isUsufructuary?: number;
  /**  Defaults to: 1. */
  isActive?: number;
  notes?: string | null;
  dividendbank?: string | null;
  dividendcrypto?: string | null;
  KycExpiryDate?: Date | null;
}
/**
 * Exposes all fields present in kyc as a typescript
 * interface.
 */
export interface Kyc {
  ID: number;
  InvestorID: number;
  appliedFor?: number | null;
  kyc?: string | null;
}

/**
 * Exposes the same fields as Kyc,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface KycWithDefaults {
  ID?: number;
  InvestorID: number;
  appliedFor?: number | null;
  kyc?: string | null;
}
/**
 * Exposes all fields present in kyc_field_values as a typescript
 * interface.
 */
export interface KycFieldValues {
  ID: number;
  fieldID: number;
  value: string;
  label?: string | null;
}

/**
 * Exposes the same fields as KycFieldValues,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface KycFieldValuesWithDefaults {
  ID?: number;
  fieldID: number;
  value: string;
  label?: string | null;
}
/**
 * Exposes all fields present in kyc_fields as a typescript
 * interface.
 */
export interface KycFields {
  ID: number;
  pageID: number;
  name: string;
  label?: string | null;
  placeholder?: string | null;
  description?: string | null;
  error?: string | null;
  /**  Defaults to: 0. */
  required: number;
  type: string;
}

/**
 * Exposes the same fields as KycFields,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface KycFieldsWithDefaults {
  ID?: number;
  pageID: number;
  name: string;
  label?: string | null;
  placeholder?: string | null;
  description?: string | null;
  error?: string | null;
  /**  Defaults to: 0. */
  required?: number;
  type: string;
}
/**
 * Exposes all fields present in kyc_pages as a typescript
 * interface.
 */
export interface KycPages {
  ID: number;
  name: string;
  title: string;
  pageID?: number | null;
  icon?: string | null;
}

/**
 * Exposes the same fields as KycPages,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface KycPagesWithDefaults {
  ID?: number;
  name: string;
  title: string;
  pageID?: number | null;
  icon?: string | null;
}
/**
 * Exposes all fields present in kycfilenames as a typescript
 * interface.
 */
export interface Kycfilenames {
  id: number;
  filename?: string | null;
  filenameassigned?: string | null;
}

/**
 * Exposes the same fields as Kycfilenames,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface KycfilenamesWithDefaults {
  id?: number;
  filename?: string | null;
  filenameassigned?: string | null;
}
/**
 * Exposes all fields present in logs as a typescript
 * interface.
 */
export interface Logs {
  ID: number;
  stoid?: number | null;
  UserID?: number | null;
  LogDate?: Date | null;
  Description?: string | null;
  InvestorID?: number | null;
  ActivityType: number;
  /**  Defaults to: 0. */
  recid: number;
}

/**
 * Exposes the same fields as Logs,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface LogsWithDefaults {
  ID?: number;
  stoid?: number | null;
  UserID?: number | null;
  LogDate?: Date | null;
  Description?: string | null;
  InvestorID?: number | null;
  ActivityType: number;
  /**  Defaults to: 0. */
  recid?: number;
}
/**
 * Exposes all fields present in migrations as a typescript
 * interface.
 */
export interface Migrations {
  id: number;
  name: string;
  run_on: Date;
}

/**
 * Exposes the same fields as Migrations,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface MigrationsWithDefaults {
  id?: number;
  name: string;
  run_on: Date;
}
/**
 * Exposes all fields present in params as a typescript
 * interface.
 */
export interface Params {
  ID: number;
  param?: string | null;
  isglobal?: number | null;
  datatype?: number | null;
  stringValue?: string | null;
  intValue?: number | null;
}

/**
 * Exposes the same fields as Params,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ParamsWithDefaults {
  ID?: number;
  param?: string | null;
  isglobal?: number | null;
  datatype?: number | null;
  stringValue?: string | null;
  intValue?: number | null;
}
/**
 * Exposes all fields present in paymentchannels as a typescript
 * interface.
 */
export interface Paymentchannels {
  ID: number;
  stoid?: number | null;
  paymentType?: number | null;
  title?: string | null;
  paymentDetails?: string | null;
  currencyID?: number | null;
  /**  Defaults to: 1. */
  isActive?: number | null;
  /**  Defaults to: 0. */
  conversionEnabled?: number | null;
  /**  Defaults to: 0. */
  currencyToConvert?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  conversionRate?: number | null;
  /**  Defaults to: 0. */
  canWithdrawFunds?: number | null;
  /**  Defaults to: 0. */
  sendInstructionalDepositEmail?: number | null;
  depositInstructionText?: string | null;
  depositInstructionEmailHeader?: string | null;
}

/**
 * Exposes the same fields as Paymentchannels,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface PaymentchannelsWithDefaults {
  ID?: number;
  stoid?: number | null;
  paymentType?: number | null;
  title?: string | null;
  paymentDetails?: string | null;
  currencyID?: number | null;
  /**  Defaults to: 1. */
  isActive?: number | null;
  /**  Defaults to: 0. */
  conversionEnabled?: number | null;
  /**  Defaults to: 0. */
  currencyToConvert?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  conversionRate?: number | null;
  /**  Defaults to: 0. */
  canWithdrawFunds?: number | null;
  /**  Defaults to: 0. */
  sendInstructionalDepositEmail?: number | null;
  depositInstructionText?: string | null;
  depositInstructionEmailHeader?: string | null;
}
/**
 * Exposes all fields present in paymentinvestors as a typescript
 * interface.
 */
export interface Paymentinvestors {
  ID: number;
  stoid?: number | null;
  Investorid?: number | null;
  paymentChannelID?: number | null;
  paymentChannelDetails?: string | null;
  userid?: number | null;
  Details?: string | null;
  currencyIDRequested?: number | null;
  paymentRequested?: number | null;
  currencyIDReceived?: number | null;
  paymentReceived?: number | null;
  PaymentSendDate?: Date | null;
  PaymentReceiveDate?: Date | null;
  isSettled?: number | null;
  SettlementNotes?: string | null;
  InternalNotes?: string | null;
  InvestorComments?: string | null;
  /**  Defaults to: 0. */
  sharesOffered?: number | null;
  /**  Defaults to: 0. */
  sharesTypeOffered?: number | null;
}

/**
 * Exposes the same fields as Paymentinvestors,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface PaymentinvestorsWithDefaults {
  ID?: number;
  stoid?: number | null;
  Investorid?: number | null;
  paymentChannelID?: number | null;
  paymentChannelDetails?: string | null;
  userid?: number | null;
  Details?: string | null;
  currencyIDRequested?: number | null;
  paymentRequested?: number | null;
  currencyIDReceived?: number | null;
  paymentReceived?: number | null;
  PaymentSendDate?: Date | null;
  PaymentReceiveDate?: Date | null;
  isSettled?: number | null;
  SettlementNotes?: string | null;
  InternalNotes?: string | null;
  InvestorComments?: string | null;
  /**  Defaults to: 0. */
  sharesOffered?: number | null;
  /**  Defaults to: 0. */
  sharesTypeOffered?: number | null;
}
/**
 * Exposes all fields present in PropertyFiles as a typescript
 * interface.
 */
export interface PropertyFiles {
  ID: number;
  stoid?: number | null;
  Type?: number | null;
  Details?: string | null;
  Title?: string | null;
  Link?: string | null;
}

/**
 * Exposes the same fields as PropertyFiles,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface PropertyFilesWithDefaults {
  ID?: number;
  stoid?: number | null;
  Type?: number | null;
  Details?: string | null;
  Title?: string | null;
  Link?: string | null;
}
/**
 * Exposes all fields present in publicpollsdata as a typescript
 * interface.
 */
export interface Publicpollsdata {
  ID: number;
  stoid?: number | null;
  votingid?: number | null;
  email?: string | null;
  /**  Defaults to: 0. */
  optionid?: number | null;
}

/**
 * Exposes the same fields as Publicpollsdata,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface PublicpollsdataWithDefaults {
  ID?: number;
  stoid?: number | null;
  votingid?: number | null;
  email?: string | null;
  /**  Defaults to: 0. */
  optionid?: number | null;
}
/**
 * Exposes all fields present in RavenAssetDeployment as a typescript
 * interface.
 */
export interface RavenAssetDeployment {
  ID: number;
  stoid?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  premimum?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  nominal?: number | null;
  title?: string | null;
  mainAsset?: string | null;
  PublicKey?: string | null;
  mainAssetTransactionID?: string | null;
  qualifierName?: string | null;
  qualifierNameTransactionID?: string | null;
  isQualifierNameTrnasactionDone?: number | null;
  qualifierAssignTransactionID?: string | null;
  qualifierAssignTransactionIDDone?: number | null;
  createRestrictedAssetTransactionID?: string | null;
  isAssetDeployed?: number | null;
  isMainAssetTransactionSend?: number | null;
  isMainAssetTransactionDone?: number | null;
  isQualifierNameTrnasactionSend?: number | null;
  qualifierAssignTransactionIDSend?: number | null;
  createRestrictedAssetTransactionIDSend?: number | null;
  unitDecimals?: number | null;
  ipfsDocumentHash?: string | null;
}

/**
 * Exposes the same fields as RavenAssetDeployment,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RavenAssetDeploymentWithDefaults {
  ID?: number;
  stoid?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  premimum?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  nominal?: number | null;
  title?: string | null;
  mainAsset?: string | null;
  PublicKey?: string | null;
  mainAssetTransactionID?: string | null;
  qualifierName?: string | null;
  qualifierNameTransactionID?: string | null;
  isQualifierNameTrnasactionDone?: number | null;
  qualifierAssignTransactionID?: string | null;
  qualifierAssignTransactionIDDone?: number | null;
  createRestrictedAssetTransactionID?: string | null;
  isAssetDeployed?: number | null;
  isMainAssetTransactionSend?: number | null;
  isMainAssetTransactionDone?: number | null;
  isQualifierNameTrnasactionSend?: number | null;
  qualifierAssignTransactionIDSend?: number | null;
  createRestrictedAssetTransactionIDSend?: number | null;
  unitDecimals?: number | null;
  ipfsDocumentHash?: string | null;
}
/**
 * Exposes all fields present in register as a typescript
 * interface.
 */
export interface Register {
  ID: number;
  stoid?: number | null;
  FirstName?: string | null;
  LastName?: string | null;
  Email: string;
  Password: string;
  secret?: string | null;
  /**  Defaults to: 0. */
  investorType?: number | null;
  CompanyName?: string | null;
  dateregister?: Date | null;
  /**  Defaults to: 0. */
  referByInvestorID?: number | null;
}

/**
 * Exposes the same fields as Register,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RegisterWithDefaults {
  ID?: number;
  stoid?: number | null;
  FirstName?: string | null;
  LastName?: string | null;
  Email: string;
  Password: string;
  secret?: string | null;
  /**  Defaults to: 0. */
  investorType?: number | null;
  CompanyName?: string | null;
  dateregister?: Date | null;
  /**  Defaults to: 0. */
  referByInvestorID?: number | null;
}
/**
 * Exposes all fields present in rights as a typescript
 * interface.
 */
export interface Rights {
  ID: number;
  RightName?: string | null;
  typeadminorsto: number;
}

/**
 * Exposes the same fields as Rights,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RightsWithDefaults {
  ID: number;
  RightName?: string | null;
  typeadminorsto: number;
}
/**
 * Exposes all fields present in roles as a typescript
 * interface.
 */
export interface Roles {
  ID: number;
  Role?: string | null;
}

/**
 * Exposes the same fields as Roles,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RolesWithDefaults {
  ID: number;
  Role?: string | null;
}
/**
 * Exposes all fields present in rolesrights as a typescript
 * interface.
 */
export interface Rolesrights {
  ID: number;
  RoleID: number;
  RightID: number;
}

/**
 * Exposes the same fields as Rolesrights,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RolesrightsWithDefaults {
  ID?: number;
  RoleID: number;
  RightID: number;
}
/**
 * Exposes all fields present in rolesrightssto as a typescript
 * interface.
 */
export interface Rolesrightssto {
  ID: number;
  RoleID: number;
  RightID: number;
}

/**
 * Exposes the same fields as Rolesrightssto,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RolesrightsstoWithDefaults {
  ID?: number;
  RoleID: number;
  RightID: number;
}
/**
 * Exposes all fields present in rolessto as a typescript
 * interface.
 */
export interface Rolessto {
  ID: number;
  /**  Defaults to: 0. */
  stoid?: number | null;
  Role?: string | null;
}

/**
 * Exposes the same fields as Rolessto,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RolesstoWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  stoid?: number | null;
  Role?: string | null;
}
/**
 * Exposes all fields present in sharePurchaseDocuments as a typescript
 * interface.
 */
export interface SharePurchaseDocuments {
  ID: number;
  /**  Defaults to: 0. */
  requireOnce: number;
}

/**
 * Exposes the same fields as SharePurchaseDocuments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface SharePurchaseDocumentsWithDefaults {
  ID: number;
  /**  Defaults to: 0. */
  requireOnce?: number;
}
/**
 * Exposes all fields present in shares as a typescript
 * interface.
 */
export interface Shares {
  ID: number;
  /**  Defaults to: 0. */
  stoid?: number | null;
  shareTypeid: number;
  /**  Defaults to: []. */
  PublicKey?: string | null;
  /**  Defaults to: 0. */
  isBlockchainFrozen: number;
  /**  Defaults to: 0. */
  isBlockchainAuthorized: number;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  investorID: number;
  sharesHistoryID: number;
}

/**
 * Exposes the same fields as Shares,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface SharesWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  stoid?: number | null;
  shareTypeid: number;
  /**  Defaults to: []. */
  PublicKey?: string | null;
  /**  Defaults to: 0. */
  isBlockchainFrozen?: number;
  /**  Defaults to: 0. */
  isBlockchainAuthorized?: number;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  investorID: number;
  sharesHistoryID: number;
}
/**
 * Exposes all fields present in shareshistory as a typescript
 * interface.
 */
export interface Shareshistory {
  ID: number;
  sharesid: number;
  /**  Defaults to: 0. */
  isActive: number;
  investorID: number;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  shareTypeid: number;
  CertificateSerials?: string | null;
  ShareSerials?: string | null;
  purchaserID: number;
  datePurchase: Date;
}

/**
 * Exposes the same fields as Shareshistory,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ShareshistoryWithDefaults {
  ID?: number;
  sharesid: number;
  /**  Defaults to: 0. */
  isActive?: number;
  investorID: number;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  shareTypeid: number;
  CertificateSerials?: string | null;
  ShareSerials?: string | null;
  purchaserID: number;
  datePurchase: Date;
}
/**
 * Exposes all fields present in shareswallet as a typescript
 * interface.
 */
export interface Shareswallet {
  ID: number;
  /**  Defaults to: 0. */
  investorID?: number | null;
  /**  Defaults to: 0. */
  sharesID?: number | null;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  publicKey?: string | null;
  /**  Defaults to: 0. */
  isBlocked?: number | null;
}

/**
 * Exposes the same fields as Shareswallet,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ShareswalletWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  investorID?: number | null;
  /**  Defaults to: 0. */
  sharesID?: number | null;
  /**  Defaults to: 0.000. */
  shares?: number | null;
  publicKey?: string | null;
  /**  Defaults to: 0. */
  isBlocked?: number | null;
}
/**
 * Exposes all fields present in sharetypes as a typescript
 * interface.
 */
export interface Sharetypes {
  ID: number;
  title: string;
  stoid: number;
  /**  Defaults to: 0.000. */
  totalShares?: number | null;
  /**  Defaults to: 0.000. */
  companyShares?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  nominalValue?: number | null;
  /**  Defaults to: 0. */
  isNominalValueApplicable: number;
  /**  Defaults to: 0. */
  isVotingRightsApplicable: number;
  /**  Defaults to: 0. */
  isDividendRightsApplicable: number;
  /**  Defaults to: 0. */
  isblockchain: number;
  ethereumContractAddress: string;
  ethereumWhitelistAddress: string;
  /**  Defaults to: 0.0000000000000000. */
  premimum?: number | null;
  currencyid: number;
  /**  Defaults to: 1. */
  needauthorization: number;
  token_abi?: string | null;
  whitelist_abi?: string | null;
  ethereumBlockchainPublicAddress?: string | null;
  /**  Defaults to: default. */
  subscriptionform?: string | null;
  /**  Defaults to: 0.0000. */
  minimumSharesToBuyByInvestor?: number | null;
  /**  Defaults to: 0. */
  blockchainProtocol?: number | null;
  /**  Defaults to: 0. */
  blockchainBuyOrdersAllowed?: number | null;
  /**  Defaults to: 0.000. */
  reduceSharesForPurchase?: number | null;
  /**  Defaults to: 1. */
  isEnabled?: number | null;
  /**  Defaults to: 0. */
  walletCustodayType?: number | null;
  tanganyWalletID?: string | null;
  /**  Defaults to: 0. */
  investorCanPurchaseDirectly?: number | null;
  AssetName?: string | null;
  AssetTag?: string | null;
  /**  Defaults to: 1.00. */
  votingPower: number;
  /**  Defaults to: 1. */
  isMeetingRightsApplicable?: number | null;
  /**  Defaults to: 1. */
  isInvestorTradable?: number | null;
  /**  Defaults to: 18. */
  blockchainDecimals?: number | null;
  ipfsDocumentHash?: string | null;
  sellToCompany?: number | null;
  /**  Defaults to: 1. */
  sellValue?: number | null;
  isShareNosApplicable?: number | null;
  /**  Defaults to: 0. */
  isCertificateNosApplicable?: number | null;
  /**  Defaults to: 0. */
}

/**
 * Exposes the same fields as Sharetypes,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface SharetypesWithDefaults {
  ID?: number;
  title: string;
  stoid: number;
  /**  Defaults to: 0.000. */
  totalShares?: number | null;
  /**  Defaults to: 0.000. */
  companyShares?: number | null;
  /**  Defaults to: 0.0000000000000000. */
  nominalValue?: number | null;
  /**  Defaults to: 0. */
  isNominalValueApplicable?: number;
  /**  Defaults to: 0. */
  isVotingRightsApplicable?: number;
  /**  Defaults to: 0. */
  isDividendRightsApplicable?: number;
  /**  Defaults to: 0. */
  isblockchain?: number;
  ethereumContractAddress: string;
  ethereumWhitelistAddress: string;
  /**  Defaults to: 0.0000000000000000. */
  premimum?: number | null;
  currencyid: number;
  /**  Defaults to: 1. */
  needauthorization?: number;
  token_abi?: string | null;
  whitelist_abi?: string | null;
  ethereumBlockchainPublicAddress?: string | null;
  /**  Defaults to: default. */
  subscriptionform?: string | null;
  /**  Defaults to: 0.0000. */
  minimumSharesToBuyByInvestor?: number | null;
  /**  Defaults to: 0. */
  blockchainProtocol?: number | null;
  /**  Defaults to: 0. */
  blockchainBuyOrdersAllowed?: number | null;
  /**  Defaults to: 0.000. */
  reduceSharesForPurchase?: number | null;
  /**  Defaults to: 1. */
  isEnabled?: number | null;
  /**  Defaults to: 0. */
  walletCustodayType?: number | null;
  tanganyWalletID?: string | null;
  /**  Defaults to: 0. */
  investorCanPurchaseDirectly?: number | null;
  AssetName?: string | null;
  AssetTag?: string | null;
  /**  Defaults to: 1.00. */
  votingPower?: number;
  /**  Defaults to: 1. */
  isMeetingRightsApplicable?: number | null;
  /**  Defaults to: 1. */
  isInvestorTradable?: number | null;
  /**  Defaults to: 18. */
  blockchainDecimals?: number | null;
  ipfsDocumentHash?: string | null;
}
/**
 * Exposes all fields present in sharetypesdocuments as a typescript
 * interface.
 */
export interface Sharetypesdocuments {
  id: number;
  sharetypesid: number;
  documentid: number;
}

/**
 * Exposes the same fields as Sharetypesdocuments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface SharetypesdocumentsWithDefaults {
  id?: number;
  sharetypesid: number;
  documentid: number;
}
/**
 * Exposes all fields present in stocontracts as a typescript
 * interface.
 */
export interface Stocontracts {
  ID: number;
  stoid: number;
  title: string;
  contents: string;
}

/**
 * Exposes the same fields as Stocontracts,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface StocontractsWithDefaults {
  ID?: number;
  stoid: number;
  title: string;
  contents: string;
}
/**
 * Exposes all fields present in stoinvestortype as a typescript
 * interface.
 */
export interface Stoinvestortype {
  id: number;
  type: string;
}

/**
 * Exposes the same fields as Stoinvestortype,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface StoinvestortypeWithDefaults {
  id: number;
  type: string;
}
/**
 * Exposes all fields present in stopublic as a typescript
 * interface.
 */
export interface Stopublic {
  ID: number;
  stoid: number;
  title: string;
  contents?: string | null;
  type: number;
  /**  Defaults to: 0. */
  order: number;
  /**  Defaults to: 1. */
  isActive?: number | null;
}

/**
 * Exposes the same fields as Stopublic,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface StopublicWithDefaults {
  ID?: number;
  stoid: number;
  title: string;
  contents?: string | null;
  type: number;
  /**  Defaults to: 0. */
  order?: number;
  /**  Defaults to: 1. */
  isActive?: number | null;
}
/**
 * Exposes all fields present in stos as a typescript
 * interface.
 */
export interface Stos {
  ID: number;
  title: string;
  details: string;
  /**  Defaults to: 1. */
  isActive?: number | null;
  logo: string;
  ethereumContractAddress: string;
  ethereumWhitelistAddress: string;
  disclamer?: string | null;
  stolink?: string | null;
  stolinkfull?: string | null;
  /**  Defaults to: 0. */
  stoType?: number | null;
  stoinvestortypes?: string | null;
  emailFooter?: string | null;
  steps?: string | null;
  registrationtext?: string | null;
  SMTP_Host?: string | null;
  SMTP_Port?: string | null;
  SMTP_User?: string | null;
  SMTP_Password?: string | null;
  SMTP_FromAddress?: string | null;
  website?: string | null;
  stoinvestortypesnotonshareregister?: string | null;
  /**  Defaults to: 0. */
  companytype: number;
  settings?: string | null;
  registrationsuccesstext?: string | null;
  tellafriendtext?: string | null;
  inviteFriendEmailText?: string | null;
  PropertyFullDetails?: string | null;
  /**  Defaults to: 2030-01-01. */
  exchangeOpenDate?: Date | null;
  propertypicture?: string | null;
  docusign_sto_contract?: string | null;
  docusign_sto_purchase?: string | null;
  /**  Defaults to: 0. */
  externalSystemID?: number | null;
  projectAddress?: string | null;
  LegalDetails?: string | null;
  affiliatePlanId?: number | null;
  affiliateShareTypeId?: number | null;
  /**  Defaults to: 0. */
  isICOShareTypeCompany?: number | null;
  EmailTxtInvestorBulkUpload?: string | null;
  /**  Defaults to: 1. */
  isBuyButtonEnabled?: number | null;
  isBimountEnabled?: number | null;
  /**  Defaults to: 0. */
  projectCost?: number | null;
  VerifyInvestorComHostToken?: string | null;
}

/**
 * Exposes the same fields as Stos,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface StosWithDefaults {
  ID: number;
  title: string;
  details: string;
  /**  Defaults to: 1. */
  isActive?: number | null;
  logo: string;
  ethereumContractAddress: string;
  ethereumWhitelistAddress: string;
  disclamer?: string | null;
  stolink?: string | null;
  stolinkfull?: string | null;
  /**  Defaults to: 0. */
  stoType?: number | null;
  stoinvestortypes?: string | null;
  emailFooter?: string | null;
  steps?: string | null;
  registrationtext?: string | null;
  SMTP_Host?: string | null;
  SMTP_Port?: string | null;
  SMTP_User?: string | null;
  SMTP_Password?: string | null;
  SMTP_FromAddress?: string | null;
  website?: string | null;
  stoinvestortypesnotonshareregister?: string | null;
  /**  Defaults to: 0. */
  companytype?: number;
  settings?: string | null;
  registrationsuccesstext?: string | null;
  tellafriendtext?: string | null;
  inviteFriendEmailText?: string | null;
  PropertyFullDetails?: string | null;
  /**  Defaults to: 2030-01-01. */
  exchangeOpenDate?: Date | null;
  propertypicture?: string | null;
  docusign_sto_contract?: string | null;
  docusign_sto_purchase?: string | null;
  /**  Defaults to: 0. */
  externalSystemID?: number | null;
  projectAddress?: string | null;
  LegalDetails?: string | null;
  affiliatePlanId?: number | null;
  affiliateShareTypeId?: number | null;
  /**  Defaults to: 0. */
  isICOShareTypeCompany?: number | null;
  EmailTxtInvestorBulkUpload?: string | null;
  /**  Defaults to: 1. */
  isBuyButtonEnabled?: number | null;
  isBimountEnabled?: number | null;
  /**  Defaults to: 0. */
  projectCost?: number | null;
  VerifyInvestorComHostToken?: string | null;
}
/**
 * Exposes all fields present in stosMetaKeys as a typescript
 * interface.
 */
export interface StosMetaKeys {
  key: string;
  order?: number | null;
  type?: string | null;
}

/**
 * Exposes the same fields as StosMetaKeys,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface StosMetaKeysWithDefaults {
  key: string;
  order?: number | null;
  type?: string | null;
}
/**
 * Exposes all fields present in stosMetaValues as a typescript
 * interface.
 */
export interface StosMetaValues {
  stoID: number;
  key: string;
  value: string;
}

/**
 * Exposes the same fields as StosMetaValues,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface StosMetaValuesWithDefaults {
  stoID: number;
  key: string;
  value: string;
}
/**
 * Exposes all fields present in submittedSharePurchaseDocuments as a typescript
 * interface.
 */
export interface SubmittedSharePurchaseDocuments {
  sharePurchaseRequestID: number;
  submittedDocumentID: number;
}

/**
 * Exposes the same fields as SubmittedSharePurchaseDocuments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface SubmittedSharePurchaseDocumentsWithDefaults {
  sharePurchaseRequestID: number;
  submittedDocumentID: number;
}
/**
 * Exposes all fields present in swaptokens as a typescript
 * interface.
 */
export interface Swaptokens {
  id: number;
  address?: string | null;
  name?: string | null;
  symbol?: string | null;
}

/**
 * Exposes the same fields as Swaptokens,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface SwaptokensWithDefaults {
  id?: number;
  address?: string | null;
  name?: string | null;
  symbol?: string | null;
}
/**
 * Exposes all fields present in test as a typescript
 * interface.
 */
export interface Test {
  id: number;
  fromDate?: Date | null;
}

/**
 * Exposes the same fields as Test,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface TestWithDefaults {
  id?: number;
  fromDate?: Date | null;
}
/**
 * Exposes all fields present in timezone as a typescript
 * interface.
 */
export interface Timezone {
  ID: number;
  title?: string | null;
  timezone?: string | null;
  timepadding?: number | null;
}

/**
 * Exposes the same fields as Timezone,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface TimezoneWithDefaults {
  ID: number;
  title?: string | null;
  timezone?: string | null;
  timepadding?: number | null;
}
/**
 * Exposes all fields present in tokencreationrequests as a typescript
 * interface.
 */
export interface Tokencreationrequests {
  ID: number;
  stoid?: number | null;
  tokens?: number | null;
  sharetypeid?: number | null;
  createdbyuserid?: number | null;
  dattime?: Date | null;
  description?: string | null;
}

/**
 * Exposes the same fields as Tokencreationrequests,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface TokencreationrequestsWithDefaults {
  ID?: number;
  stoid?: number | null;
  tokens?: number | null;
  sharetypeid?: number | null;
  createdbyuserid?: number | null;
  dattime?: Date | null;
  description?: string | null;
}
/**
 * Exposes all fields present in translations as a typescript
 * interface.
 */
export interface Translations {
  ID: number;
  key: string;
  locale: string;
  translation: string;
}

/**
 * Exposes the same fields as Translations,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface TranslationsWithDefaults {
  ID?: number;
  key: string;
  locale: string;
  translation: string;
}
/**
 * Exposes all fields present in updates as a typescript
 * interface.
 */
export interface Updates {
  ID: number;
  stoid?: number | null;
  TITLE?: string | null;
  details?: string | null;
  UpdateDate?: Date | null;
}

/**
 * Exposes the same fields as Updates,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface UpdatesWithDefaults {
  ID?: number;
  stoid?: number | null;
  TITLE?: string | null;
  details?: string | null;
  UpdateDate?: Date | null;
}
/**
 * Exposes all fields present in userroles as a typescript
 * interface.
 */
export interface Userroles {
  ID: number;
  RoleID: number;
  UserID: number;
}

/**
 * Exposes the same fields as Userroles,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface UserrolesWithDefaults {
  ID?: number;
  RoleID: number;
  UserID: number;
}
/**
 * Exposes all fields present in users as a typescript
 * interface.
 */
export interface Users {
  ID: number;
  /**  Defaults to: 0. */
  stoid?: number | null;
  FirstName?: string | null;
  LastName: string;
  /**  Defaults to: 0. */
  isActive: number;
  Username: string;
  Password: string;
  /**  Defaults to: 0. */
  twofactorenable?: number | null;
  email?: string | null;
  /**  Defaults to: 0. */
  isPlatformAdminLogin?: number | null;
}

/**
 * Exposes the same fields as Users,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface UsersWithDefaults {
  ID?: number;
  /**  Defaults to: 0. */
  stoid?: number | null;
  FirstName?: string | null;
  LastName: string;
  /**  Defaults to: 0. */
  isActive?: number;
  Username: string;
  Password: string;
  /**  Defaults to: 0. */
  twofactorenable?: number | null;
  email?: string | null;
  /**  Defaults to: 0. */
  isPlatformAdminLogin?: number | null;
}
/**
 * Exposes all fields present in userssto as a typescript
 * interface.
 */
export interface Userssto {
  id: number;
  userid: number;
  stoid: number;
  roleid: number;
}

/**
 * Exposes the same fields as Userssto,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface UsersstoWithDefaults {
  id?: number;
  userid: number;
  stoid: number;
  roleid: number;
}
/**
 * Exposes all fields present in voting as a typescript
 * interface.
 */
export interface Voting {
  id: number;
  stoid: number;
  title: string;
  contents: string;
  type: number;
  nameResponsiblePerson?: string | null;
  phoneResponsiblePerson?: string | null;
  emailResponsiblePerson?: string | null;
  nameProxyPerson?: string | null;
  phoneProxyPerson?: string | null;
  emailProxyPerson?: string | null;
  place?: string | null;
  opendate?: Date | null;
  closedate?: Date | null;
  secretaccesscode?: string | null;
  /**  Defaults to: 0. */
  votetype: number;
  /**  Defaults to: 0. */
  isMeetingFinalResultsCalculated: number;
  /**  Defaults to: 0. */
  timezoneid: number;
  /**  Defaults to: 0. */
  timepadding: number;
  /**  Defaults to: 0. */
  totalInvestors: number;
  /**  Defaults to: 0. */
  totalShares: number;
  /**  Defaults to: 0. */
  totalNominalShares: number;
  /**  Defaults to: 1. */
  isVotingOpenForProxy?: number | null;
}

/**
 * Exposes the same fields as Voting,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface VotingWithDefaults {
  id?: number;
  stoid: number;
  title: string;
  contents: string;
  type: number;
  nameResponsiblePerson?: string | null;
  phoneResponsiblePerson?: string | null;
  emailResponsiblePerson?: string | null;
  nameProxyPerson?: string | null;
  phoneProxyPerson?: string | null;
  emailProxyPerson?: string | null;
  place?: string | null;
  opendate?: Date | null;
  closedate?: Date | null;
  secretaccesscode?: string | null;
  /**  Defaults to: 0. */
  votetype?: number;
  /**  Defaults to: 0. */
  isMeetingFinalResultsCalculated?: number;
  /**  Defaults to: 0. */
  timezoneid?: number;
  /**  Defaults to: 0. */
  timepadding?: number;
  /**  Defaults to: 0. */
  totalInvestors?: number;
  /**  Defaults to: 0. */
  totalShares?: number;
  /**  Defaults to: 0. */
  totalNominalShares?: number;
  /**  Defaults to: 1. */
  isVotingOpenForProxy?: number | null;
}
/**
 * Exposes all fields present in votingdocuments as a typescript
 * interface.
 */
export interface Votingdocuments {
  ID: number;
  votingid?: number | null;
  votingoptionid?: number | null;
  documentlink?: string | null;
  title?: string | null;
  description?: string | null;
}

/**
 * Exposes the same fields as Votingdocuments,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface VotingdocumentsWithDefaults {
  ID?: number;
  votingid?: number | null;
  votingoptionid?: number | null;
  documentlink?: string | null;
  title?: string | null;
  description?: string | null;
}
/**
 * Exposes all fields present in votingoptions as a typescript
 * interface.
 */
export interface Votingoptions {
  id: number;
  votingid: number;
  optiontxt: string;
  description?: string | null;
  CompanyComments: string;
  /**  Defaults to: 0. */
  isActiveByAdmin: number;
  /**  Defaults to: 0. */
  isItemCurrentlyDiscussing: number;
}

/**
 * Exposes the same fields as Votingoptions,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface VotingoptionsWithDefaults {
  id?: number;
  votingid: number;
  optiontxt: string;
  description?: string | null;
  CompanyComments: string;
  /**  Defaults to: 0. */
  isActiveByAdmin?: number;
  /**  Defaults to: 0. */
  isItemCurrentlyDiscussing?: number;
}
/**
 * Exposes all fields present in votinguser as a typescript
 * interface.
 */
export interface Votinguser {
  id: number;
  votingid: number;
  userid: number;
  votingoptionsid: number;
  votingoptionsvalue: number;
  votesContributed: number;
  /**  Defaults to: 0. */
  isCastedByInvestor: number;
  investmentContributed: number;
  /**  Defaults to: 0. */
  nominalInvestmentContributed: number;
}

/**
 * Exposes the same fields as Votinguser,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface VotinguserWithDefaults {
  id?: number;
  votingid: number;
  userid: number;
  votingoptionsid: number;
  votingoptionsvalue: number;
  votesContributed: number;
  /**  Defaults to: 0. */
  isCastedByInvestor?: number;
  investmentContributed: number;
  /**  Defaults to: 0. */
  nominalInvestmentContributed?: number;
}
/**
 * Exposes all fields present in votinguserdata as a typescript
 * interface.
 */
export interface Votinguserdata {
  ID: number;
  investorID: number;
  votingid?: number | null;
  attendMeeting?: number | null;
  unannounceDecision: number;
}

/**
 * Exposes the same fields as Votinguserdata,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface VotinguserdataWithDefaults {
  ID?: number;
  investorID: number;
  votingid?: number | null;
  attendMeeting?: number | null;
  unannounceDecision: number;
}
