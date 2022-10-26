import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  credentials: 'same-origin',
  cache: new InMemoryCache(),
});

export default apolloClient;
