import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Filters';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';
import { Result } from '../../pokemon-types';
import SortByDropdown from '../SortByDropdown';
import { GET_POKEMON } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';

interface PokedexProps {
  results: Result[];
  count: number;
  next?: string;
}

function Pokedex(props: PokedexProps) {
  const { results, count, next } = props;
  const [loadedPokemon, setLoadedPokemon] =
    useState<Result[]>(results);
  const [nextLink, setNextLink] = useState<string | undefined>(next);
  const [getMorePokemon, { data, loading, error }] =
    useLazyQuery(GET_POKEMON);

  useEffect(() => {
    if (data && !loading && !error) {
      setLoadedPokemon((loadedPokemon) => {
        return [...loadedPokemon, ...data?.getPokemon?.results];
      });
      setNextLink(data?.getPokemon?.next);
    }
  }, [data]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const filteredResults = loadedPokemon?.filter((result: Result) => {
    const nameHasSearchValue = result?.pokemon?.name
      ?.toLowerCase()
      .includes(searchValue);
    const typeHasTypeValue =
      result?.pokemon?.types?.filter((type) =>
        typeFilter ? type?.type?.name === typeFilter : true
      )?.length ?? true;
    const speciesHasSpeciesValue =
      result?.pokemon?.species?.genera?.filter((genera) =>
        speciesFilter ? genera?.genus === speciesFilter : true
      )?.length ?? true;

    return (
      nameHasSearchValue && typeHasTypeValue && speciesHasSpeciesValue
    );
  });

  let pokemonList = filteredResults;
  if (sortBy === 'id asc') {
    pokemonList = filteredResults.sort((a, b) => {
      return Number(a.pokemon.id) - Number(b.pokemon.id);
    });
  } else if (sortBy === 'id desc') {
    pokemonList = filteredResults.sort((a, b) => {
      return Number(b.pokemon.id) - Number(a.pokemon.id);
    });
  } else if (sortBy === 'name asc') {
    pokemonList = filteredResults.sort((a, b) => {
      return a.pokemon.name.localeCompare(b.pokemon.name);
    });
  } else if (sortBy === 'name desc') {
    pokemonList = filteredResults.sort((a, b) => {
      return b.pokemon.name.localeCompare(a.pokemon.name);
    });
  }

  return (
    <div className="container flex flex-col lg:flex-row px-8 lg:justify-center gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-center">Pokédex</h1>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name..."
            className="border border-black rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center text-sm">
          <p>
            {filteredResults.length} of {count} loaded
          </p>
          <button
            onClick={() =>
              getMorePokemon({ variables: { url: nextLink } })
            }
          >
            GET MORE
          </button>
        </div>
        <SortByDropdown setSortBy={setSortBy} />
        <Filters
          results={loadedPokemon}
          setTypeFilter={setTypeFilter}
          setSpeciesFilter={setSpeciesFilter}
        />
        <div>
          {selectedPokemon && (
            <SelectedPokemon selectedPokemon={selectedPokemon} />
          )}
        </div>
      </div>
      <div className="h-[750px] w-[500px] p-4 grid grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto m-auto lg:m-0">
        {filteredResults.length === 0 ? (
          <p>No results found...</p>
        ) : (
          <PokemonList
            pokemonList={pokemonList}
            setSelectedPokemon={setSelectedPokemon}
          />
        )}
      </div>
    </div>
  );
}

export default Pokedex;
