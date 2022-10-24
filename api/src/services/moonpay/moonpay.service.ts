import { createHmac } from 'crypto';
import { PARAM } from 'core/envs';
import {
  Currency,
  Investor,
  InvestorBuyPropertyAlert,
  MoonpayBuyAlert,
  MoonpayTransactionData,
  Params,
  ShareTypes,
} from 'entities';
import * as math from 'mathjs';
import { In, Not } from 'typeorm';
import moment from 'moment';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { ValidationError } from 'apollo-server-core';
import ShareTransferService from 'services/shares/ShareTransferService';
import { findCountryCode } from './helpers/country-codes';
import { loadConfigOrFail, MoonpayConfig } from './moonpay.config';
import {
  MoonpayCurrency,
  MoonpayError,
  MoonpayIDDoc,
  MoonpayKyc,
  MoonpayTransaction,
  MoonpayWidgetSettings,
  REMOTE_STATUS,
} from './moonpay.types';
import { MoonpayApiConfig } from './moonpay.api.config';
import {
  MOONPAY_REMOTE_EXIT_STATUSES,
  MOONPAY_TRANSACTION,
} from './entities/moonpay-transaction-data';
import { apiAction } from './helpers/api-integration';
// import { MoonpayJobService } from './services/moonpay.job.service';
// import statusSvc from './services/moonpay.status.service';
import { Jobs, Statuses } from './services';
import * as jobs from './jobs';

export class MoonpayService {
  protected static currencies: MoonpayCurrency[] = [];

  protected config?: MoonpayConfig;

  protected apiCfg = new MoonpayApiConfig();

  protected statuses = Statuses;

  protected _addJob(job: NodeJS.Timer): void {
    Jobs.registerJob(job);
  }

