import { Request, Response } from "express";
import IStosMetaKeysService from "../../../services/platform/stos-meta-keys/IStosMetaKeysService";
import StosMetaKeysSqlService from "../../../services/platform/stos-meta-keys/StosMetaKeysSqlService";

export default async (req: Request, res: Response) => {
  const stoMetaKeysService: IStosMetaKeysService = new StosMetaKeysSqlService();
  try {
    const { key } = req.body;
    await stoMetaKeysService.remove(key);
    res.redirect(`stosMetaKeys`);
  } catch (error) {
    res.status(400).send("Unknown error while removing stoMetaKeys");
  }
};
