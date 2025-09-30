// // components/DropdownSearch.tsx
// import { useState } from "react";
// import type { ReactNode } from "react";
// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import { useRef, useEffect } from "react";


// components/DropdownSearch.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface DropdownSearchProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({ options, placeholder = "Select", onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setSearchTerm(value);
    onSelect(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className="w-full border border-gray-300 rounded flex items-center px-4 py-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          className="flex-1 focus:outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />
        {isOpen ? (
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        ) : (
          <ChevronUpIcon className="w-4 h-4 ml-2" />
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-100 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {filteredOptions.map((opt, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSearch;
