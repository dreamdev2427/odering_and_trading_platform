import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Investor } from './index';

@ObjectType()
export class DocumentCommentReply {
  @Field(() => Int)
  investorID: number;

  @Field()
  text: string;

  @Field()
  modified: Date;
}

@Entity('documentcomments')
@ObjectType()
export default class DocumentComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
    nullable: true,
  })
  @Field({ nullable: true })
  stoID?: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  documentID: number;

  @Column({
    type: 'mediumtext',
    name: 'comment',
  })
  @Field()
  text: string;

  @ManyToOne(() => Investor, (investor) => investor.comment)
  investor?: Promise<Investor>;

  @Field(() => Int)
  @Column()
  investorID: number;

  @Column({
    type: 'datetime',
    name: 'datecomment',
    nullable: true,
  })
  @Field({ nullable: true })
  modified?: Date;

  @Column({
    type: 'mediumtext',
    name: 'reply',
  })
  @Field()
  replyText: string;

  @Column({
    type: 'int',
    name: 'replybyid',
    default: -1,
  })
  @Field(() => Int)
  replyByID: number;

  @Column({
    type: 'datetime',
    name: 'datereplycomment',
    nullable: true,
  })
  @Field({ nullable: true })
  dateReplyComment?: Date;

  @Column({
    type: 'tinyint',
    name: 'isaccepted',
    default: 0,
  })
  @Field(() => Int)
  isAccepted: number;

  @Column({
    type: 'tinyint',
    name: 'isnew',
    default: 1,
  })
  @Field(() => Int)
  isNew: number;

  @Field(() => DocumentCommentReply)
  reply: DocumentCommentReply;
}
