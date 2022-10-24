import { Request, Response } from "express";
import logger from "../../../logger";
import { mutation$ } from "../../../graphql/fetchers";
import mysql from "../../../modules/mysql";
import { ComponentCustomizationInput } from "../../../graphql/inputs";

const ADMIN_POST_NAVBAR_CUSTOM = mutation$.customizedComponentsUpdate();

export default async (req: Request, res: Response) => {
  try {
    const {
      componentID,
      componentTitle,
      componentCustomization,
      redirectUrl,
    } = req.body;
    const data: ComponentCustomizationInput = {
      component: componentTitle,
      body: componentCustomization,
    };
    await req.gqlExecute(ADMIN_POST_NAVBAR_CUSTOM, {
      variables: {
        data,
        componentID: parseInt(componentID, 10),
      },
    });
    await mysql.initializeGlobals();
    res.redirect(redirectUrl);
  } catch (e) {
    logger.error(
      `Error occurred in post-navbar-header-customization:\n${JSON.stringify(
        e
      )}`
    );
    res.redirect("/platform/navbarHeaderCustomization");
  }
};
