import { Field, Int, Float, InputType } from 'type-graphql';
import { IsNumber, IsInt, IsString, IsPositive, IsOptional } from 'class-validator';

import { ExchangeOffer } from 'entities';

@InputType()
export class ExchangeOfferInput implements Partial<ExchangeOffer> {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  exchangeOrderID: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  sharesPartial: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  rateFrom: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field()
  @IsString()
  atomicBuyerPublicKey: string;
}
