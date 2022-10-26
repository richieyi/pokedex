import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Filters';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';
import { Pokemon, Result } from '../../pokemon-types';
import SortByDropdown from '../SortByDropdown';
import { GET_POKEMON } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { getFilteredResults, getSortedResults } from 'utils';

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
      // BUG: Prevent spreading next data set without new pokemon
      if (data?.getPokemon?.next !== nextLink) {
        setLoadedPokemon((loadedPokemon) => {
          return [...loadedPokemon, ...data?.getPokemon?.results];
        });
        setNextLink(data?.getPokemon?.next);
      }
    }
  }, [loading]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] =
    useState<Pokemon | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('id asc');

  const filteredResults = getFilteredResults(
    loadedPokemon,
    searchValue,
    typeFilter,
    speciesFilter
  );

  const sortedList = getSortedResults(sortBy, filteredResults);

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
        <div className="flex flex-col">
          <p className="text-sm text-center">
            {loadedPokemon.length} of {count} loaded
          </p>
          <button
            onClick={() =>
              getMorePokemon({ variables: { url: nextLink } })
            }
            disabled={loading}
            className="border border-black disabled:hover:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More Pokemon'}
          </button>
        </div>
        <SortByDropdown setSortBy={setSortBy} />
        <Filters
          loadedPokemon={loadedPokemon}
          setTypeFilter={setTypeFilter}
          setSpeciesFilter={setSpeciesFilter}
        />
        {selectedPokemon && (
          <SelectedPokemon selectedPokemon={selectedPokemon} />
        )}
      </div>
      <PokemonList
        pokemonList={sortedList}
        setSelectedPokemon={setSelectedPokemon}
        filteredResultsLength={filteredResults?.length}
      />
    </div>
  );
}

export default Pokedex;
