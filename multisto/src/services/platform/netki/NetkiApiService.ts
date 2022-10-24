import {
  AccessCodesResponse,
  AuthorizationResponse,
  BusinessMetadata,
} from "./netki-declarations";

const axios = require("axios");
const common = require("../../../modules/common");

export default class NetkiApiService {
  private accessToken: string;
  private businessMetadata: BusinessMetadata;
  private constructor(accessToken: string, businessMetadata: BusinessMetadata) {
    this.accessToken = accessToken;
    this.businessMetadata = businessMetadata;
  }

  static async build() {
    const globalOjb = global as any;
    const netkiParam = globalOjb.config.NetkiParamJson;
    const { username, password: encryptedPassword } = netkiParam;
    if (!username || !encryptedPassword) {
      throw new Error("NetkiParamJson was not set");
    }
    const decryptedPassword = await common.decryptAsync(encryptedPassword);
    const accessToken = await this.getAccessToken(username, decryptedPassword);
    const businessMetadata = await this.getBusinessMetadata(accessToken);
    return new NetkiApiService(accessToken, businessMetadata);
  }

  private static async getAccessToken(
    username: string,
    password: string
  ): Promise<string> {
    const url = "https://kyc.myverify.info/api/token-auth/";
    const response = await axios.post(url, {
      username,
      password,
    });
    if (response.status === 200) {
      const codes: AuthorizationResponse = response.data;
      return codes.access;
    }
    return "";
  }

  private static async getBusinessMetadata(
    accessToken: string
  ): Promise<BusinessMetadata> {
    const url = "https://kyc.myverify.info/api/business/businesses/";
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(
      `${JSON.stringify(response)} - Error occurred in getBusinessMetadata`
    );
  }

  async getAccessCodes(): Promise<AccessCodesResponse> {
    const url = `https://kyc.myverify.info/api/business/businesses/${this.businessMetadata.results[0].id}/access-codes/`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    if (response.status === 200) {
      const accessCodes: AccessCodesResponse = response.data;
      return accessCodes;
    }
    throw new Error(
      `${JSON.stringify(response)} - Error occurred in getAccessCodes`
    );
  }
}
