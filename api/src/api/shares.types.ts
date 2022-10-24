import { InputType, Field, Int, Float, registerEnumType } from 'type-graphql';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType({ description: 'Transfer share data' })
export class TransferShareInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  stoID: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  investorID: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  shareTypeID: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  tokensToTransfer: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  investment: number;

  @Field()
  @IsString()
  investmentDescription: string;

  @Field({ nullable: true })
  @IsString()
  certificateNos?: string;

  @Field({ nullable: true })
  @IsString()
  shareNos?: string;

  @Field({
    nullable: true,
    description: 'Idempotency token to verify transfer',
  })
  @IsString()
  @IsOptional()
  token?: string;
}

export enum TRANSFER_ENTITY {
  Investor = 'investor',
  Company = 'company',
  Custodian = 'custodian',
}

registerEnumType(TRANSFER_ENTITY, {
  name: 'TransferEntity',
  description: 'Represents an actor type in a share transfer',
});
