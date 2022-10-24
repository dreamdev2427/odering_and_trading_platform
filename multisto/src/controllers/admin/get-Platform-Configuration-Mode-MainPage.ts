import { Response } from "express";
import path from "path";
import logger from "../../logger";
import common from "../../modules/common";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const rootFolder = "platform/platform-configuration";
    const commonPath = "platform/partial-switches";
    const globalObj = global as any;
    const platformConfiguration = globalObj.config.platformConfiguration;

    const appDir = path.dirname(mainFilename);
    const partialPath = {
      walletBased: `${appDir}/../views/${rootFolder}/wallet-based`,
      accountBased: `${appDir}/../views/${rootFolder}/account-based`,
      custodyBased: `${appDir}/../views/${rootFolder}/custody-based`,
      isBankDetailsSwitch: `${appDir}/../views/${commonPath}/isBankDetailsSwitch`,
      isBlockchainAddressSwitch: `${appDir}/../views/${commonPath}/isSharedBlockchainAddressesSwitch`,
      defaultProjectTypeSwitch: `${appDir}/../views/${commonPath}/defaultProjectTypeSwitch`,
      isPrivateKeySwitch: `${appDir}/../views/${commonPath}/isPrivateKeySwitch`,
      isAutomaticShareClassSettingsEnabledSwitch: `${appDir}/../views/${commonPath}/isAutomaticShareClassSettingsEnabledSwitch`,
      internalWalletModeSwitches: `${appDir}/../views/${commonPath}/internalWalletModeSwitches`,
      isDoAutomaticPurchaseEnabledSwitch: `${appDir}/../views/${commonPath}/isDoAutomaticPurchaseSwitch`,
      isInvoicingEnabledSwitch: `${appDir}/../views/${commonPath}/isInvoicingEnabledSwitch`,
      defaultCurrencySwitch: `${appDir}/../views/${commonPath}/defaultCurrencySwitch`,
    };

    res.render(`${rootFolder}/platform-configuration-MainPage`, {
      platformConfiguration,
      isBankDetailsSwitchEnabled: globalObj.config.isBankDetailsSwitchEnabled,
      isBlockchainAddressSwitchEnabled:
        globalObj.config.isBlockchainAddressSwitchEnabled,
      partials: common.getPlatformPartials(partialPath),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
      defaultProjectType: globalObj.config.defaultProjectType,
      isPrivateKeyEnabled: globalObj.config.isPrivateModuleEnabled,
      enablePlatformConfigurationSwitches:
        globalObj.config.enablePlatformConfigurationSwitches,
      isAutomaticShareClassSettingsEnabled:
        globalObj.config.isAutomaticShareClassSettingsEnabled,
      internalWalletMode:
        globalObj.config.investorInternalWalletProjectSpecific,
      isHTTPSStartEnabled: globalObj.config.LocalHttpsStart,
      isDoAutomaticPurchaseEnabled: globalObj.config.doAutomaticPurchase,
      isInvoicingEnabled: globalObj.config.isInvoicingEnabled,
      defaultCurrencyType: globalObj.config.defaultCurrencyType,
    });
  } catch (error) {
    logger.error(
      `${error} - Error occurred in get-Platform-Configuration-Mode-MainPage`
    );
  }
};
