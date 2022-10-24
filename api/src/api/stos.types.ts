import { ObjectType, Field } from 'type-graphql';

import { Stos } from 'entities';
import { Settings } from '../entities/stos';

@ObjectType()
export class PublicSto implements Partial<Omit<Stos, 'settings'>> {
  @Field(() => Settings)
  settings: Settings;

  @Field()
  stolinkfull: string;

  @Field()
  logo: string;

  @Field(() => String, { nullable: true })
  registrationText?: string;

  @Field()
  title: string;
}
