import { Request, Response } from "express";
import logger from "../../../../../../logger";
import ShareCapTable from "../../../sharecap-table.service";

export default async (req: Request, res: Response) => {
  const isUserError = false; // reserved
  try {
    const currentSettings = await ShareCapTable.getPlatformSettings();
    res.send(currentSettings);
  } catch (e) {
    if (isUserError) {
      res.sendStatus(400).send(e);
    } else {
      logger.error(
        `ShareCap table API error at get-settings:\n${(e as Error).stack}`
      );
      res.sendStatus(500);
    }
  }
};
