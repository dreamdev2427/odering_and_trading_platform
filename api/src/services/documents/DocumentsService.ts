import {
  CloudFiles,
  Document,
  DocumentOfferInvestor,
  DocumentUser as SubmittedDocument,
  DocumentUserFieldValue,
  Investor,
} from 'entities';
import { FindConditions, MoreThanOrEqual } from 'typeorm';
import { isHideDocumentsEnabled } from 'core/feature-flags-checkers';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import upload from '../files/upload';

export const documentFieldValueAdapter = (val: {
  [id: string]: string;
}): DocumentUserFieldValue[] =>
  Object.keys(val).map((key) => ({
    ID: key,
    value: val[key],
  }));

export const investorHasAccess =
  (investor: Investor) =>
  (offer: DocumentOfferInvestor): boolean => {
    if (!offer.investorsName) {
      return true;
    }

    if (
      investor.firstName &&
      offer.investorsName.toLowerCase().includes(investor.firstName.toLowerCase())
    ) {
      return true;
    }

    if (
      investor.lastName &&
      offer.investorsName.toLowerCase().includes(investor.lastName.toLowerCase())
    ) {
      return true;
    }

    return !!(
      investor.companyName &&
      offer.investorsName.toLowerCase().includes(investor.companyName.toLowerCase())
    );
  };

export const filterDoc = (data: {
  offer: DocumentOfferInvestor;
  doc: Document | undefined;
}): data is { offer: DocumentOfferInvestor; doc: Document } => {
  return !!data.doc;
};

class DocumentServiceClass {
  async submittedDocuments(investorID: number, minStatus: number): Promise<SubmittedDocument[]> {
    const hideDocuments = await isHideDocumentsEnabled();
    const query: FindConditions<SubmittedDocument> = {
      investorID,
      status: MoreThanOrEqual(minStatus),
    };
    const where: FindConditions<SubmittedDocument> = hideDocuments
      ? {
          ...query,
          buyAlert: {
            status: PURCHASE_STATUS_TYPE.Accepted,
          },
        }
      : {
          ...query,
        };
    const result = await SubmittedDocument.find({
      relations: ['document', 'signature', 'investor', 'buyAlert'],
      where,
      order: { signatureDate: 'DESC' },
    });
    const docs = await Promise.all(
      result.map(async (unit) => {
        unit.fieldValues = documentFieldValueAdapter(
          JSON.parse(JSON.stringify(unit.fieldValuesJson ?? {})),
        );
        if (!unit?.signature) {
          unit.signature = CloudFiles.create({
            fileName: unit.signatureFilePath,
          });
        }
        unit.signature.modified = unit.signatureDate ?? new Date();
        unit.signature.url =
          unit.signature.fileName && (await upload.getSignedUrl(unit.signature.fileName));

        return unit;
      }),
    );

    return docs.filter((row) => row.document);
  }

  async submittedDocument(
    investorID: number,
    submittedDocumentID: number,
  ): Promise<SubmittedDocument | undefined> {
    const result = await SubmittedDocument.findOne({
      relations: ['document', 'signature', 'investor'],
      where: { investorID, ID: submittedDocumentID },
    });
    if (!result) return undefined;
    result.fieldValues = documentFieldValueAdapter(
      JSON.parse(JSON.stringify(result.fieldValuesJson ?? {})),
    );
    if (!result?.signature) {
      result.signature = CloudFiles.create({
        fileName: result.signatureFilePath,
      });
    }
    result.signature.modified = result.signatureDate ?? new Date();
    result.signature.url =
      result.signature.fileName && (await upload.getSignedUrl(result.signature.fileName));

    return result;
  }

  async unfinishedDocument(
    investorID: number,
    documentID: number,
  ): Promise<SubmittedDocument | undefined> {
    const result = await SubmittedDocument.findOne({
      relations: ['document', 'signature', 'investor'],
      where: { investorID, document: { ID: documentID } },
    });
    if (!result) return undefined;
    result.fieldValues = documentFieldValueAdapter(
      JSON.parse(JSON.stringify(result.fieldValuesJson ?? {})),
    );
    if (result?.signature?.fileName) {
      result.signature.url = await upload.getSignedUrl(result.signature.fileName);
      result.signature.modified = new Date();
    }
    return result;
  }
}
const DocumentService = new DocumentServiceClass();

export default DocumentService;
