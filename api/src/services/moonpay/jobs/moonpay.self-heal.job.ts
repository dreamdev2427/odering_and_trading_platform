import { In } from 'typeorm';
import { MoonpayTransactionData } from '../entities';
import { MOONPAY_TRANSACTION } from '../entities/moonpay-transaction-data';
import moonpay from '../moonpay.service';

// Not optimized AT ALL. WIP

const SELF_HEAL_JOB_TIME = 2 * 60 * 1000; // Re-check pending transactions on 2 minutes
const TOO_MANY_TRANSACTIONS = 30; // Will extend wait period past 2 minutes if more than this transactions are pending
const ADDED_TIME_PER_TRANSACTION = 300; // estimated added ms per transaction (re-fetch and process)

export class MPSelfHealService {
  protected transactionsCache: MoonpayTransactionData[] = [];

  protected static _instance: MPSelfHealService;

  protected static job: NodeJS.Timer;

  static getInstance(): MPSelfHealService {
    if (!this._instance) this._instance = new MPSelfHealService();
    return this._instance;
  }

  protected constructor() {
    MPSelfHealService._instance = this;
  }

  clearCacheDynamic(): void {
    this.transactionsCache = [];
  }

  static clearCache(): void {
    // Circumventing problems with encapsulation, avoiding referencing 'this' on static methods
    this.getInstance().clearCacheDynamic();
  }

  static addTime(): number {
    const instance = MPSelfHealService.getInstance();
    if (instance.transactionsCache.length > TOO_MANY_TRANSACTIONS) {
      return instance.transactionsCache.length * ADDED_TIME_PER_TRANSACTION;
    }
    return 0;
  }

  static getJob(): NodeJS.Timer {
    if (!this.job) {
      this.job = setInterval(async () => {
        try {
          await MPSelfHealService.getInstance().step();
        } catch (e) {
          console.error(`Moonpay self-heal job error\n${(e as Error).stack}`);
        }
      }, SELF_HEAL_JOB_TIME /* + MPSelfHealService.addTime()*/); // TODO: Shouldn't adjust time here, increases time only after reboot
    }
    return this.job;
  }

  async fetchPending(): Promise<MoonpayTransactionData[]> {
    this.transactionsCache = await MoonpayTransactionData.find({
      where: {
        localStatus: In([
          MOONPAY_TRANSACTION.ReservedID,
          MOONPAY_TRANSACTION.Pending,
          MOONPAY_TRANSACTION.HadResult,
          MOONPAY_TRANSACTION.ToBeProcessed,
        ]),
      },
    });
    return this.transactionsCache;
  }

  async step(): Promise<void> {
    try {
      //if (!this.transactionsCache)
      await this.fetchPending();
      if (this.transactionsCache.length)
        console.log(
          `MoonPay self-heal job: Fetching and updating ${this.transactionsCache.length} unfinished transactions.`,
        );
      this.transactionsCache?.map(async (t) => {
        try {
          await moonpay.processTransaction(t);
        } catch (e) {
          console.error(`MoonPay self-heal job: transaction error\n${(e as Error).stack}`);
        }
      });
    } catch (e) {
      console.error(`MoonPay self-heal job general error\n${(e as Error).stack}`);
    }
  }
}

/** Check up on all pending transactions every 30s. */
export default (): NodeJS.Timer => {
  return MPSelfHealService.getJob();
};
