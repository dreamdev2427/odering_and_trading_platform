import logger from "../../../../logger";
import mysql from "../../../../modules/mysql";
import IExternalKycService from "../IExternalKycService";
import ExternalKycService from "../ExternalKycService";
import { SumSubKycDataResponse, SumSubRequestConfig } from "./dto/SumSubTypes";
import { ExternalKYCInvestorRecord } from "../dto/ExternalKYCInvestorRecordType";

const request = require("request");
const crypto = require("crypto");
const countries = require("i18n-iso-countries");

function requestFromSumSub(url: string, method: string): SumSubRequestConfig {
  const globalObj: any = global as any; // Fetch global object
  const sumSubDatabaseSettingsJson = globalObj.config.SumSubApiJson;
  if (
    !sumSubDatabaseSettingsJson.AppToken ||
    !sumSubDatabaseSettingsJson.LevelName
  ) {
    logger.error(
      "unset SumSub JSON parameters - Error occured in sumsubService"
    );
  }
  const timestamp = Math.round(Date.now() / 1000);
  const signature: string = crypto
    .createHmac("sha256", sumSubDatabaseSettingsJson.ApiSecretKey)
    .update(`${timestamp}${method.toUpperCase()}${url}`)
    .digest("hex");
  return {
    appToken: sumSubDatabaseSettingsJson.AppToken,
    signature,
    secondsSinceEpoch: timestamp,
  };
}

async function requestTokenFromSumSub(url: string): Promise<string> {
  const config: SumSubRequestConfig = requestFromSumSub(url, "POST");
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: `https://api.sumsub.com${url}`,
        headers: {
          "X-App-Token": `${config.appToken}`,
          "X-App-Access-Sig": `${config.signature}`,
          "X-App-Access-Ts": `${config.secondsSinceEpoch}`,
        },
      },
      (err: any, httpResponse: any, body: any) => {
        if (!err && httpResponse.statusCode === 200) {
          resolve(body);
        } else {
          reject(err);
        }
      }
    );
  });
}

async function requestDataFromSumSub(url: string): Promise<string> {
  const config: SumSubRequestConfig = requestFromSumSub(url, "GET");
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://api.sumsub.com${url}`,
        headers: {
          "X-App-Token": `${config.appToken}`,
          "X-App-Access-Sig": `${config.signature}`,
          "X-App-Access-Ts": `${config.secondsSinceEpoch}`,
        },
      },
      (err: any, httpResponse: any, body: any) => {
        if (!err && httpResponse.statusCode === 200) {
          resolve(body);
        } else {
          reject(err);
        }
      }
    );
  });
}

/**
 * get the access token for an investor from sumsub
 * @param req
 */
export const getSumSubAccessTokenForInvestor = async (
  req: any
): Promise<string> => {
  try {
    const globalObj = global as any;
    const stoId = globalObj.config.stos[req.hostname].stoid;
    const investorId = req.session.user.ID;
    const sumSubDatabaseSettingsJson = globalObj.config.SumSubApiJson;
    const url = `/resources/accessTokens?userId=${investorId}-${stoId}&levelName=${sumSubDatabaseSettingsJson.LevelName}&ttlInSecs=600`;
    const body = await requestTokenFromSumSub(url).catch((e) => {
      throw e;
    });

    const responseData = JSON.parse(body);
    return responseData.token;
  } catch (error) {
    logger.error(
      `${
        (error as Error).message
      } - Error occurred in SumSubService while trying to parse response body`
    );
    return "";
  }
};

