import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Stos } from 'entities';
import { IsInt, IsPositive } from 'class-validator';
import { INVESTOR_TYPE } from 'entities/investor';

@ObjectType()
export class AdminUser {
  @Field(() => Int)
  ID: number;

  @Field(() => Int, { nullable: true })
  stoid: number;

  @Field({ nullable: true })
  FirstName: string;

  @Field({ nullable: true })
  LastName: string;

  @Field(() => Int, { nullable: true })
  isActive: number;

  @Field()
  Username: string;

  @Field(() => Int, { nullable: true })
  twofactorenable: number;

  @Field({ nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  isPlatformAdminLogin?: number | null;
}

@ObjectType()
export class Admin {
  @Field()
  user: AdminUser;

  @Field()
  STO: Stos;
}

@InputType({ description: 'Investor KYC data that can be updated by the admin.' })
export class InvestorKycInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  investorID: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  status: number;

  @Field(() => Boolean)
  isKyc: boolean;

  @Field(() => Boolean)
  kycApplied: boolean;
}

@ObjectType()
export class NonKycInvestor {
  // Sometimes it's not found
  @Field(() => Int, { nullable: true })
  ID?: number;

  @Field(() => Int, { nullable: true })
  investorType: INVESTOR_TYPE;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  updateDate: string;
}
