import { ValidationError } from 'apollo-server-core';

import Email from 'services/email';
import { Stos, Inbox } from 'entities';
import { InboxInput } from 'api/inbox.types';

const createInbox = async (
  investorID: number,
  { stoID, content, title }: InboxInput,
): Promise<number> => {
  const sto = await Stos.findOne(stoID);
  if (!sto) {
    throw new ValidationError('Access denied');
  }
  const inbox = Inbox.create({
    investorID,
    date: new Date().toISOString().substring(0, 10),
    details: content,
    title,
    stoID,
  });
  await inbox.save();

  const email = new Email(sto);
  await email.emailFromInvestor(title, content);

  return inbox.ID;
};

export default createInbox;
