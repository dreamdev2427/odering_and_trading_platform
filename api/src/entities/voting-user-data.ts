import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Int,Field, ObjectType} from 'type-graphql';

@ObjectType()
@Entity('votinguserdata')
class VotingUserData extends BaseEntity {
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
    name: 'votingid',
  })
  @Field(() => Int)
  votingID: number;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  attendMeeting: number;

  @Column({
    type: 'int',
    name: 'unannounceDecision'
  })
  @Field(() => Int)
  unannouncedDecision: number;

}

export default VotingUserData;
