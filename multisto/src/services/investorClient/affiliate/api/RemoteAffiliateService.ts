/* eslint-disable class-methods-use-this */
import logger from "../../../../logger";
import {
  HttpsBadResponseError,
  HttpsResponse,
  send,
} from "../../../../modules/httpsHandler";
import mysql from "../../../../modules/mysql";
import { findOne, findMany } from "../../../../modules/db";
import {
  Affiliateincomes,
  Affiliateplans,
  Investor,
  Investorsto,
  Stos,
} from "../../../../Schema";
import {
  getQueryfactory,
  QueryFactory,
  SQLConnection,
} from "../../documents/data/SqlQuery";
import IInvestorService from "../../investor/data/IInvestorService";
import InvestorSqlService from "../../investor/data/InvestorSQLService";
import AffiliateInvestorDto, { mapInvestor } from "../dto/AffiliateInvestorDto";
import AffiliatePlanDto from "../dto/AffiliatePlanDto";
import AffiliateProjectDto, {
  calculateCost,
  calculateQuantity,
  DtoOperation,
  mapSto,
} from "../dto/AffiliateProjectDto";
import AffiliatePurchaseDto from "../dto/AffiliatePurchseDto";
import AffiliatePlanSqlService from "../data/AffiliatePlanSqlService";
import IAffiliatePlanService from "../data/IAffiliatePlanService";
import IAffiliateModule from "./IAffiliateModule";
import RemoteAffiliateResponse from "./RemoteAffiliateResponse";
import RemoteAffiliateServiceConfig from "./RemoteAfilliateServiceConfig";
import { handleRemoteError } from "./remoteHandler";
import AffiliateIncomeResponse, {
  mapToAffiliateincomesArray,
} from "../dto/AffiliateIncomeRequest";
import IAffiliateIncomesService from "../data/IAffiliateIncomesService";
import AffiliateIncomesSqlService from "../data/AffiliateIncomesSqlService";
import ISharesService from "../data/ISharesService";
import SharesSqlService from "../data/SharesSqlService";
import IStoService from "../data/IStoService";
import StoSqlService from "../data/StoSqlService";
import InvestorTreeNodeDto from "../dto/InvestorTreeNodeDto";
import IAffiliateInvestorService from "../data/IAffiliateInvestorService";
import AffiliateInvestorSqlService from "../data/AffiliateInvestorSqlService";
import InvestorReferralOverviewDto from "../dto/InvestorReferralOverviewDto";
import IDividendsModule from "../../../investors/dividends-legacy/api/IDividendsModule";
import DividendsModule from "../../../investors/dividends-legacy/api/DividendsModule";
import { AffiliateIncomesOverviewDto } from "../dto/AffiliateIncomesOverviewDto";
import IPaymentsModule from "../../../investors/payments/api/IPaymentsModule";
import PaymentsModule from "../../../investors/payments/api/PaymentsModule";
import AffiliateChangeReferrerDto from "../dto/AffiliateChangeReferrerDto";
import InvestorKycDto, {
  mapInvestor as mapInvestorKyc,
} from "../dto/InvestorKycDto";
import NamedAffiliateIncome from "../dto/NamedAffiliateIncome";

export default class RemoteAffiliateService implements IAffiliateModule {
  dbConnection: SQLConnection;
  query: QueryFactory;
  config: RemoteAffiliateServiceConfig;
  investorService: IInvestorService;
  affiliateInvestorService: IAffiliateInvestorService;
  sharesSvc: ISharesService;
  stoSvc: IStoService;
  affiliateIncomesSvc: IAffiliateIncomesService;
  dividendsSvc: IDividendsModule;

