import React from 'react';

function PokemonList(props: any) {
  const { filteredByName, setSelectedPokemon } = props;

  return filteredByName?.map((result: any) => (
    <div
      key={result.pokemon.name}
      className="flex flex-col items-center hover:cursor-pointer"
      onClick={() => setSelectedPokemon(result.pokemon)}
    >
      <img src={result.pokemon.sprites.front_default} />
      <p className="text-sm">{result.pokemon.name}</p>
    </div>
  ));
}

export default PokemonList;
