import { Request, Response } from "express";

import common from "../../../modules/common";
import logger from "../../../logger";
import { findOne } from "../../../modules/db";
import { Stos } from "../../../Schema";

export default async (req: Request, res: Response) => {
  const sto = await findOne<Stos>("select title, logo from stos where ID = 0");
  try {
    res.render("platform/login", {
      csrfToken: req.csrfToken(),
      logo: sto?.logo,
      SiteParameter_PageTitle: sto?.title,
      UserMessage: req.flash("UserMessage2"),
      favicon: common.getFevIcon(req),
    });
  } catch (e) {
    logger.error(`/platform/adminlogin - ${(e as Error).toString()}`);
    res.redirect("/error");
  }
};
