import { Request, Response } from "express";
import logger from "../../../logger";
import { mutation$ } from "../../../graphql/fetchers";
import mysql from "../../../modules/mysql";

const ADMIN_POST_PARAM = mutation$.setPlatformParam();

export default async (req: Request, res: Response) => {
  try {
    const { param, stringValue, intValue, redirectUrl } = req.body;
    await req.gqlExecute(ADMIN_POST_PARAM, {
      variables: {
        param,
        stringValue: stringValue || "",
        intValue: parseInt(intValue, 10),
      },
    });
    await mysql.initializeGlobals();
    res.redirect(redirectUrl);
  } catch (e) {
    logger.error(
      `Error occurred in setEnvironmentParamsToApi:\n${JSON.stringify(e)}`
    );
    res.redirect("/platform/platformsettings");
  }
};
