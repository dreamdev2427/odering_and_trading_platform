import { Request } from "express";
import { query$, sharesWallet$$ } from "../../../../graphql/fetchers";
import logger from "../../../../logger";

export const findSharesWallets = async (
  req: Request,
  shareID: number,
  stoID: number,
  platform: boolean
) => {
  const GET_PROPERTY_BUY_ALERT = query$.getSharesWallets(sharesWallet$$);
  try {
    const { getSharesWallets } = await req.gqlExecute(GET_PROPERTY_BUY_ALERT, {
      variables: {
        platform,
        shareTypeID: shareID,
        stoID,
      },
    });
    return getSharesWallets;
  } catch (error) {
    logger.error(
      `Failed to retrieve sharesWallet in SharesWalletGQLService - getSharesWallets:\n${error}`
    );
  }
  return undefined;
};

export default findSharesWallets;
