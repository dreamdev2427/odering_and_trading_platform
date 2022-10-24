import { Request, Response } from "express";
import IFeeService from "../../../services/platform/fees/IFeeService";
import FeeSqlService from "../../../services/platform/fees/FeeSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  try {
    const feeService: IFeeService = new FeeSqlService();
    const { deleteID } = req.body;
    if (deleteID) {
      await feeService.deleteOne(deleteID);
    }
    res.redirect(`fees`);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in deleteFee");
  }
};
