import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import { Stos } from "../../../Schema";
import SharePurchaseDocumentsService from "../../../services/investorClient/sharePurchaseDocuments/SharePurchaseDocumentsService";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const sto = (global as any).config.stos[req.hostname] as Stos;
    const { sharePurchaseID, documentID } = req.query;
    const investorID = req.session.user.ID;
    // const stoID = (global as any).config.stos[req.hostname].stoid;
    const contractView2 = new SharePurchaseDocumentsService(
      mysql.executeSQLStatement as SQLConnection
    );
    const investorPageDataP = common.getCommonInvestorDashboardPageProperties(
      req,
      res
    );
    const result = await contractView2.index(
      sharePurchaseID,
      documentID,
      investorID,
      sto
    );
    const {
      documentUser,
      documentFields,
      document,
      signature,
      investor,
      autoFieldValues,
    } = result;

    const documentStatus = documentUser && documentUser.DocumentStatus;
    res.render("investors/sharePurchaseDocuments/contractsview2", {
      fieldValuesJson: (documentUser && documentUser.fieldValuesJson) || "[]",
      signatureFileContents: signature,
      sharePurchaseID,
      documentID,
      document,
      documentfiels: documentFields,
      signaturedate2: documentUser && documentUser.signaturedate2,
      fullname: `${investor.FirstName} ${investor.LastName}`,
      csrfToken: encodeURI(req.csrfToken()),
      partials: common.getInvestorDashboardPartials(),
      Data: await investorPageDataP,
      documentuser: documentUser || {},
      documentuserfound: documentStatus === 2 || documentStatus === 3 ? 1 : 0,
      documentusersettled: documentStatus === 3 ? 1 : 0,
      UserMessage: parseInt(req.flash("UserMessage"), 10),
      autoFieldValues,
    });
  } catch (err) {
    common.handleError(
      req,
      res,
      `${err} - Error occured in contractview2 getDatabaseInformation`
    );
  }
};
