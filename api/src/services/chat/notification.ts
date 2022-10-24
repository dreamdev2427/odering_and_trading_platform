import { FindConditions, IsNull, MoreThan, LessThan, FindOperator } from 'typeorm';
import moment from 'moment';
import schedule from 'node-schedule';

import Email from 'services/email';
import { Chat, Stos } from 'entities';
import { SENDER_TYPE, RECEIVER_TYPE } from 'entities/chats';
import { scheduledEmailNotificationTimer } from 'core/feature-flags-checkers';

export const MoreThanDate = (date: Date): FindOperator<string> =>
  MoreThan(moment(date).format('YYYY-MM-DD HH:MM:SS'));
export const LessThanDate = (date: Date): FindOperator<string> =>
  LessThan(moment(date).format('YYYY-MM-DD HH:MM:SS'));

export const sendEmailNotification = async (
  investorIDs: number[],
  senderType: SENDER_TYPE,
  stoID: number,
  message: string,
): Promise<boolean> => {
  const sto = await Stos.findOneOrFail({ ID: stoID });
  let sender = '';
  if (senderType === SENDER_TYPE.Admin) {
    sender = `Admins of ${sto.title}`;
  }
  if (senderType === SENDER_TYPE.Platform) {
    sender = `Customer Support`;
  }
  const email = new Email(sto);
  await email.sendToAllNotificationEmail(investorIDs, sender, message);
  return true;
};

/*
export const sendScheduledEmailNotification = async (savedMessage: Chat): Promise<boolean> => {
  const timer = await scheduledEmailNotificationTimer();
  const scheduledDate = moment(savedMessage.dateSent).add(timer, 'm').toDate();
  schedule.scheduleJob(scheduledDate, async () => {
    const findConditions: FindConditions<Chat> = { isDeleted: false };
    if (
      savedMessage.sender === SENDER_TYPE.Investor &&
      savedMessage.receiver === RECEIVER_TYPE.Admin
    ) {
      findConditions.sender = SENDER_TYPE.Admin;
      findConditions.receiver = RECEIVER_TYPE.Investor;
      findConditions.investorID = savedMessage.investorID;
      findConditions.stoID = savedMessage.stoID;
      findConditions.context = IsNull();
      findConditions.dateSent = MoreThanDate(savedMessage.dateSent);
    }
    if (
      savedMessage.sender === SENDER_TYPE.Investor &&
      savedMessage.receiver === RECEIVER_TYPE.Platform
    ) {
      findConditions.sender = SENDER_TYPE.Platform;
      findConditions.receiver = RECEIVER_TYPE.Investor;
      findConditions.investorID = savedMessage.investorID;
      findConditions.context = IsNull();
      findConditions.dateSent = MoreThanDate(savedMessage.dateSent);
    }
    const count = await Chat.count(findConditions);
    if (!count) {
      const sto = await Stos.findOneOrFail({ ID: savedMessage.stoID });
      const email = new Email(sto);
      await email.notificationEmailForAdmin(savedMessage.investorID);
    }
  });
  return true;
};
*/

export const scheduledEmailNotification = async (): Promise<boolean> => {
  const timer = await scheduledEmailNotificationTimer();
  schedule.scheduleJob(`*/${timer} * * * *`, async () => {
    const dateFrom = moment().subtract(timer, 'm').toDate();
    const findConditions: FindConditions<Chat> = {
      isDeleted: false,
      context: IsNull(),
      dateSent: MoreThanDate(dateFrom),
    };
    const chats = await Chat.find(findConditions);
    for (let i = 0; i < chats.length - 1; i++) {
      const outer = chats[i];
      const outerNext = chats[i + 1];
      let sender = '';
      let sendEmail = true;
      if (outer.sender === SENDER_TYPE.Investor && outer.receiver === RECEIVER_TYPE.Admin) {
        if (
          outer.sender === outerNext.sender &&
          outer.receiver === outerNext.receiver &&
          outer.investorID === outerNext.investorID &&
          outer.stoID === outerNext.stoID &&
          i !== chats.length - 2
        ) {
          continue;
        }
        for (let j = i + 1; j < chats.length; j++) {
          const inner = chats[j];
          if (
            inner.sender === SENDER_TYPE.Admin &&
            inner.receiver === RECEIVER_TYPE.Investor &&
            inner.investorID === outer.investorID &&
            inner.stoID === outer.stoID
          ) {
            sendEmail = false;
            break;
          }
        }
      }
      if (outer.sender === SENDER_TYPE.Investor && outer.receiver === RECEIVER_TYPE.Platform) {
        if (
          outer.sender === outerNext.sender &&
          outer.receiver === outerNext.receiver &&
          outer.investorID === outerNext.investorID &&
          i !== chats.length - 2
        ) {
          continue;
        }
        for (let j = i + 1; j < chats.length; j++) {
          const inner = chats[j];
          if (
            inner.sender === SENDER_TYPE.Platform &&
            inner.receiver === RECEIVER_TYPE.Investor &&
            inner.investorID === outer.investorID
          ) {
            sendEmail = false;
            break;
          }
        }
      }
      if (outer.sender === SENDER_TYPE.Admin && outer.receiver === RECEIVER_TYPE.Investor) {
        if (
          outer.sender === outerNext.sender &&
          outer.receiver === outerNext.receiver &&
          outer.investorID === outerNext.investorID &&
          outer.stoID === outerNext.stoID &&
          i !== chats.length - 2
        ) {
          continue;
        }
        for (let j = i + 1; j < chats.length; j++) {
          const inner = chats[j];
          if (
            inner.sender === SENDER_TYPE.Investor &&
            inner.receiver === RECEIVER_TYPE.Admin &&
            inner.investorID === outer.investorID &&
            inner.stoID === outer.stoID
          ) {
            sendEmail = false;
            break;
          }
        }
        sender = `Admins of `;
      }
      if (outer.sender === SENDER_TYPE.Platform && outer.receiver === RECEIVER_TYPE.Investor) {
        if (
          outer.sender === outerNext.sender &&
          outer.receiver === outerNext.receiver &&
          outer.investorID === outerNext.investorID &&
          i !== chats.length - 2
        ) {
          continue;
        }
        for (let j = i + 1; j < chats.length; j++) {
          const inner = chats[j];
          if (
            inner.sender === SENDER_TYPE.Investor &&
            inner.receiver === RECEIVER_TYPE.Platform &&
            inner.investorID === outer.investorID
          ) {
            sendEmail = false;
            break;
          }
        }
        sender = `Customer Support`;
      }
      if (sendEmail) {
        const sto = await Stos.findOneOrFail({ ID: outer.stoID });
        const email = new Email(sto);
        if (sender) {
          if (sender == `Admins of `) {
            sender += sto.title;
          }
          await email.notificationEmailForInvestor(outer.investorID, sender);
        } else {
          await email.notificationEmailForAdmin(outer.investorID);
        }
      }
    }
  });
  return true;
};
