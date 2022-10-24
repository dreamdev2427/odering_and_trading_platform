import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Field, Float, GraphQLTimestamp, Int, ObjectType } from 'type-graphql';

import ExchangeOrder from './exchange-order';

@Entity('exchangeoffers')
@ObjectType()
class ExchangeOffer extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  exchangeOrderID: number;

  @ManyToOne(() => ExchangeOrder)
  @Field(() => ExchangeOrder)
  exchangeOrder: Promise<ExchangeOrder>;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  sharesPartial: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  rateFrom: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  rateTo: number;

  @Column({
    type: 'varchar',
    name: 'offerDescription',
    length: 2000,
    nullable: true,
  })
  @Field({ nullable: true })
  description?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    nullable: true,
  })
  @Field(() => Boolean, { nullable: true })
  atomicSwapAccepted: boolean;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @Field({ nullable: true })
  atomicSwapSecret?: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @Field({ nullable: true })
  atomicBuyerPublicKey?: string;

  @Column({
    type: 'datetime',
    name: 'atomicSwapExpireData',
    nullable: true,
  })
  @Field(() => GraphQLTimestamp, { nullable: true })
  atomicSwapExpireDate?: Date;
}

export default ExchangeOffer;
