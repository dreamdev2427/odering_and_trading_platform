import logger from "../../../../logger";
import mysql from "../../../../modules/mysql";
import IExternalKycService from "../IExternalKycService";
import ExternalKycService from "../ExternalKycService";
import { VerifyInvestorComKycDataResponse } from "./dto/VerifyInvestorComTypes";
import { ExternalKYCInvestorRecord } from "../dto/ExternalKYCInvestorRecordType";

const request = require("request");

async function requestDataFromVefiyInvestorCom(url: string): Promise<string> {
  if (!(global as any).config.VerifyInvestorComApiToken) {
    throw new Error(
      "Missing VerifyInvestorComApiToken - Error occurred in VerifiyInvestorComService"
    );
  }
  return new Promise((resolve, reject) => {
    request.get(
      {
        url,
        headers: {
          Authorization: `Token ${
            (global as any).config.VerifyInvestorComApiToken
          }`,
          "Content-Type": `application/json`,
          Accept: `application/json`,
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

async function composeUpdateObject(
  responseData: VerifyInvestorComKycDataResponse,
  internalReference: string
): Promise<ExternalKYCInvestorRecord> {
  const investorRecord: ExternalKYCInvestorRecord = {
    firstName: "",
    lastName: "",
    middleNames: "",
    dob: "",
    phoneNumber: "",
    email: "",
    residencyAddress: {
      address: ``,
      city: "",
      country: "",
      postalCode: "",
    },
    investorId: internalReference.substr(0, internalReference.indexOf("-")),
    stoId: internalReference.substring(internalReference.indexOf("-") + 1),
    countryCitizenship: "",
    nationalIdNumber: "",
    passportNumber: "",
    socialSecurityNumber: "",
    taxIdNo: "",
    kycStatus: 0,
    kycCurrentStatus: 7,
    KycExpiryDate: new Date(responseData.verified_expires_at)
      .toISOString()
      .split("T")[0],
    kycApplied: 1,
  };
  if (responseData.status === "accredited") {
    investorRecord.kycStatus = 1;
    investorRecord.kycCurrentStatus = 3;
    investorRecord.kycApplied = 0;
  }
  if (responseData.status === "not_accredited") {
    investorRecord.kycStatus = 1;
    investorRecord.kycCurrentStatus = 1;
    investorRecord.kycApplied = 0;
  }
  logger.error(
    `VerifyInvestor request received, user tried to update the following info: ${JSON.stringify(
      investorRecord
    )}`
  );
  return investorRecord;
}

/**
 * fetch the investor's data from sum sub and update it in the database
 * @param requestID verifyInvestorCom's ID
 * @param internalReference composed of InvestorID-StoID
 */
const updateKYCDataFromVerifyInvestorCom = async (
  requestID: number,
  internalReference: string
): Promise<void> => {
  // this link is for the free/dev testing
  // https://verifyinvestor-staging.herokuapp.com/api/v1/verification_requests/
  // this link is for the production site
  // https://www.verifyinvestor.com/api/v1/verification_requests/
  const url = `${
    (global as any).config.verifyInvestorComUrl?.backendURL
  }${requestID}`;
  try {
    const body = await requestDataFromVefiyInvestorCom(url).catch((e) => {
      throw e;
    });
    if (!body) {
      throw new Error(
        "Null response from verifyInvestor.com - error occurred in VerifyInvestorComService"
      );
    }
    const responseData: VerifyInvestorComKycDataResponse = JSON.parse(body);

    const investorRecord: ExternalKYCInvestorRecord = await composeUpdateObject(
      responseData,
      internalReference
    );
    mysql.updateInvestorRecordFromExternalKYC(investorRecord).catch((error) => {
      logger.error(
        `${error} - Error occurred in VerifyInvestorComService while trying to update KYC info`
      );
    });
    const externalKycService: IExternalKycService = new ExternalKycService();
    await externalKycService.updateKycStatus(investorRecord);
    if (investorRecord.kycCurrentStatus === -1) {
      await externalKycService.updateLogin(investorRecord);
    }
  } catch (error) {
    logger.error(
      `${error} - Error occurred in VerifyInvestorComService while trying to parse response body`
    );
  }
};
export default updateKYCDataFromVerifyInvestorCom;
