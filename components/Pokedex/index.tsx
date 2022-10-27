import React, { useEffect, useState } from 'react';
import Filters from '../Filters';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';
import { Pokemon, Result } from '../../pokemon-types';
import SortByDropdown, { options } from '../SortByDropdown';
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
import SearchInput from '../SearchInput';
import Modal from '../Modal';

function Pokedex() {
  const {
    data: initialData,
    loading: initialLoading,
    error: initialError,
  } = useQuery(GET_POKEMON);
  const [getMorePokemon, { data, loading, error }] =
    useLazyQuery(GET_POKEMON);

  const [isPokemonModalOpen, setIsPokemonModalOpen] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [loadedPokemon, setLoadedPokemon] = useState<Result[]>([]);
  const [nextLink, setNextLink] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] =
    useState<Pokemon | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(options[0]);

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

  const handleSelect = (selectedPokemon: Pokemon) => {
    setSelectedPokemon(selectedPokemon);
    setIsPokemonModalOpen(true);
  };

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
    <div className="flex flex-col gap-16 text-sm lg:text-base relative">
      <div className="flex flex-col items-center gap-2 fixed bg-gray-300 w-full left-0 py-2 lg:px-8 lg:py-4 shadow-md">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl mb-1">Pokédex</h1>
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="flex gap-2">
          <Filters
            typesKeys={typesKeys}
            speciesKeys={speciesKeys}
            setTypeFilter={setTypeFilter}
            setSpeciesFilter={setSpeciesFilter}
          />
          <SortByDropdown setSortBy={setSortBy} />
        </div>
        <div className="flex gap-2">
          <LoadMore
            loadedPokemonCount={loadedPokemon?.length}
            count={initialData?.getPokemon?.count}
            getMorePokemon={getMorePokemon}
            nextLink={nextLink}
            loading={loading}
          />
          <button
            onClick={() => setIsChartModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-grey-500 disabled:hover:bg-grey-500 shadow-lg hidden lg:block"
          >
            See Types Data
          </button>
        </div>
      </div>
      <div className="mt-36 lg:mt-48">
        <PokemonList
          pokemonList={sortedList}
          setSelectedPokemon={handleSelect}
          filteredResultsLength={filteredResults?.length}
        />
      </div>
      {selectedPokemon && (
        <Modal
          isOpen={isPokemonModalOpen}
          setIsOpen={setIsPokemonModalOpen}
        >
          <SelectedPokemon selectedPokemon={selectedPokemon} />
        </Modal>
      )}
      <BarChart
        data={typesMappedForData}
        isOpen={isChartModalOpen}
        setIsOpen={setIsChartModalOpen}
      />
    </div>
  );
}

export default Pokedex;
