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
        className="flex flex-col items-center hover:cursor-pointer rounded border py-4 px-1 bg-white shadow-sm"
        onClick={() => setSelectedPokemon(result.pokemon)}
      >
        <img
          src={result.pokemon.sprites.front_default}
          width="96"
          height="96"
        />
        <p className="text-sm">
          {`#${result.pokemon.id}. ${result.pokemon.name}`}
        </p>
      </div>
    ));
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 m-auto lg:m-0">
      {filteredResultsLength === 0 ? (
        <p>No results found...</p>
      ) : (
        renderList()
      )}
    </div>
  );
}

export default PokemonList;
