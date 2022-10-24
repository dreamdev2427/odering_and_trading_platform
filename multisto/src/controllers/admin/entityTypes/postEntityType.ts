import { Request, Response } from "express";
import common from "../../../modules/common";
import mysql from "../../../modules/mysql";

export default async (req: Request, res: Response) => {
  const title = req.body.title;
  const country = req.body.country;
  const listCountries = common.getCountries();
  let countries;
  try {
    if (
      (typeof req.body.country === "object" &&
        country.length === listCountries.length) ||
      // eslint-disable-next-line eqeqeq
      req.body.allCountries == "on"
    )
      countries = '["ALL"]';
    else if (typeof req.body.country === "object")
      countries = JSON.stringify(country);
    else if (typeof req.body.country === "string")
      countries = JSON.stringify([country]);

    if (!title || !(countries || req.body.allCountries))
      throw new Error("Countries Or Title Invalid.");
    if (req.body.ID) {
      // update
      const stmt =
        "update investing_entity_types set title = ? , countries = ? where ID = ? ";
      mysql
        .executeSQLStatement(stmt, [title, countries, req.body.ID])
        .then(() => {
          res.redirect("/platform/platformsettings");
        });
    } else {
      // create
      const stmt =
        "insert into investing_entity_types (title , countries) values (?,?) ";
      mysql.executeSQLStatement(stmt, [title, countries]).then(() => {
        res.redirect("/platform/platformsettings");
      });
    }
  } catch (error: any) {
    common.handleError(
      req,
      res,
      `${error.message} Error occured in admin entityType postEntityType`
    );
  }
};
