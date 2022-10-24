const BASE_URL = 'https://pokeapi.co/api/v2';

export const resolvers = {
  Query: {
    allPokemon: async () => {
      const res = await fetch(`${BASE_URL}/pokemon?limit=9`);
      const data = await res.json();
      return data;
    },
  },
  Result: {
    pokemon: async (parent: any) => {
      const res = await fetch(parent.url);
      const data = await res.json();
      return data;
    },
  },
  Pokemon: {
    species: async (parent: any) => {
      const res = await fetch(
        `${BASE_URL}/pokemon-species/${parent.id}`
      );
      const data = await res.json();
      return data;
    },
  },
};
