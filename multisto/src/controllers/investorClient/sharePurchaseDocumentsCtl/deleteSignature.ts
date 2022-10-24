import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import SharePurchaseDocumentsService from "../../../services/investorClient/sharePurchaseDocuments/SharePurchaseDocumentsService";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const { sharePurchaseID, documentID } = req.query;
    const investorID = req.session.user.ID;

    const service = new SharePurchaseDocumentsService(
      mysql.executeSQLStatement as SQLConnection
    );
    await service.deleteSignature(sharePurchaseID, investorID, documentID);
    res.redirect(
      `/sharePurchaseDocument?sharePurchaseID=${sharePurchaseID}&documentID=${documentID}`
    );
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occured in deletesignature`
    );
  }
};
