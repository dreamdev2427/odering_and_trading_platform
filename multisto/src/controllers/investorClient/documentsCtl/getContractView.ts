import common from "../../../modules/common";
import mysql from "../../../modules/mysql";
import ContractView2Service from "../../../services/investorClient/documents/ContractView2Service";
import { SQLConnection } from "../../../services/investorClient/documents/data/SqlQuery";

export default async (req: any, res: any) => {
  try {
    const documentUserId = req.query.id;
    const investorID = req.session.user.ID;
    const contractView2 = new ContractView2Service(
      mysql.executeSQLStatement as SQLConnection
    );
    const investorPageDataP = common.getCommonInvestorDashboardPageProperties(
      req,
      res
    );
    /*
        const result = await contractView2.index(
            documentofferinvestorID,
            investorID,
            stoID
        );
        */
    const result = await contractView2.nonOfferIndex(
      documentUserId,
      investorID
    );
    const {
      documentUser,
      documentFields,
      document,
      signature,
      investor,
    } = result;

    const documentStatus = documentUser && documentUser.DocumentStatus;
    res.render("investors/contractsview2", {
      record: undefined,
      fieldValuesJson: (documentUser && documentUser.fieldValuesJson) || "[]",
      signatureFileContents: signature,
      document,
      documentfiels: documentFields,
      signaturedate2: documentUser && documentUser.signaturedate2,
      fullname: `${investor.FirstName} ${investor.LastName}`,
      csrfToken: req.csrfToken(),
      partials: common.getInvestorDashboardPartials(),
      Data: await investorPageDataP,
      documentuser: documentUser || {},
      documentuserfound: documentStatus === 2 || documentStatus === 3 ? 1 : 0,
      documentusersettled: documentStatus === 3 ? 1 : 0,
      UserMessage: parseInt(req.flash("UserMessage"), 10),
      internalSignatureMode: (global as any).config.internalSignatureMode ?? "",
    });
  } catch (err) {
    common.handleError(
      req,
      res,
      `${err} - Error occurred in contractview2 getDatabaseInformation`
    );
  }
};
