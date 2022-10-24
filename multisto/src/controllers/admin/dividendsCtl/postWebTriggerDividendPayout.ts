import { Response } from "express";
import common from "../../../modules/common";
import DividendsModule from "../../../services/investors/dividends/api/DividendsModule";
import IDividendsModule from "../../../services/investors/dividends/api/IDividendsModule";

const validateRequest = (req: any, res: Response): boolean => {
  if (!req.session.stoid) {
    res.sendStatus(403);
    return false;
  }
  if (!req.body.id || Number.isNaN(+req.body.id)) {
    res
      .status(400)
      .send({ message: "Missing form param 'id' for dividend template ID" });
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
        res.redirect("dividends");
      } else {
        common.handleError(
          `In DividendsCtl postWebTriggerDividendPayout - Dividend couldn't be paid as template ID was not found`
        );
      }
    }
  } catch (err) {
    const error = new Error(`${err}`);
    common.handleError(
      `In DividendsCtl postWebTriggerDividendPayout - ${error.stack}`
    );
  }
};
