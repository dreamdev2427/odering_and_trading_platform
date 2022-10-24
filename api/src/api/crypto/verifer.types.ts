import { Int, InputType, Field, Float } from 'type-graphql';
import { IsInt, Min } from 'class-validator';

@InputType({ description: 'Crypto Reciepe data' })
export class VerifyCryptoReciepeInput {
  @Field(() => String)
  transactionHash: string;

  @Field(() => String)
  details: string;

  @Field(() => Int)
  currencyID: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Int)
  channelID: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  stoID: number;
}

export enum CRYPTO_CURRENCIES {
  WEB3 = 1,
  BINANCE = 2,
  POLYGON = 3,
  Bitcoin = 4,
  Ravencoin = 5,
}
