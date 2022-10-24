import { Request } from "express";
import { query$, shareType$$ } from "../../../../graphql/fetchers";
import logger from "../../../../logger";

export const getShareType = async (
  req: Request,
  stoID: number,
  shareID: number
) => {
  try {
    const GET_SHARE_TYPES = query$.findShareTypes(shareType$$);
    const { findShareTypes } = await req.gqlExecute(GET_SHARE_TYPES, {
      variables: {
        stoID,
      },
    });
    return findShareTypes.find((share) => share.ID === shareID);
  } catch (error) {
    logger.error(
      `Failed to retrieve shareType in SharesGQLService - getShareType:\n${error}`
    );
  }
  return undefined;
};

export const getShareTypes = async (req: Request, stoID: number) => {
  try {
    const GET_SHARE_TYPES = query$.findShareTypes(shareType$$);
    const { findShareTypes } = await req.gqlExecute(GET_SHARE_TYPES, {
      variables: {
        stoID,
      },
    });
    return findShareTypes;
  } catch (error) {
    logger.error(
      `Failed to retrieve shareTypes in SharesGQLService - getShareTypes:\n${error}`
    );
  }
  return undefined;
};
