import { Request } from "express";

import logger from "../logger";
import { admin$, adminUser$, mutation$, query$ } from "../graphql/fetchers";

const ADMIN_SIGNIN = mutation$.adminSignIn();

const API_TOKEN = mutation$.generateAPIToken;

const ADMIN_ME = query$.adminMe(admin$.user(adminUser$.ID.email));

const signInToApi = async (
  req: Request,
  username: string,
  password: string,
  platform: boolean,
  STO = 0
) => {
  if (!process.env.API_URL) {
    return;
  }
  try {
    const data = await req.gqlExecute(ADMIN_SIGNIN, {
      variables: {
        username,
        password,
        platform,
        STO,
      },
    });
    req.session.JWTToken = data.adminSignIn;

    // JWT tokens check
    const adminMe = await req.gqlExecute(ADMIN_ME);
    if (!adminMe) {
      throw new Error("SignIn to api didnt work");
    }
    if (platform) {
      const token = await req.gqlExecute(API_TOKEN);
      (global as any).config.API_JWT = token.generateAPIToken;
    }
  } catch (e) {
    logger.error(`Error occurred in sing-in-api:\n${(e as Error).stack}`);
  }
};

export default signInToApi;
