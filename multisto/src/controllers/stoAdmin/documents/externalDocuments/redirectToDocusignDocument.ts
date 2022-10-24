import { Request, Response } from "express";
import moment from "moment";
import common from "../../../../modules/common";
import mysql from "../../../../modules/mysql";
import { findOne } from "../../../../modules/db";
import SharesSqlService from "../../../../services/investorClient/affiliate/data/SharesSqlService";
import StosService from "../../../../services/investorClient/trading/data/stos/StosSqlService";
import InvestorSqlService from "../../../../services/investorClient/investor/data/InvestorSQLService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../../services/investorClient/documents/data/SqlQuery";
import CurrencySqlService from "../../../../services/platform/currency/data/CurrencySqlService";
import DocumentSqlService from "../../../../services/investorClient/documents/data/documents/DocumentsSqlService";
import SharePurchaseDocumentsSqlService from "../../../../services/investorClient/sharePurchaseDocuments/data/SharePurchaseDocumentsSqlService";
import {
  Documentfields,
  Investor,
  InvestorBuyPropertyAlert,
} from "../../../../Schema";
import DocusignService from "../../../../services/investorClient/documents/docusign/DocusignService";

const docusignPrefill = (
  investor: Investor,
  sharePurchase: InvestorBuyPropertyAlert,
  stoTitle: string,
  documentFields: Documentfields[],
  purchasePrice: number,
  currencySymbol: string
): { details: any; clientName: string } => {
  const autofilledFields: any = {
    shares: sharePurchase.Shares ?? 0,
    investorfirstname: investor.FirstName ?? "",
    investorlastname: investor.LastName ?? "",
    investorphone: investor.phone ?? "",
    investorinitial: investor.FirstName?.charAt(0) ?? "",
    investorcompanyname: investor.CompanyName ?? "",
    investorprimaryphonecontact: investor.PhonePrimaryContact ?? "",
    investoraddress: investor.Address ?? "",
    investortown: investor.town ?? "",
    investorstate: investor.state ?? "",
    investorzip: investor.zip ?? "",
    investorCountry: investor.country ?? "",
    investoremail: investor.email,
    projectname: stoTitle,
    currentDate: moment(new Date()).format("MMMM DD YYYY"),
    totalprice: `${currencySymbol} ${purchasePrice}`,
  };
  const details: any = [];
  // map fields from the db with known fields
  if (documentFields) {
    documentFields.forEach((f) => {
      if (f.fieldid) {
        const tempField = {
          tabLabel: f.externalFileDataLabel,
          value: autofilledFields[f.fieldid],
        };
        details.push(tempField);
      }
    });
  }
  Object.keys(autofilledFields).forEach((key) => {
    const tempField = {
      tabLabel: key,
      value: autofilledFields[key],
    };
    details.push(tempField);
  });

  const clientName =
    investor.investorType === 0
      ? `${investor.FirstName} ${investor.LastName}`
      : `${investor.CompanyName}`;
  return { details, clientName };
};

export default async (req: Request, res: Response) => {
  const buyRequest = await findOne<InvestorBuyPropertyAlert>(
    `SELECT * FROM InvestorBuyPropertyAlert WHERE id = ?`,
    [req.query.id]
  ).catch((error) =>
    common.handleError(
      req,
      res,
      `${error.toString()} - Error occurred in signDocusignDocuments getBuyRequestDetails`
    )
  );

  if (buyRequest) {
    const shareTypeService = new SharesSqlService();
    const shareType = await shareTypeService.getShareTypesById(
      buyRequest?.ShareTypeID ?? 0
    );
    const stoService = new StosService();
    const sto = await stoService.findById(buyRequest.stoid);
    const sto0 = await stoService.findById(0);
    const purchasePrice =
      (shareType?.premimum ?? 0) * (buyRequest?.Shares ?? 0);
    const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
    const investorService = new InvestorSqlService(query);
    const reqObj = req as any;
    const investor = (
      await investorService.getInvestor(reqObj.session.user.ID)
    )[0];
    const currencyService = new CurrencySqlService();
    const currencySymbol =
      (await currencyService.findById(shareType?.currencyid))?.Symbol ?? "";
    const documentService = new DocumentSqlService(query);
    const document = (
      await documentService.getDocuments(
        reqObj.query.documentID,
        buyRequest?.stoid ?? 0
      )
    )[0];
    const sharePurchaseDocService = new SharePurchaseDocumentsSqlService(query);
    const sharePurchaseDocument = (
      await sharePurchaseDocService.find(reqObj.query.documentID)
    )[0];
    const documentFields = await documentService.getDocumentFields(
      reqObj.query.documentID,
      buyRequest?.stoid ?? undefined
    );
    const docusignDetails: {
      details: any;
      clientName: string;
    } = docusignPrefill(
      investor,
      buyRequest,
      sto?.title,
      documentFields,
      purchasePrice,
      currencySymbol
    );
    const titleOfEmail =
      sharePurchaseDocument.requireOnce === 0
        ? `${sto?.title} - Investment Advisory Contract`
        : `${sto?.title} - ${buyRequest.Shares} Subscription Agreement`;

    const docusignService = new DocusignService();
    const { sharePurchaseID, documentID } = reqObj.query;
    const redirectURL = `${sto0?.stolinkfull}/sharePurchaseDocumentDocusignRedirect?sharePurchaseID=${sharePurchaseID}&documentID=${documentID}&stoID=${sto?.ID}`;
    await docusignService.redirectUserToSigningUrl(
      req,
      res,
      docusignDetails.details,
      redirectURL,
      document.docusignDocumentID ?? "",
      docusignDetails.clientName,
      titleOfEmail,
      investor.email
    );
  }
};
