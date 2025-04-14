import { Play, Heart, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    duration: string;
    image: string;
    description: string;
    rating: number;
    reviews: Review[];
  };
  showReviews?: boolean;
}

const MovieCard = ({ movie, showReviews = false }: MovieCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative group">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 flex items-center justify-center space-x-4">
            <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
              <Play className="h-8 w-8 text-white" />
            </button>
            <Link
              to={`/movies/${movie.id}/booking`}
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
        <button className="absolute top-4 right-4 p-2">
          <Heart className="h-6 w-6 text-pink-600" />
        </button>
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{movie.duration}</span>
          </div>
          <div className="flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">{movie.rating}/5</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{movie.description}</p>
        
        {showReviews && movie.reviews && (
          <div className="mt-4">
            <h4 className="font-semibold text-md mb-2">Reviews</h4>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {movie.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/movies/${movie.id}/booking`}
          className="block w-full text-center mt-4 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;