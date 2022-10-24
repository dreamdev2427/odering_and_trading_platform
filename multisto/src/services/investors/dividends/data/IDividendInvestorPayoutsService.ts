import { DividendInvestorPayouts } from "../../../../Schema";
import DividendInvestorPayoutDto from "../dto/DividendInvestorPayoutDto";

export default interface IDividendInvestorPayoutsService {
  list(stoId: number, payoutId?: number): Promise<DividendInvestorPayoutDto[]>;
  listRawForPayout(payoutId: number): Promise<DividendInvestorPayouts[]>;
  remove(payout: DividendInvestorPayouts): Promise<void>;
  removeMany(payouts: DividendInvestorPayouts[]): Promise<void>;
  addFuturePayouts(
    payouts: Omit<DividendInvestorPayouts, "id">[]
  ): Promise<void>;
}
