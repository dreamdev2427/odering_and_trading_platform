import { MoreThan, In } from 'typeorm';

import { Stos, InvestorSto } from 'entities';

const findRelatedStos = async (investorID: number): Promise<Stos[]> => {
  const investorStos = await InvestorSto.find({
    where: { stoID: MoreThan(0), investorID },
    select: ['stoID'],
  });

  const activeStos = investorStos.map((s) => s.stoID);

  return Stos.find({ ID: In(activeStos) });
};

export default findRelatedStos;
