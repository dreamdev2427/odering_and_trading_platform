import { Request, Response } from "express";
import logger from "../../../../../../logger";
import common from "../../../../../../modules/common";
import ShareCapTable from "../../../sharecap-table.service";

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const currentSettings = await ShareCapTable.getPlatformSettings();
    res.render(`platform/shareRegisterSettings/shareRegisterSettings`, {
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
      currentSettings,
    });
  } catch (e) {
    logger.error(
      `in sharecap/controller/web/platform-admin getShareRegisterSettings\n:${
        (e as Error).stack
      }`
    );
    res.redirect("/platform/platformsettings");
  }
};
