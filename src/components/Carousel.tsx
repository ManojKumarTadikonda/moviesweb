import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const slides = [
  {
    id: 1,
    title: 'Experience Cinema Like Never Before',
    description: 'Immerse yourself in state-of-the-art 3D technology and Dolby Atmos sound at Vasu Cinemas.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000',
    buttonText: 'Book Now'
  },
  {
    id: 2,
    title: 'Premium Comfort, Ultimate Experience',
    description: 'Luxurious recliner seats and world-class hospitality await you at Vasu Cinemas.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=2000',
    buttonText: 'Explore'
  },
  {
    id: 3,
    title: 'The Future of Entertainment',
    description: 'Experience movies in stunning 4K resolution with our cutting-edge projection systems.',
    image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&q=80&w=2000',
    buttonText: 'Learn More'
  },
  {
    id: 4,
    title: 'Your Premier Movie Destination',
    description: 'Join us for an unforgettable cinematic journey at Vasu Cinemas.',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=2000',
    buttonText: 'View Shows'
  }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative h-[600px] mt-16">
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                  {slide.description}
                </p>
                {slide.buttonText === 'Book Now' ? (
                  <Link to="/movies">
                    <button className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors">
                      <Play className="h-5 w-5" />
                      <span>{slide.buttonText}</span>
                    </button>
                  </Link>
                ) : slide.buttonText === 'Explore' ? (
                  <Link to="/movies"> {/* Updated to navigate to MoviesPage */}
                    <button className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors">
                      <Play className="h-5 w-5" />
                      <span>{slide.buttonText}</span>
                    </button>
                  </Link>
                ) : slide.buttonText === 'Learn More' ? (
                  <Link to="/about">
                    <button className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors">
                      <Play className="h-5 w-5" />
                      <span>{slide.buttonText}</span>
                    </button>
                  </Link>
                ) : (
                  <button className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors">
                    <Play className="h-5 w-5" />
                    <span>{slide.buttonText}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default Carousel;
