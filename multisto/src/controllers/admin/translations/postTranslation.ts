import { Request, Response } from "express";
import ITranslationService from "../../../services/platform/translations/ITranslationService";
import TranslationSqlService from "../../../services/platform/translations/TranslationSqlService";

export default async (req: Request, res: Response) => {
  const translationService: ITranslationService = new TranslationSqlService();
  try {
    const { locale, key, translation } = req.body;
    await translationService.update(locale, key, translation);
    res.redirect(`translations`);
  } catch (error) {
    res.status(400).send("Unknown error while updating translations");
  }
};
