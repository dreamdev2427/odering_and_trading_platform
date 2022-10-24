import { Request, Response } from "express";
import { mutation$ } from "../../../graphql/fetchers/MutationFetcher";
import logger from "../../../logger";

export default async (req: Request, res: Response) => {
  const SET_KYC = mutation$.copyInvestorsToOtherProjects();
  try {
    const investorIDs = JSON.parse(req.body.investorsToBeCopied).map(Number);
    await req.gqlExecute(SET_KYC, {
      variables: {
        copyStoID: parseInt(req.body.copySettingsStoId, 10),
        pasteStoID: parseInt(req.body.pasteSettingsStoId, 10),
        investorIDs,
      },
    });
    res.redirect(`/platform/copyInvestors`);
  } catch (e) {
    logger.error(
      `Error occurred in postCopyStoInvestors:\n${(e as Error).stack}`
    );
    res.redirect(`/platform/copyInvestors`);
  }
};
