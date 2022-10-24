import { Currency } from "../../../Schema";

export interface ShareCapShares {
  title: string;
  isBlockchain: number;
  isVotingRightsApplicalbe: number;
  isDividendRightsApplicable: number;
  votingPowerMultiplier: number;
  currencyID: number;
  currencyMetadata: Currency;
  nominalValue?: number;
  premiumValue?: number;
  quantity: number;
  investment: number;
  votingPower: number;
  votingPowerPercent: number;
  dividend?: number;
  dividendPercent?: number;
}

export interface ShareCapInvestor {
  ID: number;
  name: string;
  shareTypes: ShareCapShares[];
  totalQuantity: number;
  totalInvestment: number;
  totalVotingPower: number;
  totalVotingPowerPercent: number;
  totalDividends?: number;
  totalDividendPercent?: number;
}

export interface ShareCapTable {
  updatedAt: Date;
  stoID: number;
  global: boolean;
  sharesTotal: number;
  sharesDistributed: number;
  sharesDistributedPercent: number;
  sharesCompany: number;
  sharesCompanyPercent: number;
  sharesAvailable: number;
  sharesAvailablePercent: number;
  sharesCustodian: number;
  sharesCustodianPercent: number;
  totalVotingPower: number;
  totalInvestorInvestment: number;
  totalInvestorVotingPower: number;
  totalInvestorVotingPowerPercent: number;
  investors: ShareCapInvestor[];
  totalInvestorDividends?: number;
}

export enum ShareCapGhostInvestors {
  HIDE,
  DISPLAY,
  CLEANUP,
  HIDE_BUT_SUM,
}

export enum ShareCapParams {
  GHOST_INVESTOR = "shareCapGhostInvestorBehavior",
}

export interface ShareCapSettings {
  ghostInvestorBehavior?: ShareCapGhostInvestors;
}

export interface IShareCapTableService {
  /** Get the sharecap table */
  getShareCapTable(): Promise<ShareCapTable>;
  /** Update the sharecap table and return it. */
  updateShareCapTable(): Promise<ShareCapTable>;
  getPlatformSettings(): Promise<ShareCapSettings>;
  setPlatformSettings(settings: ShareCapSettings): Promise<void>;
}