  constructor(
    config: RemoteAffiliateServiceConfig,
    dbConnection?: SQLConnection
  ) {
    if (dbConnection) {
      this.dbConnection = dbConnection;
    } else {
      this.dbConnection = mysql.executeSQLStatement as SQLConnection;
    }
    this.query = getQueryfactory(this.dbConnection);
    this.config = config;
    this.investorService = new InvestorSqlService(this.query);
    this.affiliateInvestorService = new AffiliateInvestorSqlService();
    this.sharesSvc = new SharesSqlService();
    this.stoSvc = new StoSqlService();
    this.affiliateIncomesSvc = new AffiliateIncomesSqlService();
    this.dividendsSvc = new DividendsModule();

    if (!config) {
      throw new Error(
        "RemoteAffiliateService: Configuration missing, but service was invoked. Aborting."
      );
    } else if (!config.enabled) {
      throw new Error(
        "RemoteAffiliateService: Disabled by config, but service was invoked. Aborting."
      );
    }
  }
  _buildOptions(
    path: string,
    method: string,
    skipErrors: boolean = false
  ): any {
    return {
      port: this.config.port,
      host: this.config.host,
      headers: this.config.headers,
      path,
      method,
      logResponseErrors: !skipErrors,
    };
  }

  /**
   * Send HTTPS request, with some specific error handling.
   * If the server responds with an error, it will be thrown and further code execution is aborted.
   * @throws HttpsBadResponseError
   */
  async _send<T extends RemoteAffiliateResponse>(
    path: string,
    method: string,
    data: any,
    skipErrors?: boolean
  ): Promise<HttpsResponse<T>> {
    const res: HttpsResponse<T> = await send<T>(
      this._buildOptions(path, method, skipErrors),
      data
    );
    if (res.body?.status === false) {
      throw new HttpsBadResponseError(res); // specific to this service's remote
    }
    return res;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUnregisteredInvestorIds(): Promise<number[]> {
    const sql = `select id from investor where affiliateStatus = 0;`;
    const data = await findMany<Investor>(sql);
    return data.map((i) => i.ID);
  }

  // eslint-disable-next-line class-methods-use-this
  async getUnregisteredInvestors(): Promise<Investor[]> {
    const sql = `select * from investor where affiliateStatus = 0;`;
    return findMany<Investor>(sql);
  }

  // eslint-disable-next-line class-methods-use-this
  async getRegisteredInvestors(): Promise<Investor[]> {
    const sql = `select * from investor where affiliateStatus = 1;`;
    return findMany<Investor>(sql);
  }

  // eslint-disable-next-line class-methods-use-this
  async getIsInvestorRegistered(investorId: string): Promise<Boolean> {
    const sql = `select affiliateStatus from investor where id = ?;`;
    const result = await findOne<Investor>(sql, [investorId]);
    return result?.affiliateStatus === 1;
  }

  async fetchPlan(id: number): Promise<AffiliatePlanDto> {
    const svc: IAffiliatePlanService = new AffiliatePlanSqlService();
    const plan: Affiliateplans = await svc.fetch(id);
    return {
      affiliate_plan_id: plan.id,
      affiliate_plan_name: plan.name,
    };
  }
  async fetchPlans(): Promise<AffiliatePlanDto[]> {
    const svc: IAffiliatePlanService = new AffiliatePlanSqlService();
    const plans: Affiliateplans[] = await svc.fetchAll();
    const dtos: AffiliatePlanDto[] = plans.map((dbPlan) => ({
      affiliate_plan_id: dbPlan.id,
      affiliate_plan_name: dbPlan.name,
    }));
    return dtos;
  }
  async registerPlan(plan: AffiliatePlanDto): Promise<void> {
    const svc: IAffiliatePlanService = new AffiliatePlanSqlService();
    return svc.create({
      id: plan.affiliate_plan_id,
      name: plan.affiliate_plan_name,
    });
  }
  async updatePlan(plan: AffiliatePlanDto): Promise<void> {
    const svc: IAffiliatePlanService = new AffiliatePlanSqlService();
    return svc.update({
      id: plan.affiliate_plan_id,
      name: plan.affiliate_plan_name,
    });
  }
  async deletePlan(id: number): Promise<void> {
    const svc: IAffiliatePlanService = new AffiliatePlanSqlService();
    return svc.delete(id);
  }
  async upsertProject(sto: Stos): Promise<void> {
    try {
      await this.updateProject(sto);
    } catch (registerError) {
      try {
        await this.registerProject(sto);
      } catch (error) {
        throw new Error(
          `On upsert affiliate project, both register and update functions returned with errors.\nRegister error:${registerError}\nUpdate error:${error}`
        );
      }
    }
  }
  async registerProject(sto: Stos): Promise<void> {
    const dto: AffiliateProjectDto = mapSto(sto, DtoOperation.INSERT);

    await handleRemoteError(
      this._send<RemoteAffiliateResponse>(
        this.config.registerProject.path,
        this.config.registerProject.method,
        dto
      ),
      `affiliate registerProject ${sto.ID}`
    );
    logger.info(`Registered STO id:${sto.ID} in remote affiliate service.`);
  }
  async updateProject(sto: Stos): Promise<void> {
    let dto: AffiliateProjectDto = await calculateCost(
      mapSto(sto, DtoOperation.UPDATE)
    ); // Get accurate project cost
    dto = await calculateQuantity(dto); // Get accurate project qty

    await handleRemoteError(
      this._send<RemoteAffiliateResponse>(
        this.config.updateProject.path,
        this.config.updateProject.method,
        dto
      ),
      `affiliate updateProject ${sto.ID}`
    );
    logger.info(`Updated STO id:${sto.ID} in remote affiliate service.`);
  }
  async deleteProject(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async registerPurchase(purchase: AffiliatePurchaseDto): Promise<void> {
    try {
      logger.info(
        `Sending affiliate purchase to remote: ${JSON.stringify(purchase)} ...`
      );
      const res = await this._send<AffiliateIncomeResponse>(
        this.config.registerBuyOrder.path,
        this.config.registerBuyOrder.method,
        purchase
      );
      const incomeRes = res.body;
      logger.info(`Remote affiliate response: ${JSON.stringify(res.body)}`);
      const incomes = mapToAffiliateincomesArray(incomeRes);
      const incomeSvc: IAffiliateIncomesService =
        new AffiliateIncomesSqlService();
      const date = new Date();
      incomes.forEach((income) => {
        // eslint-disable-next-line no-param-reassign
        income.stoId = purchase.project_id;
        // eslint-disable-next-line no-param-reassign
        income.awarded = 0;
        // eslint-disable-next-line no-param-reassign
        income.dateEarned = date;
        // eslint-disable-next-line no-param-reassign
        income.purchaseAmount = purchase.purchase_cost;
        // eslint-disable-next-line no-param-reassign
        income.purchaseTokens = purchase.tokens_issued;
        // eslint-disable-next-line no-param-reassign
        income.affiliateId = purchase.user_id;
      }); // refactor this later
      await incomeSvc.logIncomes(incomes);
      logger.debug(`Logged (${incomes.length}) affiliate incomes`);
    } catch (error) {
      if (error instanceof HttpsBadResponseError) {
        logger.error(error.message);
        throw new Error(
          `Remote server responded with error in affiliate registerPurchase:\n${error.message}`
        );
      } else {
        logger.error(`${error}`);
        throw error;
      }
    }
  }
  async determineShareTypeId(stoId: number): Promise<number> {
    const stoSvc: IStoService = new StoSqlService();
    const selectedId = await stoSvc.getAffiliateShareTypeId(stoId);

    if (selectedId !== undefined) {
      return selectedId;
    }

    const shareSvc: ISharesService = new SharesSqlService();
    const defaultId = await shareSvc.getDefaultShareTypeId(stoId);

    if (defaultId !== undefined) {
      return defaultId;
    }
    throw new Error(`No share class available for sto id:${stoId}`);
  }
  async distributeUnpaidIncomes(
    adminId: number,
    stoId: number
  ): Promise<void[]> {
    const incomes: Affiliateincomes[] =
      await this.affiliateIncomesSvc.getUnpaidIncomes(stoId);
    return this.distributeIncomes(incomes, adminId);
  }
  async distributeUnpaidIncomesWithIds(
    adminId: number,
    ids: number[]
  ): Promise<void[]> {
    const incomes: Affiliateincomes[] =
      await this.affiliateIncomesSvc.getIncomesById(ids);
    // Safeguard to avoid distributing awarded incomes
    const unpaid = incomes.filter((income) => income.awarded === 0);
    return this.distributeIncomes(unpaid, adminId);
  }
  async distributeIncomes(
    incomes: Affiliateincomes[],
    adminId: number
  ): Promise<void[]> {
    if (!incomes.length) {
      logger.error(
        `Affiliate: Aborted distributing incomes because list is empty.`
      );
      // return Promise.resolve([]);
      return Promise.reject(
        new Error(
          "Attempted to distribute an empty list of incomes. This list could be empty due to an error"
        )
      );
    }
    logger.info(
      `-> Affiliate: Begin distributing incomes with IDs:[${incomes.map(
        (income) => income.id
      )}].`
    );

    type StoShareType = {
      stoId: number;
      shareTypeId: number;
    };
    const stoShareTypePromises: Promise<StoShareType>[] = incomes.map(
      async (income) => ({
        stoId: income.stoId,
        shareTypeId: await this.determineShareTypeId(income.stoId),
      })
    );
    const stoShareTypes = await Promise.all(stoShareTypePromises);

    const paymentsSvc: IPaymentsModule = new PaymentsModule();

    const promises: Promise<void>[] = incomes.map(
      // used to await forEach
      async (income: Affiliateincomes) => {
        try {
          await paymentsSvc.transferShares(
            income.investorId,
            income.stoId,
            stoShareTypes.find((shareType) => shareType.stoId === income.stoId)
              ?.shareTypeId || 0,
            income.tokens,
            adminId,
            false
          );
          await this.affiliateIncomesSvc.markAsAwarded(income);
          logger.info(
            `-- Distributed affiliate income: ${JSON.stringify(income)}`
          );
        } catch (error) {
          logger.error(
            `-- In affiliate distributeIncomes - Income NOT distributed:${JSON.stringify(
              income
            )}.\nReason:\n${error}`
          );
          throw error;
        }
      }
    );
    const result = await Promise.all(promises);
    logger.info(`-> Affiliate: Finished distributing incomes.`);
    return result;
  }
  async withdrawPurchase(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  /**
   * @param checkForRegistration Whether to check the db if the investor is already registered and skip him.
   * @throws Error on remote server error
   * @throws Error on already registered (if check is set)
   */
  async registerInvestor(
    investor: AffiliateInvestorDto,
    checkDuplicate?: boolean
  ): Promise<void> {
    let status;
    if (checkDuplicate) {
      const sql = `select affiliateStatus from investor where id = ?;`;
      status = await mysql.executeSQLStatement(sql, investor.id);
    }
    if (!checkDuplicate || !status) {
      // await handleRemoteError(
      await this._send<RemoteAffiliateResponse>(
        this.config.registerInvestor.path,
        this.config.registerInvestor.method,
        investor
      );
      // );
      logger.info(`Remotely registered investor ID:${investor.id}`);
      const sql = `update investor set affiliateStatus = 1 where id = ?;`;
      try {
        await mysql.executeSQLStatement(sql, investor.id);
      } catch (error) {
        throw new Error(
          `Critical data integrity error! Investor ${investor.id} must have affiliateStatus = 1, but it couldn't be set!\nReason:\n${error}`
        );
      }
    } else {
      throw new Error(
        `Investor ${investor.id} skipped for remote affiliate registration. Reason: affiliateStatus = 1 and checkDuplicate = true`
      );
    }
  }
  /**
   * PRIVATE
   * Sends the KYC approval request to the remote.
   * @throws Server error handled as normal string
   */
  async _approveInvestorRemote(investor: Investor): Promise<void> {
    const dto: InvestorKycDto = mapInvestorKyc(investor, 1);
    handleRemoteError(
      this._send<RemoteAffiliateResponse>(
        this.config.updateKyc.path,
        this.config.updateKyc.method,
        dto
      ),
      "affiliate approveInvestorRemote"
    );
  }
  async approveInvestorKyc(investor: Investor): Promise<void> {
    try {
      await this._approveInvestorRemote(investor);
    } catch (error) {
      const str = (error as string).toLowerCase();
      if (str.includes("wrong")) {
        // "Something went wrong" is received whenever the ID doesn't exist
        logger.info(
          `affiliate approveInvestorKyc - could not set KYC for id:${investor.ID}, attempting to re-register investor first...`
        );
        await this.registerInvestor(mapInvestor(investor)); // So we try re-registering the investor
        await this._approveInvestorRemote(investor); // And re-approving KYC
      } else if (str.includes("already")) {
        logger.info(
          `affiliate approveInvestorKyc - KYC for id:${investor.ID} was already approved on remote`
        );
      } else {
        throw new Error(`${error}`); // And further errors are to be handled in the upper scope (e.g. controller)
      }
    }
  }
  /**
   * @param checkForRegistration Whether to check the db if the investor is already registered and skip him.
   * @throws Error on remote server error
   * @throws Error on already registered (if check is set)
   */
  async updateInvestor(
    investor: AffiliateInvestorDto,
    checkExisting?: boolean
  ): Promise<void> {
    if (!this.config.updateInvestor)
      return Promise.reject(
        new Error("Update Investor remote path is not defined")
      );
    let status;
    if (checkExisting) {
      const sql = `select affiliateStatus from investor where id = ?;`;
      status = await mysql.executeSQLStatement(sql, investor.id);
    }
    if (status) {
      await handleRemoteError(
        this._send<RemoteAffiliateResponse>(
          this.config.updateInvestor.path,
          this.config.updateInvestor.method,
          investor
        )
      );
      logger.info(`Remotely updated investor ID:${investor.id}`);
      const sql = `update investor set affiliateStatus = 1 where id = ?;`;
      return mysql
        .executeSQLStatement(sql, investor.id)
        .then(() => {
          Promise.resolve();
        })
        .catch((error) => {
          logger.error(
            `Critical data integrity error! Investor ${investor.id} must have affiliateStatus = 1, but it couldn't be set!\nReason:\n${error}`
          );
        });
    }
    logger.info(
      `Investor ${investor.id} skipped for remote affiliate update. Reason: affiliateStatus != 1`
    );
    return Promise.resolve();
  }
  /**
   * Maps investors to DTOs in a way so that it doesn't throw validation errors on testing instances.
   * These validation errors are cleared by the KYC approval process anyway, but this process isn't real on testing environments.
   * @param investors
   * @returns
   */
  mapInvestorsBulk(investors: Investor[]): AffiliateInvestorDto[] {
    const validate: boolean = !this.config.host.includes("127.0.0.1");
    let result: AffiliateInvestorDto[] = [];
    result = investors.map((investor) => mapInvestor(investor), validate); // Map raw investors to DTOs
    return result;
  }
  /**
   * Register all unregistered investors for the affiliate programme (synchronize).
   * @throws Error on remote server error
   * @throws Error on already registered (if check is set)
   */
  async registerInvestorsBulk(syncUploaded: boolean): Promise<void> {
    const str = `-> Affiliate bulk register of all investors ${
      syncUploaded ? "[re-try duplicates]" : "[skip duplicates]"
    }...`;
    logger.info(str);
    try {
      const investorsStoRaw = await findMany<Investor & Investorsto>(`
                SELECT * FROM investor
                LEFT JOIN investorsto
                ON  investor.ID = investorsto.investorID
                AND investorsto.stoid = 0
                ORDER BY investor.ID
            `); // Get all data for investors, also need KYC from STO 0
      const investorsRaw: Investor[] = investorsStoRaw as Investor[];
      const investors: AffiliateInvestorDto[] = investorsRaw.map((investor) =>
        mapInvestor(investor, false)
      );
      const duplicateIds: string[] = [];
      const refusedIds: string[] = [];
      const skippedIds: string[] = [];
      for (let i = 0; i < investors.length; i += 1) {
        investors[i].kyc_status = investorsStoRaw[i].isKYC > 0 ? 1 : 0; // Get the KYC status (in STO 0) for the investor, but it can only be 0 or 1
        if (syncUploaded || investorsStoRaw[i].affiliateStatus === 0) {
          try {
            // await is used on purpose here, the eslint rule is to prevent accidental use
            // eslint-disable-next-line no-await-in-loop
            await this._send<RemoteAffiliateResponse>(
              this.config.registerInvestor.path,
              this.config.registerInvestor.method,
              investors[i],
              true
            );
            // eslint-disable-next-line no-await-in-loop
            await mysql.executeSQLStatement(
              `UPDATE investor SET affiliateStatus = 1 WHERE ID = ?`,
              investors[i].id
            );
            logger.info(
              `affiliate registerInvestorsBulk - Automatically registered investor id:${investors[i].id}, kyc:${investors[i].kyc_status}`
            );
          } catch (error: any) {
            const msg: string = (error.message as string).toLowerCase();
            if (msg.includes("check details") || msg.includes("exist")) {
              duplicateIds.push(investors[i].id);
            } else if (msg.includes("refused")) {
              refusedIds.push(investors[i].id);
            } else {
              logger.error(
                `Error on affiliate registerInvestorsBulk for id:${investors[i].id}:\n${error}`
              );
            }
          }
        } else {
          skippedIds.push(investors[i].id);
        }
      }
      if (duplicateIds.length) {
        logger.info(
          `In affiliate registerInvestorsBulk, the following investors were already registered or had an error on remote:\n${duplicateIds.join(
            ","
          )}`
        );
      }
      if (refusedIds.length) {
        logger.info(
          `In affiliate registerInvestorsBulk, the following investors were refused to be synced due to connection error:\n${refusedIds.join(
            ","
          )}`
        );
      }
      if (skippedIds.length) {
        logger.info(
          `In affiliate registerInvestorsBulk, the following investors were deliberately skipped for upload:\n${skippedIds.join(
            ","
          )}`
        );
      }
      logger.info("<- Affiliate bulk register done!");
      return Promise.resolve();
    } catch (error) {
      logger.error("General error on affiliate registerInvestorsBulk");
      logger.error(`${error}`);
      return Promise.resolve(); // Fail silently
    }
  }
  async getIsInvestorEligible(investorId: number): Promise<Boolean> {
    const sharesSvc: ISharesService = new SharesSqlService();
    const shares = await sharesSvc.getInvestmentsAbove(investorId, "1000");
    return shares.length > 0;
  }
  async getAffiliateNetworkAsList(
    investorId: number,
    stoId: number | undefined
  ): Promise<InvestorTreeNodeDto[]> {
    const svc: IAffiliateInvestorService = new AffiliateInvestorSqlService();
    return svc.getAffiliateNetworkAsList(investorId, 7, stoId);
  }
  async getAllInvestorsWithActivity(): Promise<InvestorReferralOverviewDto[]> {
    return this.affiliateInvestorService.getInvestorsReferralOverview();
  }
  /**
   * @deprecated
   * @param investorId
   * @returns
   */
  async getGlobalRentalIncomesFor(investorId: number): Promise<string> {
    // TODO: Double-check and remove method if not needed
    // Had no time to write this prettily
    try {
      const stoIds: number[] = await this.affiliateIncomesSvc.getStoIdsFor(
        investorId
      );
      const stoShareTypes: {
        stoId: number;
        shareTypeId: Promise<number | undefined>;
      }[] = stoIds.map((sto) => ({
        stoId: sto,
        shareTypeId: this.stoSvc.getAffiliateShareTypeId(sto),
      }));
      const rentalIncomes: string[] = await Promise.all(
        stoShareTypes.map(async (stoShareType) => {
          const shareTypeId = await stoShareType.shareTypeId;
          const earnings =
            await this.affiliateIncomesSvc.getProjectTotalEarnings(
              investorId,
              stoShareType.stoId
            );
          if (
            typeof shareTypeId === "number" &&
            typeof earnings?.tokenEarnings === "number"
          ) {
            return this.sharesSvc.getPreciseCost(
              shareTypeId,
              earnings.tokenEarnings
            );
          }
          return "0";
        })
      );
      // This is horrible but it's currently the only way to get accurate decimal precision
      // TODO: Need to rework this to get the incomes through SQL with an array of shareTypeIds instead
      // so that we don't end up with this mess:
      const args = rentalIncomes.join("+");
      const row = await findOne<{ sum: string }>(`SELECT ${args} AS sum`);
      return row?.sum || "0";
    } catch (error) {
      logger.error(
        `Error in affiliateService getGlobalRentalIncomeFor ${error}`
      );
      return "N/A";
    }
  }
  /**
   * @deprecated Now calculated by dividends controller inside legacy code and into the dividendsreceivers table
   */
  async calculateRentalIncomeFor(
    investorId: number,
    stoId: number
  ): Promise<string> {
    try {
      const dividends = await this.dividendsSvc.getProjectUnpaidDividends(
        stoId
      );
      const totalShares: number = await this.sharesSvc.getTotalShares(stoId); // This is always an integer
      const affiliateEarnings =
        await this.affiliateIncomesSvc.getProjectTotalEarnings(
          investorId,
          stoId
        );
      const earnedShares: string = affiliateEarnings.tokenEarnings;

      const row = await findOne<{ rentalIncome: string }>(
        `SELECT ? / ? * ? as rentalIncome`,
        [dividends, totalShares, earnedShares]
      );
      return row?.rentalIncome || "N/A";
    } catch (error) {
      logger.error(
        `Error in affiliateService getRentalIncomeFor investorId:${investorId}, stoId:${stoId}\n:${error}`
      );
      return "N/A";
    }
  }
  async getTotalRentalIncomeFor(
    investorId: number,
    stoId: number
  ): Promise<string> {
    return this.dividendsSvc.getInvestorPaidAffiliateDividendsFor(
      investorId,
      stoId
    );
  }
  async getIncomesOverview(
    stoId?: number,
    awarded: number = 0
  ): Promise<AffiliateIncomesOverviewDto[]> {
    const filters: string[] = [];
    if (stoId !== undefined && stoId > 0) {
      filters.push(`affiliateincomes.stoId = ${stoId}`);
    }
    filters.push(`affiliateincomes.awarded = ${awarded}`);

    const filterSql = filters.length ? `WHERE ${filters.join(" AND ")}` : ``;

    // TODO: Refactor: Move to incomes service
    const sql = `
            SELECT
                SUM(affiliateincomes.tokens) as totalTokens,
                SUM(affiliateincomes.amount) as totalFiat,
                affiliateincomes.awarded,
                affiliateincomes.stoId,
                stos.title as stoTitle,
                investor.ID as investorId,
                investor.FirstName as firstName,
                investor.LastName as lastName,
                investor.email,
                investor.phone,
                investor.Address as address,
                investor.country,
                false as eligibility
        --    InvestorBanks.accountTitle as accountName,
        --    InvestorBanks.iban as iban,
        --    InvestorBanks.routingNumber
        FROM affiliateincomes
        INNER JOIN investor
        ON         investor.ID = affiliateincomes.investorId
        LEFT JOIN stos
        ON stos.ID = affiliateincomes.stoId
        -- LEFT JOIN InvestorBanks
        -- ON		 investor.ID = InvestorBanks.investorid
        ${filterSql}
        GROUP BY investor.ID, affiliateincomes.stoId;
        `;
    return findMany<AffiliateIncomesOverviewDto>(sql);
  }
  async getInvestorTokenIncome(
    investorId: number,
    stoId: number
  ): Promise<string> {
    const svc: IAffiliateIncomesService = new AffiliateIncomesSqlService();
    return svc.getProjectTotalTokenEarnings(investorId, stoId);
  }
  /**
   * Private function. Used by changeReferrerById in order to apply LOCAL changes.
   */
  async _setReferrerLocally(
    investorId: number,
    referrerId: number
  ): Promise<void> {
    const localSuccess =
      await this.affiliateInvestorService.setAffiliateReferrerById(
        investorId,
        referrerId
      );
    if (!localSuccess) {
      throw new Error(
        `Could not set investor affiliate referrer properly on local database, while it was set on remote! investorId:${investorId}, referrerId:${referrerId}.`
      );
    }
  }
  async getIsEligibleForReferralChange(investorId: number): Promise<boolean> {
    const directs = await this.affiliateInvestorService.getInvestorDirectsCount(
      investorId
    );
    if (directs > 0) {
      logger.info(
        `Investor id:${investorId} ineligible for change due to having ${directs} directs`
      );
      return false;
    }
    const shares = await this.sharesSvc.getTotalInvestorInvestment(investorId);
    if (shares) {
      logger.info(
        `Investor id:${investorId} ineligible for change due to having ${shares} shares`
      );
      return false;
    }
    return true;
  }
  async setReferrerByEmail(
    investorId: number,
    referrerEmail: string
  ): Promise<void> {
    const referrer = await this.affiliateInvestorService.getInvestorByEmail(
      referrerEmail
    );
    return this.setReferrerById(investorId, referrer.ID);
  }
  async setReferrerById(investorId: number, referrerId: number): Promise<void> {
    logger.info(`Setting referrer for id:${investorId} to id:${referrerId}`);
    const dto: AffiliateChangeReferrerDto = {
      userid: investorId,
      sponsorid: referrerId,
    };
    const eligible = await this.getIsEligibleForReferralChange(investorId);
    if (eligible) {
      await this._send<RemoteAffiliateResponse>(
        this.config.changeReferrer.path,
        this.config.changeReferrer.method,
        dto
      );
      await this._setReferrerLocally(investorId, referrerId);
    } else {
      throw new Error(`Investor is not eligible for change of referrer!`);
    }
  }
  async getAllInvestorIncomes(
    investorId: number,
    stoId?: number
  ): Promise<NamedAffiliateIncome[]> {
    // Get the incomes
    let incomes = await this.affiliateIncomesSvc.getAllInvestorIncomes(
      investorId,
      stoId
    );

    // Try to determine their level if it's missing, it's usually written in the remark
    incomes = incomes.map((income) => {
      // Typically I would put this logic in the AffiliateIncomeDto file but I'm in a hurry
      let currentLevel = income.affiliateLevel;
      let currentName = income.affiliateName;
      let currentAffiliateId = income.affiliateId;
      if (!currentLevel) {
        const regExp = /Level ([0-9]+)/;
        const match = regExp.exec(income.remark);
        const remarkLevel: number | null = match ? +match[1] : null;
        currentLevel = remarkLevel;
      }
      // Extract the affiliate investor's name and ID from the remark if not present
      if (!currentName) {
        const nameExp = /from ([0-9]+) (.*)/;
        const nameMatch = nameExp.exec(income.remark);
        if (nameMatch) {
          currentAffiliateId = +nameMatch[1];
          // eslint-disable-next-line prefer-destructuring
          currentName = nameMatch[2];
        }
      }
      return {
        ...income,
        affiliateLevel: currentLevel,
        affiliateId: currentAffiliateId,
        affiliateName: currentName,
      };
    });
    return incomes;
  }
}
