import { ApolloError, ForbiddenError } from 'apollo-server-core';
import moment from 'moment';
import schedule from 'node-schedule';

import { internalSignatureMode, isMarketSpace } from 'core/feature-flags-checkers';
import {
  CloudFiles,
  Document,
  DocumentUser,
  Investor,
  InvestorBuyPropertyAlert,
  SharePurchaseDocument,
  SubmittedSharePurchaseDocument,
  Stos,
} from 'entities';
import { tapLog } from 'utils';
import Email from 'services/email';
import upload from 'services/files/upload';
import CloudFileService from 'services/documents/data/documents/CloudFileService';
import externalDocumentsPrefill from 'services/documents/docusign/helpers/externalDocumentsPrefill';
import { postSignUpdates } from '../buyalert/buyAlertHelpers';
import { findRequiredDocuments } from './SharePurchaseService';

export interface InvestorKycData {
  investorID: number;
  country: string;
  status: number;
  isKyc: boolean;
  entityID?: number;
}

export class SharePurchaseSignatureServiceClass {
  async setSubmittedDocument(
    investorID: number,
    documentID: number,
    sharePurchaseID: number,
    fieldValues: any[],
  ): Promise<any> {
    const investor = await Investor.findOne(investorID);
    if (!investor) throw new ForbiddenError('Investor not found');
    const document = await Document.findOne({ where: { ID: documentID } });
    const sharePurchase = await InvestorBuyPropertyAlert.findOne({
      where: { ID: sharePurchaseID, investorID: investor.ID },
    });
    if (!sharePurchase) throw new ApolloError('Unable to find documents using given information.');

    const { prefilledFields } = await externalDocumentsPrefill(
      sharePurchaseID,
      investorID,
      documentID,
    );
    const autofilledFields = prefilledFields.reduce(
      (acc, val) => ({ ...acc, [val.tabLabel]: val.value }),
      {},
    );

    const populatedFieldValues = {
      ...fieldValues.reduce((acc, val) => ({ ...acc, [val.ID]: val.value }), {}),
      ...autofilledFields,
    };
    const contents = Object.keys(populatedFieldValues).reduce<string>(
      (acc: string, key) => acc.split(key).join(populatedFieldValues[key]),
      document?.contents || '',
    );
    const documentUser = await DocumentUser.findOne({ documentID, investorID, sharePurchaseID });
    if (documentUser) {
      documentUser.fieldValuesJson = JSON.stringify(populatedFieldValues);
      documentUser.contents = contents;
      documentUser.sharePurchaseID = sharePurchaseID;
      documentUser.buyAlert = sharePurchase;
      await documentUser.save();
    } else {
      const newDocUser = DocumentUser.create({
        investor: { ID: investor.ID },
        stoID: sharePurchase.stoID,
        directoryID: document?.directoryID ?? -1,
        document: { ID: documentID },
        status: 1,
        fieldValuesJson: JSON.stringify(populatedFieldValues),
        documentOfferInvestorID: 0,
        contents: contents,
        sharePurchaseID,
        buyAlert: sharePurchase,
      });
      await newDocUser.save();
    }
  }

  async setSharePurchaseDocumentSignature(
    investorID: number,
    documentID: number,
    base64: string,
    sharePurchaseID: number,
  ): Promise<string> {
    try {
      await Investor.findOneOrFail(investorID);

      const modes = await internalSignatureMode();
      //insert already signed documents
      if (modes.isDraw()) {
        const filename = await upload.uploadBase64File(base64, 'signature.png');
        const fileLink = await upload.getSignedUrl(filename);
        const file = await CloudFileService.insert(filename, fileLink);
        await this.updateSignatureExternally(sharePurchaseID, investorID, documentID, '', file);
        return fileLink;
      }
      if (modes.isCheckmark()) {
        await this.updateSignatureExternally(sharePurchaseID, investorID, documentID, 'true');
        return 'true';
      }
      throw new ApolloError('Internal Signature mode not set');
    } catch (e) {
      tapLog('cloudfileserror')(e);
      return '';
    }
  }

