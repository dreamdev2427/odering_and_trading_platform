import { Response } from "express";
import logger from "../../../../logger";
import DividendsModule from "../../../../services/investors/dividends/api/DividendsModule";
import IDividendsModule from "../../../../services/investors/dividends/api/IDividendsModule";

const validateRequest = (req: any, res: Response): boolean => {
  if (!req.session.stoid) {
    res.sendStatus(403);
    return false;
  }
  if (!req.params.id || Number.isNaN(+req.params.id)) {
    res
      .status(400)
      .send({ message: "Missing URL param 'id' for dividend template ID" });
    return false;
  }
  return true;
};
export default async (req: any, res: Response) => {
  try {
    if (validateRequest(req, res)) {
      const svc: IDividendsModule = new DividendsModule();
      const success = await svc.payDividend(
        +req.session.stoid,
        +req.body.id,
        +(req.session.userID ?? 0)
      );
      if (success) {
        res.sendStatus(200);
      } else {
        res.status(400).send({ message: "Template ID not found" });
      }
    }
  } catch (err) {
    const error = new Error(`${err}`);
    logger.error(`${error.stack}`);
    res.sendStatus(500);
  }
};
