import { Request, Response } from "express";
import IFeeCommissionService, {
  Status,
} from "../../../services/platform/fees/IFeeCommissionService";
import FeeCommissionSqlService from "../../../services/platform/fees/FeeCommissionSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  try {
    const commissionService: IFeeCommissionService = new FeeCommissionSqlService();
    const { commissionID } = req.body;
    if (commissionID) {
      const commissionRecord = await commissionService.getByID(commissionID);
      if (commissionRecord?.status === Status.Pending) {
        await commissionService.updateStatus(commissionID, Status.Rejected);
      }
    }
    res.redirect(`commissions`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in rejectCommission");
  }
};
