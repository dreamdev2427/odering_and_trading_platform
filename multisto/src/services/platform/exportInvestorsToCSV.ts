import moment from "moment";
import mysql from "../../modules/mysql";
import SqlQuery, {
  getQueryfactory,
  SQLConnection,
} from "../investorClient/documents/data/SqlQuery";
import { Investments, Investor, Investorsto } from "../../Schema";

type CSVValue = number | string | undefined | null;
const replaceAll = (
  s: string,
  searchValue: string,
  targetValue: string
): string =>
  s.includes(searchValue)
    ? replaceAll(s.replace(searchValue, targetValue), searchValue, targetValue)
    : s;
const csvDateFormat = (date: Date) => moment(date).format("YYYY-MM-DD");
const arrayToCSVLine = (arr: any[]) => arr.join(",");
const removeCommas = (val: CSVValue): CSVValue =>
  typeof val === "string" ? replaceAll(val, ",", " ") : val;
const flattenReducer = <T>(acc: T[], val: T[]) => [...acc, ...val];
const selectInvestorProfileData = (
  investor: Investorsto & Investor
): CSVValue[] => [
  investor.investorType,
  investor.FirstName,
  investor.LastName,
  investor.email,
  investor.CompanyName,
  investor.TitleWithinCompany,
  investor.PowerToBindCompany,
  investor.Address,
  investor.country,
  investor.phone,
  investor.zip,
  investor.town,
  investor.state,
  investor.PassportNumber,
  investor.NationalID,
  investor.DOB ? csvDateFormat(investor.DOB) : undefined,
  investor.notes,
];
const selectInvestmentData = (investment: Investments): CSVValue[] => [
  investment.sharetypeid,
  investment.TokensTransferred,
  investment.DateTime ? csvDateFormat(investment.DateTime) : undefined,
  investment.Description,
];

const investmentBelongsToInvestorPredicate = (investor: Investor) => (
  investment: Investments
) => investor.ID === investment.InvestorID;

const selectInvestorData = (investments: Investments[]) => (
  investor: Investorsto & Investor
): CSVValue[] => [
  ...selectInvestorProfileData(investor),
  ...investments
    .filter(investmentBelongsToInvestorPredicate(investor))
    .map(selectInvestmentData)
    .reduce(flattenReducer, []),
];
const investorDataToCSV = (
  investors: (Investorsto & Investor)[],
  investments: Investments[]
): string =>
  investors
    .map(selectInvestorData(investments))
    .map((row) => row.map(removeCommas))
    .map(arrayToCSVLine)
    .join("\n");
// `${investor.investorType},${investor.FirstName},${investor.LastName},${investor.email},${investor.},${},${},${},${},${},${}`

export default async (stoID: number) => {
  const queryfactory = getQueryfactory(
    mysql.executeSQLStatement as SQLConnection
  );

  const investorsQuery = queryfactory<Investorsto & Investor>(
    "SELECT * FROM investorsto INNER JOIN investor on investorsto.investorid=investor.ID where investorsto.stoid=?;",
    [stoID]
  );
  const investmentsQuery = queryfactory<Investments>(
    "SELECT * FROM investments WHERE stoid = ?;",
    [stoID]
  );
  const [investors, investments] = await SqlQuery.all(
    investorsQuery,
    investmentsQuery
  );
  return investorDataToCSV(investors, investments);
};
