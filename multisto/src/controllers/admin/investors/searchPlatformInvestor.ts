import { Request, Response } from "express";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import mysql from "../../../modules/mysql";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
  const investorService: IInvestorService = new InvestorSqlService(query);
  try {
    const investorLineResults = await investorService.serachInvestor(
      req.query.searchInvestorsQuery
    );
    res.status(200).send(JSON.stringify(investorLineResults));
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in searchPlatformInvestor`
    );
  }
};
