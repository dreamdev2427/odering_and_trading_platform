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
  if (Number.isNaN(+req.body.awardValue) || +req.body.awardValue === 0) {
    res.status(400).send({
      message: `Can't set awardValue to ${req.body.awardValue}`,
    });
    return false;
  }
  return true;
};
export default async (req: any, res: Response) => {
  try {
    if (validateRequest(req, res)) {
      const svc: IDividendsModule = new DividendsModule();
      await svc.updateAwardValue(+req.body.id, +req.body.awardValue);
      res.sendStatus(200);
    }
  } catch (err) {
    const error = new Error(`${err}`);
    logger.error(`${error.stack}`);
    res.sendStatus(500);
  }
};
