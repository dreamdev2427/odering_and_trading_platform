import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import common from "../../../modules/common";

interface NetkiParamJson {
  mobileAppPanel: string;
  username: string;
  password: string;
  emailHeader: string;
  emailBody: string;
  attachMobileAppPanelToEmail: boolean;
  sendEmail: boolean;
}

export default async (req: any, res: Response) => {
  try {
    const {
      netkiMobileAppPanel,
      username,
      password,
      chkAttachMobileAppPanelToEmail,
      chkSendInstructionalEmail,
      emailHeader,
      emailBody,
    } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    const netkiParamJsonRaw = params.find((p) => p.param === "NetkiParamJson");

    if (netkiParamJsonRaw?.stringValue) {
      const netkiParam: NetkiParamJson = JSON.parse(
        netkiParamJsonRaw.stringValue
      );
      if (netkiParam.username !== username) {
        netkiParam.username = username;
      }
      if (netkiParam.mobileAppPanel !== netkiMobileAppPanel) {
        netkiParam.mobileAppPanel = netkiMobileAppPanel;
      }
      if (password && password !== "") {
        const encryptedPassword = await common.encryptAsync(password);
        if (netkiParam.password !== encryptedPassword) {
          netkiParam.password = encryptedPassword;
        }
      }
      netkiParam.emailHeader = emailHeader;
      netkiParam.emailBody = emailBody;
      netkiParam.attachMobileAppPanelToEmail =
        chkAttachMobileAppPanelToEmail !== undefined;
      netkiParam.sendEmail = chkSendInstructionalEmail !== undefined;

      netkiParamJsonRaw.stringValue = JSON.stringify(netkiParam);
      await paramsSqlService.setParams(netkiParamJsonRaw);
      await mysql.initializeGlobals();
    }
    res.redirect("/platform/kycProviderModeSettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in postChangeSumSubSettings`);
  }
};
