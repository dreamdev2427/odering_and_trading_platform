import express from "express";
import passport from "passport";

import getAdminLogin from "../../controllers/admin/singIn/getAdminLogin";
import getAdminLoginCommon from "../../controllers/admin/singIn/getAdminLoginCommon";
import getAdminLogout from "../../controllers/admin/singIn/getAdminLogout";
import postAdminSignIn from "../../controllers/admin/singIn/postAdminSignIn";
import postAdminLogin from "../../controllers/admin/singIn/postAdminLogin";

const router = express.Router();

router.get("/admin/login", getAdminLogin);

router.get("/adminlogin", getAdminLoginCommon);

router.get("/admin/logout", getAdminLogout);

router.post(
  "/admin/signin",
  passport.authenticate("admin-local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
  }),
  postAdminSignIn
);

router.post("/adminloginpost", postAdminLogin);

export default router;
