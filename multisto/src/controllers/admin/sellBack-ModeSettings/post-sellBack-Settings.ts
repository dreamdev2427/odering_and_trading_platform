import { Response } from "express";
import logger from "../../../logger";
import mysql from "../../../modules/mysql";
import { mutation$ } from "../../../graphql/fetchers";

const ADMIN_POST_PARAM = mutation$.setPlatformParam();

export default async (req: any, res: Response) => {
  try {
    const { isSellBackEnabled, doAutomaticSellBack } = req.body;
    let sellBackEnabled = 0;
    let automaticSellBack = 0;
    if (isSellBackEnabled) {
      sellBackEnabled = 1;
    }
    if (doAutomaticSellBack) {
      automaticSellBack = 1;
    }

    await req.gqlExecute(ADMIN_POST_PARAM, {
      variables: {
        param: "isSellBackEnabled",
        stringValue: "",
        intValue: sellBackEnabled,
      },
    });
    await req.gqlExecute(ADMIN_POST_PARAM, {
      variables: {
        param: "doAutomaticSellBack",
        stringValue: "",
        intValue: automaticSellBack,
      },
    });
    await mysql.initializeGlobals();
    res.redirect("/platform/sellBackModeSettings");
  } catch (error) {
    logger.error(`${error} - Error occurred in post-sellBack-Settings`);
  }
};
