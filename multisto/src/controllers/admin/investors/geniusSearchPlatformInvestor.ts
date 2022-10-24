import { Request, Response } from "express";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import mysql from "../../../modules/mysql";
import common from "../../../modules/common";
import AffiliateReportViewDto from "../../../services/investorClient/affiliate/dto/AffiliateReportViewDto";

type InvestorAffiliate = {
  ID: number;
  StoId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Country: string;
  LineCount: number;
  PersonalInvestmentVolume: number;
  TotalDownlineInvestmentVolume: number;
  LineDetails: AffiliateReportViewDto[];
};

function generateOverview(investorLineResults: AffiliateReportViewDto[]) {
  const helper: any = {};
  const result = investorLineResults.reduce(
    (tempResult: any, value: AffiliateReportViewDto) => {
      const key = `${value.ID}-${value.stoid}`;

      if (!helper[key]) {
        // eslint-disable-next-line no-param-reassign
        helper[key] = {
          ID: value.ID,
          LineCount: 0,
          TotalDownlineInvestmentVolume: 0,
          PersonalInvestmentVolume:
            value.rootInvestorTotalPersonalInvestmentVolume,
          StoId: value.stoid,
          FirstName: value.FirstName,
          LastName: value.LastName,
          Email: value.email,
          Country: value.country,
          LineDetails: [],
        };
        tempResult.push(helper[key]);
      } else {
        helper[key].LineCount += 1;
        helper[key].TotalDownlineInvestmentVolume += value.armVolume;
        helper[key].LineDetails.push(value);
      }

      return tempResult;
    },
    []
  );
  return result;
}

function getFilteredCodes(
  array: any[],
  filterType: string,
  key: string,
  value: any
) {
  if (filterType === "searchArmFrom") {
    return array.filter((investorOverview) =>
      investorOverview.LineDetails.some(
        (line: AffiliateReportViewDto) => line.armVolume >= value
      )
    );
  }
  if (filterType === "searchArmTo") {
    return array.filter((investorOverview) =>
      investorOverview.LineDetails.every(
        (line: AffiliateReportViewDto) => line.armVolume <= value
      )
    );
  }
  if (filterType.includes("From")) {
    return array.filter((e) => e[key] >= value);
  }
  if (filterType.includes("To")) {
    return array.filter((e) => e[key] <= value);
  }
  return array.filter((e) => e[key] === value);
}

function filterInvestorsOnAffiliateQuery(investors: any[], query: any) {
  const queryParamToSqlDictionary: any = {
    searchLinesFrom: `LineCount`,
    searchLinesTo: `LineCount`,
    searchArmFrom: ``,
    searchArmTo: ``,
    searchPersonalFrom: `PersonalInvestmentVolume`,
    searchPersonalTo: `PersonalInvestmentVolume`,
    searchDownlineFrom: `TotalDownlineInvestmentVolume`,
    searchDownlineTo: `TotalDownlineInvestmentVolume`,
  };
  let result = investors;
  Object.keys(query).forEach((propName) => {
    if (propName in queryParamToSqlDictionary) {
      result = getFilteredCodes(
        result,
        propName,
        queryParamToSqlDictionary[propName],
        query[propName]
      );
    }
  });
  return result;
}

export default async (req: Request, res: Response) => {
  const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
  const investorService: IInvestorService = new InvestorSqlService(query);
  try {
    const investorLineResults = await investorService.geniusSerachInvestor(
      req.query.searchInvestorsQuery,
      req.query.stoId
    );
    const investorAffiliateOverview: InvestorAffiliate[] = generateOverview(
      investorLineResults
    );
    const filteredInvestors = filterInvestorsOnAffiliateQuery(
      investorAffiliateOverview,
      req.query
    );
    res.status(200).send(JSON.stringify(filteredInvestors));
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in searchPlatformInvestor`
    );
  }
};
