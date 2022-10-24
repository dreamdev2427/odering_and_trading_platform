import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { EntityTypes } from 'entities';
import { PAYMENT_METHODS } from './constants';
import InvestingEntityMember from './investing-entity-member';

@Entity()
@ObjectType()
class InvestingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investorID: number;

  @OneToMany(() => InvestingEntityMember, (member) => member.entity, { onDelete: 'CASCADE' })
  @Field(() => [InvestingEntityMember])
  members: Promise<InvestingEntityMember[]>;

  @Column({
    type: 'int',
    name: 'typeID',
  })
  @Field(() => Int)
  typeID: number;

  @ManyToOne(() => EntityTypes, { onDelete: 'CASCADE' })
  @Field(() => EntityTypes)
  type: Promise<EntityTypes>;

  @Column({
    type: 'varchar',
    length: 9,
  })
  @Field()
  taxId: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  nickname: string;

  @Column({
    type: 'tinyint',
    width: 1,
  })
  @Field(() => Boolean)
  accredited: boolean;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field(() => PAYMENT_METHODS)
  paymentMethod: PAYMENT_METHODS;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  city: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  postalCode: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  country: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  state: string;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  isApprovedByAdmin: number;

  // @Column({
  //   type: 'simple-json',
  // })
  // @Field(() => InvestingEntityPaymentDetails)
  // ach: InvestingEntityPaymentDetails;
  //
  // @Column({
  //   type: 'simple-json',
  // })
  // @Field(() => InvestingEntityPaymentDetails)
  // wire: InvestingEntityPaymentDetails;
}

export default InvestingEntity;
