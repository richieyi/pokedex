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
    stats: [Stat!]!
    types: [Type!]!
  }

  type Sprite {
    front_default: String!
  }

  type Stat {
    base_stat: Int!
    stat: StatType!
  }

  type StatType {
    name: String!
  }

  type Type {
    type: ElementType!
  }

  type ElementType {
    name: String!
  }
`;
