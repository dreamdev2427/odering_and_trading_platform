import crypto from 'crypto';

import { Params } from 'entities';
import { PARAM } from 'core/envs';
import axios from 'axios';
import { BlockPassKycDataResponse, BlockPassParam } from './block-pass-declarations';

class BlockPassApi {
  async getParams(): Promise<BlockPassParam> {
    const param = await Params.getParamOrFail(PARAM.BLOCK_PASS_API_JSON);
    const json = JSON.parse(param.stringValue);
    if (!json.ClientId || !json.ApiKey || !json.BlockPassWebhookToken) {
      throw new Error('unset BlockPassApiJson JSON parameters - Error occurred in block-pass-api');
    }
    return json;
  }

  async makeRequest<T>(clientID: string, ApiKey: string, investorID: number): Promise<T> {
    const response = await axios.request<T>({
      method: 'GET',
      url: `https://kyc.blockpass.org/kyc/1.0/connect/${clientID}/refId/${investorID}`,
      data: null,
      headers: {
        'Authorization': ApiKey,
      },
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  }


  async webhookChecker(reqBody: string, requestHash: string): Promise<boolean> {
    const { BlockPassWebhookToken } = await this.getParams();

    const hmac = crypto.createHmac('sha256', BlockPassWebhookToken).update(reqBody).digest('hex');

    return requestHash === hmac;
  }

  async getInvestorData(blockPassInvestorID: number): Promise<BlockPassKycDataResponse> {
    const { ApiKey, ClientId } = await this.getParams();
    return this.makeRequest<BlockPassKycDataResponse>(ClientId, ApiKey, blockPassInvestorID);
  }
}

export default BlockPassApi;
