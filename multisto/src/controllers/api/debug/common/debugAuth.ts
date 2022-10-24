import { NextFunction, Request, Response } from "express";
import checkDebugToken from "./checkDebugToken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (checkDebugToken(req)) {
      next();
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(404);
  }
};
