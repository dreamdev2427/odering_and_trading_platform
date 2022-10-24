import { Request, Response } from "express";
import { componentCustomization$$, query$ } from "../../../graphql/fetchers";
import logger from "../../../logger";
import common from "../../../modules/common";
import mysql from "../../../modules/mysql";

export default async (req: Request, res: Response) => {
  try {
    const ADMIN_GET_NAVBAR_CUSTOMIZATION = query$.fetchCustomizedComponent(
      componentCustomization$$
    );
    const customNavbar = await req.gqlExecute(ADMIN_GET_NAVBAR_CUSTOMIZATION, {
      variables: {
        componentTitle: "Navbar",
      },
    });
    await mysql.initializeGlobals();
    res.render("platform/platform-customization/navbar-header-customization", {
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      customNavbar: encodeURIComponent(JSON.stringify(customNavbar)),
      csrfToken: req.csrfToken(),
    });
  } catch (error: any) {
    logger.error(
      `${error} - Error occurred in get-navbar-header-customization`
    );
  }
};
