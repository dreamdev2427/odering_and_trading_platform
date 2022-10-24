import { sharePurchaseDocumentsModes } from 'core/feature-flags-checkers';
import { SharePurchaseSignatureService } from 'services/sharePurchaseDocuments/SharePurchaseSignatureService';
import { ApolloError } from 'apollo-server-core';
import externalDocumentsPrefill from './helpers/externalDocumentsPrefill';
import {
  authenticate,
  composeReturnUrl,
  createRecipientView,
  getEnvelopeId,
  makeEnvelope,
  downloadDocument,
} from './docusign-api';

/**
 * I had to infer what this might be
 */
export interface DocusignDetails {
  tabLabel: string;
  value: string;
}
export default class DocusignService {
  /**
   * Retrieves the docusign url for a document
   * @param json Label - Value pairs
   * @param templateId Document ID
   * @param nameOfRecipient Investor name
   * @param emailSubject
   * @param investorEmail
   * @param investorID
   * @param purchaseID
   * @param documentID
   * @param preferredReturnURL
   */
  private getSigningUrl = async (
    json: DocusignDetails[],
    templateId: string,
    nameOfRecipient: string,
    emailSubject: string,
    investorEmail: string,
    investorID: number,
    purchaseID: number,
    documentID: number,
    preferredReturnURL?: string,
  ): Promise<string> => {
    try {
      const authenticationInfo = await authenticate();
      const envelopeArgs = {
        templateId,
        emailSubject,
        signerEmail: investorEmail,
        signerName: nameOfRecipient,
        signerClientId: investorID,
        fields: json,
      };
      const envelopeDefinition = makeEnvelope(envelopeArgs);
      const { envelopesApi, envelopeId } = await getEnvelopeId(
        authenticationInfo,
        envelopeDefinition,
      );
      const returnUrl = await composeReturnUrl(
        preferredReturnURL,
        purchaseID,
        documentID,
        envelopeId,
      );
      const recipientViewUrl = await createRecipientView(
        authenticationInfo,
        envelopeDefinition,
        returnUrl,
        envelopesApi,
        envelopeId,
      );

      if (recipientViewUrl) {
        return recipientViewUrl;
      } else {
        console.error(`DocusignService returned empty signing url`);
        return '';
      }
    } catch (e) {
      console.error(`${JSON.stringify(e)} - error occurred in DocusignService`);
      throw new Error(`${e}`);
      // res.redirect('/error');
    }
  };

  /**
   * Get the DocuSign link for signing a purchase contract
   * @param purchaseID The InvestorBuyPropertyAlert ID
   * @param investorID Current Investor ID
   * @param documentID ID of the document to sign
   * @param preferredReturnURL DocuSign will return to this URL after signing
   * @returns
   */
  async getDocusignRedirect(
    purchaseID: number,
    investorID: number,
    documentID: number,
    preferredReturnURL?: string,
  ): Promise<string> {
    const docusignDetails: {
      prefilledFields: any;
      clientName: string;
      titleOfEmail: string;
      investorEmail: string;
      targetStoID: number;
      externalDocumentID: string;
    } = await externalDocumentsPrefill(purchaseID, investorID, documentID);

    try {
      return await this.getSigningUrl(
        docusignDetails.prefilledFields,
        docusignDetails.externalDocumentID ?? '',
        docusignDetails.clientName,
        docusignDetails.titleOfEmail,
        docusignDetails.investorEmail,
        investorID,
        purchaseID,
        documentID,
        preferredReturnURL,
      );
    } catch (e) {
      throw new ApolloError(`Failed to generate DocuSign URL\n${(e as Error).stack}`);
    }
  }

  async completeSigning(
    purchaseID: number,
    investorID: number,
    documentID: number,
    docusignEnvelopeID: string,
  ): Promise<void> {
    if (!(await sharePurchaseDocumentsModes()).isDocuSign()) {
      throw new ApolloError(`DocuSign requires documents mode param to be 'docuSign'`);
    }

    await SharePurchaseSignatureService.updateSignatureExternally(
      purchaseID,
      investorID,
      documentID,
      `docusignViewSignedDocumentsUrl/${docusignEnvelopeID}`,
    );
  }

  async downloadSignedDocument(envelopeID: string): Promise<string> {
    const authInfo = await authenticate();
    return downloadDocument(authInfo, envelopeID);
  }
}
