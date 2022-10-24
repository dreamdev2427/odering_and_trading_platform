import { Resolver, Query, Arg } from 'type-graphql';

import { Translations } from 'entities';

@Resolver()
class TranslationsResolvers {
  @Query(() => [Translations], { description: 'Get all translations or translations for locale' })
  async translations(@Arg('locale', { nullable: true }) locale?: string): Promise<Translations[]> {
    if (locale) {
      return Translations.find({ locale });
    }
    return Translations.find();
  }

  @Query(() => [String], { description: 'Get all translations or translations for locale' })
  async locales(): Promise<string[]> {
    const locales = await Translations.createQueryBuilder()
      .select('locale')
      .distinct(true)
      .getRawMany();
    return locales.map((x) => x.locale);
  }
}

export default TranslationsResolvers;
