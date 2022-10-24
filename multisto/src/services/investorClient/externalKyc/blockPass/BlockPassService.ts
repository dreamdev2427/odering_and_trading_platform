import { NextFunction, Response } from "express";
import countries from "i18n-iso-countries";
import mysql from "../../../../modules/mysql";
import IExternalKycService from "../IExternalKycService";
import ExternalKycService from "../ExternalKycService";
import logger from "../../../../logger";
import {
  BlockPassKycDataResponse,
  BlockPassResponseAddress,
  BlockPassResponsePhone,
} from "./dto/BlockPassTypes";
import { ExternalKYCInvestorRecord } from "../dto/ExternalKYCInvestorRecordType";

const request = require("request");

function requestFromBlockPass(
  investorId: string,
  stoId: string
): Promise<string> {
  const globalObj: any = global as any; // Fetch global object
  const blockPassDatabaseSettingsJson = globalObj.config.BlockPassApiJson;

  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://kyc.blockpass.org/kyc/1.0/connect/${blockPassDatabaseSettingsJson.ClientId}/refId/${investorId}-${stoId}`,
        headers: { Authorization: `${blockPassDatabaseSettingsJson.ApiKey}` },
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
  responseData: BlockPassKycDataResponse,
  investorId: string,
  stoId: string
): Promise<ExternalKYCInvestorRecord> {
  const investorRecord: ExternalKYCInvestorRecord = {
    investorId,
    stoId,
    dob: new Date(responseData.data.identities.dob.value)
      .toISOString()
      .split("T")[0],
    email: responseData.data.identities.email.value,
    firstName: responseData.data.identities.given_name.value.substr(
      0,
      responseData.data.identities.given_name.value.indexOf(" ")
    ),
    lastName: responseData.data.identities.family_name.value,
    middleNames: responseData.data.identities.given_name.value.substring(
      responseData.data.identities.given_name.value.indexOf(" ") + 1
    ),
    phoneNumber: "", // needs special parsing
    countryCitizenship: "", // needs special parsing
    nationalIdNumber: "", // needs special parsing
    passportNumber: "", // needs special parsing
    residencyAddress: {
      // needs special parsing
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    socialSecurityNumber: "", // not collected by blockpass
    taxIdNo: "", // not collected by blockpass
    kycCurrentStatus: 7,
    kycStatus: 0,
    KycExpiryDate: null,
    kycApplied: 1,
  };
  const phoneNumber: BlockPassResponsePhone = JSON.parse(
    responseData.data.identities.phone.value
  ).phoneNumber;
  investorRecord.phoneNumber = phoneNumber.phoneNumber;
  const address: BlockPassResponseAddress = JSON.parse(
    responseData.data.identities.address.value
  );
  investorRecord.residencyAddress.address = address.address;
  investorRecord.residencyAddress.city = address.city;
  investorRecord.residencyAddress.country = countries.getName(
    address.country,
    "en",
    { select: "official" }
  );
  investorRecord.residencyAddress.postalCode = address.postalCode;
  if (
    responseData.data?.identities?.national_id_issuing_country?.value &&
    responseData.data?.identities?.national_id_issuing_country?.value !== ""
  ) {
    investorRecord.countryCitizenship = countries.getName(
      responseData.data.identities.national_id_issuing_country.value,
      "en",
      { select: "official" }
    );
    investorRecord.nationalIdNumber =
      responseData.data.identities.national_id_number.value;
  } else if (
    responseData.data?.identities?.passport_issuing_country?.value &&
    responseData.data?.identities?.passport_issuing_country?.value !== ""
  ) {
    investorRecord.countryCitizenship = countries.getName(
      responseData.data.identities.passport_issuing_country.value,
      "en",
      { select: "official" }
    );
    investorRecord.passportNumber =
      responseData.data.identities.passport_number.value;
  }
  if (responseData.data.status === "approved") {
    investorRecord.kycStatus = 1; // if investor is approved on blockpass
    investorRecord.kycCurrentStatus = 1;
    investorRecord.kycApplied = 0;
  } else {
    investorRecord.kycStatus = 0; // if investor is not approved in blockpass
    investorRecord.kycCurrentStatus = 0;
    investorRecord.kycApplied = 1;
  }
  logger.error(
    `BlockPass request received, user tried to update the following info: ${JSON.stringify(
      investorRecord
    )}`
  );
  return investorRecord;
}

export const queryBlockPassForInvestorData = async (
  investorId: string,
  stoId: string
): Promise<string> => {
  try {
    const body = await requestFromBlockPass(investorId, stoId).catch((e) => {
      throw e;
    });

    const responseData: BlockPassKycDataResponse = JSON.parse(body);
    const investorRecord = await composeUpdateObject(
      responseData,
      investorId,
      stoId
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
    return responseData.data.status;
  } catch (error) {
    logger.error(
      `${
        (error as Error).message
      } - Error occured in BlockPassService while trying to parse response body`
    );
    return "";
  }
};

export const updateBlockPassDataMiddleWare = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  /* blockpass kyc clients info update request;
        this is a workaround to blockpass' lack of
        webhook requests for the reject/change in
        status besides approval of client info
    */
  const globalObj: any = global as any; // Fetch global object

  if (globalObj.config.KycProvider === 1) {
    const url: string = new URL(globalObj.config.SingleSignInLoginURL).origin;
    try {
      const stoId = globalObj.config.stos[req.hostname].stoid;
      const investorId = req.session.user.ID;
      const blockPassStatus = await queryBlockPassForInvestorData(
        investorId,
        stoId
      ).catch((e) => {
        throw e;
      });
      if (blockPassStatus !== "approved") {
        return res.redirect(`${url}/wizard?step=0`);
      }
    } catch {
      return res.redirect(`${url}/wizard?step=0`);
    }
  }
  return next();
};
