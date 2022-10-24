import { Field, InputType, Int, Float } from 'type-graphql';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsDateString,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';

import { ExchangeOrder } from 'entities';

@InputType()
export class ExchangeBuyOrderInput implements Partial<ExchangeOrder> {
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateFrom: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateTo: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  shareTypeID: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  shares: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  rateFrom: number;
}

@InputType()
export class ExchangeUpdateOrderInput implements Partial<ExchangeOrder> {
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateTo: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  rateFrom: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;
}

@InputType()
export class ExchangeSellOrderInput extends ExchangeBuyOrderInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  atomicSwapSharesWalletID?: number;

  @Field({ nullable: true })
  @ValidateIf((o) => o.atomicSwapSharesWalletID)
  @IsNotEmpty()
  @IsString()
  atomicSwapTokenAddressAcceptable?: string;
}
