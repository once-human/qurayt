import React from 'react';

type ScreenshotCardProps = {
  title: string;
  image: string;
  url: string;
};

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ title, image, url }) => (
  <div className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden flex flex-col">
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
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