import moment from "moment";
import { v4 } from "uuid";
import * as math from "mathjs";
import {
  Documentfields,
  Documents,
  Documentuser,
  Investor,
  Stos,
} from "../../../Schema";
import { head, unsafeHead } from "../../../utils";
import InvestorSqlService from "../investor/data/InvestorSQLService";
import DocumentSqlService from "../documents/data/documents/DocumentsSqlService";
import DocumentUserSqlService from "../documents/data/documents/DocumentUserService";
import * as singatureFileService from "../documents/data/SingatureFileService";
import SqlQuery, {
  getQueryfactory,
  SQLConnection,
} from "../documents/data/SqlQuery";
import SubmittedSharePurchaseDocumentsSqlService from "./data/SubmittedSharePurchaseDocumentsSqlService";
import SharePurchaseDocumentsSqlService from "./data/SharePurchaseDocumentsSqlService";
import InvestorBuyPropertyAlertSqlService from "./data/InvestorBuyPropertyAlertSqlService";
import { DocumentTypes } from "../documents/DocumentTypes";

type FancyDocumentUser = Documentuser & { signaturedate2: string };
const toFancyDocumentUser = (
  documentuser: Documentuser
): FancyDocumentUser => ({
  ...documentuser,
  signaturedate2: documentuser.signaturedate
    ? moment(documentuser.signaturedate).format("MMMM DD YYYY")
    : "",
});
type DocumentFieldValue = Documentfields & { value: any };
export default class SharePurchaseDocumentsService {
  connection: SQLConnection;

  constructor(connection: SQLConnection) {
    this.connection = connection;
  }

  async index(
    sharePurchaseID: number,
    documentID: number,
    investorID: number,
    sto: Stos
  ): Promise<{
    documentUser?: FancyDocumentUser;
    document: Documents;
    documentFields: Documentfields[];
    signature?: string;
    investor: Investor;
    autoFieldValues: DocumentFieldValue[];
  }> {
    const investorBuyPropertyAlert = new InvestorBuyPropertyAlertSqlService(
      getQueryfactory(this.connection)
    );
    const documentSqlService = new DocumentSqlService(
      getQueryfactory(this.connection)
    );
    const submittedSharePurchaseDocumentsSqlService = new SubmittedSharePurchaseDocumentsSqlService(
      getQueryfactory(this.connection)
    );

    const sharePurchaseDocumentsSqlService = new SharePurchaseDocumentsSqlService(
      getQueryfactory(this.connection)
    );
    const investorSqlService = new InvestorSqlService(
      getQueryfactory(this.connection)
    );
    const sharePurchaseDocumentQuery = sharePurchaseDocumentsSqlService.find(
      documentID
    );
    const documentUserQuery = submittedSharePurchaseDocumentsSqlService.find(
      sharePurchaseID,
      documentID
    );
    const documentQuery = documentSqlService.getDocuments(documentID);
    const documentFieldsQuery = documentSqlService.getDocumentFields(
      documentID
    );

    const investorQuery = investorSqlService.getInvestor(investorID);
    const sharePurchaseQuery = investorBuyPropertyAlert.find(
      sharePurchaseID,
      investorID
    );
    const [
      documentUsers,
      documents,
      documentFields,
      investors,
      sharePurchaseDocuments,
      sharePurchases,
    ] = await SqlQuery.all(
      documentUserQuery,
      documentQuery,
      documentFieldsQuery,
      investorQuery,
      sharePurchaseDocumentQuery,
      sharePurchaseQuery
    );
    head(sharePurchaseDocuments); // checks if document is in sharePurchaseDocuments
    const sharePurchase = head(sharePurchases);
    const investor = head(investors);

    const sharePrice = math.sum(
      sharePurchase.nominalValue ?? 0,
      sharePurchase.premimum ?? 0
    );
    const autofilledFields: DocumentTypes["sharePurchase"] = {
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
      projectname: sto.title,
      currentDate: moment(new Date()).format("MMMM DD YYYY"),
      totalprice:
        sharePurchase.purchasePriceOffered ||
        (math.number(
          math.round(
            math.multiply(
              math.bignumber(sharePrice ?? 0),
              math.bignumber(sharePurchase.Shares ?? 0)
            ) as math.BigNumber,
            3
          )
        ) as number),
      shareprice: sharePrice,
      sharecurrency: sharePurchase.Abbreviation ?? "",
    };
    const [manualFields, autoFields] = documentFields.reduce(
      (acc: Documentfields[][], documentField) =>
        Object.keys(autofilledFields).includes(documentField.fieldid ?? "")
          ? [acc[0], [...acc[1], documentField]]
          : [[...acc[0], documentField], acc[1]],
      [[], []]
    );
    const autoFieldValues = autoFields.map((field) => ({
      ...field,
      value:
        autofilledFields[field.fieldid as keyof DocumentTypes["sharePurchase"]],
    }));
    // remove autofilled fields

    const documentUser = unsafeHead(documentUsers);
    const signature = await singatureFileService.getSingature(documentUser);
    return {
      document: head(documents),
      documentUser: documentUser && toFancyDocumentUser(documentUser),
      documentFields: manualFields,
      signature,
      investor,
      autoFieldValues,
    };
  }

