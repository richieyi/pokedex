import { Pokemon, Result } from 'pokemon-types';
import React from 'react';

interface PokemonListProps {
  pokemonList: Result[];
  setSelectedPokemon: (newSelected: Pokemon) => void;
  filteredResultsLength: number;
}

function PokemonList(props: PokemonListProps) {
  const { pokemonList, setSelectedPokemon, filteredResultsLength } =
    props;

  function renderList() {
    return pokemonList?.map((result: Result) => (
      <div
        key={result.pokemon.name}
        className="flex flex-col items-center hover:cursor-pointer h-[100px]"
        onClick={() => setSelectedPokemon(result.pokemon)}
      >
        <img
          src={result.pokemon.sprites.front_default}
          width="48"
          height="48"
        />
        <p className="text-sm">
          {`#${result.pokemon.id}. ${result.pokemon.name}`}
        </p>
      </div>
    ));
  }

  return (
    <div className="h-[600px] max-w-[500px] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-scroll m-auto lg:m-0 shadow-lg border rounded">
      {filteredResultsLength === 0 ? (
        <p>No results found...</p>
      ) : (
        renderList()
      )}
    </div>
  );
}

export default PokemonList;
