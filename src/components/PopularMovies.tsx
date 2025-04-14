import { useState } from 'react';
import { Play, Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import salaar from '../assets/salaar.jpg';
import pushpa2 from '../assets/pushpa2.jpeg';
import kalki from '../assets/Kalki.jpg';
import DevaraImage from '../assets/Devara.jpg';

const movies = [
  {
    id: 1,
    title: 'Pushpa 2',
    duration: '3 Hr 40min',
    image: pushpa2,
    trailerUrl: 'https://www.youtube.com/embed/g3JUbgOHgdw',
  },
  {
    id: 2,
    title: 'Salaar',
    duration: '2 Hr 50min',
    image: salaar,
    trailerUrl: 'https://www.youtube.com/embed/4GPvYMKtrtI',
  },
  {
    id: 3,
    title: 'Kalki',
    duration: '2 Hr 58min',
    image: kalki,
    trailerUrl: 'https://www.youtube.com/embed/y1-w1kUGuz8',
  },
  {
    id: 4,
    title: 'Devara',
    duration: '2 Hr 49min',
    image: DevaraImage,
    trailerUrl: 'https://www.youtube.com/embed/5cx7rvMvAWo',
  },
];

const PopularMovies = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  const handleMovieClick = (trailerUrl: string) => {
    setSelectedTrailer(trailerUrl);
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">POPULAR MOVIES</h2>
          <a href="#" className="text-pink-600 hover:text-pink-700">
            Show all
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group cursor-pointer"
              onClick={() => handleMovieClick(movie.trailerUrl)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                      <Play className="h-8 w-8 text-white" />
                    </button>
                  </div>
                </div>
                <button className="absolute top-4 right-4 p-2">
                  <Heart className="h-6 w-6 text-pink-600" />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{movie.title}</h3>
                  <p className="text-gray-600">{movie.duration}</p>
                </div>
                <Link to="/movies" onClick={scrollToTop}> {/* Updated to use Link for navigation */}
                  <button className="bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold transform transition-transform duration-300 group-hover:scale-105 hover:bg-pink-700 focus:outline-none shadow-lg group">
                    BOOK NOW
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {selectedTrailer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] overflow-hidden">
              <button
                className="absolute top-3 right-3 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                onClick={closeTrailer}
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>

              <div className="relative w-full h-full">
                <iframe
                  src={selectedTrailer}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularMovies;
