import fs from 'fs';
import fetch from 'node-fetch';

const API_KEY = '6ad0c55b1ff75b637cfceec72309c5f9'; 
const TMDB_BASE = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
};

async function fetchMovies() {
  const res = await fetch(`${TMDB_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`, { headers });
  const data = await res.json();
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    rating: movie.vote_average,
    category: 'Movie',
  }));
}

async function fetchAnimes() {
  const res = await fetch(`${TMDB_BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`, { headers });
  const data = await res.json();
  return data.results.map((show) => ({
    id: show.id + 10000, // Avoid ID collision with movies
    title: show.name,
    description: show.overview,
    imageUrl: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
    rating: show.vote_average,
    category: 'Anime',
  }));
}

async function seedDB() {
  try {
    const movies = await fetchMovies();
    const animes = await fetchAnimes();
    const all = [...movies.slice(0, 20), ...animes.slice(0, 20)];
    const db = { movies: all };
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    console.log('✅ db.json seeded with real TMDB data!');
  } catch (error) {
    console.error('❌ Error seeding DB:', error);
  }
}

seedDB();

