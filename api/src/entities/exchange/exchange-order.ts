import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Float, Int, ObjectType } from 'type-graphql';

import ShareTypes from '../share-types';
import SharesWallet from '../shares-wallet';
import { ATOMIC_SWAP_STATUS, EXCHANGE_TYPE } from './constants';

@Entity('exchangeorders')
@ObjectType()
class ExchangeOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
  })
  @Field(() => EXCHANGE_TYPE)
  type: EXCHANGE_TYPE;

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
    type: 'date',
  })
  @Field()
  dateFrom: string;

  @Column({
    type: 'date',
  })
  @Field()
  dateTo: string;

  @Column({
    type: 'int',
    name: 'sharesTypeID',
  })
  @Field(() => Int)
  shareTypeID: number;

  @ManyToOne(() => ShareTypes)
  @JoinColumn({ name: 'sharesTypeID' })
  @Field(() => ShareTypes)
  shareType: Promise<ShareTypes>;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  shares: number;

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
    length: 4000,
    nullable: true,
  })
  @Field({ nullable: true })
  description?: string;

  @Column({
    type: 'int',
  })
  @Field(() => ATOMIC_SWAP_STATUS)
  atomicSwapCurrentStatus: ATOMIC_SWAP_STATUS;

  @Column({
    type: 'int',
    nullable: true,
  })
  @Field(() => Int, { nullable: true })
  atomicSwapExchangeOffersID?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  @Field(() => Boolean)
  atomicSwapAcceptable: boolean;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  @Field({ nullable: true })
  atomicSwapTokenAddressAcceptable?: string;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  atomicSwapSharesWalletID: number;

  @ManyToOne(() => SharesWallet)
  @Field(() => SharesWallet, { nullable: true })
  atomicSwapSharesWallet: Promise<SharesWallet>;
}

export default ExchangeOrder;
