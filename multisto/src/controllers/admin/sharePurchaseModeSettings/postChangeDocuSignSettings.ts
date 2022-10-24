import { Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import IParamsService from "../../../services/platform/environmentParams/data/IParamsService";
import ParamsSqlService from "../../../services/platform/environmentParams/data/ParamsSqlService";
import { Params } from "../../../Schema";

const composeConsentUrl = (
  redirectUrl: string,
  docuSignIntegrationKey: string
): string => {
  const globalObj = global as any;
  const sto0 = globalObj.config.stos[Object.keys(globalObj.config.stos)[0]];
  const postConsentRedirectUri = `${sto0.stolinkfull}${redirectUrl}`;
  return (
    `${globalObj.config.DocuSignConsentUri}/oauth/auth?response_type=code&` +
    `scope=signature+impersonation&client_id=${docuSignIntegrationKey}&` +
    `redirect_uri=${postConsentRedirectUri}`
  );
};

export const updateParam = async (
  params: Params[],
  newValue: string,
  paramName: string,
  paramsSqlService: IParamsService
) => {
  const param = params.find((p) => p.param === paramName);
  if (param && param.stringValue !== newValue) {
    param.stringValue = newValue;
    await paramsSqlService.setParams(param);
  }
};

export default async (req: any, res: Response) => {
  try {
    let redirectUrl = "/platform/sharePurchaseModeSettings";
    const {
      DocuSignRsaKey,
      DocuSignUserID,
      DocuSignIntegrationKey,
      DocusignViewSignedDocumentsUrl,
      DocuSignOauthBasePath,
      DocuSignConsentUri,
    } = req.body;
    const paramsSqlService: IParamsService = new ParamsSqlService();
    const params = await paramsSqlService.getParams();
    if (DocuSignRsaKey !== "") {
      const key = DocuSignRsaKey.replace("-----BEGIN RSA PRIVATE KEY-----", "");
      const encryptedRsa = await common.encryptAsync(
        key.replace("-----END RSA PRIVATE KEY-----", "")
      );
      await updateParam(
        params,
        encryptedRsa,
        "DocuSignRsaKey",
        paramsSqlService
      );
      redirectUrl = composeConsentUrl(redirectUrl, DocuSignIntegrationKey);
    }
    await updateParam(
      params,
      DocuSignUserID,
      "DocuSignUserID",
      paramsSqlService
    );
    await updateParam(
      params,
      DocuSignOauthBasePath,
      "DocuSignOauthBasePath",
      paramsSqlService
    );
    await updateParam(
      params,
      DocuSignIntegrationKey,
      "DocuSignIntegrationKey",
      paramsSqlService
    );
    await updateParam(
      params,
      DocusignViewSignedDocumentsUrl,
      "docusignViewSignedDocumentsUrl",
      paramsSqlService
    );
    await updateParam(
      params,
      DocuSignConsentUri,
      "DocuSignConsentUri",
      paramsSqlService
    );
    await mysql.initializeGlobals();
    res.redirect(redirectUrl);
  } catch (error) {
    logger.error(
      `${JSON.stringify(error)} - Error in postChangeDocuSignSettings.`
    );
  }
};
