import { Response } from "express";
import IBrokerFeeService from "../../../services/platform/fees/IBrokerFeeService";
import BrokerFeeSqlService from "../../../services/platform/fees/BrokerFeeSqlService";
import logger from "../../../logger";
import common from "../../../modules/common";

export default async (req: any, res: Response) => {
  try {
    const brokerService: IBrokerFeeService = new BrokerFeeSqlService();
    const invitedInvestors = await brokerService.getInvitedInvestors(
      req.session.user.ID
    );
    const invitedInvestorsCount = invitedInvestors.length;

    res.render("broker/invitedInvestors", {
      partials: common.getBrokerWizardPartials(),
      Data: common.getBrokerWizardPageProperties(req),
      invitedInvestors,
      invitedInvestorsCount,
      successMessage: req.flash("successMessage"),
      errorMessage: req.flash("errorMessage"),
    });
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in getInvitedInvestors");
  }
};
