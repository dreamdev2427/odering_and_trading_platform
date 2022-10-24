import axios from 'axios';
import { PARAM } from 'core/envs';
import { InvestorSto, Params } from 'entities';
import { VerifyInvestorComKycDataResponse } from 'api/accreditation/verifyInvestor.types';

const requestDataFromVefiyInvestorCom = async (
  url: string,
): Promise<VerifyInvestorComKycDataResponse> => {
  const verifyInvestorComApiToken = await Params.getParam(PARAM.VERIFY_INVESTOR_COM_API_TOKEN);
  if (!verifyInvestorComApiToken?.stringValue) {
    throw new Error(
      'Missing VerifyInvestorComApiToken - Error occurred in VerifiyInvestorComService requestDataFromVefiyInvestorCom',
    );
  }
  return axios
    .get(url, {
      headers: {
        Authorization: `Token ${verifyInvestorComApiToken.stringValue}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return response.statusText;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const composeUpdateObject = async (
  responseData: VerifyInvestorComKycDataResponse,
  internalReference: string,
): Promise<InvestorSto> => {
  const stoID = parseInt(internalReference.substring(internalReference.indexOf('-') + 1));
  const investorID = parseInt(internalReference.substring(0, internalReference.indexOf('-')));

  const investorSto: InvestorSto | undefined = await InvestorSto.findOne({
    investorID,
    stoID,
  }).catch((e) => {
    throw e;
  });
  if (investorSto) {
    investorSto.KycExpiryDate = new Date(responseData.verified_expires_at)
      .toISOString()
      .split('T')[0];
    if (responseData.status === 'accredited') {
      investorSto.isKYC = 1;
      investorSto.status = 3;
    }
    if (responseData.status === 'not_accredited') {
      investorSto.isKYC = 1;
      investorSto.status = 1;
    }
    return investorSto;
  }
  throw new Error('No investor sto found');
};

export { requestDataFromVefiyInvestorCom, composeUpdateObject };
