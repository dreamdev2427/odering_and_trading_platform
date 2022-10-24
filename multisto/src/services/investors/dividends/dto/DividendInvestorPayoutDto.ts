import {
  Currency,
  DividendInvestorPayoutsView,
  Paymentchannels,
  Sharetypes,
} from "../../../../Schema";

/**
 * A record of a dividend payout, includes the matching template information and channel/currency information
 */
export default interface DividendInvestorPayoutDto
  extends DividendInvestorPayoutsView {
  shareType?: Sharetypes;
  paymentChannel?: Paymentchannels;
  currency: Currency;
  investorName: string;
}
