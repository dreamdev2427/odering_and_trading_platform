import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import { mutation$ } from "../../../graphql/fetchers";

const SET_ACCREDITATION = mutation$.setEntityAccreditation();

export default async (req: any, res: Response) => {
  if (!process.env.API_URL) {
    logger.error(`API_URL not set`);
    res.redirect(`/admin/investorssto`);
  }
  try {
    const { entityID, isAccreditationEnabled, investorID } = req.body;
    const isAccredited = parseInt(isAccreditationEnabled, 10);
    await req.gqlExecute(SET_ACCREDITATION, {
      variables: {
        entityID: parseInt(entityID, 10),
        isAccredited: !!isAccredited,
      },
    });
    await mysql.initializeGlobals();
    res.redirect(`/admin/investorsViewSto?id=${investorID}`);
  } catch (e) {
    logger.error(
      `Error occurred in post-Accredit-Entity:\n${JSON.stringify(e)}`
    );
    res.redirect(`/admin/investorssto`);
  }
};
