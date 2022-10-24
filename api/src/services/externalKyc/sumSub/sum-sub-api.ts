import crypto from 'crypto';
import axios from 'axios';
import { ValidationError } from 'apollo-server-core';

import { Params } from 'entities';
import { PARAM } from 'core/envs';
import { SumSubResponse, Method, RequestToken, SumSubParam } from './sum-sub-declarations';

class SumSubApi {
  async getParams(): Promise<SumSubParam> {
    const param = await Params.getParamOrFail(PARAM.SUM_SUB_API_JSON);
    const json = JSON.parse(param.stringValue);

    if (!json.AppToken || !json.LevelName || !json.ApiSecretKey || !json.WebhookSecretKey) {
      throw new Error('unset SumSub JSON parameters - Error occurred in sumSubService');
    }

    return json;
  }

  async webhookChecker(reqRawBody: string, requestHash: string): Promise<boolean> {
    const { WebhookSecretKey } = await this.getParams();

    const hmac = crypto.createHmac('sha1', WebhookSecretKey).update(reqRawBody).digest('hex');

    return requestHash === hmac;
  }

  async getTokens(method: Method, url: string): Promise<RequestToken> {
    const { ApiSecretKey, AppToken } = await this.getParams();

    const timestamp = Math.round(Date.now() / 1000);
    const signature = crypto
      .createHmac('sha256', ApiSecretKey)
      .update(`${timestamp}${method}${url}`)
      .digest('hex');

    return {
      token: AppToken,
      signature,
      timestamp,
    };
  }

  async makeRequest<T>(method: Method, url: string): Promise<T> {
    const config = await this.getTokens(method, url);
    const response = await axios.request<T>({
      method,
      url: `https://api.sumsub.com${url}`,
      data: null,
      headers: {
        'X-App-Token': `${config.token}`,
        'X-App-Access-Sig': `${config.signature}`,
        'X-App-Access-Ts': `${config.timestamp}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  }

  async getInvestorToken(investorID: number): Promise<string> {
    const { LevelName } = await this.getParams();
    const url = `/resources/accessTokens?userId=${investorID}&levelName=${LevelName}&ttlInSecs=600`;

    const data = await this.makeRequest<{ token: string }>('POST', url);
    return data.token;
  }

  async getInvestorTokenForApi(investorID: number): Promise<string> {
    try {
      return await this.getInvestorToken(investorID);
    } catch (e: any) {
      throw new ValidationError(e.message);
    }
  }

  async getInvestorData(sumSubUserId: string): Promise<SumSubResponse> {
    const url = `/resources/applicants/-;externalUserId=${sumSubUserId}/one`;
    return this.makeRequest<SumSubResponse>('GET', url);
  }
}

export default SumSubApi;
