import { Response } from "express";
import IFeeCommissionService from "../../../services/platform/fees/IFeeCommissionService";
import FeeCommissionSqlService from "../../../services/platform/fees/FeeCommissionSqlService";
import CurrencySqlService from "../../../services/platform/currency/data/CurrencySqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

const {
  default: getSTOFromConfig,
} = require("../../../services/getSTOFromConfig");

export default async (req: any, res: Response) => {
  try {
    const commissionService: IFeeCommissionService = new FeeCommissionSqlService();
    const commissions = await commissionService.getBrokerCommissions(
      req.session.user.ID
    );
    const commissionsCount = commissions.length;
    const currencyService = new CurrencySqlService();
    const currencySign =
      (
        await currencyService.findById(
          getSTOFromConfig(req.session.stoid).settings.DefaultSTOCurreny
        )
      )?.Symbol ?? "";

    res.render("broker/commissions", {
      partials: common.getBrokerWizardPartials(),
      Data: common.getBrokerWizardPageProperties(req),
      commissions,
      commissionsCount,
      currencySign,
      successMessage: req.flash("successMessage"),
      errorMessage: req.flash("errorMessage"),
    });
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in getCommissions");
  }
};
