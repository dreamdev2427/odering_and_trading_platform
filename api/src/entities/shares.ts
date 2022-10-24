import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Float, Int, ObjectType } from 'type-graphql';

import ShareTypes from './share-types';

@Entity('shares')
@ObjectType('Share')
class Shares extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'stoid',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'int',
    name: 'shareTypeid',
  })
  @Field(() => Int)
  shareTypeID: number;

  @ManyToOne(() => ShareTypes)
  @JoinColumn({ name: 'shareTypeid' })
  @Field(() => ShareTypes)
  shareType: Promise<ShareTypes>;

  @Column({
    type: 'simple-json',
    name: 'PublicKey',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  publicKey?: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Int)
  isBlockchainFrozen: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Int)
  isBlockchainAuthorized: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  shares: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  sharesHistoryID: number;
}

export default Shares;
