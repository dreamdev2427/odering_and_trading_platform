import { ForbiddenError } from 'apollo-server-core';

import { RegisterVoteInput } from 'api/meetings/meeting.types';
import { InvestorSto, VotingOptions, VotingUser } from 'entities';

class Vote {
  stoID: number;

  investorID: number;

  investorSto?: InvestorSto;

  constructor(stoID: number, investorID: number) {
    this.investorID = investorID;
    this.stoID = stoID;
  }

  async canVote({ type, optionID }: RegisterVoteInput): Promise<void> {
    const option = await VotingOptions.findOne(optionID);

    if (!option || (option.isActiveByAdmin == 1 && type !== 0)) {
      throw new ForbiddenError('voting-closed');
    }
    this.investorSto = await InvestorSto.findOne({
      investorID: this.investorID,
      stoID: this.stoID,
    });
  }

  // async deleteExistingVote({ type, optionID, meetingID }: RegisterVoteInput): Promise<void> {
  //   if (type === 1) {
  //     await VotingUser.delete({ votingID: meetingID, userID: this.investorID, votingOptionID: optionID });
  //   } else {
  //     await VotingUser.delete({ votingID: meetingID, userID: this.investorID });
  //   }
  //   not needed - case in process voting, user click submit and after that cant to change a choice
  // }

  async castInvestorVote(data: RegisterVoteInput): Promise<boolean> {
    if (!this.investorSto) {
      return false;
    }

    const option = new VotingUser();
    option.votingID = data.meetingID;
    option.userID = this.investorID;
    option.votingOptionID = data.optionID;
    option.votingOptionValue = data.vote; // data.type !== 0 ? data.vote : 0;
    option.isCastedByInvestor = 1;
    option.votesContributed = this.investorSto?.expectedShares || 0;
    option.investmentContributed = this.investorSto?.expectedInvestment || 0;
    option.nominalInvestmentContributed = this.investorSto?.expectedInvestment || 0;
    await VotingUser.update(option.ID, option);
    return true;
  }

  async castVote(data: RegisterVoteInput): Promise<boolean> {
    await this.canVote(data);
    return this.castInvestorVote(data);
  }
}

export default Vote;
