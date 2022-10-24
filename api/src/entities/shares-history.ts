import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Float, Int, ObjectType, GraphQLTimestamp } from 'type-graphql';

import ShareTypes from './share-types';

@Entity('shareshistory')
@ObjectType()
class SharesHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'sharesid',
  })
  @Field(() => Int)
  sharesID: number;

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
    type: 'varchar',
    length: 800,
    name: 'CertificateSerials',
  })
  @Field(() => String, { nullable: true })
  certificateSerials: string;

  @Column({
    type: 'varchar',
    length: 800,
    name: 'ShareSerials',
  })
  @Field(() => String, { nullable: true })
  shareSerials: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  @Field(() => Boolean)
  isActive: boolean;

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
  purchaserID: number;

  @Column({
    type: 'datetime',
  })
  @Field(() => GraphQLTimestamp)
  datePurchase: Date;
}

export default SharesHistory;
