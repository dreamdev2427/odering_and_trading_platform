import { Int, InputType, Field, Float } from 'type-graphql';
import {
  IsNumber,
  IsInt,
  IsString,
  IsPositive,
  MaxLength,
  MinLength,
  ValidateIf,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

@InputType({ description: 'Investors buy alert common fields' })
export class InvestorDepositWithdrawAlertInput {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  stoID: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  channelID: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  amount: number;

  @Field()
  @IsBoolean()
  isWithdrawRequest: boolean;

  @Field({ nullable: true })
  @MaxLength(1000)
  @IsString()
  details: string;

  @Field({ nullable: true })
  @IsOptional()
  @ValidateIf((e) => (!e.bankAccount || !e.swiftCode || e.bankName) && !e.transactionID)
  @MinLength(3)
  @IsString()
  bankName: string;

  @Field({ nullable: true })
  @IsOptional()
  @ValidateIf((e) => (!e.bankAccount || e.swiftCode || !e.bankName) && !e.transactionID)
  @MinLength(8)
  @MaxLength(11)
  @IsString()
  swiftCode: string;

  @Field({ nullable: true })
  @IsOptional()
  @ValidateIf((e) => (e.bankAccount || !e.swiftCode || !e.bankName) && !e.transactionID)
  @MinLength(10)
  @MaxLength(50)
  @IsString()
  bankAccount: string;

  @Field({ nullable: true })
  @IsOptional()
  @ValidateIf((e) => (!e.bankAccount && !e.swiftCode && !e.bankName) || e.transactionID)
  @MinLength(20)
  @MaxLength(100)
  @IsString()
  transactionID: string;

  @Field({ nullable: true })
  @IsOptional()
  buyAlertID: number;
}
