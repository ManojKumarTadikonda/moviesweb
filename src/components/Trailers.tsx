import { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TrailerModal from './TrailerModal';
import Pushpa2 from '../assets/Pushpatr2.jpeg';
import Salaar from '../assets/Ssalaar.jpg';
import Kalki from '../assets/Kkalki.jpg';
import DevaraImage from '../assets/Ddevara.jpg';


const trailers = [
  { id: 1, title: 'Pushpa 2', thumbnail: Pushpa2, videoUrl: 'https://www.youtube.com/embed/g3JUbgOHgdw', duration: '3 Hr 40min', releaseDate: 'Jan 24, 2024' },
  { id: 2, title: 'Salaar', thumbnail: Salaar, videoUrl: 'https://www.youtube.com/embed/4GPvYMKtrtI', duration: '2 Hr 50min', releaseDate: 'Feb 15, 2024' },
  { id: 3, title: 'Kalki', thumbnail: Kalki, videoUrl: 'https://www.youtube.com/embed/y1-w1kUGuz8', duration: '2 Hr 58min', releaseDate: 'Mar 1, 2024' },
  { id: 4, title: 'Devara', thumbnail: DevaraImage, videoUrl: 'https://www.youtube.com/embed/5cx7rvMvAWo', duration: '2 Hr 49min', releaseDate: 'Mar 15, 2024' },
];

const Trailers = () => {
  const [currentTrailer, setCurrentTrailer] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTrailer, setSelectedTrailer] = useState<(typeof trailers)[0] | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      changeTrailer(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTrailer]);

  const changeTrailer = (direction: number) => {
    setCurrentTrailer((prev) => (prev + direction + trailers.length) % trailers.length);
  };

  const openTrailer = (trailer: (typeof trailers)[0]) => {
    setSelectedTrailer(trailer);
    setIsModalOpen(true);
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={trailers[currentTrailer].id}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative h-full w-full"
        >
          <img src={trailers[currentTrailer].thumbnail} alt={trailers[currentTrailer].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-4xl font-bold">{trailers[currentTrailer].title}</h2>
            <p className="text-lg">{trailers[currentTrailer].duration} • Release: {trailers[currentTrailer].releaseDate}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={() => openTrailer(trailers[currentTrailer])} className="bg-white/20 p-6 rounded-full hover:bg-white/30">
              <Play className="h-12 w-12 text-white" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={() => changeTrailer(-1)} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70">
        <ChevronLeft className="h-8 w-8 text-white" />
      </button>
      <button onClick={() => changeTrailer(1)} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70">
        <ChevronRight className="h-8 w-8 text-white" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4">
        {trailers.map((_, index) => (
          <button key={index} onClick={() => setCurrentTrailer(index)} className={`w-3 h-3 rounded-full ${index === currentTrailer ? 'bg-white' : 'bg-gray-500'}`} />
        ))}
      </div>

      <TrailerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={selectedTrailer?.videoUrl || ''} title={selectedTrailer?.title || ''} />
    </section>
  );
};

export default Trailers;