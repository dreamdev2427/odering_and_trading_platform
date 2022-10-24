import passport from "passport";
import { Strategy } from "passport-local";

import common from "../modules/common";
import getSTOFromConfig, {
  getSTOFromConfigByHostname,
} from "./getSTOFromConfig";
import * as emailTextsController from "./platform/emails/controllers/EmailTexts.controller";
import * as emailTexts from "../data/text.json";
import { findOne, findMany } from "../modules/db";
import { Rolesrightssto, Users, Userssto } from "../Schema";
import signInToApi from "./sign-in-api";

passport.use(
  "admin-local",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, // passback entire req to call back
    },
    async (req, username, password, done): Promise<void> => {
      if (!username || !password) {
        req.flash("UserMessage2", "All fields are required.");
        done(null, false);
        return;
      }

      const globalObj = global as any;

      const stoid = req.body.stoid
        ? Number(req.body.stoid)
        : globalObj.config.stos[req.hostname].stoid;
      const encPassword = common.getSHA256Hash(password);
      const user = await findOne<Users>(
        "Select * from users where username = ? and stoid = ?",
        [username, stoid]
      );
      if (!user || !user.isActive || user.Password !== encPassword) {
        req.flash("UserMessage2", "Invalid username or password");
        done(null, false);
        return;
      }

      const role = await findOne<Userssto>(
        "Select * from userssto where UserID = ? and stoid = ?",
        [user.ID, stoid]
      );
      if (!role) {
        req.flash("UserMessage2", "Invalid username or password");
        done(null, false);
        return;
      }

      const rights = await findMany<Rolesrightssto>(
        "select * from rolesrightssto where roleid = ?",
        [role.roleid]
      );
      const SessionUser = {
        ID: user.ID,
        UserName: `${user.FirstName} ${user.LastName}`,
        AuthCode:
          user.twofactorenable === 1
            ? Math.floor(Math.random() * 9999 + 1000)
            : 0,
        RoleID: role.roleid,
        Rights: rights.map((x) => x.RightID),
      };

      req.session.regenerate(async (error) => {
        if (error) {
          return;
        }
        req.session.userType = "admin";
        req.session.user = SessionUser;
        req.session._ip = req.ip;
        req.session._ua = req.headers["user-agent"];
        req.session.stoid = stoid;

        await signInToApi(
          req,
          username,
          password,
          user.isPlatformAdminLogin === 1,
          stoid
        );

        if (!user.email || SessionUser.AuthCode === 0) {
          done(null, SessionUser);
          return;
        }

        const sto0 = getSTOFromConfig(0);
        const stoCurrent = getSTOFromConfigByHostname(req.hostname) ?? sto0;
        // If hostnames (subdomains) are used, try to capture currently active sto
        const sto =
          globalObj.config.areSTOHostnamesEnabled === 1 ? stoCurrent : sto0;

        const stoEmailTexts = emailTextsController.default.globalEmailTexts();
        if (!stoEmailTexts) {
          throw new Error(`Email texts not found for twoFactorAuthentication`);
        }

        const { Line1 = "" } = stoEmailTexts.twoFactorAuthentication;

        let txtEmail = emailTextsController.format(Line1, {
          username: SessionUser.UserName,
          code: `${SessionUser.AuthCode}`,
        });
        txtEmail += "<br /><br />";
        txtEmail += getSTOFromConfig(sto.ID ?? 0).emailFooter;

        await common.sendEmail(
          req.hostname,
          user.email,
          emailTexts.twoFactorAuthentication.Subject,
          txtEmail,
          []
        );
        done(null, SessionUser);
      });
    }
  )
);
