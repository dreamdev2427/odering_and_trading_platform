import { Currency, DividendPayoutsView, Paymentchannels, Sharetypes } from '../../../../Schema';

/**
 * A record of a dividend payout, includes the matching template information and channel/currency information
 */
export default interface DividendPayoutDto extends DividendPayoutsView {
    shareType?: Sharetypes;
    paymentChannel?: Paymentchannels;
    currency: Currency;
}
