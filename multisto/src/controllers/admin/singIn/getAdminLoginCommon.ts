import { Request, Response } from "express";
import logger from "../../../logger";
import { findMany } from "../../../modules/db";
import { Stos } from "../../../Schema";

export default async (req: Request, res: Response) => {
  const stoRows = await findMany<Stos>(
    "select ID, title, stolinkfull, isICOShareTypeCompany, logo from stos order by isICOShareTypeCompany, ID asc"
  );

  try {
    res.render("admin/loginall", {
      csrfToken: req.csrfToken(),
      records: stoRows,
      logo: stoRows[0].logo,
      SiteParameter_PageTitle: stoRows[0].title,
      UserMessage: req.flash("UserMessage5"),
    });
  } catch (e) {
    logger.error(`/login - ${(e as Error).toString()}`);
    res.redirect("/error");
  }
};
