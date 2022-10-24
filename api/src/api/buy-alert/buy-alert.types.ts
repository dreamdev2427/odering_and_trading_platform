import { Int, InputType, Field, Float, registerEnumType, Authorized } from 'type-graphql';
import { IsNumber, IsInt, IsString, IsPositive, IsOptional } from 'class-validator';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { JWT_ROLE } from 'core/context';

registerEnumType(PURCHASE_STATUS_TYPE, {
  name: 'BuyAlertStatus',
  valuesConfig: {
    Unused: { description: `Not ready for processing` },
    Accepted: { description: `Shares transferred` },
    Declined: { description: `Blocked for a reason` },
    PaymentFailure: { description: `Paymend process failed` },
    PaymentOngoing: { description: `Paymend process is ongoing` },
    PaymentAwaiting: { description: `Paymend process is awaiting interaction from user` },
    Pending: { description: `Waiting for administration to approve` },
  },
});

@InputType({ description: 'Investors buy alert data' })
export class InvestorBuyAlertInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  stoID: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  shareTypeID: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  shares: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  details: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  publicKey?: string;

  @Field(() => PURCHASE_STATUS_TYPE, {
    nullable: true,
    description: `Optionally set a custom status upon insertion if you have your own purchasing flow. Restricted to API users and platform admins.`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  status?: PURCHASE_STATUS_TYPE;

  @Field(() => Boolean, {
    nullable: true,
    description: `Investor has acknowledged or deliberately invisible`,
  })
  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  isHiddenForInvestor?: boolean;

  @Field(() => Boolean, {
    description: `Determines if this is a request to sell shares or to buy them`,
  })
  isSellBackRequest = false;
}

@InputType({ description: 'Investors buy alert data' })
export class InvestorBuyAlertInputAdmin extends InvestorBuyAlertInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  investorID: number;
}

@InputType({ description: 'Custom flow options for purchasing' })
export class InvestorBuyAlertOptions {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Do not restrict based on wallet balance',
  })
  ignoreWalletBalance?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Will allow you to create multiple requests for the same share type (can lead to spam!). Please be sure to know what you are doing.',
  })
  ignoreAllPreviousRequests?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Will automatically set requests as signed, ignoring all signature requirements',
  })
  ignoreSignatures?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Ignore investing entity',
  })
  ignoreEntity?: boolean;
}
