import { Request, Response } from "express";

import common from "../../../modules/common";
import logger from "../../../logger";
import { insert } from "../../../modules/db";

export default async (req: Request, res: Response) => {
  const adminID = req.session.user?.ID;
  const stoID = req.session.stoid;

  try {
    const logDescription = `Project Administrator Log Out. Users.ID: ${adminID}`;
    const sql = `INSERT INTO logs (stoid, UserID, LogDate, Description, InvestorID, ActivityType, recid) values (?,?,NOW(),?,?,?,?);`;
    insert(sql, [stoID, adminID, logDescription, -1, 25, -1])
      .then(() => {
        logger.info(
          `Project Administrator Log Out. Users.ID: ${adminID} STO ID: ${stoID} User ID: ${adminID} Investor ID: -1 Activity Type ID: 25 Rec ID: -1`
        );
      })
      .catch((error: Error) => {
        common.handleError(
          req,
          res,
          `${error.message} Error in INSERT INTO logs`
        );
      });
  } catch (error) {
    logger.error(`${error} - Error occurred in getAdminLogout`);
  }

  req.session.destroy(() => {
    res.redirect("/admin/login");
    // login did not use for admin??
    // req.logout(() => {
    // });
  });
};
