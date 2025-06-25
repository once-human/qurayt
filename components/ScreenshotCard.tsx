import React from 'react';

type ScreenshotCardProps = {
  title: string;
  image: string;
  url: string;
  className?: string;
};

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ title, image, url, className }) => (
  <div className={`bg-white dark:bg-neutral-900 rounded shadow hover:shadow-lg transition overflow-hidden flex flex-col ${className || ''}`}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="w-full aspect-square bg-gray-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </a>
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div className="font-semibold text-lg mb-2 truncate" title={title}>{title}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm mt-auto"
      >
        View on Source
      </a>
    </div>
  </div>
);

export default ScreenshotCard; 