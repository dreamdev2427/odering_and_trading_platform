import { ObjectType, InputType, Field } from 'type-graphql';
import { IsString } from 'class-validator';

@InputType('InvestingEntityPaymentDetailsInput')
@ObjectType()
export class InvestingEntityPaymentDetails {
  @Field()
  @IsString()
  routing: string;

  @Field()
  @IsString()
  swift: string;

  @Field()
  @IsString()
  account: string;

  @Field()
  @IsString()
  beneficiary: string;

  @Field()
  @IsString()
  institution: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  note: string;
}