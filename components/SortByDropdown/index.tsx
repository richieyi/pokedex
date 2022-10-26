import React from 'react';

const options = ['id asc', 'id desc', 'name asc', 'name desc'];

interface SortByDropdownProps {
  setSortBy: (sortByOption: string) => void;
}

function SortByDropdown(props: SortByDropdownProps) {
  const { setSortBy } = props;

  return (
    <div className="flex flex-col">
      <p>Sort By</p>
      <select>
        {options.map((option, idx) => (
          <option key={idx} onClick={() => setSortBy(option)}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByDropdown;