async function composeUpdateObject(
  responseData: SumSubKycDataResponse,
  sumSubUserId: string
): Promise<ExternalKYCInvestorRecord> {
  const nationalityCountyName =
    responseData.info.nationality?.toLowerCase() === "us" ||
    responseData.info.nationality?.toLowerCase() === "usa"
      ? "United States"
      : countries.getName(responseData.info.nationality, "en", {
          select: "official",
        });
  const residencyCountyName =
    responseData.info.country?.toLowerCase() === "us" ||
    responseData.info.country?.toLowerCase() === "usa"
      ? "United States"
      : countries.getName(responseData.info.country, "en", {
          select: "official",
        });
  const addresses: any =
    responseData.info?.addresses !== undefined
      ? responseData.info.addresses
      : responseData.fixedInfo.addresses;
  const street: string =
    addresses[0]?.street !== undefined ? addresses[0]?.street : "";
  const buildingNumber: string =
    addresses[0]?.buildingNumber !== undefined
      ? addresses[0]?.buildingNumber
      : "";
  const flatNumber: string =
    addresses[0]?.flatNumber !== undefined ? addresses[0]?.flatNumber : "";
  const investorRecord: ExternalKYCInvestorRecord = {
    firstName:
      responseData.info.firstName ??
      responseData.metadata.find((elem) => elem.key === "firstName")?.value ??
      "",
    lastName:
      responseData.info.lastName ??
      responseData.metadata.find((elem) => elem.key === "lastName")?.value ??
      "",
    middleNames:
      responseData.info.middleName ??
      responseData.metadata.find((elem) => elem.key === "middleNames")?.value ??
      "",
    dob: responseData.info.dob,
    phoneNumber: responseData.info.phone,
    email: responseData.email,
    residencyAddress: {
      address: `${street} ${buildingNumber} ${flatNumber}`,
      city: addresses[0]?.town !== undefined ? addresses[0].town : "",
      country: residencyCountyName,
      postalCode:
        addresses[0]?.postCode !== undefined ? addresses[0].postCode : "",
    },
    investorId: sumSubUserId.substr(0, sumSubUserId.indexOf("-")),
    stoId: sumSubUserId.substring(sumSubUserId.indexOf("-") + 1),
    countryCitizenship: nationalityCountyName,
    nationalIdNumber:
      responseData.info?.idDocs?.find((d) => d.idDocType === "ID_CARD")
        ?.number ?? "",
    passportNumber:
      responseData.info?.idDocs?.find((d) => d.idDocType === "PASSPORT")
        ?.number ?? "",
    socialSecurityNumber:
      responseData.metadata.find((elem) => elem.key === "SocialSecurity")
        ?.value ?? "",
    taxIdNo:
      responseData.metadata.find((elem) => elem.key === "TaxIDNo")?.value ?? "",
    kycStatus: 0,
    kycCurrentStatus: 7,
    KycExpiryDate: null,
    kycApplied: 1,
  };
  if (
    responseData.review?.reviewStatus === "completed" &&
    responseData.review?.reviewResult?.reviewAnswer === "GREEN"
  ) {
    investorRecord.kycStatus = 1; // if investor is approved in sumSub
    investorRecord.kycCurrentStatus = 1;
    investorRecord.kycApplied = 0;
  }
  if (
    responseData.review?.reviewStatus === "completed" &&
    responseData.review?.reviewResult?.reviewAnswer === "RED" &&
    responseData.review?.reviewResult?.reviewRejectType === "FINAL"
  ) {
    investorRecord.kycStatus = 0; // if investor is approved in sumSub
    investorRecord.kycCurrentStatus = -1;
    investorRecord.kycApplied = 1;
  }
  logger.error(
    `SumSub request received, user tried to update the following info: ${JSON.stringify(
      investorRecord
    )}`
  );
  return investorRecord;
}

/**
 * fetch the investor's data from sum sub and update it in the database
 * @param sumSubUserId the id provided when registering a new user, under the form of investorId-stoId
 */
export const updateKYCDataFromSumSub = async (
  sumSubUserId: string
): Promise<void> => {
  const url = `/resources/applicants/-;externalUserId=${sumSubUserId}/one`;
  try {
    const body = await requestDataFromSumSub(url).catch((e) => {
      throw e;
    });

    const responseData: SumSubKycDataResponse = JSON.parse(body);

    const investorRecord = await composeUpdateObject(
      responseData,
      sumSubUserId
    );
    mysql.updateInvestorRecordFromExternalKYC(investorRecord).catch((error) => {
      logger.error(
        `${error} - Error occurred in sumSubService while trying to update KYC info`
      );
    });
    const externalKycService: IExternalKycService = new ExternalKycService();
    await externalKycService.updateKycStatus(investorRecord);
    if (investorRecord.kycCurrentStatus === -1) {
      await externalKycService.updateLogin(investorRecord);
    }
  } catch (error) {
    logger.error(
      `${error} - Error occurred in SumSubService while trying to parse response body`
    );
  }
};
