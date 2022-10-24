import SharesSqlService from "../../../../services/investorClient/affiliate/data/SharesSqlService";
import { DividendTemplateInputVM, strategies } from "./types";

export interface ErrorVM {
  field: string;
  error: string;
}

export const validateNewDividend = async (
  rec: DividendTemplateInputVM
): Promise<ErrorVM[]> => {
  const shareSvc = new SharesSqlService();
  const shareTypes = await shareSvc.getShareTypesForSto(rec.stoId);
  const errors: ErrorVM[] = [];
  const strategy = strategies.find((s) => s.id === +rec.awardStrategy);
  if (!strategy) {
    errors.push({
      field: "awardStrategy",
      error: "Unknown award formula selected",
    });
  }
  if (rec.awardValue === undefined || Number.isNaN(+rec.awardValue)) {
    errors.push({ field: "awardValue", error: "Award value is invalid" });
  }
  if (+rec.awardValue <= 0 || +rec.awardValue > 999999.999) {
    errors.push({
      field: "awardValue",
      error: "Award value must be > 0 and ≤ 999999.999.",
    });
  }
  if (!rec.dueDate) {
    errors.push({ field: "dueDate", error: "Due date is unset." });
  }
  const date = new Date(rec.dueDate).setHours(0, 0, 0, 0);
  if (Number.isNaN(date)) {
    errors.push({ field: "dueDate", error: "Due date is invalid." });
  }
  if (new Date().setHours(0, 0, 0, 0).valueOf() > date.valueOf()) {
    errors.push({ field: "dueDate", error: "Due date is in the past." });
  }
  if (!rec.title) {
    errors.push({ field: "title", error: "Title is required." });
  }
  if (rec.title.length > 255) {
    errors.push({ field: "title", error: "Title must be ≤ 255 characters" });
  }
  if (
    +rec.shareTypeId > 0 &&
    !shareTypes.find((st) => st.ID === +rec.shareTypeId)
  ) {
    errors.push({
      field: "shareTypeId",
      error:
        "Share type not found in project. This is a bug, please report it.",
    });
  }
  return errors;
};
export const typeCastNewDividend = (
  rec: DividendTemplateInputVM
): DividendTemplateInputVM => ({
  ...rec,
  awardStrategy: +rec.awardStrategy,
  awardValue: +rec.awardValue,
  channelId: +rec.channelId,
  currencyId: +rec.currencyId,
  period: +rec.period,
  periodUnit: +rec.periodUnit,
  shareTypeId: +rec.shareTypeId,
});
