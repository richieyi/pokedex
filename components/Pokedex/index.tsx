import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Filters';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';
import { Pokemon, Result } from '../../pokemon-types';
import SortByDropdown from '../SortByDropdown';
import BarChart from '../BarChart';
import { GET_POKEMON } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';
import {
  getFilteredResults,
  getLoadButtonText,
  getSortedResults,
  getSpecies,
  getTypes,
} from 'utils';
import LoadMore from '../LoadMore';

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
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(
    loadedPokemon[0].pokemon
  );
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
    <div className="bg-white flex flex-col gap-16 text-sm lg:text-base border rounded p-8 shadow-xl">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-4 max-w-[150px] lg:max-w-none">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-center">Pokédex</h1>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name..."
              className="border border-black rounded px-4 py-2 text-sm shadow-lg"
            />
          </div>
          {selectedPokemon && (
            <SelectedPokemon selectedPokemon={selectedPokemon} />
          )}
          <SortByDropdown setSortBy={setSortBy} />
          <Filters
            typesKeys={typesKeys}
            speciesKeys={speciesKeys}
            setTypeFilter={setTypeFilter}
            setSpeciesFilter={setSpeciesFilter}
          />
          <LoadMore
            loadedPokemon={loadedPokemon}
            count={count}
            getMorePokemon={getMorePokemon}
            nextLink={nextLink}
            loading={loading}
          />
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
