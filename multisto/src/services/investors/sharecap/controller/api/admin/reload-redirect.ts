import { Request, Response } from "express";
import logger from "../../../../../../logger";
import svc from "../../../sharecap-table.service";

export default async (req: Request, res: Response) => {
  let isUserError = false;
  try {
    const stoID = ((req as unknown) as { session: { stoid?: number } }).session
      .stoid;
    if (stoID === undefined || Number.isNaN(+stoID)) {
      isUserError = true;
      throw new Error(`STO ID not specified`);
    }
    await svc.updateShareCapTable(+stoID);
    res.redirect("/admin/shares");
  } catch (e) {
    if (isUserError) {
      res.sendStatus(400).send((e as Error).message);
    } else {
      logger.error(
        `ShareCap table API error at api-get:\n${(e as Error).stack}`
      );
      res.sendStatus(500);
    }
  }
};
