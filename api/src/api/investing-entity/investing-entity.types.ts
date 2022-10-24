import { InputType, Field } from 'type-graphql';
import { IsBoolean, IsEmail, IsInt, IsString, MaxLength, MinLength } from 'class-validator';

import { InvestingEntity, InvestingEntityMember } from 'entities';
import { INVESTING_MEMBER_ROLES, PAYMENT_METHODS } from 'entities/investing-entity';

@InputType({ description: 'Investors Investing Entity members data' })
export class InvestingEntityMemberInput implements Partial<InvestingEntityMember> {
  @Field()
  @IsInt()
  entityID: number;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  firstName: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  lastName: string;

  @Field(() => INVESTING_MEMBER_ROLES)
  role: INVESTING_MEMBER_ROLES;

  @Field(() => Boolean)
  @IsBoolean()
  signatory: boolean;

  @Field()
  @IsEmail()
  @MaxLength(255)
  email: string;
}

@InputType({ description: 'Investors Investing Entity data for creating or updating' })
export class InvestingEntityInput implements Partial<InvestingEntity> {
  @Field()
  @IsInt()
  typeID: number;

  @Field()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  taxId: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  nickname: string;

  @Field(() => Boolean)
  @IsBoolean()
  accredited: boolean;

  @Field(() => PAYMENT_METHODS)
  @IsString()
  paymentMethod: PAYMENT_METHODS;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  address: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  city: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  postalCode: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  country: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  state: string;
}
