import { Response } from "express";
import common from "../../../modules/common";
import { findOne } from "../../../modules/db";
import { InvestingEntityTypes } from "../../../Schema";

export default async (req: any, res: Response) => {
  let sql;
  let isEditing = false;
  const listCountries = common.getCountries().map((unit) => unit[0]);
  if (req.query.id) {
    sql = `select * from investing_entity_types where ID = ?`;
    isEditing = true;
    return findOne<InvestingEntityTypes>(sql, [req.query.id])
      .then((result) => {
        res.render("platform/entityType/view", {
          isEditing,
          data: { ...result, countries: JSON.parse(result?.countries || "") },
          listCountries,
          partials: common.getPlatformPartials(),
          Data: common.getPlatformCommonPageProperties(req),
          csrfToken: req.csrfToken(),
          message: req.flash("message"),
        });
      })
      .catch((error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error occured in settings detailEntityType`
        );
      });
  }

  return res.render("platform/entityType/view", {
    isEditing,
    listCountries,
    partials: common.getPlatformPartials(),
    Data: common.getPlatformCommonPageProperties(req),
    csrfToken: req.csrfToken(),
    message: req.flash("message"),
  });
};
