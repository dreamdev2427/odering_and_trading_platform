import {
  InvestorBuyPropertyQuery,
  InvestorPortfolioQuery,
  InvestorWalletQuery,
  FindShareHistoricalValuesQuery,
  InvestorInvoiceAlertsQuery,
} from '../graphql';

export type InvestorBuyPropertyDetail = InvestorBuyPropertyQuery['investorDetailProperty'];
export type InvestorBuyPropertyBalance = NonNullable<InvestorBuyPropertyQuery['investorBalances']>[0];
export type InvestorBuyPropertyShareType = NonNullable<InvestorBuyPropertyQuery['findShareTypes']>[0];

export type InvestorPortfolioShares = InvestorPortfolioQuery['investorShares'][0];
export type InvestorPortfolioBuyAlert = NonNullable<InvestorPortfolioQuery['investorBuyAlerts']>[0];

export type InvestorWalletBalance = NonNullable<InvestorWalletQuery['investorBalances']>[0];
export type InvestorWalletChannel = NonNullable<InvestorWalletQuery['investorPaymentChannels']>[0];
export type InvestorWalletHistory = NonNullable<InvestorWalletQuery['investorDepositHistory']>[0];

export type FindShareHistory = FindShareHistoricalValuesQuery['findShareHistoricalValues'][0];
export type InvestorInvoiceAlert = NonNullable<InvestorInvoiceAlertsQuery['investorInvoiceAlerts']>[0];
