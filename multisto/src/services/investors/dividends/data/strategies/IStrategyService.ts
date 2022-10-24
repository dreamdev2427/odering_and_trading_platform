import { DividendPayoutsView } from "../../../../../Schema";

export default interface IStrategyService {
  updateTotals(payout: DividendPayoutsView): Promise<void>;
  /**
   * Responsible ONLY for creating dividend investor payouts, not paying them
   */
  distributePayout(
    payout: DividendPayoutsView,
    /** Added this as I'm not yet sure what I'm gonna require all the time.
     * I think it will have to be enforced as "future" on the next version,
     * and "pending" should be set by a payment processor when an individual payment is actually pending
     * Default is "future"
     */
    options?: { setStatus?: "future" | "pending" }
  ): Promise<void>;
}
