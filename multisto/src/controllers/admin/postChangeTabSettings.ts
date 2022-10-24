import { Response } from "express";
import logger from "../../logger";
import IStoService from "../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../services/investorClient/affiliate/data/StoSqlService";

export default async (req: any, res: Response) => {
  try {
    const { favicon, tabTitle } = req.body;
    const stoService: IStoService = new StoSqlService();
    const sto0 = await stoService.getSto(0);
    if (!sto0) {
      logger.error(`no sto0 - Error occurred in postChangeTabSettings`);
      res.redirect("/platform/platformsettings");
    }
    if (sto0?.settings) {
      const stoSettings = JSON.parse(sto0?.settings);
      if (favicon !== stoSettings.favicon) {
        stoSettings.favicon = favicon;
        await stoService.updateParameter(
          0,
          "settings",
          JSON.stringify(stoSettings)
        );
      }
      if (tabTitle !== stoSettings.tabTitle) {
        stoSettings.tabTitle = tabTitle;
        await stoService.updateParameter(
          0,
          "settings",
          JSON.stringify(stoSettings)
        );
      }
    } else {
      const stoSettings = {
        favicon,
        tabTitle,
      };
      await stoService.updateParameter(
        0,
        "settings",
        JSON.stringify(stoSettings)
      );
    }
    res.redirect("/platform/platformsettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in postChangeTabSettings`);
  }
};
