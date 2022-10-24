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
        // Platform Admin's Balance Should Be Decreased And The Broker's Balance Should Be Increased
        await commissionService.updateStatus(commissionID, Status.Completed);
      }
    }
    res.redirect(`commissions`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in approveCommission");
  }
};
