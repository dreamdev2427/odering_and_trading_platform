import { CloudFiles, Documentuser } from 'DBSchema';
import { isMarketSpace, sharePurchaseDocumentsModes } from 'core/feature-flags-checkers';
import {
  Document,
  DocumentUser,
  DocumentUserFieldValue,
  InvestingEntity,
  Investor,
  InvestorBuyPropertyAlert,
  Stos,
  SubmittedSharePurchaseDocument,
} from 'entities';
import { ApolloError, ForbiddenError } from 'apollo-server-core';
import { IsNull, Like, Not } from 'typeorm';
import { head } from 'utils';
import upload from 'services/files/upload';

export const documentFieldValueAdapter = (val: {
  [id: string]: string;
}): DocumentUserFieldValue[] =>
  Object.keys(val).map((key) => ({
    ID: key,
    value: val[key],
  }));

export const submittedDocumentAdapter = (val: Documentuser & CloudFiles, doc: unknown): any => ({
  ...val,
  investorID: val.investorID ?? 0,
  documentID: val.documentid ?? 0,
  status: val.DocumentStatus ?? 0,
  fieldValues: documentFieldValueAdapter(JSON.parse(JSON.stringify(val.fieldValuesJson) ?? {})),
  document: doc,
  signature: val.url ? { url: val.url, modified: val.signaturedate ?? new Date() } : undefined,
});

export interface RequiredDocumentsParams {
  document: Document;
  requireOnce: boolean;
  status: number;
}

export const findRequiredDocuments = async (
  purchaseReq: InvestorBuyPropertyAlert,
  investorID: number,
): Promise<RequiredDocumentsParams[]> => {
  // Get investor details
  const investor = await Investor.findOneOrFail({ ID: investorID });

  const documentsMode = await sharePurchaseDocumentsModes();

  let investorType;
  let investorCountry;
  if (await isMarketSpace()) {
    const entity = await InvestingEntity.findOneOrFail({
      investorID: investor.ID,
      ID: purchaseReq.entityID,
    });
    investorType = (await entity.type).title === 'Individual Account' ? 'Individual' : 'Entity';
    investorCountry = entity.country;
  } else {
    investorType = investor.investorType === 1 ? 'Entity' : 'Individual';
    investorCountry = investor.taxCountry !== null ? investor.taxCountry : investor.country;
  }
  const docuSignDocumentID = documentsMode.isDocuSign() ? Not(IsNull()) : IsNull();
  const helloSignDocumentID = documentsMode.isHelloSign() ? Not(IsNull()) : IsNull();
  const requiredDocuments = (
    await Document.find({
      relations: ['sharePurchaseDocument'],
      where: [
        {
          stoID: purchaseReq.stoID,
          countriesWhitelist: '["ALL"]',
          investorTypesWhitelist: '["ALL"]',
          docusignDocumentID: docuSignDocumentID,
          helloSignDocumentID: helloSignDocumentID,
        },
        {
          stoID: purchaseReq.stoID,
          countriesWhitelist: '["ALL"]',
          investorTypesWhitelist: Like(`%"${investorType}"%`),
          docusignDocumentID: docuSignDocumentID,
          helloSignDocumentID: helloSignDocumentID,
        },
        {
          stoID: purchaseReq.stoID,
          countriesWhitelist: Like(`%"${investorCountry}"%`),
          investorTypesWhitelist: '["ALL"]',
          docusignDocumentID: docuSignDocumentID,
          helloSignDocumentID: helloSignDocumentID,
        },
        {
          stoID: purchaseReq.stoID,
          countriesWhitelist: Like(`%"${investorCountry}"%`),
          investorTypesWhitelist: Like(`%"${investorType}"%`),
          docusignDocumentID: docuSignDocumentID,
          helloSignDocumentID: helloSignDocumentID,
        },
      ],
    })
  )
    .filter((doc) => doc.sharePurchaseDocument !== null)
    .map((doc) => ({
      document: doc,
      ID: doc.sharePurchaseDocument.ID,
      requireOnce: doc.sharePurchaseDocument.requireOnce,
      status: doc.sharePurchaseDocument.status,
    }));

  // Find references in submitted documents to DocumentUser with this purchase ID
  const submittedSPDocumentsLazy = await SubmittedSharePurchaseDocument.find({
    relations: ['submittedDocument'],
    where: {
      sharePurchaseRequestID: purchaseReq.ID,
    },
  });
  // console.log(submittedSPDocumentsLazy);
  const submittedSPDocuments = await Promise.all(
    submittedSPDocumentsLazy.map(async (doc) => ({
      ...doc,
      submittedDocument: await doc.submittedDocument,
      document: await doc.document,
      sharePurchaseDocument: await doc.sharePurchaseDocument,
    })),
  );
  // console.log(submittedSPDocuments);
  const userStoDocuments = await DocumentUser.find({
    investorID: purchaseReq.investorID,
    stoID: purchaseReq.stoID,
  });

  // this was moved here so it can be used by both "view contracts that the investor should sign"
  // and "check if investor signed all contracts so we can show the sto admin, the alert"
  return requiredDocuments.map((purchaseDocument) => ({
    document: purchaseDocument.document,
    requireOnce: purchaseDocument.requireOnce === 1,
    status:
      submittedSPDocuments.find((submittedSPDocument) => {
        return (
          (submittedSPDocument.submittedDocument?.investorID === investorID &&
            // Either this is a submitted document record matching the purchase document ID and investor ID
            submittedSPDocument.submittedDocument?.documentID === purchaseDocument.ID) ||
          // Or this purchase document is only required once and the investor signed it (status 3?)
          (purchaseDocument.requireOnce === 1 &&
            submittedSPDocument.submittedDocument?.status === 3)
        );
        // Originally, sto ID was checked, but it follows from purchaseReq.stoID check while mapping purchaseDocuments
      })?.submittedDocument?.status ??
      // Additionally search in DocumentUser for signed STO contracts that are required once
      userStoDocuments.find(
        (stoDoc) =>
          stoDoc.documentID === purchaseDocument.document?.ID &&
          purchaseDocument.requireOnce === 1 &&
          stoDoc.status === 3, // In other case, it's in submittedDocuments above
      )?.status ??
      0, // Coalesce with zero in case it's not in submitted documents list
  }));
};

