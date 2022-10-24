import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, registerEnumType, Float } from 'type-graphql';

export enum FEE_BENEFICIARY {
  Broker = 'BROKER',
  Platform = 'PLATFORM',
}

registerEnumType(FEE_BENEFICIARY, {
  name: 'FEE_BENEFICIARY',
  description: 'All Kinds of Fee Beneficiaries',
});

export enum FEE_TYPE {
  Registration = 'REGISTRATION',
  Deposit = 'DEPOSIT',
  BuyShares = 'BUY SHARES',
  BuyExchange = 'BUY EXCHANGE',
  SellExchange = 'SELL EXCHANGE',
  SellBack = 'SELL BACK',
}

registerEnumType(FEE_TYPE, {
  name: 'FEE_TYPE',
  description: 'All Kinds of Fee Types',
});

export enum COMMISSION_TYPE {
  Flat = 'FLAT',
  Percentage = 'PERCENTAGE',
}

registerEnumType(COMMISSION_TYPE, {
  name: 'COMMISSION_TYPE',
  description: 'All Kinds of Commission Types',
});

@Entity('fees')
@ObjectType('Fee')
class Fee extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'enum',
    enum: FEE_BENEFICIARY,
  })
  @Field(() => FEE_BENEFICIARY)
  beneficiary: FEE_BENEFICIARY;

  @Column({
    type: 'enum',
    enum: FEE_TYPE,
  })
  @Field(() => FEE_TYPE)
  type: FEE_TYPE;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'enum',
    enum: COMMISSION_TYPE,
    default: COMMISSION_TYPE.Flat,
  })
  @Field(() => COMMISSION_TYPE)
  status: COMMISSION_TYPE;
}

export default Fee;
