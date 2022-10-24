import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const accreditationRootFolder = "platform/accreditation-Mode-Settings";
    const globalObj = global as any;
    const isAccreditationEnabled = globalObj.config.AccreditationEnabled;
    const accreditationProvider = globalObj.config.AccreditationProvider;
    const verifyInvestorComUrls = globalObj.config.verifyInvestorComUrl;
    const verifyInvestorComApiToken =
      globalObj.config.VerifyInvestorComApiToken;
    const accreddRedirectLink = globalObj.config.AccreddRedirectLink;

    const appDir = path.dirname(mainFilename);
    const partialPath: { accreditationModeSettings: string } = {
      accreditationModeSettings: "",
    };
    switch (accreditationProvider) {
      case 0: // verifyInvestor
        partialPath.accreditationModeSettings = `${appDir}/../views/${accreditationRootFolder}/verifyInvestor-Settings`;
        break;
      case 1: // accredd
        partialPath.accreditationModeSettings = `${appDir}/../views/${accreditationRootFolder}/accredd-Settings`;
        break;
      default:
        // verifyInvestor again
        partialPath.accreditationModeSettings = `${appDir}/../views/${accreditationRootFolder}/verifyInvestor-Settings`;
        break;
    }

    res.render(
      `${accreditationRootFolder}/accreditation-ModeSettings-MainPage`,
      {
        isAccreditationEnabled,
        accreditationProvider,
        verifyInvestorComUrls,
        verifyInvestorComApiToken,
        accreddRedirectLink,
        accreditationRequirementStep:
          globalObj.config.accreditationRequirementStep,
        partials: common.getPlatformPartials(partialPath),
        Data: common.getPlatformCommonPageProperties(req),
        csrfToken: req.csrfToken(),
      }
    );
  } catch (error) {
    logger.error(
      `${error} - Error occurred in get-Accreditation-Mode-MainPage`
    );
  }
};
