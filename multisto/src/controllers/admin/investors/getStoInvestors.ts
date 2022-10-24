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
    const copyStoId = JSON.parse(JSON.stringify(req.query.copyStoId));
    if (!Number.isNaN(copyStoId)) {
      const investorResults = await investorService.getInvestorsForSto(
        copyStoId
      );
      res.status(200).send(JSON.stringify(investorResults));
    } else {
      res.status(400).send("Passed stoId is a NaN");
    }
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in getStoInvestors`
    );
  }
};
