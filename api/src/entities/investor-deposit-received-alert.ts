import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, Float } from 'type-graphql';

import Currency from 'entities/currency';

@ObjectType('InvestorDepositAlert')
@Entity('InvestorDepositReceivedAlert')
class InvestorDepositReceivedAlert extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  investorID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  isApproved: number;

  @Column({
    type: 'int',
    name: 'storid',
  })
  stoID: number;

  @Column({
    type: 'datetime',
    name: 'DateReceived',
  })
  @Field()
  dateReceived: string;

  @Column({
    type: 'int',
    name: 'ChannelID',
  })
  channelID: number;

  @Column({
    type: 'decimal',
    name: 'Amount',
    precision: 28,
    scale: 17,
  })
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
    name: 'Details',
  })
  @Field()
  details: string;

  @Column({
    type: 'datetime',
    name: 'DateApproved',
  })
  @Field()
  dateApproved: string;

  @Column({
    type: 'int',
    name: 'ApprovedByUserID',
  })
  approvedUserID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
    name: 'runningBalance',
  })
  balance: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  currencyID: number;

  @ManyToOne(() => Currency)
  @Field(() => Currency)
  currency: Promise<Currency>;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: true,
  })
  transactionID: string;

  @Column({
    type: 'varchar',
    length: 45,
    unique: true,
  })
  idempotencyKey: string;

  @Column({
    type: 'tinyint',
    width: 4,
  })
  @Field(() => Boolean)
  isWithdrawFundsRequest: boolean;

  @Column({
    type: 'int',
    nullable: true,
  })
  conversionRateLock: number;

  @Column({ nullable: true, default: null })
  @Field(() => Int, { nullable: true })
  buyAlertID?: number;
}

export default InvestorDepositReceivedAlert;
