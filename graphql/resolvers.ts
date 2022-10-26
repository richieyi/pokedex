import { Pokemon, Result } from 'pokemon-types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const resolvers = {
  Query: {
    getPokemon: async (_: undefined, args: { url: string }) => {
      const res = args.url
        ? await fetch(args.url)
        : await fetch(`${BASE_URL}/pokemon?limit=30`);
      const data = await res.json();
      return data;
    },
  },
  Result: {
    pokemon: async (parent: Result) => {
      const res = await fetch(parent.url);
      const data = await res.json();
      return data;
    },
  },
  Pokemon: {
    species: async (parent: Pokemon) => {
      const res = await fetch(
        `${BASE_URL}/pokemon-species/${parent.id}`
      );
      const data = await res.json();
      return data;
    },
  },
};
