import IEmailSendingService from "./IEmailSendingService";
import emailTexts from "../../../data/text.json";
import getSTOFromConfig from "../../getSTOFromConfig";
import common from "../../../modules/common";
import logger from "../../../logger";
import { Investor, Currency, Users } from "../../../Schema";
import { getQueryfactory, SQLConnection } from "../documents/data/SqlQuery";
import mysql from "../../../modules/mysql";
import { findMany, findOne } from "../../../modules/db";
import IInvestorService from "../investor/data/IInvestorService";
import InvestorSqlService from "../investor/data/InvestorSQLService";
import IPaymentChannelService from "../../platform/price-oracle/data/IPaymentChannelService";
import PaymentChannelSqlService from "../../platform/price-oracle/data/PaymentChannelSqlService";
import * as emailTextsController from "../../platform/emails/controllers/EmailTexts.controller";

export default class EmailSendingService implements IEmailSendingService {
  sendEnableDisableEmail = async (
    investor: Investor,
    isActive: boolean,
    stoId: number = 0
  ): Promise<boolean> => {
    let txtEmail = "";
    let subject = emailTexts.enableAccountEmail.Subject;
    const stoEmailTexts = emailTextsController.default.globalEmailTexts();
    if (isActive) {
      if (!stoEmailTexts?.enableAccountEmail?.Line1) {
        throw new Error(`Email texts not found for enableAccountEmail`);
      }
      txtEmail = emailTextsController.format(
        stoEmailTexts.enableAccountEmail.Line1,
        {
          firstname: investor.FirstName ?? investor.CompanyName ?? "",
          lastname: investor.LastName ?? "",
        }
      );
      txtEmail += "<br /><br />";
      txtEmail += getSTOFromConfig(stoId).emailFooter;
      // txtEmail = `Dear ${investor.FirstName} ${investor.LastName}`;
      // txtEmail += '<br /><br />';
      // txtEmail += emailTexts.enableAccountEmail.Line1;
      // txtEmail += '<br /><br />';
      // txtEmail += getSTOFromConfig(stoId).emailFooter;
    } else {
      if (!stoEmailTexts?.disableAccountEmail?.Line1) {
        throw new Error(`Email texts not found for disableAccountEmail`);
      }
      txtEmail = emailTextsController.format(
        stoEmailTexts.disableAccountEmail.Line1,
        {
          firstname: investor.FirstName ?? investor.CompanyName ?? "",
          lastname: investor.LastName ?? "",
        }
      );
      txtEmail += "<br /><br />";
      txtEmail += getSTOFromConfig(stoId).emailFooter;
      subject = emailTexts.disableAccountEmail.Subject;
      // txtEmail = `Dear ${investor.FirstName} ${investor.LastName}`;
      // txtEmail += '<br /><br />';
      // txtEmail += emailTexts.disableAccountEmail.Line1;
      // txtEmail += '<br /><br />';
      // txtEmail += getSTOFromConfig(stoId).emailFooter;
    }
    return common
      .sendEmailByStoId(stoId, investor.email, subject, txtEmail, [])
      .then(
        () => true,
        (error) => {
          logger.error(error);
          return false;
        }
      );
  };

  sendInstructionalDepositEmail = async (
    paymentChannelID: number,
    investorID: number,
    stoID: number,
    amount: number,
    isWithdrawRequest: number,
    additionalText: string = ""
  ): Promise<boolean> => {
    const paymentChannelService: IPaymentChannelService = new PaymentChannelSqlService();
    const paymentChannel = await paymentChannelService.fetchPaymentChannel(
      paymentChannelID
    );
    if (paymentChannel.ID) {
      const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
      const investorService: IInvestorService = new InvestorSqlService(query);
      const investor = (await investorService.getInvestor(investorID))[0];
      const currentSto = getSTOFromConfig(stoID);
      const currency = await findOne<Currency>(
        "select Symbol from currency where ID=?",
        [paymentChannel.currencyID]
      );

      const replaceData = (text: string) =>
        text
          .replace(/{{ID}}/i, `<b>${investorID}</b>`)
          .replace(/{{investorID}}/i, `<b>${investorID}</b>`)
          .replace(
            /{{FirstName LastName}}/i,
            `<b>${investor.FirstName} ${investor.LastName}</b>`
          )
          .replace(/{{PaymentChannelName}}/i, `<b>${paymentChannel.title}</b>`)
          .replace(/{{Sto.title}}/i, `<b>${currentSto.title}</b>`)
          .replace(/{{currencySymbol}}/i, `<b>${currency?.Symbol}</b>`)
          .replace(/{{amount}}/i, `<b>${amount}`)
          .replace(
            /{{action}}/i,
            `<b>${isWithdrawRequest ? "withdrawn" : "deposited"}</b>`
          );

      let txtEmail = "";
      txtEmail += "<br /><br />";
      txtEmail += paymentChannel.depositInstructionText;
      txtEmail = replaceData(txtEmail);
      txtEmail += "<br /><br />";
      txtEmail += additionalText.replace(/(?:\\[rn]|[\r\n]+)+/g, "<br/>");
      txtEmail += currentSto.emailFooter || "";
      txtEmail = `Dear ${investor.FirstName} ${investor.LastName},${txtEmail}`;

      // Promise Array containing all email processes
      const emailPromises = [];

      // Sending Mail to Investor
      if (
        paymentChannel.sendInstructionalDepositEmail &&
        paymentChannel.depositInstructionText
      )
        emailPromises.push(
          common.sendEmailByStoId(
            stoID,
            investor.email,
            paymentChannel.depositInstructionEmailHeader,
            txtEmail,
            []
          )
        );

      // Sending Mail to all STOAdmins
      const admins = await this.getUserRecord(stoID);
      let adminTxt = paymentChannel.adminEmailBody;
      if (
        !paymentChannel.sendAdminEmail ||
        !adminTxt ||
        !paymentChannel.adminEmailHeader ||
        !paymentChannel.sendAdminEmail
      )
        return !!emailPromises;
      adminTxt = replaceData(adminTxt);
      adminTxt += currentSto.emailFooter || "";
      emailPromises.push(
        ...admins.map(({ email, FirstName, LastName }: Users) => {
          const thisAdminTxt = `Dear ${FirstName} ${LastName}, STO Admin${adminTxt}`;
          if (
            !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email ?? "")
          )
            return false;
          return common.sendEmailByStoId(
            stoID,
            email,
            paymentChannel.adminEmailHeader,
            thisAdminTxt,
            []
          );
        })
      );

      return !!Promise.all(emailPromises);
    }
    return true;
  };
  getUserRecord = async (stoid: number) => {
    const stmt = `Select * from users where stoid = ${stoid} and isActive=1`;
    return findMany<Users>(stmt).then((rows) => rows);
  };
}
