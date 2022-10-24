import passport from "passport";
import { Strategy } from "passport-local";

import common from "../modules/common";
import { findOne, findMany } from "../modules/db";
import { Rolesrightssto, Users, Userssto } from "../Schema";
import signInToApi from "./sign-in-api";

passport.use(
  "platform-local",
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

      const encPassword = common.getSHA256Hash(password);
      const user = await findOne<Users>(
        "Select * from users where username = ? AND stoid = 0 AND isPlatformAdminLogin = 1 AND isactive = 1",
        [username]
      );
      if (!user || user.Password !== encPassword) {
        req.flash("UserMessage2", "Invalid username or password");
        done(null, false);
        return;
      }

      const role = await findOne<Userssto>(
        "Select * from userssto where UserID = ?",
        [user.ID]
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
        RoleID: role.roleid,
        Rights: rights.map((x) => x.RightID),
      };

      req.session.regenerate(async (error) => {
        if (error) {
          return;
        }
        req.session.userType = "platform";
        req.session.user = SessionUser;
        req.session._ip = req.ip;
        req.session._ua = req.headers["user-agent"];

        await signInToApi(req, username, password, true);

        done(null, SessionUser);
      });
    }
  )
);
