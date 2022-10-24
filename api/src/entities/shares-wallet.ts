import { Investor, ShareTypes } from 'entities';
import { Field, Float, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shareswallet')
@ObjectType('SharesWallet')
class SharesWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
    name: 'sharesID',
    default: 0,
  })
  @Field(() => Int)
  shareTypeID: number;

  @ManyToOne(() => ShareTypes)
  @Field(() => ShareTypes)
  @JoinColumn({ name: 'sharesID' })
  shareType: Promise<ShareTypes>;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: 0.0,
  })
  @Field(() => Float)
  shares: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  publicKey?: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 0,
  })
  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;

  @ManyToOne(() => Investor)
  @Field(() => Investor, { nullable: true })
  @JoinColumn({ name: 'investorID' })
  investor?: Promise<Investor>;
}

export default SharesWallet;
