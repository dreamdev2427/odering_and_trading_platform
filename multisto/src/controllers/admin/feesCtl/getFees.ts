import { Response } from "express";
import IFeeService from "../../../services/platform/fees/IFeeService";
import FeeSqlService from "../../../services/platform/fees/FeeSqlService";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";
import CurrencySqlService from "../../../services/platform/currency/data/CurrencySqlService";

const {
  default: getSTOFromConfig,
} = require("../../../services/getSTOFromConfig");

export default async (req: any, res: Response) => {
  try {
    const feeService: IFeeService = new FeeSqlService();
    const stoService: IStoService = new StoSqlService();
    const stoList = await stoService.getStos();
    const fees = await feeService.getAll();
    const feesCount = fees.length;
    const currencyService = new CurrencySqlService();
    const currencySign =
      (
        await currencyService.findById(
          getSTOFromConfig(req.session.stoid).settings.DefaultSTOCurreny
        )
      )?.Symbol ?? "";

    res.render("platform/fees", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      fees,
      feesCount,
      currencySign,
      stoList,
      successMessage: req.flash("successMessage"),
      errorMessage: req.flash("errorMessage"),
    });
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in getFees");
  }
};
