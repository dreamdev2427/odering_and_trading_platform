import { Request, Response } from "express";
import logger from "../../../logger";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";

export default async (req: Request, res: Response) => {
  const stoService: IStoService = new StoSqlService();
  try {
    await stoService.updateParameter(
      req.body.stoId,
      "investmentReturn",
      req.body.investmentReturn
    );
    res.redirect(`settings?id=${req.body.stoId}`);
  } catch (error) {
    logger.error(`${error} - Error occurred in postStoInvestmentReturn`);
    res.status(400).send("Bad Request");
  }
};
