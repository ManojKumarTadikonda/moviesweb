import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Trailers from '../components/Trailers';
import moviesData from './movies.json';
//SD
const MoviesPage = () => {
  const [filter, setFilter] = useState('all');
  const [movies, setMovies] = useState(moviesData);

  const viewscreen1 = () => {
    window.open('/screen1', '_self');
  };

  const viewscreen2 = () => {
    window.open('https://67fd2456d7188ec2d6fe2b7d--comfy-babka-bee5fc.netlify.app/', '_self');
  };

  return (
    <div className="pt-16">
      <Trailers />
      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={() => viewscreen1()} className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <span>View 3D Model of Screen 1</span>
        </button>
        <button onClick={() => viewscreen2()} className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <span>View 3D Model of Screen 2</span>
        </button>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Movies</h1>
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <option value="all">All Movies</option>
              <option value="now-showing">Now Showing</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                ...movie,
                image: movie.image // Directly use the path from the JSON file
              }}
              showReviews={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
