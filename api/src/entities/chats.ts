import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { ObjectType, Field, Int, registerEnumType, GraphQLTimestamp } from 'type-graphql';

export enum SENDER_TYPE {
  Investor = 'INVESTOR',
  Admin = 'ADMIN',
  Platform = 'PLATFORM',
}

registerEnumType(SENDER_TYPE, {
  name: 'SENDER_TYPE',
  description: 'All Types of Message Sender',
});

export enum RECEIVER_TYPE {
  Investor = 'INVESTOR',
  Admin = 'ADMIN',
  Platform = 'PLATFORM',
}

registerEnumType(RECEIVER_TYPE, {
  name: 'RECEIVER_TYPE',
  description: 'All Types of Message Receiver',
});

export enum MESSAGE_TYPE {
  Message = 'MESSAGE',
  File = 'FILE',
}

registerEnumType(MESSAGE_TYPE, {
  name: 'MESSAGE_TYPE',
  description: 'All Types of Message',
});

export enum CHAT_CONTEXT {
  ExchangeOrder = 'EXCHANGE ORDER',
}

registerEnumType(CHAT_CONTEXT, {
  name: 'CHAT_CONTEXT',
  description: 'In Which Context Chatting Happens',
});

export enum CHAT_BETWEEN {
  InvestorAdmin = 'INVESTOR-ADMIN',
  InvestorPlatform = 'INVESTOR-PLATFORM',
  InvestorInvestor = 'INVESTOR-INVESTOR',
}

registerEnumType(CHAT_BETWEEN, {
  name: 'CHAT_BETWEEN',
  description: 'Between Who Chatting Happens',
});

@Entity('chats')
@ObjectType('Chat')
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'enum',
    enum: SENDER_TYPE,
  })
  @Field(() => SENDER_TYPE)
  sender: SENDER_TYPE;

  @Column({
    type: 'enum',
    enum: RECEIVER_TYPE,
  })
  @Field(() => RECEIVER_TYPE)
  receiver: RECEIVER_TYPE;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  adminID: number;

  @Column({
    type: 'int',
    default: '0',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'varchar',
    length: 2000,
  })
  @Field()
  message: string;

  @Column({
    type: 'enum',
    enum: MESSAGE_TYPE,
    default: MESSAGE_TYPE.Message,
  })
  @Field(() => MESSAGE_TYPE)
  type: MESSAGE_TYPE;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => GraphQLTimestamp)
  dateSent: Date;

  @Column({
    type: 'tinyint',
    default: 0,
    width: 1,
  })
  @Field(() => Boolean)
  isRead: boolean;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  @Field(() => GraphQLTimestamp, { nullable: true })
  dateRead?: Date;

  @Column({
    type: 'tinyint',
    default: 0,
    width: 1,
  })
  @Field(() => Boolean)
  isEdited: boolean;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  @Field({ nullable: true })
  location?: string;

  @Column({
    type: 'tinyint',
    default: 0,
    width: 1,
  })
  @Field(() => Boolean)
  isDeleted: boolean;

  @Column({
    type: 'enum',
    enum: CHAT_CONTEXT,
    nullable: true,
  })
  @Field(() => CHAT_CONTEXT, { nullable: true })
  context?: CHAT_CONTEXT;

  @Column({
    type: 'int',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  contextID?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  contextReceiverID?: number;
}

export default Chat;
