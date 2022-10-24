import { NextFunction, Response } from "express";
import logger from "../../../logger";
import { findOne } from "../../../modules/db";
import { Investorsto, Investor } from "../../../Schema";

export default async (req: any, res: Response, next: NextFunction) => {
  const globalObj = global as any;
  if (globalObj.config.AccreditationEnabled) {
    const stmt = `select s.KYCCurrentStatus, i.taxResidencyCountry 
                    from investor i
                    inner join investorsto s on i.id = s.investorid 
                    where i.id = ? 
                        and s.stoid = ${
                          globalObj.config.stos[req.hostname].stoid
                        }`;
    const accreditationRequiredCountries = [
      "United States",
      "United States of America",
      "USA",
      "US",
    ];
    return findOne<Investorsto & Investor>(stmt, [req.session.user.ID])
      .then((row) => {
        if (
          accreditationRequiredCountries.find(
            (c) => c.toLowerCase() === row?.taxResidencyCountry?.toLowerCase()
          ) &&
          row?.KYCCurrentStatus !== 3
        ) {
          req.session.context = row?.KYCCurrentStatus;
          return res.redirect("/accreditationMainView");
        }
        return next();
      })
      .catch((error: Error) => {
        req.flash("UserMessage1", "Something Happened. Please contact admin");
        logger.error(`${error} - Error occurred in accrditationMiddleware`);
        return res.redirect("/login");
      });
  }
  return next();
};
