import { ApolloClient, InMemoryCache, HttpLink, split, type ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { getNetworkConfig } from './networkConfig';

/**
 * Apollo Client configuration for INTUITION GraphQL API
 *
 * Connects to the INTUITION L3 subgraph to query atoms, triples, deposits, and positions.
 * Supports dynamic network switching between Testnet and Mainnet.
 *
 * Supports:
 * - HTTP for queries and mutations
 * - WebSocket for subscriptions (real-time updates)
 * - Dynamic network configuration (Testnet/Mainnet)
 */

// Get current network configuration
const networkConfig = getNetworkConfig();
const GRAPHQL_HTTP_ENDPOINT = networkConfig.graphqlHttp;
const GRAPHQL_WS_ENDPOINT = networkConfig.graphqlWs;

// HTTP Link for queries and mutations
const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_ENDPOINT,
});

// WebSocket Link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS_ENDPOINT,
    // Reconnection settings
    retryAttempts: 5,
    shouldRetry: () => true,
    // Lazy connection - only connect when subscription is active
    lazy: true,
    // Connection callbacks - errors only
    on: {
      error: (err) => console.error('[Apollo] WebSocket error:', err),
    },
  })
);

// Split link: use WebSocket for subscriptions, HTTP for everything else
// Type assertion needed due to multiple @apollo/client versions in monorepo
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as unknown as ApolloLink,
  httpLink
);

/**
 * Apollo Client instance with in-memory cache
 * - Uses split link for HTTP queries/mutations and WebSocket subscriptions
 * - Cache policy: cache-and-network for best UX
 */
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Cache triples by their ID
          triples: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
          // Cache atoms by their term_id
          atoms: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
          // Cache deposits
          deposits: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
          // Cache positions
          positions: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
