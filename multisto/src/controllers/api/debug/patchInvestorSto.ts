import { Request, Response } from "express";
import logger from "../../../logger";
import { Investor, Investorsto } from "../../../Schema";
import AbstractSqlService from "../../../services/generic/AbstractSqlService";

class SqlSvc extends AbstractSqlService {}

type InvestorSTO = Investor & { investorSTO?: Investorsto };
type InvestorstoRequired = Pick<Investorsto, "investorid" | "stoid">;

/** Creates investorsto records if missing */
export default async (req: Request, res: Response) => {
  try {
    const svc = new SqlSvc();
    const investorStos: Investorsto[] = (await svc.findAll(
      "investorsto"
    )) as Investorsto[];
    const investors: InvestorSTO[] = ((await svc.findAll(
      "investor"
    )) as InvestorSTO[]).map((investor) => ({
      ...investor,
      // Left join investorsto
      investorSTO: investorStos.find((is) => is.investorid === investor.ID),
    }));

    const needed: InvestorstoRequired[] = investors
      .filter((i) => i.investorSTO === undefined)
      .map((i) => ({
        investorid: i.ID,
        stoid: 0,
      }));
    await svc.insertMany<InvestorstoRequired>(needed, "investorsto");
    res.send({
      message: `Inserted ${needed.length} out of ${investors.length} investorsto records`,
      records: needed,
    });
  } catch (e: any) {
    res.sendStatus(404);
    logger.error(`${e.stack}`);
  }
};
