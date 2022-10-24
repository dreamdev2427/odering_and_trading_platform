/* eslint-disable @typescript-eslint/no-unused-vars */
import { MoonpayTransactionData } from '../entities';
import moonpay from '../moonpay.service';

/** Check up on a transaction 10s later. */
export default (
  transaction: MoonpayTransactionData,
  customTime?: number,
  syncMultiple?: boolean,
): NodeJS.Timer => {
  return setTimeout(async () => {
    try {
      await moonpay.processTransaction(transaction);
    } catch (e) {
      console.error(`Error in MoonPay transaction check-up job:\n${(e as Error).stack}`);
    }
  }, customTime ?? 10000);
};
