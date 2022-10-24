import { DividendTemplates } from "../../../../Schema";

export type ShareTypeVM = {
  id: number;
  title: string;
};
export interface StrategyVM extends Pick<DividendTemplates, "awardStrategy"> {
  id: number;
  description: string;
  disabled?: boolean;
}
export const strategies: StrategyVM[] = [
  { id: 1, awardStrategy: "feePerShare", description: "Value per share owned" },
  // Not ready yet
  // { id: 2, awardStrategy: "percentPremiumValuePerShare", description: "Value is % of the total share value owned", disabled: true },
  {
    id: 3,
    awardStrategy: "dividendAmountDistributed",
    description: "Value divided by distributed shares, per share",
    disabled: true,
  },
];
export interface PeriodUnitVm extends Pick<DividendTemplates, "periodUnit"> {
  id: number;
}
export const periodUnits: PeriodUnitVm[] = [
  { id: 1, periodUnit: "days" },
  { id: 2, periodUnit: "months" },
];
export interface DividendTemplateInputVM {
  title: string;
  shareTypeId: number;
  period: number;
  periodUnit: number;
  dueDate: string;
  awardValue: number;
  awardStrategy: number;
  channelId: number;
  currencyId: number;
  stoId: number;
}
