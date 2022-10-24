import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class VerifyInvestorComWebhookPayload {
  @Field()
  action: string;

  @Field(() => Int)
  verification_request_id: number;

  @Field(() => Int)
  investor_id: number;

  @Field()
  legal_name: string;

  @Field()
  verification_status: string;

  @Field()
  verification_result_status: string;

  @Field()
  verification_request_step: string;

  @Field()
  status: string;

  @Field()
  eapi_identifier: string;

  @Field()
  embedded_api: boolean;

  @Field()
  accountNumber: string;

  @Field()
  routingNumber: string;
}

@ObjectType()
export class VerifyInvestorComKycDataResponse {
  @Field(() => Int)
  id: number;

  @Field()
  created_at: string;

  @Field()
  completed_at: string;

  @Field()
  portal_name: string;

  @Field()
  verified_expires_at: string;

  @Field()
  deal_name: string;

  @Field()
  verification_request_step: string;

  @Field()
  api_type: string;

  @Field()
  identifier: string;

  @Field()
  status: string;

  @Field()
  legal_name: string;
}
