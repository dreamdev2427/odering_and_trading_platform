import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Float, Int, ObjectType, GraphQLTimestamp } from 'type-graphql';

@Entity('shares_transfer_history')
@ObjectType()
class SharesTransferHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
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
  adminID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  shareTypeID: number;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: '0.000',
  })
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Field()
  type: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  token?: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => GraphQLTimestamp)
  createdAt: Date;
}

export default SharesTransferHistory;
