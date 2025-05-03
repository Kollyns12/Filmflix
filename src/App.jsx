import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import MovieCard from './MovieCard';
import MoviePlayer from './MoviePlayer';

function App() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch movies from JSON Server
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  // Filter movies based on search and category
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || movie.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Fullscreen toggle with safety checks
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Logos */}
      <div className="flex space-x-4 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo w-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo w-20" alt="React logo" />
        </a>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Filmflix</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
      />

      {/* Filter Dropdown */}
      <div className="mt-4">
        <label htmlFor="category" className="mr-2 font-medium">Filter by:</label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="All">All</option>
          <option value="Movie">Movies</option>
          <option value="Anime">Animes</option>
        </select>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
      >
        Toggle Dark Mode
      </button>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center mt-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-lg">Loading movies...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-8 w-full max-w-7xl">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imageUrl={movie.imageUrl}
              description={movie.description}
              rating={movie.rating}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      )}

      {/* Movie Player */}
      {selectedMovie && (
        <MoviePlayer
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      )}

      {/* Footer Card */}
      <div className="card bg-gray-700 p-6 rounded-lg shadow-md mt-8">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Count is {count}
        </button>
        <p className="mt-4 text-sm text-gray-300">
          Edit <code className="font-mono">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="mt-8 text-lg text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;