  async sendSharePurchaseContract(
    investorID: number,
    documentID: number,
    sharePurchaseID: number,
  ): Promise<boolean> {
    try {
      const sharePurchaseDocs = await SharePurchaseDocument.find({ relations: ['document'] });
      const investorBuyPropertyAlert = await InvestorBuyPropertyAlert.findOneOrFail({
        where: { ID: sharePurchaseID, investorID },
      });

      const sharePurchaseDocument = await SubmittedSharePurchaseDocument.findOne({
        relations: [
          'submittedDocument',
          'submittedDocument.document',
          'submittedDocument.signature',
        ],
        where: {
          sharePurchaseRequestID: sharePurchaseID,
          submittedDocument: { document: { ID: documentID } },
        },
      });
      const submittedDocument = await sharePurchaseDocument?.submittedDocument;
      if (
        sharePurchaseDocument &&
        submittedDocument?.signature &&
        submittedDocument?.fieldValuesJson
      ) {
        submittedDocument.status = 3;
        submittedDocument.signatureDate = new Date();
        submittedDocument.save();
        if (
          sharePurchaseDocs.every(async (spd) =>
            // spd.ID === documentID ||
            {
              const doc = await SubmittedSharePurchaseDocument.findOne({
                relations: ['submittedDocument', 'submittedDocument.document'],
                where: {
                  sharePurchaseRequestID: sharePurchaseID,
                  submittedDocument: { document: { ID: spd.ID } },
                },
              });
              const docSubmittedDocument = await doc?.submittedDocument;
              if (docSubmittedDocument?.status ?? 0 >= 2) return true;
              else if (spd.ID === documentID) return true;
              return false;
            },
          )
        ) {
          investorBuyPropertyAlert.isBuySharesSigned = 1;
          await investorBuyPropertyAlert.save();
        }
        return true;
      }
      return false;
    } catch (e) {
      tapLog('sendContractError')(e);
      return false;
    }
  }

  private static async updateBuyAlertStatus(purchase: InvestorBuyPropertyAlert) {
    purchase.isBuySharesSigned = 1;
    purchase.isSubscriptionSigned = 1;
    purchase.status = 1;
    await purchase.save();
  }

  static async doPostSignatureUpdateActions(
    purchase: InvestorBuyPropertyAlert,
    purchaseID: number,
    investorID: number,
    trueKycData: InvestorKycData | null = null,
  ): Promise<void> {
    const allRequiredDocsSto = await findRequiredDocuments(purchase, investorID);
    const areAllSigned = allRequiredDocsSto.every((d) => d.status === 3);
    if (!areAllSigned) {
      const firstScheduledDate = moment().add(2, 'days').toDate(); // After 48 Hours
      const secondScheduledDate = moment().add(5, 'days').toDate(); // After 120 Hours
      const sto = await Stos.findOneOrFail({ ID: purchase.stoID });
      const investor = await Investor.findOneOrFail({ ID: investorID });
      const email = new Email(sto);
      const isMS = await isMarketSpace();
      schedule.scheduleJob(firstScheduledDate, async () => {
        if (isMS) {
          await email.marketSpaceDocumentSubscriptionReminderEmail(
            investor.firstName,
            investor.email,
          );
        } else {
          await email.documentSubscriptionReminderEmail(investor);
        }
      });
      schedule.scheduleJob(secondScheduledDate, async () => {
        if (isMS) {
          await email.marketSpaceDocumentSubscriptionReminderEmail(
            investor.firstName,
            investor.email,
          );
        } else {
          await email.documentSubscriptionReminderEmail(investor);
        }
      });
      return;
    }
    await SharePurchaseSignatureServiceClass.updateBuyAlertStatus(purchase);
    await postSignUpdates(purchase, trueKycData);
  }

  async updateSignatureExternally(
    purchaseID: number,
    investorID: number,
    documentID: number,
    signatureFilePath: string,
    file: CloudFiles | undefined = undefined,
  ): Promise<void> {
    const purchase = await InvestorBuyPropertyAlert.findOneOrFail(purchaseID);
    const stoID = purchase.stoID;

    const documentUser = await DocumentUser.findOne({
      documentID,
      investorID,
      sharePurchaseID: purchaseID,
    });
    let documentUserID: number;
    if (documentUser) {
      documentUser.signatureFilePath = signatureFilePath;
      documentUser.status = 3;
      documentUser.signatureDate = new Date();
      documentUser.sharePurchaseID = purchaseID;
      documentUser.signature = file;
      await documentUser.save();
      documentUserID = documentUser.ID;
    } else {
      const newDU = DocumentUser.create({
        fieldValuesJson: '{}',
        contents: '',
        investorID: investorID,
        documentID: documentID,
        stoID: stoID,
        documentOfferInvestorID: 0,
        status: 3,
        signatureFilePath: signatureFilePath,
        signatureDate: new Date(),
        directoryID: -1,
        sharePurchaseID: purchaseID,
        signature: file,
      });
      documentUserID = (await newDU.save()).ID;
    }
    // Add a submission record for document. NB: This triggers on STO contract too.
    await SubmittedSharePurchaseDocument.upsert(
      {
        sharePurchaseRequestID: purchaseID,
        submittedDocumentID: documentUserID,
      },
      {
        conflictPaths: ['sharePurchaseRequestID', 'submittedDocumentID'],
      },
    );
    await SharePurchaseSignatureServiceClass.doPostSignatureUpdateActions(
      purchase,
      purchaseID,
      investorID,
    );
  }
}
export const SharePurchaseSignatureService = new SharePurchaseSignatureServiceClass();
