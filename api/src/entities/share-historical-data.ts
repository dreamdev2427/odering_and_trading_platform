import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, Float, GraphQLTimestamp } from 'type-graphql';

@Entity('sharesHistoricalData')
@ObjectType('ShareHistoricalData')
class ShareHistoricalDatas extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  shareTypeID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  stoID: number;

  @Column({
    type: 'decimal',
    precision: 33,
    scale: 16,
    default: '0.0000000000000000',
  })
  @Field(() => Float)
  premiumValue: number;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  @Field(() => GraphQLTimestamp, { nullable: true })
  dateOfChange: Date;
}

export default ShareHistoricalDatas;
