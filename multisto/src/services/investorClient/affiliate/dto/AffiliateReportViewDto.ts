import { Investor } from "../../../../Schema";

export default interface AffiliateReportViewDto extends Investor{
    stoid: number,
    line: number,
    armVolume: number,
    rootInvestorTotalPersonalInvestmentVolume: number,
    Downline: number
}