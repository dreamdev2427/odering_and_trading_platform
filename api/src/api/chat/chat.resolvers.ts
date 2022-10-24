import {
  Resolver,
  Query,
  Arg,
  Int,
  Authorized,
  Mutation,
  Ctx,
  Subscription,
  Root,
} from 'type-graphql';
import { FindConditions, In, IsNull } from 'typeorm';

import { JWT_ROLE, Context } from 'core/context';
import { Chat, ExchangeOrder } from 'entities';
import { SENDER_TYPE, RECEIVER_TYPE, CHAT_CONTEXT, CHAT_BETWEEN } from 'entities/chats';
import { fetchChats } from 'services/chat/find';
import { fetchPriceNegotiationList } from 'services/chat/price-negotiation';
import { sendEmailNotification } from 'services/chat/notification';
import { ChatInput, PriceNegotiationListItem } from './chat.types';

@Resolver()
class ChatResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [Chat], {
    description: 'Get all Chats between two sides',
  })
  getChats(
    @Ctx() { user }: Context,
    @Arg('chatBetween', () => CHAT_BETWEEN) chatBetween: CHAT_BETWEEN,
    @Arg('stoID', () => Int, { nullable: true }) stoID?: number,
    @Arg('context', () => CHAT_CONTEXT, { nullable: true }) context?: CHAT_CONTEXT,
    @Arg('contextID', () => Int, { nullable: true }) contextID?: number,
    @Arg('counterpartID', () => Int, { nullable: true }) counterpartID?: number,
  ): Promise<Chat[]> {
    return fetchChats(user.ID, chatBetween, stoID, context, contextID, counterpartID);
  }

  @Authorized(JWT_ROLE.investor)
  @Subscription(() => Chat, {
    topics: 'CHATS',
    description: `Subscription for getting the last Chat record between two sides`,
    filter: ({ payload, context }) => payload.contextReceiverID === context.user.ID,
  })
  async getLastChatRecord(@Root() data: Chat): Promise<Chat> {
    return data;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [PriceNegotiationListItem], {
    description: 'Get Price Negotiation Chat List',
  })
  getPriceNegotiationList(
    @Ctx() { user }: Context,
    @Arg('orderID', () => Int) orderID: number,
  ): Promise<PriceNegotiationListItem[]> {
    return fetchPriceNegotiationList(user.ID, orderID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Int, {
    description: `Query for Getting the Number of Investor's Unread Messages`,
  })
  async getUnreadMessagesCount(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
    @Arg('sender', () => SENDER_TYPE) sender: SENDER_TYPE,
  ): Promise<number> {
    return Chat.count({
      investorID: user.ID,
      stoID,
      isDeleted: false,
      sender,
      receiver: RECEIVER_TYPE.Investor,
      isRead: false,
      context: IsNull(),
    });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Int, {
    description: `Query for Getting the Number of Investor's Unread Messages in Price Negotiation`,
  })
  async getPriceNegotiationUnreadMessagesCount(
    @Ctx() { user }: Context,
    @Arg('context', () => CHAT_CONTEXT) context: CHAT_CONTEXT,
    @Arg('contextID', () => Int) contextID: number,
    @Arg('counterpartID', () => Int, { nullable: true }) counterpartID?: number,
  ): Promise<number> {
    const order = await ExchangeOrder.findOneOrFail({ ID: contextID });
    const orderOwnerID = order.investorID;
    const findConditions: FindConditions<Chat> = {
      contextReceiverID: user.ID,
      isDeleted: false,
      sender: SENDER_TYPE.Investor,
      receiver: RECEIVER_TYPE.Investor,
      isRead: false,
      context,
      contextID,
    };
    if (counterpartID) {
      findConditions.investorID = user.ID === orderOwnerID ? counterpartID : orderOwnerID;
    }
    return Chat.count(findConditions);
  }

  @Authorized(JWT_ROLE.investor, JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Mutation(() => Int, {
    description: 'Mutation for creating a message',
  })
  async messageCreate(@Arg('data', () => ChatInput) data: ChatInput): Promise<number> {
    const message = Chat.create(data);
    const savedMessage = await message.save();
    return savedMessage.ID;
  }

  @Authorized(JWT_ROLE.digishares)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating a message',
  })
  async messageUpdate(
    @Arg('chatID', () => Int) chatID: number,
    @Arg('data', () => ChatInput) data: ChatInput,
  ): Promise<boolean> {
    const chat = await Chat.findOneOrFail({ ID: chatID });
    Chat.merge(chat, data);
    await chat.save();
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating Chats to Seen status',
  })
  async updateChatsToSeen(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
    @Arg('sender', () => SENDER_TYPE) sender: SENDER_TYPE,
  ): Promise<boolean> {
    await Chat.update(
      {
        stoID,
        investorID: user.ID,
        isDeleted: false,
        isRead: false,
        sender,
        receiver: RECEIVER_TYPE.Investor,
      },
      {
        isRead: true,
        dateRead: new Date().toISOString(),
      },
    );
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating Chats to Seen status in Price Negotiation',
  })
  async updatePriceNegotiationChatsToSeen(
    @Ctx() { user }: Context,
    @Arg('context', () => CHAT_CONTEXT) context: CHAT_CONTEXT,
    @Arg('contextID', () => Int) contextID: number,
    @Arg('counterpartID', () => Int) counterpartID: number,
  ): Promise<boolean> {
    const order = await ExchangeOrder.findOneOrFail({ ID: contextID });
    const orderOwnerID = order.investorID;
    const findConditions: FindConditions<Chat> = {
      investorID: user.ID === orderOwnerID ? counterpartID : orderOwnerID,
      contextReceiverID: user.ID,
      isDeleted: false,
      isRead: false,
      sender: SENDER_TYPE.Investor,
      receiver: RECEIVER_TYPE.Investor,
      context,
      contextID,
    };
    await Chat.update(findConditions, {
      isRead: true,
      dateRead: new Date().toISOString(),
    });
    return true;
  }

  @Authorized(JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing one single Message',
  })
  async deleteOneMessage(@Arg('chatID', () => Int) chatID: number): Promise<boolean> {
    const chat = await Chat.findOneOrFail({ ID: chatID });
    chat.isDeleted = true;
    await chat.save();
    return true;
  }

  @Authorized(JWT_ROLE.digishares)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing one single Message Permanently',
  })
  async deleteOneMessagePermanently(@Arg('chatID', () => Int) chatID: number): Promise<boolean> {
    const chat = await Chat.findOneOrFail({ ID: chatID });
    await chat.remove();
    return true;
  }

  @Authorized(JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing Chat History',
  })
  async deleteChatHistory(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('investorID', () => Int) investorID: number,
  ): Promise<boolean> {
    const findConditions: FindConditions<Chat> = {
      stoID,
      investorID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Admin]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Admin]),
    };
    await Chat.update(findConditions, {
      isDeleted: true,
    });
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: `Mutation for removing Customer Support's Chat History`,
  })
  async deleteCustomerSupportChatHistory(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('investorID', () => Int) investorID: number,
  ): Promise<boolean> {
    const findConditions: FindConditions<Chat> = {
      stoID,
      investorID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Platform]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Platform]),
    };
    await Chat.update(findConditions, {
      isDeleted: true,
    });
    return true;
  }

  @Authorized(JWT_ROLE.digishares)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing Chat History Permanently',
  })
  async deleteChatHistoryPermanently(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('investorID', () => Int) investorID: number,
  ): Promise<boolean> {
    await Chat.delete({
      stoID,
      investorID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Admin]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Admin]),
    });
    return true;
  }

  @Authorized(JWT_ROLE.digishares)
  @Mutation(() => Boolean, {
    description: `Mutation for removing Customer Support's Chat History Permanently`,
  })
  async deleteCustomerSupportChatHistoryPermanently(
    @Arg('stoID', () => Int) stoID: number,
    @Arg('investorID', () => Int) investorID: number,
  ): Promise<boolean> {
    await Chat.delete({
      stoID,
      investorID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Platform]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Platform]),
    });
    return true;
  }

  @Authorized(JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing Chat List',
  })
  async deleteChatList(@Arg('stoID', () => Int) stoID: number): Promise<boolean> {
    const findConditions: FindConditions<Chat> = {
      stoID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Admin]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Admin]),
    };
    await Chat.update(findConditions, {
      isDeleted: true,
    });
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: `Mutation for removing Customer Support's Chat List`,
  })
  async deleteCustomerSupportChatList(@Arg('stoID', () => Int) stoID: number): Promise<boolean> {
    const findConditions: FindConditions<Chat> = {
      stoID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Platform]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Platform]),
    };
    await Chat.update(findConditions, {
      isDeleted: true,
    });
    return true;
  }

  @Authorized(JWT_ROLE.digishares)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing Chat List Permanently',
  })
  async deleteChatListPermanently(@Arg('stoID', () => Int) stoID: number): Promise<boolean> {
    await Chat.delete({
      stoID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Admin]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Admin]),
    });
    return true;
  }

  @Authorized(JWT_ROLE.digishares)
  @Mutation(() => Boolean, {
    description: `Mutation for removing Customer Support's Chat List Permanently`,
  })
  async deleteCustomerSupportChatListPermanently(
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<boolean> {
    await Chat.delete({
      stoID,
      sender: In([SENDER_TYPE.Investor, SENDER_TYPE.Platform]),
      receiver: In([RECEIVER_TYPE.Investor, RECEIVER_TYPE.Platform]),
    });
    return true;
  }

  @Authorized(JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: `Mutation for sending an Email Notification to a group of Investors`,
  })
  async sendEmailNotification(
    @Arg('investorIDs', () => [Int]) investorIDs: number[],
    @Arg('senderType', () => SENDER_TYPE) senderType: SENDER_TYPE,
    @Arg('stoID', () => Int) stoID: number,
    @Arg('message', () => String) message: string,
  ): Promise<boolean> {
    return sendEmailNotification(investorIDs, senderType, stoID, message);
  }
}

export default ChatResolvers;
