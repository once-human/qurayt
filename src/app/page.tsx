import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import ResultGrid from '../components/ResultGrid';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Placeholder: Will call API later
    setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">qurayt – UI Inspiration Search</h1>
      <div className="w-full max-w-xl flex flex-col gap-4 mb-8">
        <SearchInput value={query} onChange={setQuery} onSearch={handleSearch} loading={loading} />
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <ResultGrid results={results} loading={loading} />
    </div>
  );
} 