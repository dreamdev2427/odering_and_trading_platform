import { Int, InputType, Field, Float } from 'type-graphql';
import { IsNumber, IsInt, IsPositive, IsEnum } from 'class-validator';
import { FEE_BENEFICIARY, COMMISSION_TYPE, FEE_TYPE } from 'entities/fees';

@InputType({ description: 'Fee data' })
export class FeeInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  stoID: number;

  @Field(() => FEE_BENEFICIARY)
  @IsEnum(FEE_BENEFICIARY)
  beneficiary: FEE_BENEFICIARY;

  @Field(() => FEE_TYPE)
  @IsEnum(FEE_TYPE)
  type: FEE_TYPE;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  amount: number;

  @Field(() => COMMISSION_TYPE)
  @IsEnum(COMMISSION_TYPE)
  status: COMMISSION_TYPE;
}
