import {
  query$,
  nonKycInvestor$$,
  investorInvitation$$,
} from "../../../graphql/fetchers";
import logger from "../../../logger";

export const getInvestorInvitations = async (req: any) => {
  try {
    const GET_INVITATIONS = query$.getInvestorInvitations(investorInvitation$$);

    const result = await req.gqlExecute(GET_INVITATIONS, {
      variables: {
        stoID: req.session.stoid || 0,
      },
    });
    return result?.getInvestorInvitations;
  } catch (e) {
    logger.error(
      `${JSON.stringify(e)} - Error occurred in getInvestorInvitations`
    );
    return [];
  }
};

export default async (req: any) => {
  try {
    const GET_INVESTORS = query$.getNonKycInvestors(nonKycInvestor$$);

    const { name } = req.query;
    const result = await req.gqlExecute(GET_INVESTORS, {
      variables: {
        stoID: req.session.stoid || 0,
        name,
      },
    });
    return result?.getNonKycInvestors;
  } catch (e) {
    logger.error(
      `${JSON.stringify(e)} - Error occurred in get-nonKyc-investor-from-api`
    );
    return [];
  }
};
