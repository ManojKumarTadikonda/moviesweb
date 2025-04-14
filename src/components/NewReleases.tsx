import { Play, Heart } from 'lucide-react';
import { useState } from 'react';

// Importing local images
import OGImage from '../assets/Og.jpeg';
import DevaraImage from '../assets/Devara2.jpg';
import AkhandaImage from '../assets/Akhanda.jpeg';
import VishambaraImage from '../assets/Visvambara.jpeg';
import Kanappa from '../assets/Kanappa.jpeg';

const movies = [
  {
    id: 1,
    title: 'OG',
    duration: '2 Hr 30min',
    description: 'A highly anticipated action-packed Telugu movie.',
    language: 'Telugu',
    image: OGImage,
    likes: Math.floor(Math.random() * (100000 - 5000) + 5000),
  },
  { id: 2,
    title: 'Devara 2',
    duration: '2 Hr 40min',
    description: 'The epic sequel to the blockbuster Devara.',
    language: 'Telugu',
    image: DevaraImage,
    likes: Math.floor(Math.random() * (100000 - 5000) + 5000),
  },
  { id: 3,
    title: 'Akhanda 2',
    duration: '2 Hr 20min',
    description: 'The roaring return of Balayya in Akhanda 2.',
    language: 'Telugu',
    image: AkhandaImage,
    likes: Math.floor(Math.random() * (100000 - 5000) + 5000),
  },
  {
    id: 4,
    title: 'Vishambara',
    duration: '2 Hr 35min',
    description: 'A visually stunning Telugu sci-fi thriller.',
    language: 'Telugu',
    image: VishambaraImage,
    likes: Math.floor(Math.random() * (100000 - 5000) + 5000),
  },
  {
    id: 5,
    title: 'Kanappa',
    duration: '2 Hr 15min',
    description: 'Devotional but ROD movie',
    language: 'Telugu',
    image: Kanappa,
    likes: Math.floor(Math.random() * (100000 - 5000) + 5000),
  },
];

const NewReleases = () => {
  const [notified, setNotified] = useState<boolean[]>(Array(movies.length).fill(false));
  const [likedMovies, setLikedMovies] = useState<boolean[]>(Array(movies.length).fill(false));
  const [movieLikes, setMovieLikes] = useState(movies.map(movie => movie.likes));

  const handleNotify = (index: number) => {
    const updatedNotified = [...notified];
    updatedNotified[index] = true;
    setNotified(updatedNotified);
  };

  const handleLike = (index: number) => {
    const updatedLikes = [...movieLikes];
    const updatedLikedMovies = [...likedMovies];
    if (updatedLikedMovies[index]) {
      updatedLikes[index] -= 1;
    } else {
      updatedLikes[index] += 1;
    }
    updatedLikedMovies[index] = !updatedLikedMovies[index];
    setMovieLikes(updatedLikes);
    setLikedMovies(updatedLikedMovies);
  };

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold animate-bounce black transition-colors duration-2000 animate-pulse">
            COMING SOON
          </h2>
          <a href="#" className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-500 underline decoration-pink-500 hover:scale-105 transition-transform">
            Show all
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-xl transition-transform animate-move border border-gray-300">

              <div className="relative group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[250px] object-cover group-hover:brightness-75 transition-all"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-110">
                      <Play className="h-8 w-8 text-white" />
                    </button>
                  </div>
                </div>
                <button onClick={() => handleLike(index)} className="absolute top-4 right-4 p-2 hover:scale-110 transition-transform">
                  <Heart className={"h-6 w-6 ${likedMovies[index] ? 'text-red-600 fill-current' : 'text-pink-600'} hover:text-red-700"} />
                </button>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-pink-600 rounded-full px-2 py-1">
                  {movie.duration}
                </div>
              </div>
              <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-pink-500 transition-colors">

                  {movie.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{movie.description}</p>
                <p className="text-gray-600 text-sm mb-2">Language: {movie.language}</p>
                <p className="text-gray-400 text-sm mb-2">Interests: {movieLikes[index].toLocaleString()}</p>
                <button
                  onClick={() => handleNotify(index)}
                  className={`w-full rounded-md py-2 transition-all ${
                    notified[index]
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-500 hover:shadow-lg'
                  }`}
                  disabled={notified[index]}
                >
                  {notified[index] ? 'Notified' : 'Notify'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewReleases;