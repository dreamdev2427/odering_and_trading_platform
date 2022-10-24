import { InputType, Field } from 'type-graphql';
import { InvestorBanks } from 'entities';
import { IsString } from 'class-validator';

@InputType({ description: 'Investor Bank Account Input' })
export class InvestorBankAccountInput implements Partial<InvestorBanks> {
  @Field()
  @IsString()
  accountTitle: string;

  @Field()
  @IsString()
  accountNo: string;

  @Field()
  @IsString()
  routingNumber: string;

  @Field()
  @IsString()
  iban: string;

  @Field()
  @IsString()
  accountHolderName: string;

  @Field()
  @IsString()
  accountHolderCity: string;

  @Field()
  @IsString()
  accountHolderCountry: string;

  @Field()
  @IsString()
  accountHolderAddress: string;

  @Field()
  @IsString()
  accountPostalCode: string;

  @Field()
  @IsString()
  bankName: string;

  @Field()
  @IsString()
  bankCity: string;

  @Field()
  @IsString()
  bankCountry: string;

  @Field()
  @IsString()
  bankAddress: string;

  @Field()
  @IsString()
  swift: string;
}
