import * as math from "mathjs";
import {
  IShareCapTableService,
  ShareCapGhostInvestors,
  ShareCapInvestor,
  ShareCapParams,
  ShareCapSettings,
  ShareCapShares,
  ShareCapTable,
} from "./sharecap-table.types";
import Caches, { ShareCapCacheService } from "./cache";
import SqlSvcs from "./data/sharecap-sql.service";
import AbstractSqlService from "../../generic/AbstractSqlService";
import { Currency, Investor, Shares, Sharetypes } from "../../../Schema";
import IParamsService from "../../platform/environmentParams/data/IParamsService";

export class ShareCapTableService implements IShareCapTableService {
  protected Caches: ShareCapCacheService;

  protected Investors: AbstractSqlService;

  protected Shares: AbstractSqlService;

  protected ShareTypes: AbstractSqlService;

  protected Currencies: AbstractSqlService;

  protected Params: AbstractSqlService & IParamsService;

  protected investors: Investor[] = [];

  protected shares: Shares[] = [];

  protected currencies: Currency[] = [];

  protected settings?: ShareCapSettings;

  protected shareTypes: (Sharetypes & {
    /** For this ShareType only */
    totalStVotingPower?: number;
    /** For all ShareTypes (always the same) */
    globalVotingPower?: number;
    investorShares?: Shares[];
  })[] = [];

  protected stoID?: number;

  constructor(
    stoID?: number,
    inject?: {
      Investors?: AbstractSqlService;
      Shares?: AbstractSqlService;
      ShareTypes?: AbstractSqlService;
      Currencies?: AbstractSqlService;
      Params?: AbstractSqlService & IParamsService;
      Caches?: ShareCapCacheService;
    }
  ) {
    this.stoID = stoID;
    this.Investors = inject?.Investors ?? SqlSvcs.Investors;
    this.Shares = inject?.Shares ?? SqlSvcs.Shares;
    this.ShareTypes = inject?.ShareTypes ?? SqlSvcs.ShareTypes;
    this.Currencies = inject?.Currencies ?? SqlSvcs.Currencies;
    this.Params = inject?.Params ?? SqlSvcs.Params;
    this.Caches = inject?.Caches ?? Caches.VarCache;
  }

  /**
   * Get cached table or reload if needed.
   * @param stoID ShareCap for this STO ID. 0 means all.
   */
  async getShareCapTable(stoID?: number): Promise<ShareCapTable> {
    const cached = await this.Caches.get(stoID);
    if (cached?.cache) return cached.cache;
    // Updates cache
    return this.updateShareCapTable(stoID);
  }

  /**
   * Re-calculate table and return it.
   * @param stoID ShareCap for this STO ID. 0 means all.
   */
  async updateShareCapTable(stoID?: number): Promise<ShareCapTable> {
    const msStart = new Date().valueOf();
    this.stoID = stoID ?? this.stoID ?? 0;
    if (this.stoID === 0) {
      this.shareTypes = await this.ShareTypes.findAll();
      this.shares = await this.Shares.findAll();
    } else {
      this.shareTypes = await this.ShareTypes.findMany<Sharetypes>({
        stoid: stoID ?? this.stoID ?? 0,
      });
      this.shares = await this.Shares.findMany<Shares>({
        stoid: stoID ?? this.stoID ?? 0,
      });
    }
    this.investors = await this.Investors.findAll();
    this.currencies = await this.Currencies.findAll();

    await this._handleGhostInvestorBalances();

    const table = this._calculateShareCapTable();
    const msEnd = new Date().valueOf();
    await this.Caches.update(table);
    // Do not store cached result if it takes less than 5s to calculate
    // We only want to use caches if the operation is too heavy for the server (e.g. thousands of investors)
    if (msEnd - msStart < 5000) {
      await this.Caches.flush();
    }
    return table;
  }

