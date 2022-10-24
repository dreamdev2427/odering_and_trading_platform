import { Resolver, Query, Arg, Authorized, Int, Mutation, Ctx } from 'type-graphql';

import { Context, JWT_ROLE } from 'core/context';
import { VotingUser, Voting, VotingUserData, VotingOptions, VotingDocuments } from 'entities';
import { AllMeeting, allMeeting } from 'services/voting/all';
import { poll, Poll } from 'services/voting/poll';
import Vote from 'services/voting/vote';
import { RegisterVoteInput } from './meeting.types';

@Resolver()
class MeetingResolvers {
  @Authorized()
  @Mutation(() => Boolean, { description: 'Mutation for register investor vote' })
  investorRegisterVote(
    @Ctx() { user }: Context,
    @Arg('data', () => RegisterVoteInput) data: RegisterVoteInput,
  ): Promise<boolean> {
    const vote = new Vote(user.stoID, user.ID);
    return vote.castVote(data);
  }

  @Authorized()
  @Query(() => [VotingUser], { description: 'Get investor selection' })
  investorUserVoting(
    @Ctx() { user }: Context,
    @Arg('votingID', () => Int) votingID: number,
  ): Promise<VotingUser[]> {
    return VotingUser.find({ userID: user.ID, votingID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => AllMeeting, {
    description: 'Get all meetings',
  })
  investorAllMeeting(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<AllMeeting> {
    return allMeeting(user.ID, stoID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Voting, {
    description: 'Get meeting data',
    nullable: true,
  })
  investorMeeting(@Arg('meetingID', () => Int) meetingID: number): Promise<Voting | undefined> {
    return Voting.findOne(meetingID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Poll, {
    description: 'Get poll statistics data',
  })
  investorPoll(
    @Ctx() { user }: Context,
    @Arg('meetingID', () => Int) meetingID: number,
  ): Promise<Poll> {
    return poll(meetingID, user.stoID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => VotingUserData, {
    description: 'Get voting user data',
    nullable: true,
  })
  investorVotingUserData(
    @Ctx() { user }: Context,
    @Arg('votingID', () => Int) votingID: number,
  ): Promise<VotingUserData | undefined> {
    return VotingUserData.findOne({ votingID, investorID: user.ID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [VotingOptions], {
    description: 'Get voting options',
  })
  investorVotingOptions(@Arg('votingID', () => Int) votingID: number): Promise<VotingOptions[]> {
    return VotingOptions.find({ votingID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => VotingDocuments, {
    description: 'Get voting document',
    nullable: true,
  })
  investorVotingDocument(
    @Arg('documentID', () => Int) documentID: number,
  ): Promise<VotingDocuments | undefined> {
    return VotingDocuments.findOne(documentID);
  }
}

export default MeetingResolvers;
