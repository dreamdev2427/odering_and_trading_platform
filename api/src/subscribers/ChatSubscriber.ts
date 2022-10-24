import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import { pubSub } from 'core/graphql-server';
import { Chat } from 'entities';

@EventSubscriber()
export class ChatSubscriber implements EntitySubscriberInterface<Chat> {
  /**
   * Indicates that this subscriber only listen to Chat events.
   */
  listenTo(): typeof Chat {
    return Chat;
  }

  /**
   * Called after message insertion.
   */
  async afterInsert(event: InsertEvent<Chat>): Promise<void> {
    await pubSub.publish('CHATS', event.entity);
  }
}
