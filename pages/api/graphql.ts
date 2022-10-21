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

  type Result {
    name: String
    url: String
    sprites: Sprite
  }

  type AllPokemon {
    results: [Result]
    count: Int
  }

  type Query {
    pokemon: Pokemon
    allPokemon: AllPokemon
    allPokemonWithData: [Pokemon]
  }
`;

async function getPokemon(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const resolvers = {
  Query: {
    allPokemonWithData: async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=9'
      );
      const data = await res.json();
      console.log('data', data);

      const arr = [];
      data.results.forEach((result) => {
        const datanew = getPokemon(result.url);
        arr.push(datanew);
      });
      console.log('arr', arr);
      return arr;
    },
    allPokemon: async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=9'
      );
      const data = await res.json();
      return data;
    },
    pokemon: async () => {
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
