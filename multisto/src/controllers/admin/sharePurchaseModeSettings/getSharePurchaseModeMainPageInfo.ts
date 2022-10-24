import { Response } from "express";
import path from "path";
import logger from "../../../logger";
import common from "../../../modules/common";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";

const mainFilename = require("require-main-filename")();

export default async (req: any, res: Response) => {
  try {
    const globalObj = global as any;
    const spdsMode = globalObj.config.sharePurchaseDocumentsMode;
    const commonPath = "platform/partial-switches";
    const appDir = path.dirname(mainFilename);

    let sharePurchaseModeSettingsPath = "";

    switch (spdsMode) {
      case "internal":
        sharePurchaseModeSettingsPath = `${appDir}/../views/platform/sharePurchaseModeSettings/internalSettings`;
        break;
      case "docuSign":
        sharePurchaseModeSettingsPath = `${appDir}/../views/platform/sharePurchaseModeSettings/docuSignSettings`;
        break;
      case "helloSign":
        sharePurchaseModeSettingsPath = `${appDir}/../views/platform/sharePurchaseModeSettings/helloSignSettings`;
        break;
      default:
        sharePurchaseModeSettingsPath = `${appDir}/../views/platform/sharePurchaseModeSettings/internalSettings`;
        break;
    }
    const partialPath = {
      sharePurchaseModeSettings: sharePurchaseModeSettingsPath,
      isAllDocumentsSignedPopUpEnabledSwitch: `${appDir}/../views/${commonPath}/isAllDocumentsSignedPopUpEnabledSwitch`,
    };
    const stoService: IStoService = new StoSqlService();
    const helloSignClientID = (await stoService.getSto(0))?.helloSignClientID;

    res.render("platform/sharePurchaseModeSettings/sharePurchaseModeSettings", {
      spdsMode,
      testMode: globalObj.config.testMode,
      skipDocumentSignScreen: globalObj.config.skipDocumentSignScreen,
      internalSignatureMode: globalObj.config.internalSignatureMode,
      drawSignaturePrefillFonts: globalObj.config.drawSignaturePrefillFonts,
      helloSignApiKey: globalObj.config.helloSignApiKey,
      helloSignTestMode: globalObj.config.helloSignTestMode,
      helloSignClientID,
      DocuSignUserID: globalObj.config.DocuSignUserID,
      DocuSignIntegrationKey: globalObj.config.DocuSignIntegrationKey,
      DocuSignOauthBasePath: globalObj.config.DocuSignOauthBasePath,
      DocusignViewSignedDocumentsUrl:
        globalObj.config.docusignViewSignedDocumentsUrl,
      DocuSignConsentUri: globalObj.config.DocuSignConsentUri,
      DocuSignRedirectUriRegister: `${req.hostname}/platform/sharepurchasemodesettings`,
      partials: common.getPlatformPartials(partialPath),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
      isAllDocumentsSignedPopUpEnabled:
        globalObj.config.isAllDocumentsSignedPopUpEnabled,
    });
  } catch (error) {
    logger.error(
      `${JSON.stringify(
        error
      )} - Error occurred in getSharePurchaseModeMainPageInfo`
    );
  }
};
