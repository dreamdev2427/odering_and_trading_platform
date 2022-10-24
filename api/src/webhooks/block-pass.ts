import { RequestHandler } from 'express';

import BlockPassService from 'services/externalKyc/blockPass/BlockPassService';

const blockPass: RequestHandler = async (req, res) => {
  try {
    const requestHash = req.get('x-hub-signature') ?? '';
    const service = new BlockPassService();
    const validCall = await service.api.webhookChecker(JSON.stringify(req.body), requestHash);
    if (!validCall) {
      console.error('wrong block pass hash');
      res.sendStatus(200);
    }
    const investorID = parseInt(req.body.refId, 10);
    await service.updateKYC(investorID);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export default blockPass;
