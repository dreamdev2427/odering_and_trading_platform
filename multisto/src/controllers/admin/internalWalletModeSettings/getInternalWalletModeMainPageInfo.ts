import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const globalOjb = global as any;
    const internalWalletMode =
      globalOjb.config.investorInternalWalletProjectSpecific;

    const appDir = path.dirname(mainFilename);
    const commonPath = "platform/partial-switches";
    const partialPath = {
      internalWalletModeSwitches: `${appDir}/../views/${commonPath}/internalWalletModeSwitches`,
    };

    res.render(
      "platform/internalWalletModeSettings/internalWalletModeSettings",
      {
        internalWalletMode,
        partials: common.getPlatformPartials(partialPath),
        Data: common.getPlatformCommonPageProperties(req),
        csrfToken: req.csrfToken(),
      }
    );
  } catch (error) {
    logger.error(
      `${error} - Error occurred in getSharePurchaseModeMainPageInfo`
    );
  }
};
