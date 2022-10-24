import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { environment } from 'services/core/helpers';

import AuthService from 'services/core/auth';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

let apiDomain = environment.REACT_APP_GRAPHQL_URI;
// Remove trailing /
apiDomain = apiDomain?.replace(/\/$/, ``);

// todo@aspirin ts types fix, convert to unknown and then convert to ApolloLink
const httpLink = createUploadLink({
  uri: `${apiDomain}/gql`,
}) as unknown as ApolloLink;
const authLink = setContext(async (_, { headers }) => {
  const { token } = AuthService;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a WebSocket link:
const uri = new URL(apiDomain ?? '');

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${uri.host}/gql`,
    connectionParams: async () => {
      const { token } = AuthService;
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  }),
);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
export * from './graphql';