  /** Can update base URL */
  protected async _loadConfig(requireEnabled?: boolean): Promise<MoonpayConfig> {
    this.config = await loadConfigOrFail(requireEnabled ?? true);
    this.apiCfg = new MoonpayApiConfig(this.config);

    // This job doesn't get duplicated, we ensure that it's live
    this._addJob(jobs.selfHeal());

    // Update widgetURL if set in config. API baseURL doesn't change
    if (this.config.liveUrl && this.config.liveMode === true)
      this.apiCfg.widgetUrl = this.config.liveUrl;
    if (this.config.sandboxUrl && this.config.liveMode === false)
      this.apiCfg.widgetUrl = this.config.sandboxUrl;

    // Trim trailing / in url
    const widgetUrl = this.apiCfg.widgetUrl;
    if (widgetUrl.endsWith('/'))
      this.apiCfg.widgetUrl = widgetUrl.substring(0, widgetUrl.length - 1);

    return this.config;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _isMoonpayError(data?: any): data is MoonpayError {
    return data?.type !== undefined && data.message !== undefined && data.errors !== undefined;
  }

  async getKyc(investorID: number): Promise<MoonpayKyc> {
    const investor = await Investor.findOneOrFail(investorID);
    const kyc = investor.kyc;
    type KycFile = {
      link: string;
      name: string;
      type?: MoonpayIDDoc;
      side?: 'front' | 'back' | '';
    };
    // const kycFiles = JSON.parse(kyc['investor-documents'] ?? '[]') as KycFile[];
    //    const passport = kycFiles.find((file) => file.type === 'passport') ?? kycFiles[0];
    const kycFiles = JSON.parse(kyc['identity-docs'] ?? '[]') as KycFile[];

    return {
      firstName: investor.firstName,
      lastName: investor.lastName,
      address: {
        country: findCountryCode(investor.country),
        state: investor.state,
        postCode: investor.zip,
        town: investor.town,
        street: investor.address,
        subStreet: '',
      },
      dateOfBirth: investor.birthDate,
      nationality: findCountryCode(investor.country),
      files: kycFiles.map((kycFile) => ({
        country: findCountryCode(investor.country),
        downloadLink: kycFile.link,
        side: (kycFile.side?.length && kycFile.side) || null,
        type: kycFile.type ?? 'passport',
      })),
    };
    // TODO: Files need types
  }

  protected _getUrlSearch(url: string): string {
    return new URL(url).search;
  }

  /**
   * Sign url with our key to prevent tampering.
   * Provide secretKey to avoid loading config inside.
   */
  async signUrl(url: string, secretKey?: string): Promise<string> {
    const key = secretKey ?? (await this._loadConfig(true)).secretKey;
    const signature = createHmac('sha256', key).update(this._getUrlSearch(url)).digest('base64');
    return `${url}&signature=${encodeURIComponent(signature)}`;
  }

  /**
   * Generate URL from settings
   * @param settings check Moonpay's documentation
   */
  async generateWidgetUrl(settings: Omit<MoonpayWidgetSettings, 'apiKey'>): Promise<string> {
    const config = await this._loadConfig(true);

    // Add theme if missing from input but present in params
    const theme =
      settings.colorCode ?? (await Params.getParam(PARAM.INVESTOR_DASHBOARD_THEME))?.stringValue;
    const autoTheme = theme ? { colorCode: theme } : {};

    // Auto-fill some settings for convenience
    const autoSettings: MoonpayWidgetSettings = {
      apiKey: config.publishableKey,
      ...autoTheme,
      ...settings,
    };

    // URI encode key values
    const pairs = Object.entries(autoSettings)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(`${value}`)}`);

    // Compose URL query string
    const url = `${this.apiCfg.widgetUrl}?${pairs.join(`&`)}`;

    // Sign result
    return this.signUrl(url, config.secretKey);
  }

  async getPurchaseUrl(
    investorID: number,
    shareTypeID: number,
    shares: number,
    options?: { matchBuyAlertID?: number },
  ): Promise<string> {
    const config = await this._loadConfig(true);

    const investor = await Investor.findOneOrFail(investorID);
    const shareType = await ShareTypes.findOneOrFail(shareTypeID);
    const stoID = shareType.stoID;
    const wallet =
      config.stoWallets.find((w) => w.stoID === stoID) ??
      config.stoWallets.find((w) => w.stoID === 0);

    if (!wallet) throw new Error(`Moonpay wallet not configured.`);

    // ASSUME PRICE IS IN DEFAULT CURRENCY
    const cryptoPrice = math.multiply(shares, shareType.premiumValue);

    const transaction = await this.reserveTransaction(investorID, options);

    return this.generateWidgetUrl({
      currencyCode: config.defaultCurrency,
      quoteCurrencyAmount: cryptoPrice,
      walletAddress: wallet.walletAddress,
      walletAddressTag: wallet.walletAddressTag,
      kycAvailable: true,
      externalCustomerId: investorID,
      externalTransactionId: transaction.ID,
      colorCode: config.colorCode,
      lockAmount: config.lockAmount,
      email: investor.email,
      language: config.language,
      redirectURL: config.redirectUrl,
    });
  }

  /**
   * Ensure the default currency exists
   * @returns the ID of the currency
   */
  async ensureCurrency(code: string): Promise<number> {
    const pCurrencies = await Currency.find();
    const found = pCurrencies.find((c) => c.abbreviation.toLowerCase() === code.toLowerCase());
    if (!found) {
      throw new Error(
        `Please add your chosen default currency for the MoonPay integration (${code}) from your DigiShares platform administration dashboard -> Manage Currencies`,
      );
    }
    return found.ID;
  }

  /**
   * Reserves a transaction ID for future use, or recycles a previous empty one for the investor.
   * Giving enough time for investor to go through with one transaction.
   * If he reloads the widget within that hour he should get a new transaction reserved.
   */
  async reserveTransaction(
    investorID: number,
    options?: {
      allowDetachedMode?: boolean;
      matchBuyAlertID?: number;
    },
  ): Promise<MoonpayTransactionData> {
    this._checkDetachedMode(options);

    let linked = false;
    let previous = await MoonpayTransactionData.findOne({
      where: {
        // localStatus: MOONPAY_TRANSACTION.ReservedID,

        // Will create a new transaction if the last one isn't ongoing/going to change anymore a.k.a. is in exit state.
        // HOWEVER, a buy alert (or any link) will cancel this out (as seen below)
        localStatus: Not(In(MOONPAY_REMOTE_EXIT_STATUSES)),
        investorID,
      },
    });

    /*
      THIS CANCELS OUT CREATING NEW TRANSACTIONS; and matches to old one in an exit state
      In detached mode, you can create a new transaction if the old one is done.
      HOWEVER, when we have a linked alert, we don't want this. We want the user to create a new alert.
      If no previous transaction is found even in this case, continue as normal (create new).
    */
    if (!previous) {
      previous = await this._findLink({ matchBuyAlertID: options?.matchBuyAlertID });
      if (previous) linked = true;
    }

    if (previous) {
      if (options?.matchBuyAlertID && !linked) {
        await this._linkAlert(previous.ID, options.matchBuyAlertID, { skipExisting: true });
        linked = true;
      }
      return previous;
    }

    const fresh = MoonpayTransactionData.create({
      objectType: 'Partial<MoonpayTransaction>',
      localStatus: MOONPAY_TRANSACTION.ReservedID,
      investorID,
    });
    // Object deliberately not part of entity
    // No object = error
    fresh.object = {
      // Moonpay uses string type
      externalCustomerId: `${investorID}`,
    };
    const transaction = await fresh.save();

    if (options?.matchBuyAlertID) {
      await this._linkAlert(transaction.ID, options.matchBuyAlertID);
      linked = true;
    }
    return transaction;
  }

  protected _checkDetachedMode(options?: {
    allowDetachedMode?: boolean;
    matchBuyAlertID?: number;
  }): void {
    if (!options?.allowDetachedMode && !options?.matchBuyAlertID)
      throw new ValidationError(
        `MoonPay reserve transaction: All transactions must be linked to an alert/item by default, unless detached mode is enabled.`,
      );
  }

  protected async _findLink(options: {
    matchBuyAlertID?: number;
  }): Promise<MoonpayTransactionData | undefined> {
    // There can be more matchable records than buy alerts in future
    if (options.matchBuyAlertID) {
      const link = await MoonpayBuyAlert.findOne({ where: { alertID: options.matchBuyAlertID } });
      return link && MoonpayTransactionData.findOne(link.transactionID);
    }
    return undefined;
  }

  protected async _linkAlert(
    transactionID: number,
    alertID: number,
    options?: {
      /** If not set, will throw error on duplicate */
      skipExisting?: boolean;
      /** Use to not re-fetch the transaction */
      returnTransaction?: MoonpayTransactionData;
    },
  ): Promise<{
    link: MoonpayBuyAlert;
    transaction?: MoonpayTransactionData;
    alert?: InvestorBuyPropertyAlert;
  }> {
    let link;
    let transaction;
    let alert;
    if (options?.skipExisting === true) {
      const existing = await MoonpayBuyAlert.findOne({ transactionID, alertID });
      if (existing) link = existing;
    }
    alert = await InvestorBuyPropertyAlert.findOneOrFail(alertID);
    if (!link) {
      alert.status = PURCHASE_STATUS_TYPE.PaymentAwaiting;
      await alert.shareType;
      alert = await alert.save();

      const moonpayBuyAlert = MoonpayBuyAlert.create({
        transactionID,
        alertID,
      });
      link = await moonpayBuyAlert.save();
    }
    transaction =
      options?.returnTransaction ?? (await MoonpayTransactionData.findOneOrFail(transactionID));
    transaction.shareTypeID = alert.shareTypeID;
    transaction = await transaction.save();

    return {
      link,
      alert,
      transaction,
    };
  }

  /**
   * Finds a corresponding buy alert and creates link to local transaction object. Highly experimental
   *
   * NB: Should be rarely used. This is in case you forgot to set an alertID when reserving.
   *
   * TODO: Export to separate alert matching service
   */
  protected async _matchBuyAlert(
    transaction: MoonpayTransactionData,
    options?: {
      /** Will try to match to buy alerts which are either accepted or declined */
      matchCompleted?: boolean;
      /** Set the status NotFoundLocally on the transaction object if it can't be matched to a buy alert */
      setNotFoundStatus?: boolean;
      /** If previously matched, will attempt to find another match and delete the old one. */
      ignoreAlreadyExisting?: boolean;
      /** Update the status on the transaction object if an alert is found. Optimistic: If the object has no remote status, assume pending. */
      setFoundStatusOptimistic?: boolean;
    },
  ): Promise<boolean> {
    if (options?.ignoreAlreadyExisting !== true) {
      const match = await MoonpayBuyAlert.findOne({ where: { transactionID: transaction.ID } });
      if (match) return true;
    }

    const investorID = transaction.investorID;
    const matchInvestor = investorID && { investorID };

    const shareTypeID = transaction.shareTypeID;
    const matchShareType = shareTypeID && { shareTypeID };

    const matchStatus = options?.matchCompleted === true && {
      status: Not(In([PURCHASE_STATUS_TYPE.Declined, PURCHASE_STATUS_TYPE.Accepted])),
    };

    const matchedAlerts = await MoonpayBuyAlert.find();

    const rawAlerts = await InvestorBuyPropertyAlert.find({
      where: {
        ...matchInvestor,
        ...matchShareType,
        ...matchStatus,
        ID: Not(In(matchedAlerts.map((a) => a.alertID))),
      },
    });

    // Sort alerts by
    // 1. newest first (largest date)
    // 2. Awaiting payment status first
    // 3. Pending status first
    // 4. Unused status first
    // 5. Matching share price
    const alerts = rawAlerts
      .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
      .sort((a, b) => {
        // From least to most important (index 0 is skipped in this case). Use the index as a scale value.
        const value = [
          ,
          PURCHASE_STATUS_TYPE.Unused,
          PURCHASE_STATUS_TYPE.Pending,
          PURCHASE_STATUS_TYPE.PaymentAwaiting,
        ];
        // Inverted comparison to align with value (high value must return smaller sorting order)
        return value.indexOf(b.status) - value.indexOf(a.status);
      });

    if (alerts.length) {
      await this._linkAlert(transaction.ID, alerts[0].ID);

      if (options?.setFoundStatusOptimistic === true) {
        transaction.localStatus = this._determineLocalStatusOnFetch(
          transaction.object?.status ?? REMOTE_STATUS.pending,
        );
      }

      return true;
    }

    if (options?.setNotFoundStatus === true) {
      transaction.localStatus = MOONPAY_TRANSACTION.NotFoundLocally;
      await transaction.save();
    }
    return false;
  }

  /**
   * After the investor actually does something in MoonPay with the transaction ID coming from us.
   * This comes through our API resolvers to here.
   * It should be finding a RESERVED transaction, none other is a valid state.
   *
   * Note: The transaction inner data could already be set on our system if it came via webhook early.
   * @param moonpayTransactionID This is how MoonPay delivers OUR transaction ID (external to them)
   * @param status This status type is from THEIR end.
   */
  async receiveTransactionRemotely(
    moonpayTransactionID: string,
    status: REMOTE_STATUS,
  ): Promise<void> {
    const fetched = await this.fetchRemoteTransaction(moonpayTransactionID);
    if (fetched === undefined)
      console.error(`MoonPay error: Could not fetch ${moonpayTransactionID}`);
    else {
      console.log(
        `MoonPay: received transaction: ${JSON.stringify({
          moonpayTransactionID,
          externalTransactionId: fetched?.externalTransactionId,
        })}`,
      );
    }

    const found = await MoonpayTransactionData.findOne(+(fetched?.externalTransactionId ?? -1));

    if (!found) {
      // Very awkward
      console.error(`Handling unreserved transaction!`);
      await this._handleUnrservedTransaction(
        +(fetched?.externalTransactionId ?? ``),
        status,
        fetched,
      );
    } else {
      found.object = {
        ...found.object,
        ...fetched,
      };
      try {
        found.localStatus = this._determineLocalStatusOnFetch(status, found.localStatus);
        const saved = await found.save();

        // Match again just in case. The first match should have occurred in the reservation phase.
        await this._matchBuyAlert(saved, { ignoreAlreadyExisting: true });
        this._addJob(jobs.checkup(saved)); // Checks in 10s
        this._addJob(jobs.checkup(saved, 30 * 1000)); // Checks in 30s
        this._addJob(jobs.checkup(saved, 60 * 1000)); // Checks in 30s
        // Other checks are evrey 2 minutes or see in
      } catch (e) {
        console.log(`MoonPay: Transaction handled already`);
        // Already handled transaction in checkups
      }
    }
  }

  async _handleUnrservedTransaction(
    id: number,
    status: REMOTE_STATUS,
    remote?: MoonpayTransaction,
  ): Promise<void> {
    if (Number.isNaN(id) || !id) {
      console.error(
        `MOONPAY CRITICAL ERROR: API tried to add transaction with NaN / null local ID to our system.`,
      );
      throw new Error(`Can't add transaction with NaN / null local ID`);
    }
    const record = MoonpayTransactionData.create({
      objectType: 'MoonpayTransaction',
      // Can't continue because we can't see sharetype ID and link it to a purchase request on our end
      localStatus: MOONPAY_TRANSACTION.NotFoundLocally,
    });
    record.object = {
      ...remote,
      id: `${id}`,
      status: status,
    };
    console.warn(`MOONPAY: API tried to add unreserved transaction to our system.`);
    const saved = await record.save();
    // Try to match it to an alert
    await this._matchBuyAlert(saved, { setNotFoundStatus: true });
  }

  /**
   * Fetch raw data from Moonpay using its Moonpay ID.
   * Normally this would be used when receiving a transaction update from Moonpay,
   * since they only give us the moonpay ID of the transaction but we don't know the local ID.
   */
  async fetchRemoteTransaction(id: string): Promise<MoonpayTransaction | undefined> {
    await this._loadConfig(); // Refresh API config
    const transaction = await apiAction<void, MoonpayTransaction, MoonpayError>(
      this.apiCfg.base,
      this.apiCfg.getTransactionRemoteID,
      {
        urlParams: {
          id: `${id}`,
        },
        query: {
          apiKey: this.config?.publishableKey ?? '',
        },
      },
    );

    const error = transaction as MoonpayError | undefined;
    if (error?.errors) {
      return this.apiCfg.undefinedOrThrow(error);
    }
    const result = transaction as MoonpayTransaction | undefined;
    return result;
  }

  /** Fetch data from Moonpay based on a local transaction record. Mutates the argument and returns it. */
  async fetchUpdateTransactionData(
    record: MoonpayTransactionData,
    options?: {
      throwOnNotFound?: boolean;
    },
  ): Promise<MoonpayTransactionData> {
    await this._loadConfig(); // Refresh API config
    const newData = await apiAction<void, MoonpayTransaction[], MoonpayError>(
      this.apiCfg.base,
      this.apiCfg.getTransaction,
      {
        urlParams: {
          id: `${record.ID}`,
        },
        query: {
          apiKey: this.config?.publishableKey ?? '',
        },
      },
    );

    if (this._isMoonpayError(newData)) {
      this.apiCfg.undefinedOrThrow(newData);
      if (options?.throwOnNotFound === true) throw new Error(newData.message);
      return record;
    }

    const result = newData as MoonpayTransaction[] | undefined;
    record.object = result ? result[0] : record.object;
    record.objectType = record.object ? 'MoonpayTransaction' : 'Partial<MoonpayTransaction>';
    record.localStatus = this._determineLocalStatusOnFetch(
      record.object?.status,
      record.localStatus,
    );
    return record.save();
  }

  _determineLocalStatusOnFetch(
    remoteStatus: REMOTE_STATUS | undefined,
    existingStatus?: MOONPAY_TRANSACTION,
  ): MOONPAY_TRANSACTION {
    if (!remoteStatus) {
      if (existingStatus !== MOONPAY_TRANSACTION.ReservedID)
        return MOONPAY_TRANSACTION.NotFoundOnRemote;
      return MOONPAY_TRANSACTION.ReservedID;
    }
    // Incoming unknown transaction from remote
    if (!existingStatus) {
      if (remoteStatus === 'failed') return MOONPAY_TRANSACTION.Failed;
      else return MOONPAY_TRANSACTION.NotFoundLocally;
    }
    // Only change current status if in a temporary state
    if (
      existingStatus === MOONPAY_TRANSACTION.Pending ||
      existingStatus === MOONPAY_TRANSACTION.ReservedID
    ) {
      switch (remoteStatus) {
        default:
        case 'pending':
        case 'waitingPayment':
        case 'waitingAuthorization':
          return MOONPAY_TRANSACTION.Pending;
        case 'failed':
          return MOONPAY_TRANSACTION.Failed;
        case 'completed':
          // TODO: Can later change to HadResult to not always have automatic processing
          return MOONPAY_TRANSACTION.ToBeProcessed;
      }
    } else {
      // Statuses that have exited from moonpay handling state
      const exits: MOONPAY_TRANSACTION[] = [
        MOONPAY_TRANSACTION.HadResult,
        MOONPAY_TRANSACTION.Failed,
        MOONPAY_TRANSACTION.ToBeProcessed,
        MOONPAY_TRANSACTION.Processing,
        MOONPAY_TRANSACTION.Processed,
      ];
      if (exits.includes(existingStatus)) {
        throw new Error(
          `Remote is trying to change the status of a MoonPay transaction that already is being/was handled locally. Remote status: ${remoteStatus}. Existing status: ${existingStatus}. Local and remote transactions must be 1 to 1.`,
        );
      }
    }

    return existingStatus;
  }

  /** Update local records from remote data. Search with remote data. Return updated local records. */
  async _updateRecords(newData: MoonpayTransaction[]): Promise<MoonpayTransactionData[]> {
    // Do not cover all corner cases with missing stuff for now
    const remoteIDs = newData.map((transaction) => transaction.externalTransactionId);
    const localData = await MoonpayTransactionData.find({ where: { ID: In(remoteIDs) } });

    const updateRecords = newData.map((remote) => {
      let record = localData.find((local) => local.ID === +remote.externalTransactionId);
      if (!record) {
        record = MoonpayTransactionData.create({
          localStatus: this._determineLocalStatusOnFetch(remote.status),
        });
      } else {
        record.localStatus = this._determineLocalStatusOnFetch(remote.status, record.localStatus);
      }
      record.objectType = 'MoonpayTransaction';
      record.object = remote;
      return record.save();
    });
    return Promise.all(updateRecords);
  }

  /**
   * Update the data of all relevant pending transactions in the system in order to get more details about them.
   *
   * Will fetch from Moonpay and will create local record in case it's missing.
   */
  async findUpdateTransactionDataRemote(options?: {
    investorID?: number;
    startDate?: Date;
    endDate?: Date;
    transactionID?: number;
    limit?: number;
    throwOnNotFound?: boolean;
  }): Promise<MoonpayTransactionData[]> {
    const searchQuery = {
      ...(options?.investorID && { externalCustomerId: `${options.investorID}` }),
      ...(options?.startDate && { startDate: moment(options.startDate).format('YYYY-MM-DD') }),
      ...(options?.transactionID && { externalTransactionId: `${options.transactionID}` }),
    };

    await this._loadConfig(); // Refresh API config
    const newData = await apiAction<void, MoonpayTransaction[], MoonpayError>(
      this.apiCfg.base,
      this.apiCfg.listTransactions,
      options ? { query: searchQuery } : undefined,
    );

    if (this._isMoonpayError(newData)) {
      this.apiCfg.undefinedOrThrow(newData);
      if (options?.throwOnNotFound === true) throw new Error(newData.message);
    }

    const transactions = newData as MoonpayTransaction[];
    if (!transactions) return [];
    return this._updateRecords(transactions);
  }

  /**
   * Find/re-fetch transaction data from a buy alert ID (if linked)
   *
   * Requires the alert to be linked to a MP transaction
   * @param alertID
   */
  async getAlertTransactionMetadata(
    alertID: number,
    doFetching: boolean,
  ): Promise<MoonpayTransactionData | undefined> {
    const linked = await MoonpayBuyAlert.findOne({ where: { alertID } });
    if (linked) {
      const asArray = await this.getAllTransactionsMetadata(doFetching, {
        transactionID: linked.transactionID,
      });
      // Can still be undefined if no remote transaction is found
      return asArray[0];
    }
  }

  /**
   * Get all available transactions plus local metadata
   * @param doFetching re-fetch
   * @param search.investorID filter accessible by this investor
   * @param search.transactionID get this local transaction ID
   * @returns matched transactions sorted by most recent first
   */
  async getAllTransactionsMetadata(
    doFetching: boolean,
    search?: {
      investorID?: number;
      transactionID?: number;
      limit?: number;
    },
    options?: {
      /** Only matters for returned result, will still try fetch it */
      includeReserved: boolean;
    },
  ): Promise<MoonpayTransactionData[]> {
    // We fetch and store multiple transactions if transactionID is not specified
    if (doFetching) {
      await this.findUpdateTransactionDataRemote(search);
    }
    const records = (
      await MoonpayTransactionData.find({
        where: {
          ...(options?.includeReserved && { status: Not(MOONPAY_TRANSACTION.ReservedID) }),
          ...(search?.investorID && { investorID: search?.investorID }),
          ...(search?.transactionID && { ID: search?.transactionID }),
        },
      })
    ).sort((a, b) => b.dateUpdated.valueOf() - a.dateUpdated.valueOf());

    if (search?.limit) {
      records.slice(0, search.limit);
    }
    return records;
  }

  protected _validateTransactionForTransfer(localTransaction: MoonpayTransactionData): void {
    const { investorID, object, shareTypeID } = localTransaction;
    const msgs: string[] = [];
    if (!investorID) msgs.push(`Missing investorID`);
    if (!object) msgs.push(`Missing remote data`);
    if (object?.status !== REMOTE_STATUS.completed)
      msgs.push(`Remote transaction not completed inside of success logic flow.`);
    if (!shareTypeID) msgs.push(`Missing shareTypeID`);
    if (msgs.length) {
      console.log(
        `MoonPay CRITICAL FAILURE: Share Transfer on successful payment failed, details: ${JSON.stringify(
          {
            paidAmount: object?.baseCurrencyAmount,
            paidCurrency: object?.baseCurrency?.code,
            boughtAmount: object?.quoteCurrencyAmount,
            boughtCurrency: object?.currency?.code,
            shareTypeID,
            transactionID: localTransaction.ID,
            remoteID: localTransaction.object?.id,
          },
        )}`,
      );
      throw new ValidationError(`MoonPay transaction share transfer failed: ${msgs.join()}`);
    }
  }

  /**
   * Rounds fractional shares only if configured to do so, and in the manner specified by config
   */
  protected async _roundFractionalShares(shares: number): Promise<number> {
    const config = await this._loadConfig(true);
    // Check and round the fractional part of the shares if configured to do so
    // Round up if share fraction >= specified round-up amount
    if (
      !Number.isNaN(config.doRoundUpOn) &&
      shares - Math.floor(shares) >= (config.doRoundUpOn as number)
    ) {
      shares = Math.ceil(shares);
    }
    // Round up if share fraction <= specified round-down amount
    if (
      !Number.isNaN(config.doRoundDownOn) &&
      shares - Math.floor(shares) <= (config.doRoundDownOn as number)
    ) {
      shares = Math.floor(shares);
    }

    return shares;
  }

  /**
   * We need to re-calculate this on every transaction because we can't force the investor to deposit a certain amount reliably
   * @param localData
   */
  protected async _calculateSharesBought(localData: MoonpayTransactionData): Promise<number> {
    // The value in 'paid' is actually the amount of quoteCurrency bought (crypto), not the end-value paid in fiat by the investor
    const paid = localData.object?.quoteCurrencyAmount ?? 0;
    const cost = (await ShareTypes.findOneOrFail(localData.shareTypeID)).premiumValue;

    let shares = math.divide(math.number(paid), math.number(cost)) as number;
    shares = await this._roundFractionalShares(shares);
    return shares;
  }

  /** Process transaction if state is correct. Otherwise, does nothing but re-fetch. */
  async processTransaction(
    localData: MoonpayTransactionData,
    options?: {
      alwaysRefetch: boolean;
    },
  ): Promise<MoonpayTransactionData> {
    let mtdRecord = localData;
    let transaction = mtdRecord.object;

    // Refetch when needed
    if (
      options?.alwaysRefetch === true ||
      !transaction ||
      transaction.status !== REMOTE_STATUS.completed
    ) {
      mtdRecord = await this.fetchUpdateTransactionData(mtdRecord);
      transaction = mtdRecord.object;
    } else {
      // remote is completed but status may be incorrect
      // I do this here because it doesn't update local status if it's remotely completed (see 'if' above)
      if (
        transaction.status === REMOTE_STATUS.completed &&
        [MOONPAY_TRANSACTION.Pending].includes(mtdRecord.localStatus)
      ) {
        mtdRecord.localStatus = this._determineLocalStatusOnFetch(
          transaction.status,
          mtdRecord.localStatus,
        );
        mtdRecord = await mtdRecord.save();
        await this._updateLinkedStatus(mtdRecord);
      }
    }

    // In case no remote transaction has started
    if (!transaction) {
      // Ignore reserved ones, they don't have to exist on remote.
      // Do specify that we're awaiting payment (hence status update on linked item)
      if (localData.localStatus === MOONPAY_TRANSACTION.ReservedID) {
        await this._updateLinkedStatus(mtdRecord);
        return localData;
      }
      throw new ValidationError(`Can't process MoonPay transaction without MoonPay data.`);
    }

    /** Valid states for starting share transfer */
    const validStates: MOONPAY_TRANSACTION[] = [
      MOONPAY_TRANSACTION.HadResult,
      MOONPAY_TRANSACTION.ToBeProcessed,
    ];
    if (validStates.includes(mtdRecord.localStatus)) {
      mtdRecord.localStatus = MOONPAY_TRANSACTION.Processing;
      mtdRecord = await mtdRecord.save();

      try {
        // Ideally, this would use a MySQL transaction
        await this._updateLinkedStatus(mtdRecord);
        this._validateTransactionForTransfer(mtdRecord);
        const shareType = await ShareTypes.findOneOrFail(mtdRecord.shareTypeID);
        const shares = await this._calculateSharesBought(mtdRecord);
        await this._updateLinkedShares(mtdRecord, shares);

        const transfer = new ShareTransferService({
          adminID: -1,
          investorID: mtdRecord.investorID as number,
          shareTypeID: mtdRecord.shareTypeID as number,
          stoID: shareType.stoID,
          tokensToTransfer: shares,
          options: { printLog: true },
        });

        await transfer.transferSharesBetween('company', 'investor');

        mtdRecord.localStatus = MOONPAY_TRANSACTION.Processed;
        mtdRecord = await mtdRecord.save();
        // await this._updateLinkedStatus(mtdRecord); // Duplicate action
        await this._cleanUpLinks(mtdRecord);
      } catch (e) {
        console.error((e as Error).stack);
        mtdRecord.localStatus = MOONPAY_TRANSACTION.ToBeProcessed;
        mtdRecord = await mtdRecord.save();
      }
    }
    await this._updateLinkedStatus(mtdRecord);

    return mtdRecord;
  }

  protected async _updateLinkedShares(
    localData: MoonpayTransactionData,
    shares: number,
  ): Promise<void> {
    const link = await MoonpayBuyAlert.findOne({ where: { transactionID: localData.ID } });
    if (link) {
      const alert = await InvestorBuyPropertyAlert.findOne(link.alertID);
      if (alert) {
        alert.shares = shares;
        await alert.shareType;
        await alert.save();
      }
    }
  }

  /** Updates InvestroBuyPropertyAlert status and potentially others in the future */
  protected async _updateLinkedStatus(localData: MoonpayTransactionData): Promise<void> {
    const buyLink = await MoonpayBuyAlert.findOne({ where: { transactionID: localData.ID } });
    if (buyLink) {
      // I want to do a double join but for some reason alert.shareType will remain null in this case
      // const alert = await buyLink.alert;
      const alert = await InvestorBuyPropertyAlert.findOne(buyLink.alertID);
      if (alert) {
        alert.status = this._translateStatusToAlert(localData.localStatus);
        await alert.shareType; // await this or it becomes null
        await alert.save();
      } else if (localData.object?.status) {
        throw new Error(
          `MoonPay error: Can not find linked alert ID: ${buyLink.alertID} for transaction ${localData.ID}, but must change its status! MoonPay status is '${localData.localStatus}' | remote: '${localData.object.status}'.`,
        );
      }
    }
  }

  protected _translateStatusToAlert(status: MOONPAY_TRANSACTION): PURCHASE_STATUS_TYPE {
    switch (status) {
      default:
      case MOONPAY_TRANSACTION.ReservedID:
        return PURCHASE_STATUS_TYPE.PaymentAwaiting;
      case MOONPAY_TRANSACTION.ToBeProcessed:
      case MOONPAY_TRANSACTION.Processing:
      case MOONPAY_TRANSACTION.HadResult:
        return PURCHASE_STATUS_TYPE.Pending; // On our side
      case MOONPAY_TRANSACTION.Pending:
        return PURCHASE_STATUS_TYPE.PaymentOngoing; // Pending on MP side
      case MOONPAY_TRANSACTION.Processed:
        return PURCHASE_STATUS_TYPE.Accepted;
      case MOONPAY_TRANSACTION.Failed:
        return PURCHASE_STATUS_TYPE.PaymentFailure;
    }
  }

  /** Unlinks other transactions, linked to the same object (like alert).
   * Normally shouldn't have to be done, but it can happen.
   */
  protected async _cleanUpLinks(mtdRecord: MoonpayTransactionData): Promise<void> {
    const alertLink = await MoonpayBuyAlert.findOneOrFail({
      where: { transactionID: mtdRecord.ID },
    });
    const badAlertLinks = await MoonpayBuyAlert.find({
      where: { alertID: alertLink.alertID, transactionID: Not(mtdRecord.ID) },
    });
    await Promise.all(badAlertLinks.map((a) => a.remove()));
  }

  async getTransactionReceiptUrl(transactionJson: Partial<MoonpayTransaction>): Promise<string> {
    await this._loadConfig(true);
    return `${this.apiCfg.widgetUrl}/transaction_receipt?transactionId=${transactionJson.id}`;
  }

  async matchAlertID(
    alertID: number,
    checkInvestorID?: number,
  ): Promise<MoonpayTransactionData | undefined> {
    const link = await MoonpayBuyAlert.findOne({ where: { alertID } });
    const alert = await link?.alert;
    await alert?.shareType;
    if (alert?.investorID && checkInvestorID && alert.investorID !== checkInvestorID)
      throw new ValidationError(`Investor ID:${checkInvestorID} has no alertID:${alertID}`);
    return link && (await MoonpayTransactionData.findOne(link.transactionID));
  }
}

const svc = new MoonpayService();
export default svc;
