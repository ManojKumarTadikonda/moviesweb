import React from 'react';

type LinkViewerProps = {
  url: string;
  onClose: () => void;
};

const LinkViewer: React.FC<LinkViewerProps> = ({ url, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl h-5/6 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Close
        </button>
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="Link Viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default LinkViewer;
