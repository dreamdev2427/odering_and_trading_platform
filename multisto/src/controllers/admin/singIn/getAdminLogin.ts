import { Request, Response } from "express";

import common from "../../../modules/common";
import logger from "../../../logger";

export default async (req: Request, res: Response) => {
  const globalObj = global as any;
  if (globalObj.config.areSTOHostnamesEnabled === 0) {
    const stoIDFromHostname = globalObj.config.stos[req.hostname ?? ""]?.stoid;
    res.redirect(`/adminlogin?stoid=${stoIDFromHostname || 0}`);
  } else {
    try {
      res.render("admin/login", {
        csrfToken: req.csrfToken(),
        logo: globalObj.config.stos[req.hostname].logo,
        SiteParameter_PageTitle: globalObj.config.stos[req.hostname].title,
        UserMessage: req.flash("UserMessage2"),
        favicon: common.getFevIcon(req),
      });
    } catch (e) {
      logger.error(`${e} - Error occurred in getAdminLogin`);
      res.redirect("/error");
    }
  }
};
