import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const globalObj = global as any;
    const commonPath = "platform/partial-switches";
    const appDir = path.dirname(mainFilename);

    const partialPath = {
      isInvoiceEnabledSwitch: `${appDir}/../views/${commonPath}/isInvoicingEnabledSwitch`,
      isMergingPaymentsSharesRequestsEnabledSwitch: `${appDir}/../views/${commonPath}/isMergingPaymentsSharesRequestsEnabledSwitch`,
    };

    res.render("platform/invoicemanagment/invoicemanagmentmainpage", {
      isMergingPaymentsSharesRequestsEnabled:
        globalObj.config.isMergingPaymentsSharesRequestsEnabled,
      isInvoicingEnabled: globalObj.config.isInvoicingEnabled,
      partials: common.getPlatformPartials(partialPath),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    logger.error(
      `${JSON.stringify(error)} - Error occurred in manageInvoiceBoard`
    );
  }
};
