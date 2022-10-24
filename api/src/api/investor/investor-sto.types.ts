import { InputType, Field } from 'type-graphql';
import { IsEmail, IsOptional, IsInt, IsString, IsDateString } from 'class-validator';

import { InvestorSto } from 'entities';

@InputType({ description: 'Investor usufructuary data' })
export class InvestorUsufructuaryInput implements Partial<InvestorSto> {
  @Field()
  @IsInt()
  ID: number;

  @Field()
  @IsInt()
  isUsufructuary: number;

  @Field()
  @IsString()
  @IsOptional()
  usufructuaryFirstName: string;

  @Field()
  @IsString()
  @IsOptional()
  usufructuaryLastName: string;

  @Field()
  @IsString()
  @IsOptional()
  usufructuaryAddress: string;

  @Field()
  @IsString()
  @IsOptional()
  usufructuaryCity: string;

  @Field()
  @IsString()
  @IsOptional()
  usufructuaryCountry: string;

  @Field()
  @IsEmail()
  @IsOptional()
  usufructuaryEmail: string;
}

@InputType({ description: 'Investor beneficial data' })
export class InvestorBeneficialInput implements Partial<InvestorSto> {
  @Field()
  @IsInt()
  ID: number;

  @Field()
  @IsString()
  @IsOptional()
  beneficialFirstName: string;

  @Field()
  @IsString()
  @IsOptional()
  beneficialLastName: string;

  @Field()
  @IsString()
  @IsOptional()
  beneficialAddress: string;

  @Field()
  @IsString()
  @IsOptional()
  beneficialCity: string;

  @Field()
  @IsString()
  @IsOptional()
  beneficialCountry: string;

  @Field()
  @IsEmail()
  @IsOptional()
  beneficialEmail: string;

  @Field()
  @IsDateString()
  @IsOptional()
  beneficialBirth: string;

  @Field()
  @IsString()
  @IsOptional()
  beneficialNationality: string;
}
