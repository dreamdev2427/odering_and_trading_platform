import { Request, Response } from "express";
import common from "../../../modules/common";
import logger from "../../../logger";

import { insert } from "../../../modules/db";

export default async (req: Request, res: Response) => {
  const adminID = req.session.user?.ID;
  try {
    const logDescription = `Project Administrator Log In. Users.ID: ${adminID}`;
    const sql =
      "INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);";
    await insert(sql, [req.session.stoid, adminID, logDescription, -1, 20, -1]);
    logger.info(
      `Project Administrator Log In. Users.ID: ${adminID} STO ID: ${req.session.stoid} User ID: ${adminID} Investor ID: -1 Activity Type ID: 20 Rec ID: -1`
    );
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error in INSERT INTO logs`
    );
    logger.error(`${error} - Error occurred in login`);
    return;
  }
  res.redirect("/admin/dashboardsto");
};
