import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Ctx, Field, Int, ObjectType } from 'type-graphql';

import { Context } from '../core/context';
import { VotingDocuments, VotingUser } from '.';

@ObjectType()
class VotingUserStatistic {
  @Field(() => Int)
  votesYes: number;

  @Field(() => Int)
  votesNo: number;

  @Field(() => Int)
  votesAbstention: number;

  @Field(() => Int)
  count: number;
}

@ObjectType('VotingOption')
@Entity('votingoptions')
class VotingOptions extends BaseEntity {
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
    type: 'varchar',
    length: 1000,
    name: 'optiontxt',
  })
  @Field()
  optionTxt: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  @Field({ nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 4000,
    name: 'CompanyComments',
  })
  @Field()
  companyComments: string;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
  })
  @Field(() => Int)
  isActiveByAdmin: number;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
  })
  isItemCurrentlyDiscussing: number;

  @OneToMany(() => VotingDocuments, (document) => document.votingOption)
  @Field(() => [VotingDocuments])
  documents: Promise<VotingDocuments[]>;

  @Field(() => VotingUser, { nullable: true })
  userVotedOption(@Ctx() { user }: Context): Promise<VotingUser | undefined> {
    return VotingUser.findOne({ userID: user.ID, votingID: this.votingID });
  }

  @Field(() => VotingUserStatistic)
  async votingUserStatistic(): Promise<VotingUserStatistic> {
    const votings = await VotingUser.find({ votingOptionID: this.ID });

    const percentVotes = (type: number) => {
      const countType = votings.filter((elem) => elem.votingOptionValue === type).length;
      return votings.length ? Number((countType / votings.length).toFixed(2)) * 100 : 0;
    };
    return {
      votesYes: percentVotes(1),
      votesNo: percentVotes(2),
      votesAbstention: percentVotes(3),
      count: votings.length,
    };
  }
}

export default VotingOptions;