  /**
   * Ghost balances are 'shares' records that point to a deleted investor ID
   * The table can handle them depending on the settings. By default, it will just hide them totally.
   */
  protected async _handleGhostInvestorBalances(): Promise<void> {
    this.settings = await this.getPlatformSettings();

    switch (this.settings?.ghostInvestorBehavior) {
      default:
      case ShareCapGhostInvestors.HIDE:
        this.shares = await this._hideGhostShareBalances();
        break;
      case ShareCapGhostInvestors.DISPLAY:
        this.investors = await this._fillGhostInvestors();
        break;
      case ShareCapGhostInvestors.CLEANUP:
        this.shares = await this._refundGhostShareBalances();
        break;
      case ShareCapGhostInvestors.HIDE_BUT_SUM:
        // It's the default code behavior and least desireable
        break;
    }
  }

  protected _getGhostBalances(): Shares[] {
    return this.shares.filter(
      (balance) =>
        !this.investors.find((investor) => investor.ID === balance.investorID)
    );
  }

  /**
   * Makes ghost balances invisible to the sharecap table,
   * but leaves them potentially visible to other modules that don't check if the investor ID exists
   */
  protected async _hideGhostShareBalances(): Promise<Shares[]> {
    const ghostBalances = this._getGhostBalances();
    return Promise.resolve(
      this.shares.filter((balance) => !ghostBalances.includes(balance))
    );
  }

  /**
   * Will look for balances with NULL investor IDs and return them to company
   */
  protected async _refundGhostShareBalances(): Promise<Shares[]> {
    const ghostBalances = this._getGhostBalances();

    // Waterfall update to eliminate concurrency problem
    ghostBalances.forEach(async (balance) => {
      const shareType = this.shareTypes.find(
        (st) => st.ID === balance.shareTypeid
      );
      if (shareType) {
        const companyShares = math.add(
          math.number(shareType.companyShares ?? 0),
          math.number(math.number(balance.shares ?? 0))
        ) as number;
        await this.ShareTypes.runSql(
          `UPDATE sharetypes SET companyShares = ? WHERE ID = ?`,
          [companyShares, shareType.ID]
        );
      }
    });
    await this.Shares.deleteByIDs(ghostBalances.map((s) => s.ID));
    return this.shares.filter((s) => !ghostBalances.includes(s));
  }

  /**
   * Will insert substitute investors in the table for saved balances related to deleted investors
   */
  protected async _fillGhostInvestors(): Promise<Investor[]> {
    const ghostInvestorIDs = this.shares
      .filter(
        (balance) =>
          !this.investors.find((investor) => investor.ID === balance.investorID)
      )
      .map((balance) => balance.investorID)
      // turn into unique set
      .filter((id, i, arr) => arr.indexOf(id) === i);

    const sample = this.investors[0];

    if (!sample) return this.investors;

    const ghostInvestors: Investor[] = ghostInvestorIDs.map((id) => ({
      ...sample,
      ID: id,
      email: `<< Deleted ${id} >>`,
      Address: `<< Deleted ${id} >>`,
      FirstName: `<< Deleted Investor ${id} >>`,
      LastName: ``,
      CompanyName: `<< Deleted Investor ${id} >>`,
    }));

    return this.investors.concat(ghostInvestors);
  }

