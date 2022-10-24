import { ConversionRateLocks, Paymentchannels } from '../../../../Schema';

export default interface IConversionRateLockService {
    fetchChannelLocks(stoId: number, investorId: number, channel: Paymentchannels, status?: string): Promise<ConversionRateLocks[]>;
    /**
     * Locks the rates in sto, investorid
     */
    lockRatesTemporarily(stoId: number, investorId: number): Promise<void>;
    /**
     * Locks the rates in sto, investorid
     */
    refreshTemporaryLocks(stoId: number, investorId: number): Promise<void>;
    /**
     * It will issue a permanent lock which should be linked to a deposit/investment request.
     * If no lock exists, it will create one.
     * If the channel does not support conversion, it will return undefined.
    */
    lockRateForPurchase(stoId: number, investorId: number, channelId: number): Promise<ConversionRateLocks | undefined>;
    /**
     * Releases channel locks ONLY if they are unused.
     */
    releasePendingLocks(stoId: number, investorId: number, channelId: number): Promise<void>;
}
