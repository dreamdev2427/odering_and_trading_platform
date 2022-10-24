import upload from 'services/files/upload';
import { Document, DocumentOfferInvestor, DocumentUser, Investor } from 'entities';
import { ForbiddenError, ApolloError } from 'apollo-server-core';
import CloudFileService from './data/documents/CloudFileService';
import { investorHasAccess } from './DocumentsService';

const fieldIDFormats = {
  left: ['{{', '{', '\\['],
  right: ['}}', '}', '\\]'],
};

const fieldIDregex = (fieldID: string): string =>
  `\\s?(${fieldIDFormats.left.join('|')})\\s*${fieldID}\\s*(${fieldIDFormats.right.join('|')})\\s?`;

export class SignatureServiceClass {
  async setSubmittedDocument(
    investorID: number,
    documentID: number,
    fieldValues: any[],
  ): Promise<boolean> {
    const investor = await Investor.findOne(investorID);
    if (!investor) throw new ForbiddenError('Investor not found');
    const document = await Document.findOne({ where: { ID: documentID } });
    const offer = await DocumentOfferInvestor.findOne({
      relations: ['document'],
      where: { document: { ID: documentID } },
    });
    // No offer is found for the given information
    if (!offer) return false;
    const documentUser = await DocumentUser.findOne({
      relations: ['document', 'signature', 'investor'],
      where: {
        document: { ID: documentID },
        investor: { ID: investor.ID },
      },
    });

    if (!investorHasAccess(investor)(offer))
      throw new ForbiddenError('Investor does not have access');
    const serializedFieldValues = JSON.stringify(
      fieldValues.reduce((acc, val) => ({ ...acc, [val.ID]: val.value }), {}),
    );
    const contents = fieldValues.reduce<string>(
      (acc: string, field) =>
        acc
          .replaceAll(
            new RegExp(fieldIDregex(field.ID), 'g'),
            ` ${fieldValues[field.ID] ?? field.title} `,
          )
          .replaceAll(field.ID, fieldValues[field.ID] ?? field.title),
      document?.contents || '',
    );

    if (documentUser?.ID) {
      const foundDoc =
        documentUser?.stoID === document?.stoID &&
        documentUser?.documentOfferInvestorID === offer.ID
          ? documentUser
          : null;

      if (foundDoc) {
        foundDoc.fieldValuesJson = serializedFieldValues;
        foundDoc.contents = contents;
        await foundDoc.save();
      }
    } else {
      const createDoc = DocumentUser.create({
        fieldValuesJson: serializedFieldValues,
        contents: contents,
        investorID: investor.ID,
        document: { ID: documentID },
        stoID: document?.stoID,
        documentOfferInvestorID: offer.ID,
        status: 1,
      });
      await createDoc.save();
    }
    return true;
  }

  async setSignature(
    // stoID: number,
    investorID: number,
    documentID: number,
    base64: string,
  ): Promise<string> {
    const investor = await Investor.findOne(investorID);
    if (!investor) throw new ForbiddenError('Investor not found');

    const offer = await DocumentOfferInvestor.findOne({
      relations: ['document'],
      where: { document: { ID: documentID } },
    });
    const documentUser = await DocumentUser.findOne({
      relations: ['investor'],
      where: {
        ID: documentID,
        investor: { ID: investor.ID },
      },
    });

    // Documents not found. IDs are not valid.
    if (!offer || !documentUser) throw new ApolloError('No such Documents found.');
    if (!investorHasAccess(investor)(offer))
      throw new ForbiddenError('Investor does not have access');

    const filename = await upload.uploadBase64File(base64, 'signature.png');
    const file = await CloudFileService.insert(filename);
    documentUser.signature = file;
    documentUser.signatureDate = new Date();
    documentUser.save();
    return upload.getSignedUrl(filename);
  }

  async sendDocument(investorID: number, documentID: number): Promise<boolean> {
    const documentUser = await DocumentUser.findOne({
      relations: ['document', 'investor'],
      where: { investor: { ID: investorID }, document: { ID: documentID } },
    });
    if (!documentUser) return false;
    // if (!documentUser) throw new Error('No such document user if found.');
    if (
      // documentUser.signature &&
      documentUser.fieldValuesJson
    ) {
      documentUser.status = 2;
      documentUser.signatureDate = new Date();
      // console.log(documentUser);
      await documentUser.save();
      return true;
    }
    return false;
  }
}

export const SignatureService = new SignatureServiceClass();
