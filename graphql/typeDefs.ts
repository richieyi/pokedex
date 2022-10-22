import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    allPokemon: AllPokemon!
  }

  type AllPokemon {
    results: [Result!]!
    count: Int!
  }

  type Result {
    url: String!
    pokemon: Pokemon!
  }

  type Pokemon {
    id: ID!
    name: String!
    sprites: Sprite!
  }

  type Sprite {
    front_default: String!
  }
`;
