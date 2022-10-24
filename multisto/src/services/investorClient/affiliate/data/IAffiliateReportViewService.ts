import AffiliateInvestmentVolumeDto from "../dto/AffiliateInvestmentVolumeDto";

export type AffiliateReportView = {
  rootInvestorIds: string[];
  rootInvestorTotalPersonalInvestment: string[];
  lineInvestorIds: string[];
  armVolume: string[];
};

export default interface IAffiliateReportViewService {
  /**
   * Deletes all the data from the table
   */
  deleteTableData(): Promise<void>;
  /**
   * Inserts
   */
  insertAffiliateReports(
    rootInvestorId: number,
    stoId: number,
    investorLines: AffiliateInvestmentVolumeDto[],
    rootInvestorTotalShareValue: number
  ): Promise<void>;
}
