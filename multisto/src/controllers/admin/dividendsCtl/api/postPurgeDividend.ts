import { Response } from "express";
import logger from "../../../../logger";
import DividendsModule from "../../../../services/investors/dividends/api/DividendsModule";
import IDividendsModule from "../../../../services/investors/dividends/api/IDividendsModule";

const validateRequest = (req: any, res: Response): boolean => {
  if (!req.session.stoid) {
    res.sendStatus(403);
    return false;
  }
  if (!req.body.id || Number.isNaN(+req.body.id)) {
    res
      .status(400)
      .send({ message: "Missing form param 'id' for dividend payout ID" });
    return false;
  }
  return true;
};
export default async (req: any, res: Response) => {
  try {
    if (validateRequest(req, res)) {
      const svc: IDividendsModule = new DividendsModule();
      logger.info(`Purging dividend id:${req.body.id}...`);
      await svc.purgeDividend(+req.body.id);
      logger.info(`Done.`);
      res.sendStatus(200);
    }
  } catch (err) {
    const error = new Error(`${err}`);
    logger.error(`Couldn't delete dividend:\n${error.stack}`);
    res.sendStatus(500);
  }
};
