import React, { useMemo } from 'react';
import { Genera, Result, Type } from '../../pokemon-types';

interface FiltersProps {
  results: any;
  setTypeFilter: any;
  setSpeciesFilter: any;
}

type TypesHash = Record<string, any>;
type SpeciesHash = Record<string, any>;

function Filters(props: FiltersProps) {
  const { results, setTypeFilter, setSpeciesFilter } = props;

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
    const typesMapped = getTypes();
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
    const speciesMapped = getSpecies();
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
    <div className="flex flex-col">
      <h1 className="text-xl text-center">Filters</h1>
      <p>Types</p>
      {renderTypesDropdown()}
      <p>Species</p>
      {renderSpeciesDropdown()}
    </div>
  );
}

export default Filters;
