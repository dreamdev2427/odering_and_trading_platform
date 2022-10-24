import { RequestHandler } from 'express';

import SumSubService from 'services/externalKyc/sumSub/SumSubService';
import { SumSubWebhookPayload } from 'services/externalKyc/sumSub/sum-sub-declarations';

const sumSub: RequestHandler = async (req, res) => {
  try {
    const requestHash = req.get('x-payload-digest') ?? '';
    const service = new SumSubService();
    const validCall = await service.api.webhookChecker((req as any).rawBody, requestHash);
    if (!validCall) {
      console.error('wrong sum sub hash');
      res.sendStatus(200);
    }
    const payload: SumSubWebhookPayload = req.body;
    if (
      payload.reviewResult &&
      (payload.type === 'applicantReviewed' ||
        payload.type === 'applicantPersonalInfoChanged' ||
        payload.type === 'applicantDeleted')
    ) {
      await service.updateKYC(payload.externalUserId);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `${error} - error occurred while calling sum-sub webhook - the request body was recorded in the logs table`,
    );
    res.sendStatus(400);
  }
};

export default sumSub;
