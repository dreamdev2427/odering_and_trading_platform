import { Field, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'Terms and Conditions Config',
})
export class TermsAndConditionsConfig {
  @Field({
    description: 'URL to T&C Page',
  })
  link: string;

  @Field({
    description: 'Text that appears on the hyperlink to T&C',
  })
  text: string;
}