  protected _calculateShareCapTable(): ShareCapTable {
    const sharesTotal = this._sum<Sharetypes>(this.shareTypes, "totalShares");

    const sharesCompany = this._sum<Sharetypes>(
      this.shareTypes,
      "companyShares"
    );
    const sharesCompanyPercent = this._getPercent(sharesTotal, sharesCompany);

    const sharesCustodian = this._sum<Sharetypes>(
      this.shareTypes,
      "custodianShares"
    );
    const sharesCustodianPercent = this._getPercent(
      sharesTotal,
      sharesCustodian
    );

    const sharesAvailable = this._sum<Sharetypes>(
      this.shareTypes,
      "reduceSharesForPurchase"
    );
    const sharesAvailablePercent = this._getPercent(
      sharesTotal,
      sharesAvailable
    );

    const sharesDistributed = this._sum<Shares>(this.shares, "shares");
    const sharesDistributedPercent = this._getPercent(
      sharesTotal,
      sharesDistributed
    );

    this._calculateShareTypeTotalVotingPowers();
    // const totalVotingPower = this._sum(this.shareTypes, "totalVotingPower");
    const totalVotingPower = this.shareTypes[0]?.globalVotingPower ?? 0;

    let investors: ShareCapInvestor[] = this.investors
      .map((i) => this._calculateInvestor(i))
      .filter((i) => i.totalQuantity > 0);

    const totalInvestorInvestment = this._sum<ShareCapInvestor>(
      investors,
      "totalInvestment"
    );
    const totalInvestorVotingPower = this._sum<ShareCapInvestor>(
      investors,
      "totalVotingPower"
    );
    const totalInvestorDividends = this._sum<ShareCapInvestor>(
      investors,
      "totalDividends"
    );

    investors = this._calculateInvestorPercentages(
      {
        totalVotingPower,
        totalInvestorDividends,
      },
      investors
    );

    // const totalInvestorVotingPowerPercent = this._sum<ShareCapInvestor>(
    //   investors,
    //   "totalVotingPowerPercent"
    // );
    const totalInvestorVotingPowerPercent = this._getPercent(
      totalVotingPower,
      totalInvestorVotingPower
    );

    const table: ShareCapTable = {
      updatedAt: new Date(),
      stoID: this.stoID ?? 0,
      global: !this.stoID,
      sharesTotal,
      sharesCompany,
      sharesCompanyPercent,
      sharesDistributed,
      sharesDistributedPercent,
      sharesCustodian,
      sharesCustodianPercent,
      sharesAvailable,
      sharesAvailablePercent,
      totalVotingPower,
      totalInvestorInvestment,
      totalInvestorVotingPower,
      totalInvestorVotingPowerPercent,
      totalInvestorDividends,
      investors,
    };

    return table;
  }

  // eslint-disable-next-line class-methods-use-this
  protected _sum<T>(collection: T[], field: keyof T): number {
    if (!collection.length) return 0;
    return collection.reduce(
      (total, object) =>
        math.add(
          total,
          math.number(
            (object[field] as unknown as string | number | undefined) ?? 0
          )
        ) as number,
      0
    );
  }

  /** Adds Shares[] records inside each ShareType */
  protected _sortInvestorShares(): void {
    this.shareTypes.forEach((st) => {
      // eslint-disable-next-line no-param-reassign
      st.investorShares =
        this.shares.filter((s) => s.shareTypeid === st.ID) ?? [];
    });
  }

