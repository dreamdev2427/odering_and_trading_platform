import { Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: any, res: Response) => {
  try {
    const globalOjb = global as any;
    const isSellBackEnabled = globalOjb.config.isSellBackEnabled;
    const doAutomaticSellBack = globalOjb.config.doAutomaticSellBack;

    res.render("platform/sellBack-ModeSettings/sellBack-ModeSettings", {
      isSellBackEnabled,
      doAutomaticSellBack,
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    logger.error(`${error} - Error occurred in get-sellBack-ModeMainPageInfo`);
  }
};
