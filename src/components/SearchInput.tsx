import React from 'react';

type SearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  loading?: boolean;
  autoFocus?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch, loading, autoFocus }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  return (
    <input
      ref={inputRef}
      type="text"
      className="flex-1 px-5 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 transition"
      placeholder="Describe the UI you want to see..."
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter' && !loading) onSearch();
      }}
      disabled={loading}
    />
  );
};

export default SearchInput; 