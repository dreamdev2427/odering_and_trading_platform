import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import ContractView2Service from "../../../services/investorClient/documents/ContractView2Service";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const { docid, offerid, jsondata, contents, dirid, op } = req.body;
    const investorID = req.session.user.ID;
    const stoID = (global as any).config.stos[req.hostname].stoid;

    const contractView2 = new ContractView2Service(
      mysql.executeSQLStatement as SQLConnection
    );
    const investorPageDataP = common.getCommonInvestorDashboardPageProperties(
      req,
      res
    );
    const { id, investor } = await contractView2.sign(
      stoID,
      docid,
      offerid,
      dirid,
      jsondata,
      investorID
    );

    if (op === "1") {
      res.render("investors/contractview2sign", {
        ID: id,
        offerid,
        fullname: `${investor.FirstName} ${investor.LastName}`,
        csrfToken: req.csrfToken(),
        contents,
        partials: common.getInvestorDashboardPartials(),
        Data: await investorPageDataP,
      });
    } else {
      req.flash("UserMessage", 1);
      res.redirect(`contractview2?id=${offerid}`);
    }
  } catch (err) {
    common.handleError(
      req,
      res,
      `${err} - Error occured in signcontracftview2`
    );
  }
};
