import { ValidationError } from 'apollo-server-core';

import { findMany } from 'core/mysql';
import { PriceNegotiationListItem } from 'api/chat/chat.types';
import { ExchangeOrder } from 'entities';
import { CHAT_CONTEXT, RECEIVER_TYPE, SENDER_TYPE } from 'entities/chats';

export const fetchPriceNegotiationList = async (
  investorID: number,
  orderID: number,
): Promise<PriceNegotiationListItem[]> => {
  try {
    const order = await ExchangeOrder.findOneOrFail({ ID: orderID });
    const orderOwnerID = order.investorID;
    if (investorID !== orderOwnerID) {
      throw new ValidationError(`Unauthorized Access`);
    }
    const sql = `
      SELECT A.investorID AS counterpartID, A.contextID AS orderID, 
      A.contextReceiverID AS orderOwnerID, A.isRead, A.dateRead, 
      DATE_FORMAT(A.dateSent,'%M %d %Y %H:%i:%s') AS formattedDateSent, 
      CONCAT(C.FirstName, ' ', C.LastName) AS counterpartFullName 
      FROM chats A INNER JOIN investor C ON A.investorID = C.ID WHERE A.isDeleted = 0 
      AND A.sender = ? AND A.receiver = ? 
      AND A.context = ? AND A.contextID = ? AND A.contextReceiverID = ? 
      AND A.dateSent = (SELECT MAX(B.dateSent) FROM chats B WHERE A.investorID = B.investorID 
      AND B.context = ?)
    `;
    return await findMany<PriceNegotiationListItem>(sql, [
      SENDER_TYPE.Investor,
      RECEIVER_TYPE.Investor,
      CHAT_CONTEXT.ExchangeOrder,
      orderID,
      orderOwnerID,
      CHAT_CONTEXT.ExchangeOrder,
    ]);
  } catch (error) {
    throw new ValidationError(`${error} - Error Occurred in fetchPriceNegotiationList`);
  }
};