  async sign(
    docID: number,
    dirID: number,
    sharePurchaseID: number,
    fieldValuesJson: string,
    // contents: Documentuser["contents"],
    investorID: number,
    sto: Stos
  ): Promise<{ id: number; investor: Investor }> {
    const investorBuyPropertyAlert = new InvestorBuyPropertyAlertSqlService(
      getQueryfactory(this.connection)
    );
    const documentSqlService = new DocumentSqlService(
      getQueryfactory(this.connection)
    );
    const submittedSharePurchaseDocumentsSqlService = new SubmittedSharePurchaseDocumentsSqlService(
      getQueryfactory(this.connection)
    );
    const investorSqlService = new InvestorSqlService(
      getQueryfactory(this.connection)
    );
    const documentQuery = documentSqlService.getDocuments(docID);

    const [investors, sharePurchases, [doc]] = await SqlQuery.all(
      investorSqlService.getInvestor(investorID),
      investorBuyPropertyAlert.find(sharePurchaseID, investorID),
      documentQuery
    );
    const investor = head(investors);
    const sharePurchase = head(sharePurchases);
    const sharePrice = math.sum(
      sharePurchase.nominalValue ?? 0,
      sharePurchase.premimum ?? 0
    );
    const autofilledFields: DocumentTypes["sharePurchase"] = {
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
      investorCountry: investor.country ?? "",
      investorzip: investor.zip ?? "",
      investoremail: investor.email,
      projectname: sto.title,
      currentDate: moment(new Date()).format("MMMM DD YYYY"),
      totalprice:
        sharePurchase.purchasePriceOffered ||
        (math.number(
          math.round(
            math.multiply(
              math.bignumber(sharePrice ?? 0),
              math.bignumber(sharePurchase.Shares ?? 0)
            ) as math.BigNumber,
            3
          )
        ) as number),
      shareprice: sharePrice,
      sharecurrency: sharePurchase.Abbreviation ?? "",
    };
    const isAutoField = (
      key: string
    ): key is keyof DocumentTypes["sharePurchase"] =>
      Object.keys(autofilledFields).includes(key);
    const parsedFieldvalues = JSON.parse(fieldValuesJson ?? "{}");

    const autoFilledFieldValues: { [i: string]: string } = Object.keys(
      parsedFieldvalues
    ).reduce(
      (acc, val) => ({
        ...acc,
        [val]: (isAutoField(val)
          ? autofilledFields[val]
          : parsedFieldvalues[val]
        ).toString(),
      }),
      {}
    );
    const contents = Object.keys(autoFilledFieldValues).reduce(
      (contract, key) => contract.split(key).join(autoFilledFieldValues[key]),
      doc.contents ?? ""
    );
    return {
      id: await submittedSharePurchaseDocumentsSqlService.upsert(
        sharePurchaseID,
        docID,
        dirID,
        JSON.stringify(autoFilledFieldValues),
        contents,
        investorID,
        (sto as any).stoid
      ),
      investor,
    };
  }

