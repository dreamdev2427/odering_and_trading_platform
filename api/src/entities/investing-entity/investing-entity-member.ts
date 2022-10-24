import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { InvestingEntity } from 'entities';
import { INVESTING_MEMBER_ROLES } from './constants';

@Entity()
@ObjectType()
class InvestingEntityMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investorID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  entityID: number;

  @ManyToOne(() => InvestingEntity, (entity) => entity.members, { onDelete: 'CASCADE' })
  entity: Promise<InvestingEntity>;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field(() => INVESTING_MEMBER_ROLES)
  role: INVESTING_MEMBER_ROLES;

  @Column({
    type: 'tinyint',
    width: 1,
  })
  @Field(() => Boolean)
  signatory: boolean;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  email: string;
}

export default InvestingEntityMember;
