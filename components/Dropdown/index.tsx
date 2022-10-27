import React from 'react';

interface DropdownProps {
  placeholderText: string;
  options: string[];
  hasNoneOption?: boolean;
  onClickHandler: (option: string) => void;
}

function Dropdown(props: DropdownProps) {
  const { placeholderText, options, hasNoneOption, onClickHandler } =
    props;

  return (
    <div>
      <select className="bg-white border border-gray-300 rounded px-2 py-1 hover:cursor-pointer text-sm shadow-md w-[100px] lg:w-[150px] h-[30px]">
        <option value="" disabled selected>
          {placeholderText}
        </option>
        {hasNoneOption && (
          <option value="None" onClick={() => onClickHandler('')}>
            None
          </option>
        )}
        {options.map((option, idx) => (
          <option
            key={idx}
            value={option}
            onClick={() => onClickHandler(option)}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
