import { Sharetypes } from 'DBSchema';
import { findMany, findOne } from 'core/mysql';

export type DataRow = {
  investorid: number;
  shareTypeid: number;
  firstname: string;
  lastname: string;
  nominalValue: number;
  premimum: number;
  currencyid: number;
  isVotingRightsApplicable: number;
  isDividendRightsApplicable: number;
  votingPower: number;
  title: string;
  shares: number;
  voteShares: number;
  investorType: number;
  CompanyName: string;
  Percent: number;
  AmountInvested: number;
  totalInvestorInvestment: number;
  totalinvestorDividend: number;
  totalInvestorVotingSharesPercent: number;
  totalInvestorVotingShares: number;
};
export type ShareCapTable = {
  shareTypes?: Sharetypes[];
  // totalShares?: { totalShares: number, totalCompanyShares: number },
  totalShares?: number;
  totalCustodianShares?: number;
  totalCompanyShares?: number;
  totalVotingPower?: number;
  SoldPercentageNumber?: number;
  SoldPercentage?: string;
  DataRows?: DataRow[];
  totalInvestmentInCompany?: number;
};

export const shareCap = async (stoid: number): Promise<ShareCapTable> => {
  const params: ShareCapTable = {
    totalVotingPower: 1,
  };
  // function calculateCompanyShares() {
  params.shareTypes = await findMany<Sharetypes>(
    `select *,currencyid as currencyID,stoid as stoID from sharetypes where stoid = ?`,
    [stoid],
  );
  // params.totalShares = await findOne('select sum(totalShares) as totalShares, sum(companyShares) as totalCompanyShares from sharetypes where stoid = ?', [stoid])
  type TotalShares = {
    totalShares: number;
    totalCompanyShares: number;
    totalCustodianShares: number;
  };
  const totalShares = await findOne<TotalShares>(
    `select sum(totalShares) as totalShares, sum(companyShares) as totalCompanyShares, sum(custodianShares) as totalCustodianShares from sharetypes where stoid = ?`,
    [stoid],
  );
  params.totalShares = totalShares?.totalShares ?? 0;
  params.totalCompanyShares = totalShares?.totalCompanyShares ?? 0;
  params.totalCustodianShares = totalShares?.totalCustodianShares ?? 0;
  // function calculateTotalVoteableShares(callback) {
  type Sums = { sums: number };
  const sums: Sums | null = await findOne(
    `select sum(shares) * votingPower as sums from shares s, sharetypes p where s.sharetypeid = p.id and isvotingrightsapplicable = 1 and p.stoid = ?`,
    [stoid],
  );
  params.totalVotingPower = sums?.sums ?? 1;
  // function getNonBlockchainData(callback) {
  const sql3 = `select s.investorid, s.shareTypeid, i.firstname, i.lastname, nominalvalue, premimum, currencyid,isVotingRightsApplicable, isDividendRightsApplicable, votingPower,
            p.title, sum(shares) as shares, sum(shares) * votingPower as voteShares, investorType, CompanyName
            from shares s join sharetypes p on s.shareTypeid = p.id and s.shares > 0
            join investor i on i.id = s.investorid where s.stoid = 2
            group by s.investorid, s.shareTypeid  WITH ROLLUP`;
  const result: DataRow[] = await findMany(sql3, [stoid]); // .then((result) => {
  params.SoldPercentageNumber = 0;
  let investorid = -1; // was "test"
  let totalInvestorInvestment = 0;
  let totalinvestorDividend = 0;
  let totalInvestorVotingShares = 0;
  let totalInvestmentInCompany = 0;
  result.forEach((obj) => {
    if (investorid !== obj.investorid) {
      investorid = obj.investorid;
    } else {
      obj.firstname = '';
      obj.lastname = '';
      obj.CompanyName = '';
    }
    if (obj.isVotingRightsApplicable === 1) {
      obj.Percent = +((obj.voteShares / (params.totalVotingPower ?? 1)) * 100).toFixed(2);

      // TEMPORARY FIX
      obj.Percent /= 10;

      obj.AmountInvested = obj.premimum * obj.shares;
      if (obj.shareTypeid != null) {
        totalInvestorVotingShares += obj.voteShares;
        totalInvestmentInCompany += obj.AmountInvested;
      }
    }
    if (obj.shareTypeid != null) {
      params.SoldPercentageNumber =
        (params.SoldPercentageNumber ?? 0) + (obj.shares / (params.totalShares ?? 1)) * 100;
      totalinvestorDividend += obj.shares;
      if (obj.AmountInvested != null) {
        totalInvestorInvestment += obj.AmountInvested;
      }
    } else {
      obj.shareTypeid = -1;
      obj.Percent = +((obj.shares / (params.totalVotingPower ?? 1)) * 100).toFixed(2);

      // TEMPORARY FIX
      obj.Percent /= 10;

      obj.totalInvestorInvestment = totalInvestorInvestment;
      totalInvestorInvestment = 0;
      obj.totalinvestorDividend = totalinvestorDividend;
      totalinvestorDividend = 0;
      obj.totalInvestorVotingSharesPercent = +(
        (totalInvestorVotingShares / (params.totalVotingPower ?? 1)) *
        100
      ).toFixed(2);

      // TEMPORARY FIX
      obj.totalInvestorVotingSharesPercent /= 10;

      obj.totalInvestorVotingShares = totalInvestorVotingShares;
      totalInvestorVotingShares = 0;
      if (obj.investorid == null) {
        obj.investorid = -1;
      }
    }
  });
  params.DataRows = result;
  params.SoldPercentage = params.SoldPercentageNumber.toFixed(2);
  params.totalInvestmentInCompany = totalInvestmentInCompany;
  return params;
};
