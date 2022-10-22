export const resolvers = {
  Query: {
    allPokemon: async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=36'
      );
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
};
