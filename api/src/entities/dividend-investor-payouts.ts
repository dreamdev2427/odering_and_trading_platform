import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, Float, GraphQLTimestamp } from 'type-graphql';

@ObjectType('DividendInvestorPayout')
@Entity('DividendInvestorPayouts')
class DividendInvestorPayouts extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'investorId',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
    name: 'payoutId',
  })
  @Field(() => Int)
  payoutID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  investorShares: number;

  @Column({
    type: 'datetime',
  })
  @Field(() => GraphQLTimestamp)
  lastUpdatedAt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field()
  status: string;
}

export default DividendInvestorPayouts;
