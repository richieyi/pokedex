import React from 'react';
import Dropdown from '../Dropdown';

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
      <Dropdown
        placeholderText="Types filter"
        options={typesKeys}
        hasNoneOption
        onClickHandler={setTypeFilter}
      />
    );
  }

  function renderSpeciesDropdown() {
    return (
      <Dropdown
        placeholderText="Species filter"
        options={speciesKeys}
        hasNoneOption
        onClickHandler={setSpeciesFilter}
      />
    );
  }

  return (
    <>
      {renderTypesDropdown()}
      {renderSpeciesDropdown()}
    </>
  );
}

export default Filters;
