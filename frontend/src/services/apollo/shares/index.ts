import { InvestorSharesQuery, GetInvestorShareQuery, GetSharesWalletsQuery } from '../graphql';

export type InvestorShares = InvestorSharesQuery['investorShares'][0];
export type InvestorShareType = InvestorShares['shareType'];
export type InvestorShareTypeCurrency = InvestorShareType['currency'];

export type InvestorShareShareType = NonNullable<GetInvestorShareQuery['investorShare']>['shareType'];

export type InvestorShareWallet = GetSharesWalletsQuery['getSharesWallets'][0];
