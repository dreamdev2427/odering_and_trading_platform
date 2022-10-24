import { Request, Response } from "express";
import mysql from "../../../modules/mysql";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  try {
    if (
      req.body &&
      Object.keys(req.body).length !== 0 &&
      req.body.Address !== "" &&
      req.body.cryptoReceivingAddress !== ""
    ) {
      const data = req.body;
      const sql = `UPDATE currency SET blockchainID = ?, isNative = ?, Address = ?, cryptoReceivingAddress =? WHERE ID = ?`;
      await mysql.executeSQLStatement(sql, [
        data.blockchainID,
        data.isNative,
        data.Address,
        data.cryptoReceivingAddress,
        data.ID,
      ]);
    }
    res.redirect("/platform/getCurrencySearchPage");
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} - Error occurred in getCurrencySearchPage`
    );
    res.redirect("/platform/getCurrencySearchPage");
  }
};
