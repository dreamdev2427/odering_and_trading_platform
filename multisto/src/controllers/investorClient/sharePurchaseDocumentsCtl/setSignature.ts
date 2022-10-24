import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import SharePurchaseDocumentsService from "../../../services/investorClient/sharePurchaseDocuments/SharePurchaseDocumentsService";
import DocumentSqlService from "../../../services/investorClient/documents/data/documents/DocumentsSqlService";
import {
  getQueryfactory,
  SQLConnection,
} from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    // const { } = req.query;
    const { signatureData, sharePurchaseID, documentID } = req.body;

    const investorID = req.session.user.ID;
    const base64Signature = signatureData.replace(
      "data:image/octet-stream;base64,",
      ""
    );

    const contractView2 = new SharePurchaseDocumentsService(
      mysql.executeSQLStatement as SQLConnection
    );
    const query = getQueryfactory(mysql.executeSQLStatement as SQLConnection);
    const documentService = new DocumentSqlService(query);
    const document = await documentService.getDocuments(documentID);
    if (document[0].stoid) {
      const stoID = document[0].stoid;
      await contractView2.updateSignature(
        parseInt(sharePurchaseID, 10),
        parseInt(documentID, 10),
        investorID,
        base64Signature,
        stoID
      );

      res.redirect(
        `/signSubscriptionForms?id=${sharePurchaseID}&stoID=${stoID}`
      );
    } else {
      throw new Error(
        `No such document found DocumentID: ${documentID} - error occurred in setSignature`
      );
    }
  } catch (err) {
    common.handleError(req, res, `${err} - Error occured in setSingature`);
  }
};
