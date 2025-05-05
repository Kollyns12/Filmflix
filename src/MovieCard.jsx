import React, { useState } from 'react';

const MovieCard = ({
  id,
  title,
  imageUrl,
  description,
  rating: initialRating = 0,
  onClick,
  videoUrl
}) => {
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(initialRating);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent click from triggering navigation
    setLiked(!liked);
  };

  const handleRating = async (e, newRating) => {
    e.stopPropagation();
    setRating(newRating);

    try {
      await fetch(`http://localhost:3001/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: newRating })
      });
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64 hover:scale-105 transition-transform"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={(e) => handleRating(e, star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Like Button */}
      <button
        onClick={handleLikeClick}
        className={`px-4 py-2 rounded-full text-white mr-2 ${
          liked ? 'bg-blue-500' : 'bg-gray-500'
        } transition-colors duration-200`}
      >
        {liked ? 'Liked' : 'Like'}
      </button>

      {/* YouTube Button */}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
};

export default MovieCard;
