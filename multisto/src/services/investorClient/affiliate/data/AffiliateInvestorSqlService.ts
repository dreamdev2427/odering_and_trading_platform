import logger from "../../../../logger";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import AffiliateOverviewDto from "../dto/AffiliateOverviewDto";
import InvestorTreeNodeDto from "../dto/InvestorTreeNodeDto";
import InvestorReferralOverviewDto from "../dto/InvestorReferralOverviewDto";
import IAffiliateInvestorService from "./IAffiliateInvestorService";
import { findOne } from "../../../../modules/db";
import { Investor, Investorsto } from "../../../../Schema";
import AffiliateInvestmentVolumeDto from "../dto/AffiliateInvestmentVolumeDto";

export default class AffiliateInvestorSqlService
  extends AbstractSqlService
  implements IAffiliateInvestorService {
  eligibilityMin = 100; // TODO: Make eligibility minimum adjustable

  async getActiveInvestorsCount(stoId: number): Promise<number> {
    const sql = `SELECT SUM(AmountInvested) > 0 as activeInvestor FROM investments WHERE stoid = ? GROUP BY investorid`;
    const rows: { activeInvestor: number }[] = await this.runSql(sql, stoId);
    return rows.length;
  }

  async getActiveInvestorsInNetworkCount(
    network: InvestorTreeNodeDto[],
    stoId: number
  ): Promise<number> {
    const ids = network.map((node) => node.ID);
    // Want to avoid requests that are too large, also maximum SQL statement character limit is 65535
    // This splits the request in volumes of 1000 investors
    const promises = [];
    for (let i = 0; i < ids.length; i += 1000) {
      promises.push(
        this._getActiveInvestorsInNetworkCount(ids.slice(i, i + 1000), stoId)
      );
    }
    const results: number[] = await Promise.all(promises);
    return results.reduce((a, b) => a + b, 0);
  }

  /** SQL function that counts if a group of investors have made an investment above the eligibility minimum */
  async _getActiveInvestorsInNetworkCount(
    ids: number[],
    stoId: number
  ): Promise<number> {
    const idString = ids.join(",");

    const sql = `
            SELECT
                investorid,
                SUM(AmountInvested) >= ? AS active
            FROM     investments
            WHERE    stoid = ?
            AND      investorid IN (${idString})
            GROUP BY investorid
        `;
    const investors: {
      investorid: number;
      active: number;
    }[] = await this.runSql(sql, [this.eligibilityMin, stoId]);
    return investors.length;
  }

  // eslint-disable-next-line class-methods-use-this
  async getKycCurrentStatus(investorId: number): Promise<number | null> {
    const data = await findOne<Investorsto>(
      `SELECT kycCurrentStatus FROM investorsto WHERE investorid = ?`,
      [investorId]
    );
    return data?.KYCCurrentStatus || null;
  }

  /** Gets affiliate details of ONE investor */
  async getInvestorAffiliateDetails(
    investorId: number,
    stoId: number
  ): Promise<InvestorTreeNodeDto> {
    // COALESCE(SUM(investorsto.KYCCurrentStatus),0) > 0 as eligible,
    const sql = `
            SELECT DISTINCT
                investor.ID,
                investor.name,
                investor.referByInvestorID,
                "1" as eligible,
                investorsto.stoid,
                investorsto.isKYC,
                investorsto.KYCCurrentStatus,
                "-1" as "level"
            FROM (
                    SELECT
                        ID,
                        CONCAT(firstName, " ", lastName) AS name,
                        referByInvestorID
                    FROM  investor
                    WHERE investor.ID = ?
                ) investor
            LEFT JOIN (
                SELECT DISTINCT *
                FROM investorsto 
                WHERE investorid = ?
                AND stoid = ?
                LIMIT 0,1
            ) investorsto
            ON investor.ID = investorsto.investorid
        `;
    //
    // COALESCE(eligibility.eligible, 0) as eligible,
    //
    // LEFT JOIN (
    //     SELECT DISTINCT
    //         InvestorID,
    //         1 as eligible
    //     FROM investments
    //     GROUP BY InvestorID, stoid
    //     HAVING SUM(AmountInvested) >= ?
    // ) eligibility
    // ON investor.ID = eligibility.InvestorID;
    // const result = await this.runSql(sql, [investorId, investorId, this.eligibilityMin]);
    const result = await this.runSql(sql, [investorId, investorId, stoId]);
    return result ? result[0] : null;
  }

  /** Gets affiliate details of MULTIPLE investors BUT based on ONE referral ID */
  async getAffiliateDirects(
    investorId: number,
    stoId?: number
  ): Promise<InvestorTreeNodeDto[]> {
    /** Chooses STO. 0 = full referral network */
    let sqlSelectSto = ``;
    /** Gets only eligible investors if sto is not 0. Blame Genius for this absurd mess. */
    let sqlEligibility = ``; // Must go BEFORE sqlSelectSto

    if (stoId !== undefined && typeof stoId === "number") {
      sqlSelectSto = `WHERE COALESCE(investorsto.stoid, 0) = ${stoId}`;
    }

    sqlEligibility = `LEFT JOIN (
                SELECT DISTINCT
                    InvestorID,
                    1 as eligible
                FROM investments
                GROUP BY InvestorID, stoid
                HAVING SUM(AmountInvested) >= ?
            ) eligibility
            ON investor.ID = eligibility.InvestorID`;

    const sql = `
            SELECT DISTINCT
                investor.ID,
                investor.name,
                COALESCE(eligibility.eligible, 0) as eligible,
                investor.referByInvestorID,
                investorsto.stoid,
                investorsto.isKYC,
                investorsto.KYCCurrentStatus,
                "-1" as "level"
            FROM (
                    SELECT
                        ID,
                        CONCAT(firstName, " ", lastName) AS name,
                        referByInvestorID
                    FROM  investor
                    WHERE investor.referByInvestorID = ?
                ) investor
            LEFT JOIN investorsto
            ON        investor.ID = investorsto.investorid
            ${sqlEligibility}
            ${sqlSelectSto}
            ORDER BY  investor.ID
        `;
    const result = await this.runSql(sql, [investorId, this.eligibilityMin]);
    return result;
  }

  /**
   * Returns an investor's referral network as an array of levels
   */
  async getAffiliateNetworkTree(
    investorId: number,
    depth: number,
    stoId?: number
  ): Promise<InvestorTreeNodeDto[][]> {
    const levels: InvestorTreeNodeDto[][] = []; // Group investors by levels of directness in here

    // Have to get the first level in a slightly more special way, to avoid an extra db call
    const affDirects = await this.getAffiliateDirects(investorId, stoId); // Get nodes with data of directs into first level
    // eslint-disable-next-line no-param-reassign
    levels[0] = affDirects.map((investor) => ({
      ...investor,
      level: 1,
    })); // Mark directs as level 1

    for (let i = 1; i <= depth; i += 1) {
      // For each next level
      // Fill level with IDss of previous investor's directs
      const ids: number[] = levels[i - 1].map((investor) => investor.ID);
      if (ids.length === 0) {
        break;
      }
      // eslint-disable-next-line no-await-in-loop
      const levelDirects = await this.getAffiliateDirectsForEntireLevel(
        ids,
        stoId
      ); // Get the data for those IDs
      // eslint-disable-next-line no-param-reassign
      levels[i] = levelDirects.map((investor) => ({
        ...investor,
        level: i + 1,
      })); // Mark down the correct level of investors
    }
    return levels;
  }

  /**
   * Gets affiliate details of MULTIPLE investors based on MULTIPLE referral IDs
   */
  async getAffiliateDirectsForEntireLevel(
    ids: number[],
    stoId?: number
  ): Promise<InvestorTreeNodeDto[]> {
    if (ids.length < 1) {
      return [];
    }
    const idString = ids.join(",");
    const sqlSelectSto =
      stoId !== undefined && typeof stoId === "number"
        ? `WHERE investorsto.stoid = ${stoId}`
        : ``;
    const sql = `
            SELECT DISTINCT
                investor.ID,
                investor.name,
                investor.referByInvestorID,
                investorsto.stoid,
                investorsto.isKYC,
                investorsto.KYCCurrentStatus,
                COALESCE(eligibility.eligible, 0) as eligible,
                "-1" as "level"
            FROM (
                    SELECT
                        ID,
                        CONCAT(firstName, " ", lastName) AS name,
                        referByInvestorID
                    FROM  investor
                    WHERE investor.referByInvestorID IN (${idString})
                ) investor
            LEFT JOIN investorsto
            ON        investor.ID = investorsto.investorid
            LEFT JOIN (
                SELECT DISTINCT
                    InvestorID,
                    1 as eligible
                FROM investments
                GROUP BY InvestorID, stoid
                HAVING SUM(AmountInvested) >= ${this.eligibilityMin}
            ) eligibility
            ON investor.ID = eligibility.InvestorID
            ${sqlSelectSto}
            ORDER BY  investor.ID;
        `;
    return this.runSql(sql);
  }

  /**
   * In reality, this just flattens out the tree structure from getAffiliateNetworkNodes from [][] to a single dimension array
   * Probably should refactor it at some point for sanity's sake. Didn't have time to clean this class up.
   */
  async getAffiliateNetworkAsList(
    investorId: number,
    depth: number,
    stoId?: number
  ): Promise<InvestorTreeNodeDto[]> {
    try {
      // Gets data of all related investors, grouped by levels of how direct they are, 1 = direct, 2 = indirect, etc.
      const levels: InvestorTreeNodeDto[][] = await this.getAffiliateNetworkTree(
        investorId,
        depth,
        stoId
      );
      // And flattens it out:
      let totalNodes: InvestorTreeNodeDto[] = [];

      // Iterate each level of investors
      levels?.forEach((level) => {
        totalNodes = totalNodes.concat(level);
      });
      return totalNodes;
    } catch (error) {
      logger.error(`In getAffiliateNetworkDetails: ${error}`);
      return [];
    }
  }

  /**
   * Turns the list from getAffiliateNetworkAsList into a nested object structure
   * NOTE! It inserts current investorID at the top even if it's present!
   */
  async getListAsNestedStructure(
    investorId: number,
    stoId: number,
    list: InvestorTreeNodeDto[]
  ): Promise<InvestorTreeNodeDto> {
    const nodeList = list;
    nodeList.push(await this.getInvestorAffiliateDetails(investorId, stoId));
    nodeList.forEach((node) => {
      // eslint-disable-next-line no-param-reassign
      node.directs = nodeList.filter(
        (other) => other.referByInvestorID === node.ID
      );
    });
    return nodeList.filter((node) => node.ID === investorId)[0];
  }

  /**
   * Recursively revert thre result of getListAsNestedStructure. Useful to remove lines from a network.
   */
  _unfoldNestedStructure(node: InvestorTreeNodeDto): InvestorTreeNodeDto[] {
    const nodeList: InvestorTreeNodeDto[] = [node]; // Add current node to result

    // Get the direct nodes or empty array
    const directs = node.directs || [];
    // Go through each direct and recursively unfold their network
    const lists: InvestorTreeNodeDto[][] = directs.map((directNode) =>
      this._unfoldNestedStructure(directNode)
    );
    // Combine the unfolded networks of the directs into the current list
    lists.forEach((list) => {
      if (nodeList.length) nodeList.concat(list);
    }); // Avoid empty lists

    return nodeList.map((lnode) => ({
      ...lnode,
      directs: [], // TODO: REMOVE THIS LINE AFTER THIS METHOD IS FIXED
    }));
  }

  /**
   * Like getListAsNestedStructure but without injecting a root investor
   */
  // eslint-disable-next-line class-methods-use-this
  _foldNestedStructure(
    rootId: number,
    list: InvestorTreeNodeDto[]
  ): InvestorTreeNodeDto {
    const nodeList = list;
    nodeList.forEach((node) => {
      // eslint-disable-next-line no-param-reassign
      node.directs = nodeList.filter(
        (other) => other.referByInvestorID === node.ID
      );
    });
    return nodeList.filter((node) => node.ID === rootId)[0];
  }

  /**
   * Create nested structures inside a list of investor nodes.
   * It inserts other nodes inside of each node's directs array
   */
  // eslint-disable-next-line class-methods-use-this
  _fillDirectsIn(list?: InvestorTreeNodeDto[]): void {
    // For each node, set its list of directs to all other nodes in the list that are referred by it
    list?.forEach((node) => {
      // eslint-disable-next-line no-param-reassign
      node.directs = list.filter(
        (other) => other.referByInvestorID === node.ID
      );
    });
  }

  async getReferrerName(investorId: number): Promise<string | null> {
    const sql = `
            SELECT
                CONCAT(referrer.firstName, ' ', referrer.lastName) AS fullName
            FROM
                investor referrer
            INNER JOIN investor current
            ON         current.referByInvestorID = referrer.ID
            WHERE      current.ID = ?;`;
    const result = await this.runSql(sql, investorId);
    return result[0] ? result[0].fullName : null;
  }

  async getAffiliateOverviews(stoId: number): Promise<AffiliateOverviewDto[]> {
    const sql = `
            SELECT
                investor.ID,
                COALESCE(SUM(investorsto.KYCCurrentStatus),0) > 0 as eligible,
                COALESCE(SUM(affiliateincomes.tokens),0) as tokens,
                COALESCE(SUM(affiliateincomes.amount),0) as fiat,
                investor.affiliateStatus AS registered,
                investorsto.stoid
            FROM investor
            LEFT JOIN investorsto      ON investor.ID = investorsto.investorid
            LEFT JOIN affiliateincomes ON investor.ID = affiliateincomes.investorId
            WHERE investorsto.stoid = ?
            GROUP BY investor.ID
        `;
    // COALESCE(eligibility.eligible, 0) as eligible,
    //
    // LEFT JOIN (
    //     SELECT DISTINCT
    //         InvestorID,
    //         1 as eligible
    //     FROM investments
    //     GROUP BY InvestorID, stoid
    //     HAVING SUM(AmountInvested) >= ?
    // ) eligibility ON investor.ID = eligibility.InvestorID

    return this.runSql(sql, [/* this.eligibilityMin, */ stoId]);
  }

  getInvestorsReferralOverview(): Promise<InvestorReferralOverviewDto[]> {
    const sql = `
            SELECT
                investor.*,
                COALESCE(investments.isActive, 0) AS isActive,
                CONCAT (
                        COALESCE(referrer.firstName, 'No'), ' ',
                        COALESCE(referrer.lastName, 'Referrer')
                    ) AS referrerName,
                COUNT(direct.ID) AS directs
            FROM investor
            LEFT JOIN (
                SELECT DISTINCT
                    InvestorID,
                    1 as isActive
                FROM investments
                GROUP BY InvestorID, stoid
                HAVING SUM(AmountInvested) >= 0
            ) investments ON investor.ID = investments.InvestorID
            LEFT JOIN investor referrer
            ON        investor.referByInvestorID = referrer.ID
            LEFT JOIN investor direct
            ON        investor.ID = direct.referByInvestorID
            GROUP BY  investor.ID
        `;
    // TODO: Needs rework to set referrer name to null when it's ' '
    return this.runSql(sql);
  }

  async getInvestorByEmail(email: string): Promise<Investor> {
    const [row] = await this.runSql(
      `SELECT * FROM investor WHERE email = ?`,
      email
    );
    return row;
  }

  async setAffiliateReferrerByEmail(
    investorId: number,
    referrerEmail: string
  ): Promise<boolean> {
    const investor: Investor = await this.getInvestorByEmail(referrerEmail);
    if (!investor) {
      return false;
    }
    const result: any = await this.runSql(
      `UPDATE investor SET referByInvestorID = ? WHERE ID = ?`,
      [investor.ID, investorId]
    );
    return result.affectedRows > 0;
  }

  async setAffiliateReferrerById(
    investorId: number,
    referrerId: number
  ): Promise<boolean> {
    const result: any = await this.runSql(
      `UPDATE investor SET referByInvestorID = ? WHERE ID = ?`,
      [referrerId, investorId]
    );
    return result.affectedRows > 0;
  }

  async getInvestorDirectsCount(investorId: number): Promise<number> {
    const [row] = await this.runSql(
      `SELECT COUNT(ID) AS count FROM investor WHERE referByInvestorID = ?`,
      investorId
    );
    return row.count;
  }

  async getInvestorDirects(investorId: number): Promise<Investor[]> {
    const rows = await this.runSql(
      `SELECT * FROM investor WHERE referByInvestorID = ?`,
      investorId
    );
    return rows;
  }

  async getInvestorDirectIds(investorId: number): Promise<number[]> {
    const investors = await this.getInvestorDirects(investorId);
    return investors.map((investor) => investor.ID);
  }

  async getInvestorNetworkVolume(
    investorId: number,
    options?: {
      stoId?: number;
      dateFrom?: Date;
      dateTo?: Date;
    },
    network?: InvestorTreeNodeDto[],
    includeCurrentInvestor: boolean = true
  ): Promise<{ amount: string; tokens: string }> {
    // First, get the total network
    let actualNetwork = null;
    if (network) {
      actualNetwork = network;
    } else {
      actualNetwork = await this.getAffiliateNetworkAsList(investorId, 128, 0);
    }
    // Get the IDs in the network
    const ids = actualNetwork.map((node) => node.ID);
    if (includeCurrentInvestor) {
      ids.unshift(investorId);
    }
    if (ids.length === 0) return { amount: "0", tokens: "0" };

    const idString = ids.join(",");

    // Add search filters
    const filters: string[] = [];
    if (options?.stoId) {
      filters.push(`stoId = ${options.stoId}`);
    }
    if (options?.dateFrom) {
      const dateTo =
        `"${options.dateTo?.toISOString().split("T")[0]}"` || "CURDATE()";
      filters.push(
        `DateTime BETWEEN "${
          options.dateFrom.toISOString().split("T")[0]
        }" AND ${dateTo}`
      );
    }
    filters.push(`investorId IN (${idString})`);
    const filterString = filters.join(" AND ");

    // Add selectors
    const selectors = [];
    selectors.push(`COALESCE(SUM(AmountInvested), 0) AS amount`);
    selectors.push(`COALESCE(SUM(TokensTransferred), 0) AS tokens`);
    const selectorString = selectors.join(`,`);

    const sql = `
            SELECT ${selectorString}
            FROM investments
            WHERE
            ${filterString}
        `;
    const resultRow: { amount: string; tokens: string }[] = await this.runSql(
      sql
    );
    return resultRow[0];
  }

  async getInvestorNetworkVolumeAsDto(
    investor: Investor,
    options?: {
      stoId?: number;
      dateFrom?: Date;
      dateTo?: Date;
    },
    network?: InvestorTreeNodeDto[],
    includeCurrentInvestor: boolean = true
  ): Promise<AffiliateInvestmentVolumeDto> {
    const volume = await this.getInvestorNetworkVolume(
      investor.ID,
      options,
      network,
      includeCurrentInvestor
    );
    return {
      lineId: investor.ID,
      lineName: `${investor.FirstName} ${investor.LastName}`,
      volume: volume.amount,
      tokenVolume: volume.tokens,
    };
  }

  async getAllInvestorNetworkVolumes(
    investorId: number,
    networkList?: InvestorTreeNodeDto[],
    options?: {
      stoId?: number;
      dateFrom?: Date;
      dateTo?: Date;
    }
  ): Promise<AffiliateInvestmentVolumeDto[]> {
    // console.log(`Network before fold: ${JSON.stringify(networkList?.map(node => node.ID))}`);
    // Fold the list network into a nested structure, if provided
    // const network = networkList?.find(node => node.ID === investorId);
    this._fillDirectsIn(networkList);
    // console.log(`Network after fold: ${JSON.stringify(network)}`);
    // Get all the lines (directs) and their data
    const lines = await this.getInvestorDirects(investorId);
    // Start calculating each volume, while utilizing root's network if it's available
    // eslint-disable-next-line arrow-body-style
    const volumePromises: Promise<AffiliateInvestmentVolumeDto>[] = lines.map(
      (line) =>
        // console.log(`For line ID ${line.ID}`);
        // console.log(`Network:`);
        // const lineNetworkNested = networkList?.find(node => node.ID === line.ID);
        // console.log(JSON.stringify(lineNetworkNested));
        // // First, filter the root network so that includes only current line
        // // Networks are expensive to calculate, so we recycle if possible
        // // const lineNetworkNested = network?.directs?.find(node => node.ID === line.ID);

        // // Unfold the results of the network to a list because it's easier to work with
        // // If network is not provided, keep it undefined
        // const lineNetworkList = (lineNetworkNested) ? this._unfoldNestedStructure(lineNetworkNested) : undefined;
        // console.log(`LINE NETWORK:`);
        // console.log(JSON.stringify(lineNetworkList));
        // console.log(`The list of IDs are: ${lineNetworkList?.map(node => node.ID)}`);

        // // Calculate current line's volume using recycled network.
        // // If not provided, the function will have to calculate all the networks
        // // Also include the line investor's name and ID so that we can differentiate lines
        // console.log(`and the volume is calculated below`);

        this.getInvestorNetworkVolumeAsDto(line, options, undefined, true)
      // return this.getInvestorNetworkVolumeAsDto(line, options, lineNetworkList, true);
    );

    return Promise.all(volumePromises);
  }
}
