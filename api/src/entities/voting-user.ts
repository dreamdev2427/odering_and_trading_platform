import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Int, Field } from 'type-graphql';

import { VotingOptions } from '.';

@ObjectType()
@Entity('votinguser')
class VotingUser extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  @Field(() => Int)
  ID: number;

  @Column({
    type: 'int',
    name: 'votingid',
  })
  @Field(() => Int)
  votingID: number;

  @Column({
    type: 'int',
    name: 'userid',
  })
  @Field(() => Int)
  userID: number;

  @Column({
    type: 'int',
    name: 'votingoptionsid',
  })
  @Field(() => Int)
  votingOptionID: number;

  @ManyToOne(() => VotingOptions, (option) => option.documents)
  @JoinColumn({ name: 'votingoptionsid' })
  @Field(() => VotingOptions)
  votingOption: Promise<VotingOptions>;

  @Column({
    type: 'int',
    name: 'votingoptionsvalue',
  })
  @Field(() => Int)
  votingOptionValue: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  votesContributed: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  isCastedByInvestor: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  investmentContributed: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Int)
  nominalInvestmentContributed: number;
}

export default VotingUser;
