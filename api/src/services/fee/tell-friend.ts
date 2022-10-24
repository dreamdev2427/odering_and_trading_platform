import { ValidationError } from 'apollo-server-core';
import { v4 as uuidv4 } from 'uuid';

import { Investor } from 'entities';

const generateInvitationLink = async (investorID: number): Promise<string> => {
  try {
    const investor = await Investor.findOneOrFail({ ID: investorID });
    if (!investor.brokerID) {
      investor.brokerID = uuidv4();
      await investor.save();
    }
    return `${process.env.FRONTEND_URL}/sign-up?brokerID=${investor.brokerID}`;
  } catch (error) {
    throw new ValidationError('Generating Invitation Link Failed');
  }
};

export { generateInvitationLink };
