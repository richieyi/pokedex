import React from 'react';

function SelectedPokemon(props: any) {
  const { id, name, sprites, stats, types } = props?.selectedPokemon;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center">
        <p>{`#${id}. ${name}`}</p>
        <img src={sprites.front_default} />
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
