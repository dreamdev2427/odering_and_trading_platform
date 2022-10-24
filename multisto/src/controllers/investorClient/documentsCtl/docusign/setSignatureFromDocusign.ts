import { Request, Response } from "express";
import SharePurchaseDocumentsService from "../../../../services/investorClient/sharePurchaseDocuments/SharePurchaseDocumentsService";
import mysql from "../../../../modules/mysql";
import common from "../../../../modules/common";
import logger from "../../../../logger";
import SubmittedSharePurchaseDocumentsSqlService from "../../../../services/investorClient/sharePurchaseDocuments/data/SubmittedSharePurchaseDocumentsSqlService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../../services/investorClient/documents/data/SqlQuery";

export default async (req: Request, res: Response) => {
  if (req.query.event === "signing_complete") {
    try {
      const reqObj = req as any;
      const { sharePurchaseID, documentID, stoID } = reqObj.query;

      const investorID = reqObj.session.user.ID;

      const submittedSharePurchaseDocumentsSqlService = new SubmittedSharePurchaseDocumentsSqlService(
        getQueryfactory(mysql.executeSQLStatement as SQLConnection)
      );
      const a = await submittedSharePurchaseDocumentsSqlService.upsert(
        sharePurchaseID,
        documentID,
        -1,
        "",
        "",
        investorID,
        stoID
      );
      logger.error(`documentID: ${JSON.stringify(a)}`);

      const contractView2 = new SharePurchaseDocumentsService(
        mysql.executeSQLStatement as SQLConnection
      );
      await contractView2
        .updateSignature(
          parseInt(sharePurchaseID, 10),
          parseInt(documentID, 10),
          investorID,
          req.query.envelopeId?.toString() ?? "",
          stoID,
          true
        )
        .catch((e) => {
          logger.error(
            `${e} - error occurred in setSignatureFromDocusign while trying to updateSignature`
          );
        });

      res.redirect(
        `/signSubscriptionForms?id=${sharePurchaseID}&stoID=${stoID}`
      );
    } catch (err) {
      common.handleError(
        req,
        res,
        `${err} - Error occurred in setSignatureFromDocusign`
      );
    }
  }
};
