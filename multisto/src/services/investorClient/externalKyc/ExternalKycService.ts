/* eslint-disable class-methods-use-this */
import IExternalKycService from "./IExternalKycService";
import mysql from "../../../modules/mysql";
import { findOne } from "../../../modules/db";
import logger from "../../../logger";
import { getQueryfactory, SQLConnection } from "../documents/data/SqlQuery";
import IInvestorService from "../investor/data/IInvestorService";
import InvestorSqlService from "../investor/data/InvestorSQLService";
import IEmailSendingService from "../email/IEmailSendingService";
import EmailSendingService from "../email/EmailSendingService";
import { Investor, Investorsto } from "../../../Schema";
import { ExternalKYCInvestorRecord } from "./dto/ExternalKYCInvestorRecordType";

export default class ExternalKycService implements IExternalKycService {
  async updateKycStatus(
    investorRecord: ExternalKYCInvestorRecord
  ): Promise<boolean> {
    return findOne<Investorsto>(
      `SELECT iskyc, KYCCurrentStatus FROM investorsto WHERE investorid = ? and stoid = ?`,
      [investorRecord.investorId, investorRecord.stoId]
    )
      .then((data) => {
        if (
          data?.isKYC !== investorRecord.kycStatus ||
          data?.KYCCurrentStatus !== investorRecord.kycCurrentStatus
        ) {
          mysql
            .changeInvestorKycStatus(
              investorRecord.kycCurrentStatus,
              investorRecord.kycStatus,
              investorRecord.investorId,
              investorRecord.stoId,
              investorRecord.KycExpiryDate as any,
              investorRecord.kycApplied as any
            )
            .catch((error) => {
              logger.error(
                `${error} - Error occurred in sumSubService while trying to update investor's KYC status`
              );
            });
        }
        return true;
      })
      .catch((error) => {
        logger.error(
          `${error} - Error occurred in ExternalKycService while trying to get InvestorSto.isKyc`
        );
        return false;
      });
  }

  async updateLogin(investorRecord: ExternalKYCInvestorRecord): Promise<void> {
    const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
    const investorService: IInvestorService = new InvestorSqlService(query);
    const emailSendingService: IEmailSendingService = new EmailSendingService();
    const investor: Investor = {
      ID: 0,
      Password: "",
      PoliticallyExposedPerson: 0,
      affiliateStatus: 0,
      investorType: 0,
      FirstName: investorRecord.firstName,
      LastName: investorRecord.lastName,
      email: investorRecord.email,
      allowedTotalInvestment: 0,
      investmentLimitUpdateDate: new Date(),
      yearlyTotalInvestment: 0,
    };

    if (investorRecord.kycCurrentStatus === -1) {
      await investorService.enableDisableInvestorLoginForAllStos(
        false,
        parseInt(investorRecord.investorId, 10)
      );
      await emailSendingService.sendEnableDisableEmail(
        investor,
        false,
        parseInt(investorRecord.stoId, 10)
      );
    } else if (investorRecord.kycCurrentStatus === 1) {
      await investorService.enableDisableInvestorLoginForAllStos(
        true,
        parseInt(investorRecord.investorId, 10)
      );
      await emailSendingService.sendEnableDisableEmail(investor, true);
    }
  }
}
