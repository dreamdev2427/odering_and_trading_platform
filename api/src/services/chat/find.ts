import { FindConditions, In, IsNull } from 'typeorm';
import { ValidationError } from 'apollo-server-core';

import { Chat, ExchangeOrder } from 'entities';
import { SENDER_TYPE, RECEIVER_TYPE, CHAT_CONTEXT, CHAT_BETWEEN } from 'entities/chats';

export const fetchChats = async (
  investorID: number,
  chatBetween: CHAT_BETWEEN,
  stoID?: number,
  context?: CHAT_CONTEXT,
  contextID?: number,
  counterpartID?: number,
): Promise<Chat[]> => {
  const findConditions: FindConditions<Chat> = { isDeleted: false };
  switch (chatBetween) {
    case CHAT_BETWEEN.InvestorAdmin: {
      findConditions.investorID = investorID;
      findConditions.stoID = stoID;
      findConditions.sender = In([SENDER_TYPE.Investor, SENDER_TYPE.Admin]);
      findConditions.receiver = In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Admin]);
      findConditions.context = IsNull();
      break;
    }
    case CHAT_BETWEEN.InvestorPlatform: {
      findConditions.investorID = investorID;
      findConditions.sender = In([SENDER_TYPE.Investor, SENDER_TYPE.Platform]);
      findConditions.receiver = In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Platform]);
      findConditions.context = IsNull();
      break;
    }
    case CHAT_BETWEEN.InvestorInvestor: {
      const order = await ExchangeOrder.findOneOrFail({ ID: contextID });
      const orderOwnerID = order.investorID;
      if (investorID !== orderOwnerID && investorID !== counterpartID) {
        throw new ValidationError(`Unauthorized Access`);
      }
      findConditions.context = context;
      findConditions.contextID = contextID;
      findConditions.sender = SENDER_TYPE.Investor;
      findConditions.receiver = RECEIVER_TYPE.Investor;
      if (counterpartID) {
        findConditions.investorID = In([orderOwnerID, counterpartID]);
        findConditions.contextReceiverID = In([orderOwnerID, counterpartID]);
      }
      break;
    }
    default: {
      throw new ValidationError(`Invalid Argument : ${chatBetween}`);
    }
  }
  return Chat.find(findConditions);
};
