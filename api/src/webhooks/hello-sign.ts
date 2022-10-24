import { RequestHandler } from 'express';

import { HelloSignWebhookPayload } from 'api/document.types';
import HelloSignService from 'services/documents/helloSign/HelloSignService';
import HelloSignSignatures from 'entities/hello-sign-signatures';

const helloSign: RequestHandler = async (req, res) => {
  try {
    // casting to any so I can extract the json part of this multipart object; then to string to fix the json
    const jsonString = req.body.json;
    // replacing newlines because json is malformed
    const curedJsonString = jsonString.replace(/[\n\r]/g, '');
    const payload: HelloSignWebhookPayload = JSON.parse(curedJsonString);
    if (!payload) {
      throw new Error('No payload found - error happened in useHelloSignWebhook');
    }
    // handle only succesfully signed callbacks
    if (payload?.event?.event_type === 'signature_request_signed') {
      const helloSignService = new HelloSignService();
      const validCall = await helloSignService.webhookChecker(
        payload?.event?.event_hash,
        payload?.event?.event_type,
        payload?.event?.event_time,
      );
      if (!validCall) {
        res.send('Hello API Event Received');
      }

      // find correlation with internal info
      const investorSignatureID =
        payload.signature_request.signatures.find(
          (s) => s.signer_role === 'investor' && s.status_code === 'signed',
        )?.signature_id ?? '';
      const signatureData = await HelloSignSignatures.findOneOrFail({
        signatureID: investorSignatureID,
      });

      const singedFileUrl = payload.signature_request.files_url ?? '';
      await helloSignService.completeSigning(
        signatureData.investorBuyPropertyAlertID,
        signatureData.investorID,
        signatureData.documentID,
        singedFileUrl,
      );
      // clean up table
      await HelloSignSignatures.delete({ ID: signatureData.ID });
    }
    res.send('Hello API Event Received');
  } catch {
    res.sendStatus(200);
  }
};

export default helloSign;
