import React from 'react';

const options = ['id asc', 'id desc', 'name asc', 'name desc'];

function SortByDropdown(props: any) {
  const { setSortBy } = props;

  return (
    <div className="flex flex-col">
      <p>Sort By</p>
      <select>
        <option value="None">None</option>
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
