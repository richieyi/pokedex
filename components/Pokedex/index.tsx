import React, { useMemo, useState } from 'react';
import PokemonList from '../PokemonList';
import SelectedPokemon from '../SelectedPokemon';

interface PokedexProps {
  results: Result[];
}

interface Result {
  url: string;
  pokemon: Pokemon;
}

interface Pokemon {
  id: string;
  name: string;
  species: Species;
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
}

interface Species {
  genera: Genera[];
}

interface Genera {
  genus: string;
  language: Language;
}

interface Language {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: StatType;
}

interface StatType {
  name: string;
}

interface Type {
  type: ElementType;
}

interface ElementType {
  name: string;
}
interface Sprite {
  front_default: string;
}

type TypesHash = Record<string, any>;
type SpeciesHash = Record<string, any>;

function Pokedex(props: PokedexProps) {
  const { results } = props;
  console.log('res', results);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('');
  const filteredResults = results?.filter((result: Result) => {
    const nameHasSearchValue = result?.pokemon?.name
      ?.toLowerCase()
      .includes(searchValue);
    const typeHasTypeValue = result.pokemon.types.filter((type) =>
      typeFilter ? type.type.name === typeFilter : true
    );
    const speciesHasSpeciesValue =
      result.pokemon.species.genera.filter((genera) =>
        speciesFilter ? genera.genus === speciesFilter : true
      );

    return (
      nameHasSearchValue &&
      typeHasTypeValue.length &&
      speciesHasSpeciesValue.length
    );
  });

  function getTypes() {
    const typesHash: TypesHash = {};

    results.map((result: Result) => {
      const { types } = result.pokemon;
      types.forEach((type: Type) => {
        const elementName = type.type.name;

        if (!typesHash[elementName]) {
          typesHash[elementName] += 1;
        } else {
          typesHash[elementName] = 0;
        }
      });
    });

    return typesHash;
  }

  function renderTypesDropdown() {
    const typesMapped = useMemo(() => getTypes(), []);
    const typesKeys = Object.keys(typesMapped);

    return (
      <select>
        <option value="None" onClick={() => setTypeFilter('')}>
          None
        </option>
        {typesKeys.map((type) => {
          return (
            <option
              key={type}
              value={type}
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </option>
          );
        })}
      </select>
    );
  }

  function getSpecies() {
    const speciesHash: SpeciesHash = {};

    results.map((result: Result) => {
      const { genera } = result.pokemon.species;
      genera.forEach((genera: Genera) => {
        const { genus, language } = genera;

        if (language.name === 'en') {
          if (!speciesHash[genus]) {
            speciesHash[genus] += 1;
          } else {
            speciesHash[genus] = 0;
          }
        }
      });
    });

    return speciesHash;
  }

  function renderSpeciesDropdown() {
    const speciesMapped = useMemo(() => getSpecies(), []);
    const speciesKeys = Object.keys(speciesMapped);

    return (
      <select>
        <option value="None" onClick={() => setSpeciesFilter('')}>
          None
        </option>
        {speciesKeys.map((species) => {
          return (
            <option
              key={species}
              value={species}
              onClick={() => setSpeciesFilter(species)}
            >
              {species}
            </option>
          );
        })}
      </select>
    );
  }

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
        <div className="flex flex-col">
          <h1 className="text-xl text-center">Filters</h1>
          <p>Types</p>
          {renderTypesDropdown()}
          <p>Species</p>
          {renderSpeciesDropdown()}
        </div>
        <div>
          {selectedPokemon && (
            <SelectedPokemon selectedPokemon={selectedPokemon} />
          )}
        </div>
      </div>
      <div className="h-[450px] w-[400px] p-4 grid grid-cols-3 gap-8 overflow-y-auto">
        {filteredResults.length === 0 ? (
          <p>No results found...</p>
        ) : (
          <PokemonList
            filteredByName={filteredResults}
            setSelectedPokemon={setSelectedPokemon}
          />
        )}
      </div>
    </div>
  );
}

export default Pokedex;
