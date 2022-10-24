import { RequestHandler } from 'express';
import NetkiService from 'services/externalKyc/netki/NetkiService';
import { NetkiWebhookPayload } from 'services/externalKyc/netki/netki-declarations';
import { Log } from 'entities';

const netki: RequestHandler = async (req, res) => {
  try {
    const service = new NetkiService();
    const { identity } = req.body;
    const netkiPayload: NetkiWebhookPayload = identity;
    const webhookAccessCode = netkiPayload.transaction_identity.client_guid;
    const status = netkiPayload?.state;

    await Log.createLog({
      stoID: 0,
      investorID: 0,
      activityType: 36,
      description: `{
        Netki-Payload: {
          accessCode: ${webhookAccessCode},
          status: ${status}
        }
      }`,
    });

    await service.updateKYC(webhookAccessCode);
    res.status(200).send(`netki-payload{${JSON.stringify(req.body)}}`);
  } catch (error) {
    console.error(
      `${error} - error occurred while calling netki webhook - the request body was recorded in the logs table`,
    );
    res.sendStatus(400);
  }
};

export default netki;
