import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import Document from './documents';

@Entity('documentofferinvestor')
@ObjectType()
class OfferedDocument extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
    default: null,
    nullable: true,
  })
  stoID?: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
  })
  @Field()
  title: string;

  // @Column({
  //   type: 'int',
  //   nullable: true,
  //   name: 'documentid',
  // })
  @Field(() => Int)
  documentID: number;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'DateFrom',
    default: null,
  })
  @Field({ nullable: true })
  from?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'DataTo',
    default: null,
  })
  @Field({ nullable: true })
  to?: Date;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'contents',
  })
  @Field()
  description: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'documentOffetType',
  })
  type: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'investorStatusID',
  })
  statusID: number;

  @Column({
    type: 'mediumtext',
    nullable: true,
    name: 'InvestorsName',
  })
  investorsName?: string;

  @OneToOne(() => Document, (document) => document.offer)
  @Field(() => Document, { nullable: true })
  @JoinColumn({ name: 'documentId' })
  document?: Document;
}

export default OfferedDocument;
