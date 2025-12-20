"use client"

import { useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

export const CustomSelect = ({ label, value, options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useClickOutside(() => setIsOpen(false));

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <label className="font-semibold text-text">{label}</label>
      <div ref={selectRef} className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-solid border-zinc-200 bg-white p-4 text-sm"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={value ? "text-text" : "text-text-alt"}>
            {value || placeholder}
          </span>
          {/* You would need to import a Chevron icon component here */}
          {/* <ChevronBottom className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} /> */}
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-solid border-zinc-200 bg-white shadow-lg"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer p-4 text-right text-sm text-text hover:bg-zinc-50"
                role="option"
                aria-selected={value === option}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};