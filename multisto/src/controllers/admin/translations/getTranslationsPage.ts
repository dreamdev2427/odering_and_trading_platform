import { Request, Response } from "express";
import ITranslationService from "../../../services/platform/translations/ITranslationService";
import TranslationSqlService from "../../../services/platform/translations/TranslationSqlService";
import common from "../../../modules/common";

export default async (req: Request, res: Response) => {
  const translationService: ITranslationService = new TranslationSqlService();
  try {
    const lang = req.query.lang;
    const locales = await translationService.getLocales();
    const translations = await translationService.getTranslations(
      lang?.toString()
    );
    res.render("platform/translations", {
      csrfToken: req.csrfToken(),
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      translationsList: translations,
      translationsLocales: locales,
    });
  } catch (error) {
    if (error instanceof Error) {
      common.handleError(
        req,
        res,
        `${error?.message} - Error occurred in getTranslationsPage`
      );
    }
  }
};
