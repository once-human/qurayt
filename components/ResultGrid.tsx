import React from 'react';
import ScreenshotCard from './ScreenshotCard';

type ResultGridProps = {
  results: any[];
  loading?: boolean;
};

const ResultGrid: React.FC<ResultGridProps> = ({ results, loading }) => {
  if (loading) {
    return <div className="text-center text-gray-500">Loading results...</div>;
  }
  if (!results || results.length === 0) {
    return <div className="text-center text-gray-400">No results yet. Try searching for a UI!</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {results.map((result, idx) => (
        <ScreenshotCard key={idx} {...result} />
      ))}
    </div>
  );
};

export default ResultGrid;
