import { Int, InputType, Field, Float, GraphQLTimestamp } from 'type-graphql';
import { IsNumber, IsInt, IsPositive, IsEnum, IsDate, IsOptional } from 'class-validator';
import { BROKER_TYPE, PAYMENT_STATUS } from 'entities/fee-commissions';

@InputType({ description: 'Fee Commission data' })
export class FeeCommissionInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  feeID: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  amount: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  transactionID: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  beneficiaryID: number;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @IsDate()
  @IsOptional()
  dateEarned?: Date;

  @Field(() => PAYMENT_STATUS, { nullable: true })
  @IsEnum(PAYMENT_STATUS)
  @IsOptional()
  status?: PAYMENT_STATUS;

  @Field(() => BROKER_TYPE, { nullable: true })
  @IsEnum(BROKER_TYPE)
  @IsOptional()
  beneficiaryType?: BROKER_TYPE;
}
