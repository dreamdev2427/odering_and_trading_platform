import { Request, Response } from "express";
import common from "../../../modules/common";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";

export default async (req: Request, res: Response) => {
  try {
    const stoService: IStoService = new StoSqlService();
    const stoResults = await stoService.getStos();
    const globalObj = global as any;
    const { affiliateUpdateServiceInProgress } = globalObj.config;
    res.render("platform/genius/investorSearch", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      stoList: encodeURIComponent(JSON.stringify(stoResults)),
      affiliateUpdateServiceInProgress: encodeURIComponent(
        JSON.stringify(affiliateUpdateServiceInProgress)
      ),
    });
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in getInvestorsPage`
    );
  }
};
