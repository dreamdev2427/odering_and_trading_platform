import express from "express";
import passport from "passport";

import getPlatformLogin from "../../controllers/admin/singIn/getPlatformLogin";
import getPlatformLogout from "../../controllers/admin/singIn/getPlatformLogout";

const router = express.Router();

router.get("/platform/adminlogin", getPlatformLogin);

router.get("/platform/adminlogout", getPlatformLogout);

router.post(
  "/platform/adminsignin",
  passport.authenticate("platform-local", {
    successRedirect: "/platform/dashboard",
    failureRedirect: "/platform/adminlogin",
    failureFlash: true,
  })
);

export default router;
