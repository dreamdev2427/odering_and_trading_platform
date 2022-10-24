import { Request, Response } from "express";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import mysql from "../../../modules/mysql";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import ExportObjectToCsv from "../../../services/generic/ExportObjectToCsv";
import IExportObjectToCsv from "../../../services/generic/IExportObjectToCsv";
import { extractQueryProperties } from "../../../services/investorClient/investor/dto/SearchAndOrderQueryLists";

const url = require("url");

export default async (req: Request, res: Response) => {
  // get the investors based on filter

  const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
  const investorService: IInvestorService = new InvestorSqlService(query);
  const queryProperties = extractQueryProperties(req);
  const incompleteKycResults = await investorService.getIncompleteKycInvestors(
    undefined,
    queryProperties.searchQueryProperties,
    queryProperties.orderQueryProperties,
    queryProperties.selectQueryProperties
  );
  const exportObjectToCsv: IExportObjectToCsv = new ExportObjectToCsv();
  const csv = exportObjectToCsv.objectsToCSV(incompleteKycResults);
  if (csv === "") {
    return res.redirect(
      url.format({ pathname: "/platform/investors", query: req.query })
    );
  }
  res.header("Content-Type", "text/csv;charset=utf-8,%EF%BB%BF");
  res.attachment(`${new Date()}-Investors-export.csv`);
  return res.send(csv);
};
