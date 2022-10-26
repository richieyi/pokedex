import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Filters';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';
import { Pokemon, Result } from '../../pokemon-types';
import SortByDropdown from '../SortByDropdown';
import BarChart from '../BarChart';
import { GET_POKEMON } from 'graphql/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  getFilteredResults,
  getSortedResults,
  getSpecies,
  getTypes,
} from 'utils';
import LoadMore from '../LoadMore';

function Pokedex() {
  const {
    data: initialData,
    loading: initialLoading,
    error: initialError,
  } = useQuery(GET_POKEMON);
  const [getMorePokemon, { data, loading, error }] =
    useLazyQuery(GET_POKEMON);

  const [loadedPokemon, setLoadedPokemon] = useState<Result[]>([]);
  const [nextLink, setNextLink] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] =
    useState<Pokemon | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('id asc');

  useEffect(() => {
    if (initialData && !initialLoading && !initialError) {
      setLoadedPokemon(initialData?.getPokemon?.results);
      setNextLink(initialData?.getPokemon?.next);
      setSelectedPokemon(
        initialData?.getPokemon?.results?.[0]?.pokemon
      );
    }
  }, [initialLoading]);

  useEffect(() => {
    if (data && !loading && !error) {
      if (data?.getPokemon?.next !== nextLink) {
        setLoadedPokemon((loadedPokemon) => {
          return [...loadedPokemon, ...data?.getPokemon?.results];
        });
        setNextLink(data?.getPokemon?.next);
      }
    }
  }, [loading]);

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

  if (initialLoading) return <p>Loading...</p>;
  if (initialError) return <p>Error...</p>;

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
            loadedPokemonLength={loadedPokemon?.length}
            count={initialData?.getPokemon?.count}
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
