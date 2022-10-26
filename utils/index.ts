import { Genera, Result, Type } from 'pokemon-types';

export const nameHasSearchValue = (
  pokemonName: string,
  searchValue: string
) => {
  return pokemonName?.toLowerCase().includes(searchValue);
};

export const typesHasTypeFilterValue = (
  pokemonTypes: Type[],
  typeFilter: string
) => {
  return (
    pokemonTypes?.filter((type) =>
      typeFilter ? type?.type?.name === typeFilter : true
    )?.length ?? true
  );
};

export const speciesHasSpeciesFilterValue = (
  pokemonSpecies: Genera[],
  speciesFilter: string
) => {
  return (
    pokemonSpecies?.filter((genera) =>
      speciesFilter ? genera?.genus === speciesFilter : true
    )?.length ?? true
  );
};

export const getFilteredResults = (
  pokemonList: Result[],
  searchValue: string,
  typeFilter: string,
  speciesFilter: string
) => {
  return pokemonList?.filter((result: Result) => {
    const {
      pokemon: {
        name,
        types,
        species: { genera },
      },
    } = result;

    return (
      nameHasSearchValue(name, searchValue) &&
      typesHasTypeFilterValue(types, typeFilter) &&
      speciesHasSpeciesFilterValue(genera, speciesFilter)
    );
  });
};

export const getSortedResults = (
  sortBy: string,
  filteredResults: Result[]
) => {
  if (sortBy === 'id asc') {
    return filteredResults.sort((a, b) => {
      return Number(a.pokemon.id) - Number(b.pokemon.id);
    });
  } else if (sortBy === 'id desc') {
    return filteredResults.sort((a, b) => {
      return Number(b.pokemon.id) - Number(a.pokemon.id);
    });
  } else if (sortBy === 'name asc') {
    return filteredResults.sort((a, b) => {
      return a.pokemon.name.localeCompare(b.pokemon.name);
    });
  } else if (sortBy === 'name desc') {
    return filteredResults.sort((a, b) => {
      return b.pokemon.name.localeCompare(a.pokemon.name);
    });
  }

  return [];
};
