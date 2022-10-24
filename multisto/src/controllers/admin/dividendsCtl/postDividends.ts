import { Response } from "express";
import logger from "../../../logger";
import DividendsModule from "../../../services/investors/dividends/api/DividendsModule";
import IDividendsModule from "../../../services/investors/dividends/api/IDividendsModule";
import {
  periodUnits,
  PeriodUnitVm,
  strategies,
  StrategyVM,
} from "./helpers/types";
import { typeCastNewDividend, validateNewDividend } from "./helpers/validators";

const url = "/admin/dividends";

const validateReq = async (req: any, res: Response): Promise<boolean> => {
  const rec = req.body;
  rec.stoId = req.session.stoid;
  const errors = await validateNewDividend(rec);
  if (errors.length) {
    req.flash("ValidationErrors", errors);
    req.flash("ErrorMessages", [{ error: "Invalid details for new dividend" }]);
    req.flash("LastModel", JSON.stringify(req.body));
    res.redirect(url);
    return false;
  }
  return true;
};
export default async (req: any, res: Response) => {
  try {
    if (await validateReq(req, res)) {
      const rec = typeCastNewDividend(req.body);
      const recStrategy = strategies.find(
        (s) => s.id === rec.awardStrategy
      ) as StrategyVM;
      const recPeriodUnit = periodUnits.find(
        (p) => p.id === rec.periodUnit
      ) as PeriodUnitVm;
      const Dividends: IDividendsModule = new DividendsModule();
      const date = new Date(rec.dueDate);
      date.setHours(0, 0, 0, 0);
      await Dividends.createDividend({
        awardStrategy: recStrategy.awardStrategy,
        awardValue: rec.awardValue,
        dateTimeDue: date,
        isActive: 1,
        period: rec.period,
        periodUnit: recPeriodUnit.periodUnit,
        status: "unused",
        stoId: req.session.stoid,
        channelId: undefined,
        currencyId: undefined,
        shareTypeId: rec.shareTypeId === 0 ? undefined : rec.shareTypeId,
        title: rec.title,
      });
      res.redirect(url);
    }
  } catch (err) {
    logger.error(`${(err as Error).stack}`);
    req.flash("ErrorMessages", [
      {
        error:
          "A server error has occurred while creating your dividend, so we aborted the operation. Please notify our team.",
      },
    ]);
    res.redirect(url);
  }
};
