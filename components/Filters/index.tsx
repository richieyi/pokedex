import React from 'react';

interface FiltersProps {
  typesKeys: string[];
  speciesKeys: string[];
  setTypeFilter: (typeFilter: string) => void;
  setSpeciesFilter: (speciesFilter: string) => void;
}

function Filters(props: FiltersProps) {
  const { typesKeys, speciesKeys, setTypeFilter, setSpeciesFilter } =
    props;

  function renderTypesDropdown() {
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

  function renderSpeciesDropdown() {
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
