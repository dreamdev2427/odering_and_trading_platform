import { Investor } from "../../../../Schema";
import SqlQuery from "../../documents/data/SqlQuery";
import AffiliateReportViewDto from "../../affiliate/dto/AffiliateReportViewDto";
import QueryObjectDto from "../dto/QueryObjectDto";

export default interface IInvestorService {
  getInvestor(investorId: number): SqlQuery<Investor>;
  getAllInvestors(offset?: number, records?: number): SqlQuery<Investor[]>;
  getIncompleteKycInvestors(
    recordsPage?: number,
    searchQueryObjects?: QueryObjectDto[],
    orderQueryObjects?: QueryObjectDto[],
    selectQueryProperties?: QueryObjectDto[]
  ): Promise<any>;
  countIncompleteKycInvestors(
    searchQueryObjects?: QueryObjectDto[]
  ): Promise<number>;
  getInvestorsForSto(stoId: number): Promise<Investor[]>;
  getInvestorsAndAffiliateViewDataForSto(
    stoId: number
  ): Promise<AffiliateReportViewDto[]>;
  serachInvestor(query: any): Promise<Investor[]>;
  geniusSerachInvestor(
    investorQueryParameter: any,
    stoId?: any
  ): Promise<AffiliateReportViewDto[]>;
  insertStoInvestors(
    pasteSettingsStoId: number,
    investorIds: number[]
  ): Promise<null>;
  enableDisableInvestorLogin(
    isActive: boolean,
    investorId: number,
    stoId: number
  ): Promise<null>;
  enableDisableInvestorLoginForAllStos(
    isActive: boolean,
    investorId: number
  ): Promise<null>;
  enable2FAForAll(): Promise<null>;
}
