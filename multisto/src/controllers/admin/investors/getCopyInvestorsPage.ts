import { Request, Response } from "express";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import mysql from "../../../modules/mysql";
import common from "../../../modules/common";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";

export default async (req: Request, res: Response) => {
  const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
  const investorService: IInvestorService = new InvestorSqlService(query);
  try {
    const investorResults = await investorService.getInvestorsForSto(0);
    const stoService: IStoService = new StoSqlService();
    const stoResults = await stoService.getStos();
    res.render("platform/copyInvestors", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      investorsList: encodeURIComponent(JSON.stringify(investorResults)),
      stoList: encodeURIComponent(JSON.stringify(stoResults)),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in getInvestorsPage`
    );
  }
};
