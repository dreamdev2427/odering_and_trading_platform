import { Response } from "express";
import { mutation$ } from "../../../graphql/fetchers";
import logger from "../../../logger";

export default async (req: any, res: Response) => {
  const DELETE_INVESTOR_STO = mutation$.deleteInvestorSto();
  try {
    const investorID = parseInt(req.query.id, 10);
    const stoID = parseInt(req.query.stoid, 10);

    await req.gqlExecute(DELETE_INVESTOR_STO, {
      variables: {
        investorID,
        stoID,
      },
    });
    res.redirect(`/platform/copyInvestors`);
  } catch (e) {
    logger.error(
      `Error occurred in post-delete-investorSto:\n${(e as Error).stack}`
    );
    res.redirect(`/platform/copyInvestors`);
  }
};
