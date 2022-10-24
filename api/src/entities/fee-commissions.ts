import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, registerEnumType, Float, GraphQLTimestamp } from 'type-graphql';

export enum BROKER_TYPE {
  Broker = 'BROKER',
  Investor = 'INVESTOR',
}

registerEnumType(BROKER_TYPE, {
  name: 'BROKER_TYPE',
  description: 'All Kinds of Broker Types',
});

export enum PAYMENT_STATUS {
  Pending = 'PENDING',
  Completed = 'COMPLETED',
  Rejected = 'REJECTED',
}

registerEnumType(PAYMENT_STATUS, {
  name: 'PAYMENT_STATUS',
  description: 'The Status of the Commission Fee Payment',
});

@Entity('fee_commissions')
@ObjectType('FeeCommission')
class FeeCommission extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  feeID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  transactionID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  beneficiaryID: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => GraphQLTimestamp)
  dateEarned: Date;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.Pending,
  })
  @Field(() => PAYMENT_STATUS)
  status: PAYMENT_STATUS;

  @Column({
    type: 'enum',
    enum: BROKER_TYPE,
    nullable: true,
  })
  @Field(() => BROKER_TYPE, { nullable: true })
  beneficiaryType?: BROKER_TYPE;
}

export default FeeCommission;
