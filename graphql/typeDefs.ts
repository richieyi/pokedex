import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    getPokemon(url: String): GetPokemon!
  }

  type GetPokemon {
    count: Int!
    next: String
    previous: String
    results: [Result!]!
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
    species: Species!
  }

  type Species {
    genera: [Genera!]!
  }

  type Genera {
    genus: String!
    language: Language!
  }

  type Language {
    name: String!
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
