import { mutation$ } from "../../../graphql/fetchers";
import logger from "../../../logger";
import { InvestorKycInput } from "../../../graphql/inputs";

export default async (
  investorID: number,
  isKYC: boolean,
  status: number,
  req: any
): Promise<boolean> => {
  const SET_KYC = mutation$.updateInvestorKyc();
  try {
    const kycData: InvestorKycInput = {
      investorID,
      isKyc: isKYC,
      kycApplied: !isKYC,
      status,
    };
    await req.gqlExecute(SET_KYC, {
      variables: {
        kycData,
      },
    });
    return true;
  } catch (e) {
    logger.error(
      `Error occurred in investorKYCAuthroize setInvestorAuthorization:\n${JSON.stringify(
        e
      )}`
    );
    return false;
  }
};
