import { GetChatsQuery } from '../graphql';

export type ChatItem = GetChatsQuery['getChats'][0];
