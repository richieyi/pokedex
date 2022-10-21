import { gql, ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const typeDefs = gql`
  type Sprite {
    front_default: String
  }

  type Pokemon {
    id: ID
    name: String
    sprites: Sprite
  }

  type Query {
    getPokemon: Pokemon
  }
`;

const resolvers = {
  Query: {
    getPokemon: async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon/ditto'
      );
      const data = await res.json();
      return data;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
