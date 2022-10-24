import { DividendPayoutsView, DividendTemplates } from "../../../../../Schema";
import DividendAmountDistributedSqlService from "./DividendAmountDistributedSqlService";
import FeePerShareSqlService from "./FeePerShareSqlService";
import IStrategyService from "./IStrategyService";

const createStrategy = (
  template: DividendTemplates | DividendPayoutsView
): IStrategyService => {
  switch (template.awardStrategy) {
    default:
      throw new Error(
        `Template id:${template.id} has an supported award strategy!`
      );
    // logger.warn(
    //   `Template id:${template.id} has an unsupported award strategy!`
    // );
    // return new FeePerShareSqlService(); // TEMP
    case "feePerShare":
    case "percentPremiumValuePerShare": // TEMP
      return new FeePerShareSqlService();
    case "dividendAmountDistributed":
      return new DividendAmountDistributedSqlService();
  }
};
export default {
  createStrategy,
};
