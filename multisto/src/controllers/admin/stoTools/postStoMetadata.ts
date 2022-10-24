import { Request, Response } from "express";
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";

export default async (req: Request, res: Response) => {
  const stoService: IStoService = new StoSqlService();
  try {
    await stoService.updateMetadata(req.body.stoid, req.body);
    res.redirect(`settings?id=${req.body.stoid}`);
  } catch (error) {
    res.status(400).send("Unknown error while updating metadata");
  }
};
