import { Pokemon, Type } from 'pokemon-types';
import React from 'react';
import { ReferenceArea } from 'recharts';

interface SelectedPokemonProps {
  selectedPokemon: Pokemon;
}

function SelectedPokemon(props: SelectedPokemonProps) {
  const {
    selectedPokemon: { id, name, sprites, stats, types },
  } = props;

  return (
    <div className="flex flex-col gap-4 p-4 border rounded shadow-lg">
      <div className="flex flex-col items-center">
        <p>{`#${id}. ${name}`}</p>
        <img src={sprites.front_default} width="96" height="96" />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <p>
            Stats:{' '}
            <span>
              {`${stats?.[0]?.base_stat} ${stats?.[0]?.stat.name}`}
            </span>
          </p>
        </div>
        <div>
          <p>
            Types:{' '}
            {types.map(({ type }: Type, idx) => (
              <span key={type.name}>{`${type.name}${
                idx !== types.length - 1 ? ', ' : ''
              }`}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectedPokemon;
