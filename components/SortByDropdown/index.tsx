import React from 'react';
import Dropdown from '../Dropdown';

export const options = [
  'ID (asc)',
  'ID (desc)',
  'Name (asc)',
  'Name (desc)',
];

interface SortByDropdownProps {
  setSortBy: (sortByOption: string) => void;
}

function SortByDropdown(props: SortByDropdownProps) {
  const { setSortBy } = props;

  return (
    <Dropdown
      placeholderText="Sort by"
      options={options}
      onClickHandler={setSortBy}
    />
  );
}

export default SortByDropdown;
