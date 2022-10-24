import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/platform/adminlogin");
    // login did not use for admin??
    // req.logout(() => {
    // });
  });
};
