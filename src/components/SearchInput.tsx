import React from 'react';

type SearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  loading?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch, loading }) => (
  <input
    type="text"
    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
    placeholder="Describe the UI you want to see..."
    value={value}
    onChange={e => onChange(e.target.value)}
    onKeyDown={e => {
      if (e.key === 'Enter' && !loading) onSearch();
    }}
    disabled={loading}
  />
);

export default SearchInput; 