import { Request, Response } from "express";
import IStosMetaKeysService from "../../../services/platform/stos-meta-keys/IStosMetaKeysService";
import StosMetaKeysSqlService from "../../../services/platform/stos-meta-keys/StosMetaKeysSqlService";

export default async (req: Request, res: Response) => {
  const stoMetaKeysService: IStosMetaKeysService = new StosMetaKeysSqlService();
  try {
    const { key, type, order, display } = req.body;
    await stoMetaKeysService.update(key, type, Number(order), Number(display));
    res.redirect(`stosMetaKeys`);
  } catch (error) {
    res.status(400).send("Unknown error while updating stoMetaKeys");
  }
};
