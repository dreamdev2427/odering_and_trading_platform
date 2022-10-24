import { Paymentchannels, ConversionRateLocks } from '../../../../Schema';
import AbstractSqlService from '../../../generic/AbstractSqlService';
import IConversionRateLockService from './IConversionRateLockService';
import IPaymentChannelService from './IPaymentChannelService';
import PaymentChannelSqlService from './PaymentChannelSqlService';

export default class ConversionLockSqlService extends AbstractSqlService implements IConversionRateLockService {
    /** The lock will expire in this many hours if investment/deposit request is not submitted */
    readonly LOCK_EXPIRE_H = 2;

    private channelSvc: IPaymentChannelService = new PaymentChannelSqlService();

    async fetchChannelLocks(stoId: number, investorId: number, channel: Paymentchannels, status?: string): Promise<ConversionRateLocks[]> {
        const sql =
            `SELECT * FROM ConversionRateLocks
            WHERE ${status ? `status="${status}" AND` : ``}
            stoId = ?
            AND investorId = ?
            AND currencyFrom = ?
            AND currencyTo = ?;`;
        return this.runSql(sql, [stoId, investorId, channel.currencyID, channel.currencyToConvert]);
    }
    private async createChannelLock(stoId: number, investorId: number, channel: Paymentchannels, status?: string): Promise<void> {
            return this.runSql(
                `INSERT INTO ConversionRateLocks (stoId, investorId, currencyFrom, currencyTo, rate, lockedAt, status)
                VALUES (?,?,?,?,?,NOW(),"${status || "temporary"}")`,
                [stoId, investorId, channel.currencyID, channel.currencyToConvert, channel.conversionRate]);
    }
    /**
     * Locks or updates the locks of an investor for all payment channels.
     * The result is that conversion rates will keep being locked as he refreshes the page.
     * Temp locks will be cleared after their expirity period has passed
     */
    private async lockChannelTemp(stoId: number, investorId: number, channel: Paymentchannels): Promise<void> {
        const locks = await this.fetchChannelLocks(stoId, investorId, channel);
        const tempLocks = locks.filter(lock => lock.status === "temporary");
        const pendLocks = locks.filter(lock => lock.status === "pending");

        // If pending locks exist, use them - they last until admin approval
        // Delete temp locks for the channel
        // TODO: This logic may be reworked, so that temp locks don't get deleted
        if (pendLocks.length) {
            if (tempLocks.length) {
                await this.runSql(`DELETE FROM ConversionRateLocks WHERE id IN (${tempLocks.map(lock => lock.id).join(`,`)})`);
            }
        } else if (tempLocks.length) {
            // If temp locks exist
            // (there technically shouldn't be more than 1 lock)
            // update the locked date (will lock the rate indefinitely on refresh)
            await this.runSql(`UPDATE ConversionRateLocks SET lockedAt = NOW() WHERE id = ${tempLocks[0].id}`);
        } else {
            // If no locks exist
            // Create a temp lock
            await this.createChannelLock(stoId, investorId, channel);
        }
    }
    /** Temporarily locks all conversion rates for an investor. This is before he sends a request. */
    async lockRatesTemporarily(stoId: number, investorId: number): Promise<void> {
        // Remove all expired temporary locks
        await this.runSql(`DELETE FROM ConversionRateLocks WHERE status="temporary" AND DATE_ADD(lockedAt, INTERVAL ${this.LOCK_EXPIRE_H} HOUR) < NOW()`);

        /** Relevant payment channels */
        const channels: Paymentchannels[] = await this.runSql(`SELECT * FROM paymentchannels WHERE conversionEnabled = 1 AND stoid = ?`, stoId);

        // Create or update temp locks for all relevant payment channels found
        const promises = channels.map(channel =>
            this.lockChannelTemp(stoId, investorId, channel));
        await Promise.all(promises);
    }
    async refreshTemporaryLocks(stoId: number, investorId: number): Promise<void> {
        await this.runSql(`DELETE FROM ConversionRateLocks WHERE status="temporary" AND stoId = ? AND investorId = ?`, [stoId, investorId]);
        return this.lockRatesTemporarily(stoId, investorId);
    }
    /**
     * It will issue a permanent lock which should be linked to a deposit/investment request
     * If no lock exists, it will create one.
    */
    async lockRateForPurchase(stoId: number, investorId: number, channelId: number): Promise<ConversionRateLocks | undefined> {
        const channel = await this.channelSvc.fetchPaymentChannel(channelId);
        if (!channel.conversionEnabled) {
            return undefined;
        }
        // Fetch ALL types of locks
        let locks = await this.fetchChannelLocks(stoId, investorId, channel);

        // If we have an old pending lock, use that same one (keep the same conversion rate)
        const pendLocks = locks.filter(lock => lock.status === "pending");
        if (pendLocks[0]) {
            return pendLocks[0];
        }

        // Otherwise, get a temporary lock
        locks = locks.filter(lock => lock.status === "temporary");
        if (locks[0]) { // If a lock exists, update its status
            await this.runSql(`UPDATE ConversionRateLocks SET status="pending" WHERE id=?`, locks[0].id);
        } else { // Else, create it
            await this.createChannelLock(stoId, investorId, channel, "pending");
        }
        // Fetch pending locks again, to return the latest one
        locks = await this.fetchChannelLocks(stoId, investorId, channel, "pending");
        return locks[0];
    }
    async releasePendingLocks(stoId: number, investorId: number, channelId: number): Promise<void> {
        const channel = await this.channelSvc.fetchPaymentChannel(channelId);
        const locks = await this.fetchChannelLocks(stoId, investorId, channel, "pending");
        if (locks.length) {
            // If there are relevant channel locks in a "pending" state
            const promises = locks.map(async (lock) => {
                const deposits = await this.runSql(`SELECT * FROM InvestorDepositReceivedAlert WHERE isApproved <= 0 AND conversionRateLock = ?`, lock.id);
                const payments = await this.runSql(`SELECT * FROM InvestorBuyPropertyAlert WHERE status <= 0 AND conversionRateLock = ?`, lock.id);
                // Check if any unresolved payment depends on that lock
                if (!deposits.length && !payments.length) {
                    // This disables the lock from being used again, but keeps it as a record
                    await this.runSql(`UPDATE ConversionRateLocks SET status="historical" WHERE id = ?`, lock.id);
                }
            });
            await Promise.all(promises);
        }
        // If no locks detected, do nothing
    }
}
