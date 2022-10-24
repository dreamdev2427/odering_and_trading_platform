import { InputType, Field, Int } from 'type-graphql';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { Investor } from 'entities';

@InputType({ description: 'Investor profile data' })
export class InvestorProfileInput implements Partial<Investor> {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  firstName: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  lastName: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(150)
  address: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(28)
  zip: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  town: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  state: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(80)
  country: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(30)
  phone: string;

  @Field()
  @IsString()
  @ValidateIf((e) => !e.driversLicenseID && !e.nationalID)
  @MinLength(3)
  @MaxLength(45)
  passportNumber: string;

  @Field()
  @IsString()
  @ValidateIf((e) => !e.passportNumber && !e.driversLicenseID)
  @MinLength(3)
  @MaxLength(60)
  nationalID: string;

  @Field()
  @ValidateIf((e) => !e.passportNumber && !e.nationalID)
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  driversLicenseID: string;

  @Field()
  @IsDateString()
  @IsOptional()
  birthDate: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(70)
  kinname: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  kinphone: string;

  @Field({ nullable: true })
  @ValidateIf((e) => e.kinemail !== '')
  @IsEmail()
  @IsOptional()
  @MaxLength(30)
  kinemail: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes: string;
}

@InputType({ description: 'Investor company profile data' })
export class InvestorCompanyProfileInput extends InvestorProfileInput {
  @Field()
  @IsString()
  @MaxLength(60)
  companyName: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(60)
  titleWithinCompany: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(1)
  powerToBindCompany: number;
}
