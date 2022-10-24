import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const globalObj = global as any;
    const appDir = path.dirname(mainFilename);
    const commonPath = "platform/partial-switches";
    const partialPath = {
      platformSwitchesIndex: `${appDir}/../views/${commonPath}/index`,
      isPropertySortingSwitch: `${appDir}/../views/${commonPath}/isPropertySortingSwitch`,
      isContactTheSponsorFontSwitch: `${appDir}/../views/${commonPath}/isContactTheSponsorFontSwitch`,
      isBankDetailsSwitch: `${appDir}/../views/${commonPath}/isBankDetailsSwitch`,
      isBlockchainAddressSwitch: `${appDir}/../views/${commonPath}/isSharedBlockchainAddressesSwitch`,
      showThemeEngineSwitch: `${appDir}/../views/${commonPath}/showThemeEngineSwitch`,
      defaultProjectTypeSwitch: `${appDir}/../views/${commonPath}/defaultProjectTypeSwitch`,
      isPrivateKeySwitch: `${appDir}/../views/${commonPath}/isPrivateKeySwitch`,
      allowInvestorsToRegisterSwitch: `${appDir}/../views/${commonPath}/allowInvestorsToRegisterSwitch`,
      hideContractsSwitch: `${appDir}/../views/${commonPath}/hideContractsSwitch`,
      isInvestmentReturnCalculationSwitch: `${appDir}/../views/${commonPath}/isInvestmentReturnCalculationSwitch`,
      defaultCurrencySwitch: `${appDir}/../views/${commonPath}/defaultCurrencySwitch`,
    };

    res.render(`${commonPath}/index`, {
      partials: common.getPlatformPartials(partialPath),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),

      isPropertySortingEnabled: globalObj.config.isPropertySortingEnabled,
      isContactTheSponsorFontSwitchEnabled:
        globalObj.config.isContactTheSponsorFontSwitchEnabled,
      isBankDetailsSwitchEnabled: globalObj.config.isBankDetailsSwitchEnabled,
      isBlockchainAddressSwitchEnabled:
        globalObj.config.isBlockchainAddressSwitchEnabled,
      disableInvestorWallet: [1, 2].includes(
        globalObj.config.platformConfiguration
      ),
      toggleThemeEditor: globalObj.config.toggleThemeEditor,
      defaultProjectType: globalObj.config.defaultProjectType,
      isPrivateKeyEnabled: globalObj.config.isPrivateModuleEnabled,
      allowInvestorsToRegister: globalObj.config.allowInvestorsToRegister,
      hideContractsTilPostPurchase:
        globalObj.config.hideContractsTilPostPurchase,
      isInvestmentReturnCalculationEnabled:
        globalObj.config.isInvestmentReturnCalculationEnabled,
      defaultCurrencyType: globalObj.config.defaultCurrencyType,
    });
  } catch (error) {
    logger.error(`${error} - Error occurred in get-Platform-Switches`);
  }
};
