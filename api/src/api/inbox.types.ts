import { InputType, Field } from 'type-graphql';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

import { Inbox } from 'entities';

@InputType({ description: 'Investor inbox create data' })
export class InboxInput implements Partial<Inbox> {
  @Field()
  @IsInt()
  stoID: number;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(4000)
  content: string;
}
