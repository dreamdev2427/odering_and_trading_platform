import { RequestHandler } from 'express';

import {
  VerifyInvestorComKycDataResponse,
  VerifyInvestorComWebhookPayload,
} from 'api/accreditation/verifyInvestor.types';
import { InvestorSto, Params } from 'entities';
import { PARAM } from 'core/envs';
import {
  composeUpdateObject,
  requestDataFromVefiyInvestorCom,
} from 'services/verifyInvestorCom/data';

const verifyInvestorAccreditation: RequestHandler = async (req, res) => {
  try {
    const payload: VerifyInvestorComWebhookPayload = req.body;
    if (!payload) {
      throw new Error('No payload found - error happened in useVerifyInvestorAccreditationWebhook');
    }

    const verifyInvestorComUrl = await Params.getParam(PARAM.VERIFY_INVESTOR_COM_URL);
    if (!verifyInvestorComUrl?.stringValue) {
      throw new Error(
        'Missing verifyInvestorComUrl - Error occurred in graphql-servers useVerifyInvestorAccreditationWebhook',
      );
    }
    const json = JSON.parse(verifyInvestorComUrl.stringValue);
    const url = json.backendURL;

    const responseData: VerifyInvestorComKycDataResponse = await requestDataFromVefiyInvestorCom(
      `${url}/${payload.verification_request_id}`,
    ).catch((e) => {
      throw e;
    });
    if (!VerifyInvestorComKycDataResponse) {
      throw new Error(
        'No payload found - error happened in useVerifyInvestorAccreditationWebhook while requesting extra info for the investor',
      );
    }
    const investorRecord = await composeUpdateObject(responseData, payload.eapi_identifier).catch(
      (e) => {
        throw e;
      },
    );
    await InvestorSto.update(investorRecord.ID, investorRecord);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export default verifyInvestorAccreditation;
