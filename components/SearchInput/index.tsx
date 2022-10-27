import React from 'react';

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

function SearchInput(props: SearchInputProps) {
  const { searchValue, setSearchValue } = props;

  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search"
      className="bg-white border border-gray-300 rounded px-2 py-1 text-sm shadow-md h-[30px] lg:w-[300px] lg:m-0"
    />
  );
}

export default SearchInput;
