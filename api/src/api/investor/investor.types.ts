import { Int, InputType, Field, ObjectType } from 'type-graphql';
import { IsEmail, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

import { Register, Investor, Stos, InvestorSto } from 'entities';

@ObjectType()
export class User {
  @Field()
  investor: Investor;

  @Field()
  sto: Stos;

  @Field()
  investorSto: InvestorSto;
}

@InputType({ description: 'New investor data' })
export class SignUpInput implements Partial<Register> {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  companyName?: string;

  @Field()
  @MinLength(8)
  @MaxLength(100)
  @IsString()
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  stoID: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  investorType: number;

  secret: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  brokerID?: string;
}

@InputType({ description: 'SSO investor data' })
export class SignInSSOInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType({ description: 'Set password data' })
export class SetPasswordInput {
  @Field()
  @IsString()
  token: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}

@InputType({ description: 'Change password data' })
export class ChangePasswordInput {
  @Field()
  @IsString()
  oldPassword: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  newPassword: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  repeatPassword: string;
}
