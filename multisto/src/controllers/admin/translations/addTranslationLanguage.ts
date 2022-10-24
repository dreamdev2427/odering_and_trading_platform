import { Request, Response } from "express";
import ITranslationService from "../../../services/platform/translations/ITranslationService";
import TranslationSqlService from "../../../services/platform/translations/TranslationSqlService";

export default async (req: Request, res: Response) => {
  const translationService: ITranslationService = new TranslationSqlService();
  try {
    const { locale } = req.body;
    await translationService.create(locale);
    res.redirect(`translations`);
  } catch (error) {
    res.status(400).send("Unknown error while creating translations");
  }
};
