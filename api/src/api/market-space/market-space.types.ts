import { Field, InputType, Int } from 'type-graphql';
import { IsInt, IsNumber, IsObject, IsOptional, IsPositive, IsString } from 'class-validator';
import { GraphQLJSON } from 'graphql-scalars';

import { SignUpInput } from 'api/investor/investor.types';
import { InvestorBuyAlertInput } from 'api/buy-alert/buy-alert.types';

@InputType()
export class SignUpMarketSpaceInput extends SignUpInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  referredBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  referredByID?: number;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field()
  @IsString()
  zip: string;

  @Field()
  @IsString()
  country: string;
}

@InputType()
export class InvestorBuyAlertMSInput extends InvestorBuyAlertInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  entityID: number;
}

@InputType({
  description: 'Customization options for creating investor via API',
})
export class InvestorCreateOptions {
  @Field(() => Boolean, {
    nullable: true,
    description:
      'Assumes you trust and approve the KYC input for this investor. Marks the user as KYC-approved and enables related actions.',
  })
  autoAcceptKyc?: boolean;
}

@InputType()
export class InvestorMarketSpaceInput extends SignUpMarketSpaceInput {
  @Field(() => GraphQLJSON)
  @IsObject()
  kyc: Record<string, string>;

  @Field(() => InvestorCreateOptions, {
    nullable: true,
  })
  options?: InvestorCreateOptions;
}
