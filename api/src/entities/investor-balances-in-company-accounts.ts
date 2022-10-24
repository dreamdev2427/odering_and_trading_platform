import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, Float } from 'type-graphql';

import Currency from 'entities/currency';

@Entity('InvestorBalancesInCompanyAccounts')
@ObjectType('InvestorBalance')
class InvestorBalancesInCompanyAccounts extends BaseEntity {
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
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  currencyID: number;

  @ManyToOne(() => Currency)
  @Field(() => Currency)
  currency: Promise<Currency>;

  @Column({
    type: 'decimal',
    name: 'Amount',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  amount: number;
}

export default InvestorBalancesInCompanyAccounts;