export class SharePurchaseServiceClass {
  /**
   * Delivers the share purchase documents required for a specific share purchase and investor
   */
  async index(
    sharePurchaseID: number,
    investorID: number,
  ): Promise<
    {
      requireOnce: boolean;
      document: Document;
      status?: number;
    }[]
  > {
    /*
      Since we are matching the share purchase documents to a share purchase ID, I've taken the liberty to filter this data below
      In other words, we are not just listing just any share purchase documents, they are determined by business logic
      The original logic did not filter the necessary share purchase documents.
    */

    // Check if investor has access to the sharepurchaserequest
    const purchaseReq = await InvestorBuyPropertyAlert.findOneOrFail({
      ID: sharePurchaseID,
      investorID,
    });

    return findRequiredDocuments(purchaseReq, investorID);
  }

  async findOne(
    sharePurchaseID: number,
    documentID: number,
    investorID: number,
  ): Promise<DocumentUser | undefined> {
    const investor = await Investor.findOne({ where: { ID: investorID } });
    if (!investor) throw new ForbiddenError('User not found');

    //check if investor has access to the sharepurchaserequest
    const sharePurchase = head(
      await InvestorBuyPropertyAlert.find({ ID: sharePurchaseID, investorID }),
    );
    // const document = await SharePurchaseDocument.findOne({
    //   relations: ['document'],
    //   where: { document: { ID: documentID } },
    // });
    const submittedDocument = await DocumentUser.findOne({
      relations: ['document', 'signature'],
      where: {
        sharePurchaseID,
        documentID,
        investorID,
      },
    });
    const sto = await Stos.findOne({ where: { ID: sharePurchase.stoID } });
    if (!sto) throw new ApolloError('Sto not found');

    if (!submittedDocument) return undefined;
    submittedDocument.fieldValues = documentFieldValueAdapter(
      JSON.parse(submittedDocument.fieldValuesJson),
    );
    if (submittedDocument?.signature?.fileName) {
      submittedDocument.signature.url = await upload.getSignedUrl(
        submittedDocument.signature.fileName,
      );
      submittedDocument.signature.modified = new Date();
    }
    return submittedDocument;
  }

  async deleteSharePurchaseRequest(documentID: number): Promise<boolean> {
    return !!(await InvestorBuyPropertyAlert.delete({ ID: documentID }));
  }
}
const SharePurchaseService = new SharePurchaseServiceClass();
export default SharePurchaseService;
