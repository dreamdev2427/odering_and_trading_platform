import { Request, Response } from "express";
import logger from "../../../../../../logger";
import ShareCapTable from "../../../sharecap-table.service";
import {
  ShareCapGhostInvestors,
  ShareCapSettings,
} from "../../../sharecap-table.types";

export default async (req: Request, res: Response) => {
  let isUserError = false;
  try {
    const settings: ShareCapSettings = req.body;
    const ghostSetting = +(settings.ghostInvestorBehavior ?? -1);

    if (!Number.isNaN(ghostSetting)) {
      if (
        ghostSetting < 0 ||
        ghostSetting > ShareCapGhostInvestors.HIDE_BUT_SUM
      ) {
        isUserError = true;
        throw new Error(
          `Unrecognized option for setting ghostInvestorBehavior`
        );
      }
      settings.ghostInvestorBehavior = ghostSetting;
    }

    await ShareCapTable.setPlatformSettings(settings);
    res.sendStatus(200);
  } catch (e) {
    if (isUserError) {
      res.sendStatus(400).send(e);
    } else {
      logger.error(
        `ShareCap table API error at post-settings:\n${(e as Error).stack}`
      );
      res.sendStatus(500);
    }
  }
};
