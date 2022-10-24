import { Request, Response } from "express";

import common from "../../../modules/common";

import { findOne } from "../../../modules/db";
import { Users } from "../../../Schema";

export default async (req: Request, res: Response): Promise<void> => {
  if (req.body.username === "" || req.body.password === "") {
    req.flash("UserMessage5", "All fields are required");
    res.redirect("/adminlogin");
    return;
  }

  if (req.body.username.length > 70 || req.body.password.length > 30) {
    req.flash("UserMessage5", "Something went wrong");
    res.redirect("/adminlogin");
    return;
  }

  const user = await findOne<Users>(
    "select * from users where username = ? and stoid = ?",
    [req.body.username, req.body.stoid]
  );

  if (!user) {
    req.flash("UserMessage5", `Username or Password is wrong`);
    res.redirect(`/adminlogin?stoid=${req.body.stoid}`);
    return;
  }
  const encPassword = common.getSHA256Hash(req.body.password);

  if (user.Password !== encPassword) {
    req.flash("UserMessage5", `Username or Password is wrong`);
    res.redirect(`/adminlogin?stoid=${req.body.stoid}`);
  } else {
    res.redirect(307, "/admin/signin");
  }
};
