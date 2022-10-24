import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MercuryInfo {
  @Field()
  accountNumber: string;

  @Field()
  routingNumber: string;
}

@ObjectType()
export class MercuryAddress {
  @Field()
  address1: string;

  @Field()
  city: string;

  @Field()
  region: string;

  @Field()
  postalCode: string;

  @Field()
  country: string;
}

@ObjectType()
export class MercuryAccount {
  @Field()
  accountNumber: string;

  @Field()
  routingNumber: string;

  @Field()
  electronicAccountType:
    | 'businessChecking'
    | 'businessSavings'
    | 'personalChecking'
    | 'personalSavings';

  @Field()
  address: MercuryAddress;
}

@ObjectType()
export class MercuryRecipient {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [String])
  emails: string[];

  @Field(() => String)
  paymentMethod: 'check' | 'electronic' | 'domesticWire' | 'internationalWire';

  @Field()
  electronicRoutingInfo: MercuryAccount;
}
