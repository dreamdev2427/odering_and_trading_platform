import { Int, InputType, Field, GraphQLTimestamp, ObjectType } from 'type-graphql';
import { IsInt, IsPositive, IsEnum, IsDate, IsOptional, IsString, Min } from 'class-validator';
import { MESSAGE_TYPE, SENDER_TYPE, RECEIVER_TYPE, CHAT_CONTEXT } from 'entities/chats';

@InputType({ description: 'Chat Data' })
export class ChatInput {
  @Field(() => SENDER_TYPE)
  @IsEnum(SENDER_TYPE)
  sender: SENDER_TYPE;

  @Field(() => RECEIVER_TYPE)
  @IsEnum(RECEIVER_TYPE)
  receiver: RECEIVER_TYPE;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  investorID: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  adminID: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  stoID: number;

  @Field()
  @IsString()
  message: string;

  @Field(() => MESSAGE_TYPE, { nullable: true })
  @IsEnum(MESSAGE_TYPE)
  @IsOptional()
  type?: MESSAGE_TYPE;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @IsDate()
  @IsOptional()
  dateSent?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => CHAT_CONTEXT, { nullable: true })
  @IsEnum(CHAT_CONTEXT)
  @IsOptional()
  context?: CHAT_CONTEXT;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  contextID?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  contextReceiverID?: number;
}

@ObjectType()
export class PriceNegotiationListItem {
  @Field(() => Int)
  counterpartID: number;

  @Field(() => Int)
  orderID: number;

  @Field(() => Int)
  orderOwnerID: number;

  @Field(() => Boolean, { nullable: true })
  isRead?: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  dateRead?: Date;

  @Field()
  formattedDateSent: string;

  @Field()
  counterpartFullName: string;
}
