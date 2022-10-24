import { Sharetypes } from "../../../../Schema";
import DividendPayoutDto from "../../../../services/investors/dividends/dto/DividendPayoutDto";
import DividendInvestorPayoutDto from "../../../../services/investors/dividends/dto/DividendInvestorPayoutDto";
import { ShareTypeVM, strategies } from "./types";

const dividendView = (
  recs: DividendPayoutDto[] | DividendInvestorPayoutDto[],
  shouldMapIdToTemplateId: boolean = true
) =>
  recs.map((rec: DividendPayoutDto | DividendInvestorPayoutDto) => ({
    ...rec,
    periodUnit:
      rec.period === 1
        ? rec.periodUnit.slice(0, rec.periodUnit.length - 1)
        : rec.periodUnit,
    paymentChannel: rec.paymentChannel ?? { title: "Internal Wallet" },
    shareType: rec.shareType ?? { title: "All" },
    awardStrategy: strategies.find((s) => s.awardStrategy === rec.awardStrategy)
      ?.description,
    // Localization of numbers is now done in the frontend
    // awardValue: rec.awardValue?.toLocaleString(),
    // companyShares: rec.companyShares.toLocaleString(),
    // totalAmount: rec.totalAmount.toLocaleString(),
    // totalInvestorShares: rec.totalInvestorShares.toLocaleString(),
    id: shouldMapIdToTemplateId ? rec.templateId : rec.id,
    futureId: rec.id,
  }));
const shareTypesSimpleView = (recs: Sharetypes[]): ShareTypeVM[] =>
  recs.map((st) => ({ id: st.ID, title: st.title }));

export default {
  dividendView,
  shareTypesSimpleView,
};
