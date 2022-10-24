import crypto from 'crypto';
import { Params, Stos, HelloSignSignatures } from 'entities';
import { PARAM } from 'core/envs';
import { sharePurchaseDocumentsModes } from 'core/feature-flags-checkers';
import hellosign_sdk from 'hellosign-sdk';
import { ApolloError } from 'apollo-server-core';
import { SharePurchaseSignatureService } from 'services/sharePurchaseDocuments/SharePurchaseSignatureService';
import externalDocumentsPrefill from 'services/documents/docusign/helpers/externalDocumentsPrefill';

export default class HelloSignService {
  async sendHelloSignTemplateSignRequest(
    purchaseID: number,
    investorID: number,
    documentID: number,
  ): Promise<string> {
    const helloSignDetails: {
      prefilledFields: any;
      clientName: string;
      titleOfEmail: string;
      investorEmail: string;
      targetStoID: number;
      externalDocumentID: string;
      documentTitle: string;
    } = await externalDocumentsPrefill(purchaseID, investorID, documentID);

    const helloSignApiKey = (await Params.getParam(PARAM.HELLO_SIGN_API_KEY))?.stringValue;
    if (!helloSignApiKey) {
      throw new ApolloError(`Missing helloSignApiKey. Please fill this parameter in the db.`);
    }
    const helloSignTestMode = (await Params.getParam(PARAM.HELLO_SIGN_TEST_MODE))?.intValue ?? 1;
    const helloSign = new hellosign_sdk({ key: helloSignApiKey });

    const json: any = [];
    helloSignDetails.prefilledFields.forEach((p: { tabLabel: string; value: string }) => {
      const a = {
        name: p.tabLabel,
        value: p.value,
      };
      json.push(a);
    });
    const sto0 = await Stos.findOneOrFail({ ID: 0 });
    const opts = {
      test_mode: helloSignTestMode,
      template_id: helloSignDetails.externalDocumentID,
      title: helloSignDetails.documentTitle,
      subject: helloSignDetails.titleOfEmail,
      clientId: sto0.helloSignClientID ?? '',
      signers: [
        {
          email_address: helloSignDetails.investorEmail,
          name: helloSignDetails.clientName,
          role: 'investor',
        },
      ],
      custom_fields: json,
    };
    const result = await helloSign.signatureRequest
      .createEmbeddedWithTemplate(opts)
      .catch((err: Error) => {
        throw new ApolloError(`Failed to generate HelloSign Request \n${err.stack}`);
      });

    const signatureID = result.signature_request.signatures.find(
      (s) => s.signer_role === 'investor' && s.status_code === 'awaiting_signature',
    );
    const signature = HelloSignSignatures.create({
      signatureID: signatureID?.signature_id ?? '',
      investorID,
      documentID,
      investorBuyPropertyAlertID: purchaseID,
    });
    await signature.save();
    const url = await helloSign.embedded.getSignUrl(
      result.signature_request.signatures[0].signature_id,
    );
    return url.embedded.sign_url;
  }

  async completeSigning(
    purchaseID: number,
    investorID: number,
    documentID: number,
    helloSignEnvelopeID: string,
  ): Promise<void> {
    if (!(await sharePurchaseDocumentsModes()).isHelloSign()) {
      throw new ApolloError(`HelloSign requires documents mode param to be 'helloSign'`);
    }
    await SharePurchaseSignatureService.updateSignatureExternally(
      purchaseID,
      investorID,
      documentID,
      `helloSignViewSignedDocumentsUrl/${helloSignEnvelopeID}`,
    );
  }

  async webhookChecker(hash: string, eventType: string, eventTime: string): Promise<boolean> {
    const helloSignApiKey = (await Params.getParam(PARAM.HELLO_SIGN_API_KEY))?.stringValue ?? '';
    const generatedHash = crypto
      .createHmac('sha256', helloSignApiKey)
      .update(eventTime + eventType)
      .digest('hex')
      .toString();
    return hash === generatedHash;
  }

  async downloadSignedDocument(signatureRequestId: string): Promise<string> {
    const helloSignApiKey = (await Params.getParamOrFail(PARAM.HELLO_SIGN_API_KEY))?.stringValue;
    const hellosign = new hellosign_sdk({ key: helloSignApiKey });

    const blob = await hellosign.signatureRequest.download(signatureRequestId, {
      file_type: 'pdf',
      get_data_uri: true,
    });

    return (blob as any).data_uri;
  }
}
