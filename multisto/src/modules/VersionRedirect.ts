import { Request, Response } from "express";
import logger from "../logger";

/**
 * Returns true if redirected.
 * Do not render or redirect the res object if this has returned true or it will crash.
 */
export type RedirectFunction = (req: Request, res: Response) => boolean;

const addPath = (req: Request): string => {
  const paths: { [v1: string]: string } = {
    "/login": "/sign-in",
    "/register": "/sign-up",
    "/forgotpassword": "/forgot-password",
  };
  // IF you ever need to map query parameters to V2 (such as some kind of ID, you can do it here after the path is selected)
  return paths[req.path ?? "/login"] ?? "";
};

/**
 * Conditionally redirect to V2 and return true if configured to redirect.
 * After this returns true you must not use res.render or res.redirect anymore or it will crash.
 */
export const redirectToV2: RedirectFunction = (
  req: Request,
  res: Response
): boolean => {
  try {
    const cfg = (global as any).config as {
      doRedirectToV2: number;
    };

    let URL = process.env.FRONTEND_URL ?? "";
    if (URL.endsWith("/")) URL = URL.substring(0, URL.length - 1);

    if (cfg.doRedirectToV2 === 1) {
      if (URL?.length) {
        res.redirect(`${URL}${addPath(req)}`);
        return true;
      }
      logger.warn(`Can not redirect to V2 because env FRONTEND_URL isn't set`);
    }
  } catch (e) {
    logger.error(
      `Error: Could not redirect to V2 in VersionRedirect:\n${
        (e as Error).stack
      }`
    );
  }
  return false;
};

export default {
  toV2: redirectToV2,
};
