import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";
import NetkiSQLService, {
  AccessCodes,
} from "../../../services/platform/netki/NetkiSQLService";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const globalOjb = global as any;
    const kycMode = globalOjb.config.KycProvider;
    const kycRequirementStep = globalOjb.config.KycRequirementStep;
    const appDir = path.dirname(mainFilename);
    const partialPath: { kycProviderModeSettings: string } = {
      kycProviderModeSettings: "",
    };
    switch (kycMode) {
      case 0: // internal
        partialPath.kycProviderModeSettings = `${appDir}/../views/platform/kycProviderModeSettings/internalSettings`;
        break;
      case 1: // block pass
        partialPath.kycProviderModeSettings = `${appDir}/../views/platform/kycProviderModeSettings/blockPassSettings`;
        break;
      case 2: // sum sub
        partialPath.kycProviderModeSettings = `${appDir}/../views/platform/kycProviderModeSettings/sumSubSettings`;
        break;
      case 3: // netki
        partialPath.kycProviderModeSettings = `${appDir}/../views/platform/kycProviderModeSettings/netkiSettings`;
        break;
      default:
        // internal again
        partialPath.kycProviderModeSettings = `${appDir}/../views/platform/kycProviderModeSettings/internalSettings`;
        break;
    }
    const blockPassApiJson = globalOjb.config.BlockPassApiJson;
    const sumSubApiJson = globalOjb.config.SumSubApiJson;
    const netkiParamJson = globalOjb.config.NetkiParamJson;
    const netkiSqlService = new NetkiSQLService();
    const accessCodes: AccessCodes[] = await netkiSqlService.getAccessCodes();

    res.render("platform/kycProviderModeSettings/kycProviderModeSettings", {
      kycMode,
      kycRequirementStep,
      isDriversLicenseEnabled: globalOjb.config.isDriversLicenseEnabled,
      blockPassClientID: blockPassApiJson?.ClientId,
      blockPassApiKey: blockPassApiJson?.ApiKey,
      blockPassBlockPassWebhookToken: blockPassApiJson?.BlockPassWebhookToken,
      sumSubAppToken: sumSubApiJson?.AppToken,
      sumSubApiSecretKey: sumSubApiJson?.ApiSecretKey,
      sumSubWebhookSecretKey: sumSubApiJson?.WebhookSecretKey,
      sumSubLevelName: sumSubApiJson?.LevelName,
      netkiMobileAppPanel: netkiParamJson?.mobileAppPanel,
      username: netkiParamJson?.username,
      accessCodes,
      unUsedAccessCodes: accessCodes.filter((a) => !a.investorID),
      netkiEmailHeader: netkiParamJson.emailHeader,
      netkiEmailBody: netkiParamJson.emailBody,
      netkiAttachMobileAppPanelToEmail:
        netkiParamJson.attachMobileAppPanelToEmail,
      netkiSendEmail: netkiParamJson.sendEmail,
      partials: common.getPlatformPartials(partialPath),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    logger.error(
      `${error} - Error occurred in getSharePurchaseModeMainPageInfo`
    );
  }
};
