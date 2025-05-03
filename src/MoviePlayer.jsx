import React from 'react';

const MoviePlayer = ({ movie, onClose }) => {
  if (!movie || !movie.videoUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">{movie.title}</h2>
      
      <video
        controls
        autoPlay
        className="w-full max-w-4xl rounded-lg shadow-lg"
        onError={() => alert("Video failed to load. Check the video URL.")}
      >
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <button
        onClick={onClose}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        Close
      </button>
    </div>
  );
};

export default MoviePlayer;

