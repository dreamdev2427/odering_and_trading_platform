import { Request, Response } from "express";
import logger from "../../../logger";
import AbstractSqlService from "../../../services/generic/AbstractSqlService";

class SqlSvc extends AbstractSqlService {}
type Whitelist = {
  table: string;
  columns?: string[];
};
const whitelist: Whitelist[] = [
  {
    table: "InvestorBuyPropertyAlert",
  },
  {
    table: "sharetypes",
  },
  {
    table: "investor",
    columns: ["ID"],
  },
  {
    table: "investorsto",
    columns: [
      "id",
      "investorid",
      "stoid",
      "expectedShares",
      "expectedInvestment",
      "isKYC",
      "KYCApplied",
      "KYCUpdateDate",
      "KYCCurrentStatus",
      "isActive",
      "KycExpiryDate",
    ],
  },
];

export default async (req: Request, res: Response) => {
  try {
    const svc = new SqlSvc();
    const tables: string[] = whitelist.map((w) => w.table);
    if (tables.includes(req.params.name)) {
      const rawResources = await svc.findAll(req.params.name);

      const resources = rawResources.map(
        (raw: { [s: string]: unknown } | ArrayLike<unknown>) => {
          const columns = (whitelist.find(
            (w) => w.table === req.params.name
          ) as Whitelist).columns;

          if (columns) {
            const clean: { [key: string]: unknown } = {
              __tablename: req.params.name,
            };
            Object.entries(raw).forEach((kv) => {
              if (columns.includes(kv[0])) {
                clean[kv[0]] = kv[1];
              }
            });
            return clean;
          }
          return { __tablename: req.params.name, ...raw };
        }
      );

      res.send(resources);
      // res.send(rawResources);
    } else {
      res.sendStatus(404);
    }
  } catch (e: any) {
    res.sendStatus(404);
    logger.error(`${e.stack}`);
  }
};