  protected _calculateShareTypeTotalVotingPowers(): void {
    this._sortInvestorShares();

    this.shareTypes.forEach((st) => {
      // eslint-disable-next-line no-param-reassign
      st.totalStVotingPower = math.multiply(
        st.votingPower,
        // this._sum<Shares>(st.investorShares as Shares[], "shares")
        // Calculate voting power for TOTAL existing shares not investor-owned shares
        st.totalShares ?? 0
      ) as number;
    });
    const globalVotingPower = this._sum(this.shareTypes, "totalStVotingPower");
    this.shareTypes.forEach((st) => {
      // eslint-disable-next-line no-param-reassign
      st.globalVotingPower = globalVotingPower;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected _getPercent(total: number, value: number): number {
    if (total === 0) return 0;
    return math.multiply(math.divide(100, total), value);
  }

  /** Calculate one Investor's purchases in the ShareCapTable */
  // eslint-disable-next-line class-methods-use-this
  protected _calculateInvestor(investor: Investor): ShareCapInvestor {
    const result: ShareCapInvestor = {
      ID: investor.ID,
      name:
        (investor.investorType === 1 && investor.CompanyName) ||
        [investor.FirstName, investor.LastName]
          .filter((str) => !!str)
          .join(" "),
      shareTypes: [],
      totalQuantity: 0,
      totalInvestment: 0,
      totalVotingPower: 0,
      totalVotingPowerPercent: 0,
    };

    result.shareTypes = this._calculateInvestorShareTypes(investor).filter(
      (ist) => ist.quantity > 0
    );

    result.totalQuantity = this._sum<ShareCapShares>(
      result.shareTypes,
      "quantity"
    );
    result.totalInvestment = this._sum<ShareCapShares>(
      result.shareTypes,
      "investment"
    );
    result.totalVotingPower = this._sum<ShareCapShares>(
      result.shareTypes,
      "votingPower"
    );
    result.totalDividends = this._sum<ShareCapShares>(
      result.shareTypes,
      "dividend"
    );

    return result;
  }

  /**
   * Get calculations for each ShareType for an investor
   */
  protected _calculateInvestorShareTypes(investor: Investor): ShareCapShares[] {
    const investorShares = this.shares.filter(
      (s) => s.investorID === investor.ID
    );
    const isShareTypeOwned: (boolean | undefined)[] = [];
    this.shares.forEach((shares) => {
      isShareTypeOwned[shares.shareTypeid] = true;
    });
    return this.shareTypes
      .filter((st) => isShareTypeOwned[st.ID] === true)
      .map((st) => this._calculateInvestorShareType(st, investorShares));
  }

  /**
   * Calculate single ShareType table for investor, given the ShareType and investor's shares
   * @param st The ShareType record
   * @param investorShares The global Shares[] records filtered by investor ID
   */
  protected _calculateInvestorShareType(
    st: Sharetypes & { globalVotingPower?: number },
    investorShares: Shares[]
  ): ShareCapShares {
    const stShares = investorShares.filter((s) => s.shareTypeid === st.ID);
    const votingPower = math.multiply(
      this._sum<Shares>(stShares, "shares"),
      math.number(st.votingPower)
    ) as number;

    const shareType: ShareCapShares = {
      title: st.title,
      isBlockchain: st.isblockchain,
      isVotingRightsApplicalbe: st.isVotingRightsApplicable,
      isDividendRightsApplicable: st.isDividendRightsApplicable,
      votingPowerMultiplier: st.votingPower,
      currencyID: st.currencyid,
      currencyMetadata: this.currencies.find(
        (c) => c.ID === +st.currencyid
      ) as Currency,
      nominalValue: math.number(st.nominalValue) as number,
      premiumValue: math.number(st.premimum) as number,
      quantity: this._sum<Shares>(stShares, "shares"),
      investment: stShares.reduce(
        (total, s) =>
          math.add(
            total,
            math.multiply(math.number(s.shares), this._shareTypeValue(st))
          ) as number,
        1
      ),
      votingPower,
      votingPowerPercent: this._getPercent(
        st.globalVotingPower ?? 0,
        votingPower
      ),
      // No dividends available yet. Must grab them from dividends service later.
      dividend: 0,
      dividendPercent: 0,
    };

    return shareType;
  }

  // eslint-disable-next-line class-methods-use-this
  protected _shareTypeValue(st: Sharetypes): number {
    return st.premimum
      ? (math.number(st.premimum) as number)
      : (math.number(st.nominalValue) as number);
  }

  /**
   * Calculate how much % of the totals an investor owns.
   * Must have calculated all investors first.
   */
  protected _calculateInvestorPercentages(
    totals: Pick<ShareCapTable, "totalVotingPower" | "totalInvestorDividends">,
    investors: ShareCapInvestor[]
  ): ShareCapInvestor[] {
    investors.forEach((i) => {
      // eslint-disable-next-line no-param-reassign
      i.totalVotingPowerPercent = this._getPercent(
        totals.totalVotingPower,
        i.totalVotingPower
      );
      // eslint-disable-next-line no-param-reassign
      i.totalDividendPercent = this._getPercent(
        totals.totalInvestorDividends ?? 0,
        i.totalDividends ?? 0
      );
    });
    return investors;
  }

  async getPlatformSettings(): Promise<ShareCapSettings> {
    const ghostInvestorBehavior = await this.Params.findParamByNameOrUndefined(
      ShareCapParams.GHOST_INVESTOR
    );
    return {
      ghostInvestorBehavior: ghostInvestorBehavior?.intValue ?? undefined,
    };
  }
  async setPlatformSettings(settings: ShareCapSettings): Promise<void> {
    if (settings.ghostInvestorBehavior !== undefined) {
      await this.Params.upsertParams({
        param: ShareCapParams.GHOST_INVESTOR,
        datatype: 2,
        intValue: settings.ghostInvestorBehavior,
        isglobal: 1,
      });
    }
  }
}

const svc = new ShareCapTableService();
export default svc;
