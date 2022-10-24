import { DividendInvestorPayouts } from "../../../../../Schema";

export default (
  a: Partial<DividendInvestorPayouts>,
  b: Partial<DividendInvestorPayouts>
) => a.investorId === b.investorId && a.payoutId === b.payoutId;
