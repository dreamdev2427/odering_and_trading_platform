import { Field, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'Represents all the data an investor needs in order to sign up via netki',
})
export class NetkiSignUpData {
  @Field({
    description: 'The access code required by the mobile app in order to start the KYC process',
  })
  accessCode: string;

  @Field({
    description: 'HTML code that nicely represents where the user can get this the Netki App',
  })
  mobileAppPanel?: string;
}

@ObjectType({ description: 'KYC data' })
export class KycData {
  @Field({
    description: 'user ID',
  })
  ID: number;

  @Field()
  isKYC: boolean;

  @Field({
    description: 'denotes if the login info is active',
  })
  isActive: boolean;

  @Field({
    description: 'investorSto status',
  })
  status: number;
}
