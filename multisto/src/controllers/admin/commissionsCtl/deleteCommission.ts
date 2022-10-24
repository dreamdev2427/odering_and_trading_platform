import { Request, Response } from "express";
import IFeeCommissionService from "../../../services/platform/fees/IFeeCommissionService";
import FeeCommissionSqlService from "../../../services/platform/fees/FeeCommissionSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  try {
    const commissionService: IFeeCommissionService = new FeeCommissionSqlService();
    const { deleteID } = req.body;
    if (deleteID) {
      await commissionService.deleteOne(deleteID);
    }
    res.redirect(`commissions`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in deleteCommission");
  }
};
