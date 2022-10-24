import { Response } from "express";
import logger from "../../../../logger";
import DividendsModule from "../../../../services/investors/dividends/api/DividendsModule";
import IDividendsModule from "../../../../services/investors/dividends/api/IDividendsModule";
import prettifiers from "../helpers/prettifiers";

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
      const stoId = +req.session.stoid;
      const id = +req.params.id;
      const Dividends: IDividendsModule = new DividendsModule();
      const payoutRecs = await Dividends.listDividendPayouts(stoId, id);
      // Sort in descending date order, newest first
      payoutRecs.sort(
        (a, b) => a.dateTimeDue.valueOf() - b.dateTimeDue.valueOf()
      );
      const payouts = prettifiers.dividendView(payoutRecs, false);
      // console.log(`DIVIDEND PAYOUTS / ${id}`);
      // console.log(payouts);
      res.send({ data: payouts });
    }
  } catch (err) {
    logger.error(`${(err as Error).stack}`);
    res.sendStatus(500);
  }
};
