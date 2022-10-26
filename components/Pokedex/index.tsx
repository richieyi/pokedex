import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Filters';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';
import { Genera, Pokemon, Result, Type } from '../../pokemon-types';
import SortByDropdown from '../SortByDropdown';
import BarChart from '../BarChart';
import { GET_POKEMON } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';
import {
  getFilteredResults,
  getSortedResults,
  getSpecies,
  getTypes,
} from 'utils';

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

  const typesMapped = getTypes(loadedPokemon);
  const typesKeys = Object.keys(typesMapped);
  const typesMappedForData = Object.entries(typesMapped).map(
    (key) => ({
      name: key[0],
      count: key[1],
    })
  );

  const speciesMapped = getSpecies(loadedPokemon);
  const speciesKeys = Object.keys(speciesMapped);

  return (
    <div className="flex flex-col gap-16 text-sm lg:text-base">
      <div className="flex flex-row px-8 gap-4">
        <div className="flex flex-col gap-4 max-w-[150px] lg:max-w-[300px]">
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
            typesKeys={typesKeys}
            speciesKeys={speciesKeys}
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
      <BarChart data={typesMappedForData} />
    </div>
  );
}

export default Pokedex;
