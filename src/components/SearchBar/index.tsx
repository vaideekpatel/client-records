import React, {  useState, type KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    onSearch(value.trim());
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder="Search by ID, Name or Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
