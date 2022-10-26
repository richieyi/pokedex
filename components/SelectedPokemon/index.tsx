import { Pokemon } from 'pokemon-types';
import React from 'react';

interface SelectedPokemonProps {
  selectedPokemon: Pokemon;
}

function SelectedPokemon(props: SelectedPokemonProps) {
  const {
    selectedPokemon: { id, name, sprites, stats, types },
  } = props;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center">
        <p>{`#${id}. ${name}`}</p>
        <img src={sprites.front_default} width="96" height="96" />
      </div>
      <div className="flex justify-between">
        <div className="ml-8">
          <p>Stats</p>
          <p>{`${stats?.[0]?.base_stat} ${stats?.[0]?.stat.name}`}</p>
        </div>
        <div className="mr-8">
          <p>Types</p>
          {types.map(({ type }: any) => (
            <p key={type.name}>{type.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectedPokemon;
