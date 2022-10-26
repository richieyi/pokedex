import {
  Genera,
  Result,
  SpeciesHash,
  Type,
  TypesHash,
} from 'pokemon-types';

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
  const copy = [...filteredResults];
  if (sortBy === 'id asc') {
    return copy.sort((a, b) => {
      return Number(a.pokemon.id) - Number(b.pokemon.id);
    });
  } else if (sortBy === 'id desc') {
    return copy.sort((a, b) => {
      return Number(b.pokemon.id) - Number(a.pokemon.id);
    });
  } else if (sortBy === 'name asc') {
    return copy.sort((a, b) => {
      return a.pokemon.name.localeCompare(b.pokemon.name);
    });
  } else if (sortBy === 'name desc') {
    return copy.sort((a, b) => {
      return b.pokemon.name.localeCompare(a.pokemon.name);
    });
  }

  return [];
};

export const getTypes = (loadedPokemon: Result[]) => {
  const typesHash: TypesHash = {};

  loadedPokemon.map((result: Result) => {
    const { types } = result.pokemon;
    types.forEach((type: Type) => {
      const elementName = type.type.name;

      if (typesHash[elementName] !== undefined) {
        typesHash[elementName] += 1;
      } else {
        typesHash[elementName] = 1;
      }
    });
  });

  return typesHash;
};

export const getSpecies = (loadedPokemon: Result[]) => {
  const speciesHash: SpeciesHash = {};

  loadedPokemon.map((result: Result) => {
    const { genera } = result.pokemon.species;
    genera.forEach((genera: Genera) => {
      const { genus, language } = genera;

      if (language.name === 'en') {
        if (speciesHash[genus] !== undefined) {
          speciesHash[genus] += 1;
        } else {
          speciesHash[genus] = 1;
        }
      }
    });
  });

  return speciesHash;
};

export const getLoadButtonText = (
  loading: boolean,
  nextLink: string | undefined
) => {
  if (loading) {
    return 'Loading...';
  } else if (!nextLink) {
    return 'All data loaded';
  }

  return 'Load more Pokemon';
};
