import { Request } from "express";
import { investorBuyAlert$$, query$ } from "../../../graphql/fetchers";
import logger from "../../../logger";

const getInvestorBuyPropertyAlerts = async (
  req: Request,
  investorID?: number,
  isSellRequest?: boolean,
  buyAlertID?: number
) => {
  try {
    const GET_PROPERTY_BUY_ALERT =
      query$.investorBuyAlertsAdmin(investorBuyAlert$$);
    const { investorBuyAlertsAdmin } = await req.gqlExecute(
      GET_PROPERTY_BUY_ALERT,
      {
        variables: {
          investorID: investorID ?? undefined,
          status: buyAlertID ? "Pending" : undefined,
          isSellRequest: isSellRequest ?? undefined,
          alertID: buyAlertID ?? undefined,
        },
      }
    );
    return investorBuyAlertsAdmin;
  } catch (error) {
    logger.error(
      `Failed to retrieve investorBuyAlert in InvestorBuyPropertyAlertGQLService - getInvestorBuyPropertyAlert:\n${error}`
    );
  }
  return undefined;
};

export default getInvestorBuyPropertyAlerts;