  async updateSignature(
    sharePurchaseID: number,
    documentID: number,
    investorID: number,
    signatureData: string,
    stoID: number,
    isExternalSignature: boolean = false
  ): Promise<void> {
    const submittedSharePurchaseDocumentsSqlService = new SubmittedSharePurchaseDocumentsSqlService(
      getQueryfactory(this.connection)
    );

    const investorBuyPropertyAlertService = new InvestorBuyPropertyAlertSqlService(
      getQueryfactory(this.connection)
    );
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );
    const sharePurchaseDocumentsSqlService = new SharePurchaseDocumentsSqlService(
      getQueryfactory(this.connection)
    );
    const investorSqlService = new InvestorSqlService(
      getQueryfactory(this.connection)
    );

    const investorBuyPropertyAlertQuery = investorBuyPropertyAlertService.find(
      sharePurchaseID,
      investorID
    );
    const investorQuery = investorSqlService.getInvestor(investorID);
    const [investorBuyPropertyAlert, investor] = await SqlQuery.all(
      investorBuyPropertyAlertQuery,
      investorQuery
    );
    head(investorBuyPropertyAlert); // check if investorID has access to sharePurchaseID

    const documentUser = (
      await submittedSharePurchaseDocumentsSqlService.find(
        sharePurchaseID,
        documentID
      )
    )[0];
    if (!documentUser) throw new Error("documentUser not found");
    if (!isExternalSignature && documentUser.signaturefilepath)
      await singatureFileService.deleteSignature(
        documentUser.signaturefilepath
      );
    const newSignaturePath = isExternalSignature
      ? `docusignViewSignedDocumentsUrl/${signatureData}`
      : `documemtsigns/${v4()}_sig.png`;
    if (!isExternalSignature) {
      await singatureFileService.uploadSignature(
        newSignaturePath,
        signatureData
      );
    }

    await documentUserSqlService.updateSignaturePath(
      newSignaturePath,
      documentUser.ID,
      true
    );

    const investorCountry =
      investor[0].taxResidencyCountry !== null &&
      investor[0].taxResidencyCountry !== ""
        ? investor[0].taxResidencyCountry
        : investor[0].country;
    const investorType =
      investor[0].investorType === 1 ? "Entity" : "Individual";
    const mode = (global as any).config.sharePurchaseDocumentsMode;
    let docuSignParam = "NULL";
    let helloSignParam = "NULL";
    if (mode === "docuSign") {
      docuSignParam = "NOT NULL";
    } else if (mode === "helloSign") {
      helloSignParam = "NOT NULL";
    }
    const filteredSpds = await sharePurchaseDocumentsSqlService.findAllWithDocuments(
      stoID,
      investorID,
      sharePurchaseID,
      investorCountry ?? "",
      investorType,
      docuSignParam,
      helloSignParam
    );
    if (
      filteredSpds.length &&
      filteredSpds.every((spd) => spd.status ?? 0 >= 2)
    ) {
      await investorBuyPropertyAlertService.updateDocumentsSigned(
        // Mark alert as signed
        true,
        sharePurchaseID,
        investorID
      );
    }
  }

  async deleteSignature(
    sharePurchaseID: number,
    investorID: number,
    documentID: number
  ): Promise<void> {
    const submittedSharePurchaseDocumentsSqlService = new SubmittedSharePurchaseDocumentsSqlService(
      getQueryfactory(this.connection)
    );

    const investorBuyPropertyAlertService = new InvestorBuyPropertyAlertSqlService(
      getQueryfactory(this.connection)
    );
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );

    const documentUserQuery = submittedSharePurchaseDocumentsSqlService.find(
      sharePurchaseID,
      documentID
    );
    const investorBuyPropertyAlertQuery = investorBuyPropertyAlertService.find(
      sharePurchaseID,
      investorID
    );
    const [documentUsers, investorBuyPropertyAlert] = await SqlQuery.all(
      documentUserQuery,
      investorBuyPropertyAlertQuery
    );
    head(investorBuyPropertyAlert); // check if investorID has access to sharePurchaseID

    const documentUser = head(documentUsers);
    if (documentUser.signaturefilepath) {
      await singatureFileService.deleteSignature(
        documentUser.signaturefilepath
      );
      const deleteSignaturePathQuery = documentUserSqlService.deleteSignaturePath(
        documentUser.ID
      );
      const updateDocumentsSignedQuery = investorBuyPropertyAlertService.updateDocumentsSigned(
        false,
        sharePurchaseID,
        investorID
      );
      await SqlQuery.all(deleteSignaturePathQuery, updateDocumentsSignedQuery);
    }
  }
}
