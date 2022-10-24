import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import { Stos } from "../../../Schema";
import SharePurchaseDocumentsService from "../../../services/investorClient/sharePurchaseDocuments/SharePurchaseDocumentsService";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const {
      sharePurchaseID,
      documentID,
      jsondata,
      contents,
      dirid,
      op,
    } = req.body;
    const investorID = req.session.user.ID;
    const sto = (global as any).config.stos[req.hostname] as Stos;

    const contractView2 = new SharePurchaseDocumentsService(
      mysql.executeSQLStatement as SQLConnection
    );
    const investorPageDataP = common.getCommonInvestorDashboardPageProperties(
      req,
      res
    );
    const { id, investor } = await contractView2.sign(
      documentID,
      dirid,
      sharePurchaseID,
      jsondata,
      investorID,
      sto
    );
    if (op === "1") {
      res.render("investors/sharePurchaseDocuments/contractview2sign", {
        ID: id,
        sharePurchaseID,
        documentID,
        offerid: 0,
        csrfToken: encodeURI(req.csrfToken()),
        contents,
        fullname: `${investor.FirstName} ${investor.LastName}`,
        partials: common.getInvestorDashboardPartials(),
        Data: await investorPageDataP,
      });
    } else {
      req.flash("UserMessage", 1);
      res.redirect(
        `/sharePurchaseDocument?sharePurchaseID=${sharePurchaseID}&documentID=${documentID}`
      );
    }
  } catch (err) {
    common.handleError(
      req,
      res,
      `${err} - Error occured in signcontracftview2`
    );
  }
};
