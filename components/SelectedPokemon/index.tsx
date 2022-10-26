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
      <div className="flex flex-row justify-between gap-2">
        <div>
          <p>Stats</p>
          <p>{`${stats?.[0]?.base_stat} ${stats?.[0]?.stat.name}`}</p>
        </div>
        <div>
          <p>Types</p>
          {types.map(({ type }: any, idx) => (
            <p key={type.name}>{`${type.name}${
              idx !== types.length - 1 ? ',' : ''
            }`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectedPokemon;
