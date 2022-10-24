import { InputType, Field } from 'type-graphql';
import { IsInt } from 'class-validator';

@InputType({ description: 'Register Investor vote data' })
export class RegisterVoteInput {
  @Field()
  @IsInt()
  type: number;

  @Field()
  @IsInt()
  optionID: number;

  @Field()
  @IsInt()
  meetingID: number;

  @Field()
  @IsInt()
  vote: number;
}
