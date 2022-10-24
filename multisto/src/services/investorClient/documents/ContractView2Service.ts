import moment from "moment";
import { v4 } from "uuid";
import {
  Documentfields,
  Documentofferinvestor,
  Documents,
  Documentuser,
  Investor,
} from "../../../Schema";
import { head, unsafeHead } from "../../../utils";
import InvestorSqlService from "../investor/data/InvestorSQLService";
import DocumentSqlService from "./data/documents/DocumentsSqlService";
import DocumentUserSqlService from "./data/documents/DocumentUserService";
import * as singatureFileService from "./data/SingatureFileService";
import SqlQuery, { getQueryfactory, SQLConnection } from "./data/SqlQuery";

type FancyDocumentUser = Documentuser & { signaturedate2: string };
const toFancyDocumentUser = (
  documentuser: Documentuser
): FancyDocumentUser => ({
  ...documentuser,
  signaturedate2: documentuser.signaturedate
    ? moment(documentuser.signaturedate).format("MMMM DD YYYY")
    : "",
});

const documentIDFromDocumentOffer = (
  documentOffer: Documentofferinvestor
): number => {
  if (!documentOffer.documentid) throw new Error("missing documentID");
  return documentOffer.documentid;
};

export default class Contractsview2 {
  connection: SQLConnection;

  constructor(connection: SQLConnection) {
    this.connection = connection;
  }
  async nonOfferIndex(
    documentUserId: number,
    investorID: number
  ): Promise<{
    documentUser?: FancyDocumentUser;
    document: Documents;
    documentFields: Documentfields[];
    signature?: string;
    investor: Investor;
  }> {
    const documentSqlService = new DocumentSqlService(
      getQueryfactory(this.connection)
    );
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );
    const investorSqlService = new InvestorSqlService(
      getQueryfactory(this.connection)
    );

    const documentUser = (
      await documentUserSqlService.findById(documentUserId)
    )[0];
    const documentQuery = documentSqlService.getDocuments(
      documentUser.documentid
    );
    const documentFieldsQuery = documentSqlService.getDocumentFields(
      documentUser.documentid
    );

    const investorQuery = investorSqlService.getInvestor(investorID);
    const [documents, documentFields, investor] = await SqlQuery.all(
      documentQuery,
      documentFieldsQuery,
      investorQuery
    );

    const signature = await singatureFileService.getSingature(documentUser);
    return {
      document: head(documents),
      documentUser: documentUser && toFancyDocumentUser(documentUser),
      documentFields,
      signature,
      investor: head(investor),
    };
  }

  async index(
    documentofferinvestorID: number,
    investorID: number,
    stoID: number
  ): Promise<{
    documentofferinvestor: Documentofferinvestor;
    documentUser?: FancyDocumentUser;
    document: Documents;
    documentFields: Documentfields[];
    signature?: string;
    investor: Investor;
  }> {
    const documentSqlService = new DocumentSqlService(
      getQueryfactory(this.connection)
    );
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );
    const investorSqlService = new InvestorSqlService(
      getQueryfactory(this.connection)
    );

    const documentofferinvestor = await documentSqlService
      .getDocumentofferinvestors(stoID, documentofferinvestorID)
      .then(head);
    const documentID = documentIDFromDocumentOffer(documentofferinvestor);

    const documentUserQuery = documentUserSqlService.find(
      stoID,
      investorID,
      documentID,
      documentofferinvestorID
    );
    const documentQuery = documentSqlService.getDocuments(documentID, stoID);
    const documentFieldsQuery = documentSqlService.getDocumentFields(
      documentID,
      stoID
    );

    const investorQuery = investorSqlService.getInvestor(investorID);
    const [
      documentUsers,
      documents,
      documentFields,
      investor,
    ] = await SqlQuery.all(
      documentUserQuery,
      documentQuery,
      documentFieldsQuery,
      investorQuery
    );
    // const investorName = await getInvestorName(investorID);
    const documentUser = unsafeHead(documentUsers);

    const signature = await singatureFileService.getSingature(documentUser);
    return {
      documentofferinvestor,
      document: head(documents),
      documentUser: documentUser && toFancyDocumentUser(documentUser),
      documentFields,
      signature,
      investor: head(investor),
    };
  }

  async sign(
    stoID: number,
    docID: number,
    offerID: number,
    dirID: number,
    fieldValuesJson: string,
    investorID: number
  ): Promise<{ id: number; investor: Investor }> {
    const documentSqlService = new DocumentSqlService(
      getQueryfactory(this.connection)
    );
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );

    const investorSqlService = new InvestorSqlService(
      getQueryfactory(this.connection)
    );

    const [[doc], [investor]] = await SqlQuery.all(
      documentSqlService.getDocuments(docID),
      investorSqlService.getInvestor(investorID)
    );
    const fieldValues: { [i: string]: string } = JSON.parse(fieldValuesJson);
    const contents = Object.keys(fieldValues).reduce(
      (contract, key) => contract.split(key).join(fieldValues[key]),
      doc.contents ?? ""
    );
    return {
      id: await documentUserSqlService.upsert(
        stoID,
        docID,
        offerID,
        dirID,
        fieldValuesJson,
        contents,
        investorID
      ),
      investor,
    };
  }

  async updateSignature(
    documentUserID: number,
    investorID: number,
    stoID: number,
    hostname: string,
    signatureData: string
  ): Promise<void> {
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );
    const oldSignaturePath = await documentUserSqlService
      .fetch(documentUserID, investorID, stoID)
      .then(head)
      .then((documentUser) => documentUser.signaturefilepath);
    if (oldSignaturePath)
      await singatureFileService.deleteSignature(oldSignaturePath);
    const newSignaturePath = `documemtsigns/${hostname}_${v4()}_sig.png`;

    await singatureFileService.uploadSignature(newSignaturePath, signatureData);
    await documentUserSqlService.updateSignaturePath(
      newSignaturePath,
      documentUserID
    );
  }

  async deleteSignature(
    stoID: number,
    investorID: number,
    documentID: number,
    documentofferinvestorID: number
  ): Promise<void> {
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );

    const documentUser = await documentUserSqlService
      .find(stoID, investorID, documentID, documentofferinvestorID)
      .then(head);

    if (documentUser.signaturefilepath) {
      await singatureFileService.deleteSignature(
        documentUser.signaturefilepath
      );
      await documentUserSqlService.deleteSignaturePath(documentUser.ID);
    }
  }

  async deleteDocumentUser(duID: number): Promise<void> {
    const documentUserSqlService = new DocumentUserSqlService(
      getQueryfactory(this.connection)
    );
    await documentUserSqlService.deleteDocumentUser(duID);
  }
}
