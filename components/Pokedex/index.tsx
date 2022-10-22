import React, { useState } from 'react';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';

function Pokedex(props: any) {
  const { results } = props;
  console.log('res', results);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const filteredByName = results?.filter((result: any) =>
    result?.pokemon?.name?.toLowerCase().includes(searchValue)
  );

  return (
    <div className="container flex justify-center gap-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-center">Pokédex</h1>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name..."
            className="border border-black rounded px-2 py-1"
          />
        </div>
        <div>
          {selectedPokemon && (
            <SelectedPokemon selectedPokemon={selectedPokemon} />
          )}
        </div>
      </div>
      <div className="h-[450px] w-[400px] p-4 grid grid-cols-3 gap-8 overflow-y-auto">
        {filteredByName.length === 0 ? (
          <p>No results found...</p>
        ) : (
          <PokemonList
            filteredByName={filteredByName}
            setSelectedPokemon={setSelectedPokemon}
          />
        )}
      </div>
    </div>
  );
}

export default Pokedex;
