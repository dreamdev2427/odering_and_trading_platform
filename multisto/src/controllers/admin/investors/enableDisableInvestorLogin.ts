import { Request, Response } from "express";
import IInvestorService from "../../../services/investorClient/investor/data/IInvestorService";
import InvestorSqlService from "../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";
import mysql from "../../../modules/mysql";
import common from "../../../modules/common";
import IEmailSendingService from "../../../services/investorClient/email/IEmailSendingService";
import EmailSendingService from "../../../services/investorClient/email/EmailSendingService";

export default async (req: Request, res: Response) => {
  common.checkUserAuthorizationForModuleSTO(req, res, 2);

  const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
  const investorService: IInvestorService = new InvestorSqlService(query);
  try {
    const isActive: boolean = req.query.op === "1";
    const investorId: number = parseInt(JSON.stringify(req.query.ID), 10);
    const stoId: number = JSON.parse(
      JSON.stringify((req as any).session.stoid)
    );
    if (!Number.isNaN(investorId)) {
      const investorResult = await investorService.getInvestor(investorId);
      await investorService.enableDisableInvestorLogin(
        isActive,
        investorId,
        stoId
      );
      const emailSendingService: IEmailSendingService = new EmailSendingService();
      const emailSendingResult = await emailSendingService.sendEnableDisableEmail(
        investorResult[0],
        isActive,
        stoId
      );
      if (emailSendingResult) {
        (req as any).flash("errorMessage", "Investor Account status Changed");
      } else {
        (req as any).flash(
          "errorMessage",
          "Investor Account status Changed. Error sending email"
        );
      }
      res.redirect(`investorsViewSto?id=${investorId}`);
    } else {
      common.handleError(
        req,
        res,
        `Error occurred in enableDisableInvestorLogin  getInvestorData`
      );
    }
  } catch (error: any) {
    common.handleError(
      req,
      res,
      `${error.message}\nError occurred in enableDisableInvestorLogin  getInvestorData`
    );
  }
};
