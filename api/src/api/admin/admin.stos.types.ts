import { Field, InputType, Int } from 'type-graphql';
import { IsInt, IsString } from 'class-validator';

@InputType({ description: 'Update meta value data' })
export class UpdateMetadataValueInput {
  @Field()
  @IsString()
  key: string;

  @Field()
  @IsString()
  value: string;

  @Field(() => Int)
  @IsInt()
  stoID: number;
}
