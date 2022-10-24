import { Request } from "express";
import {
  investor$$,
  investorSto$$,
  query$,
} from "../../../../graphql/fetchers";
import logger from "../../../../logger";

export const getInvestor = async (req: Request, investorID: number) => {
  try {
    const GET_INVESTOR_RECORD = query$.findInvestor(investor$$);
    const { findInvestor } = await req.gqlExecute(GET_INVESTOR_RECORD, {
      variables: {
        investorID,
      },
    });
    return findInvestor;
  } catch (error) {
    logger.error(
      `Failed to retrieve investorRecord in InvestorGQLService - getInvestor:\n${error}`
    );
  }
  return undefined;
};

export const getInvestorSto = async (
  req: Request,
  stoID: number,
  investorID: number
) => {
  try {
    const GET_INVESTOR_STO = query$.investorSto(investorSto$$);
    const { investorSto } = await req.gqlExecute(GET_INVESTOR_STO, {
      variables: {
        stoID,
        investorID,
      },
    });
    return investorSto;
  } catch (error) {
    logger.error(
      `Failed to retrieve investorSto in InvestorGQLService - getInvestorSTO:\n${error}`
    );
  }
  return undefined;
};
