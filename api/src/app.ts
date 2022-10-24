import 'reflect-metadata';

import GraphqlServer from 'core/graphql-server';
import resolvers from 'api';
import registerWebhooks from 'webhooks';

(async () => {
  const server = new GraphqlServer();

  registerWebhooks(server);

  await server.start(resolvers);
})();
