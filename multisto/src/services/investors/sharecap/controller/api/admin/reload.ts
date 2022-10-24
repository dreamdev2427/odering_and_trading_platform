import { Request, Response } from "express";
import logger from "../../../../../../logger";
import svc from "../../../sharecap-table.service";

export default async (req: Request, res: Response) => {
  let isUserError = false;
  try {
    const stoID = req.query.stoid ?? req.query.stoID;
    if (stoID === undefined || Number.isNaN(+stoID)) {
      isUserError = true;
      throw new Error(`STO ID not specified`);
    }
    const table = await svc.updateShareCapTable(+stoID);
    res.send(table);
  } catch (e) {
    if (isUserError) {
      res.sendStatus(400).send(e);
    } else {
      logger.error(
        `ShareCap table API error at api-get:\n${(e as Error).stack}`
      );
      res.sendStatus(500);
    }
  }
};
