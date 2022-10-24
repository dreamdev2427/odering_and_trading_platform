import { Raw, IsNull, Not } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { Voting } from 'entities';

@ObjectType()
export class AllMeeting {
  @Field(() => [Voting])
  past: Voting[];

  @Field(() => [Voting])
  current: Voting[];

  @Field(() => [Voting])
  future: Voting[];
}

export const allMeeting = async (investorID: number, stoID: number): Promise<AllMeeting> => {
  // const share = await Shares.findOneOrFail({ investorID, stoID, shares: MoreThan(0) });
  // need to discus about public meeting and avaliable for investors which no have shares to view
  // current meetings
  const past = await Voting.find({
    where: {
      stoID: stoID < 0 ? Not(IsNull()) : stoID,
      closeDate: Raw((alias) => `${alias} < NOW()`)
    },
    order: { closeDate: 'DESC' },
  });

  const current = await Voting.find({
    where: [
      {
        stoID: stoID < 0 ? Not(IsNull()) : stoID,
        closeDate: Raw((alias) => `${alias} >= NOW()`),
        openDate: Raw((alias) => `${alias} <= NOW()`),
      },
    ],
    order: { closeDate: 'DESC' },
  });
  const future = await Voting.find({
    where: { stoID: stoID < 0 ? Not(IsNull()) : stoID, openDate: Raw((alias) => `${alias} > NOW()`) },
    order: { closeDate: 'DESC' },
  });

  return {
    past,
    current,
    future,
  };
};
