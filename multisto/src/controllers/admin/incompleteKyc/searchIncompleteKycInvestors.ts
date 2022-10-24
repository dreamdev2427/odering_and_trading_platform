import { Request, Response } from "express";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import { extractQueryProperties } from "../../../services/investorClient/investor/dto/SearchAndOrderQueryLists";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";

export default async (req: Request, res: Response) => {
  const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
  const investorService: IInvestorService = new InvestorSqlService(query);
  try {
    const recordsPage = req.query.recordsPage ?? 1;
    const queryProperties = extractQueryProperties(req);
    const incompleteKycCount = await investorService.countIncompleteKycInvestors(
      queryProperties.searchQueryProperties
    );
    const incompleteKycResults = await investorService.getIncompleteKycInvestors(
      +recordsPage,
      queryProperties.searchQueryProperties,
      queryProperties.orderQueryProperties
    );
    const globalObj = global as any;
    const stoService: IStoService = new StoSqlService();
    const stoList = await stoService.getStos();
    res.render("platform/incompletelist", {
      stoList,
      countryList: common.getCountries(),
      RecordCount: incompleteKycCount,
      RecordsPerPaging: globalObj.config.RecordsPerPaging,
      DataRows: incompleteKycResults,
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${
        (error as Error).message
      } - Error occurred in getAllIncompleteKycInvestors`
    );
  }
};
