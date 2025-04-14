import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // For URL parameters
import Header from './components/Header';
import Carousel from './components/Carousel';
import PopularMovies from './components/PopularMovies';
import NewReleases from './components/NewReleases';
import Footer from './components/Footer';
import MoviesPage from './pages/MoviesPage';
import BookingPage from './pages/BookingPage';
import ModelViewer from './components/ModelViewer';
import moviesData from './pages/movies.json'; // Assuming you have movies.json in the same folder
import { useEffect, useState } from 'react';
import MyBookingsPage from './components/Mybookings';
import AboutPage from './pages/aboutpage';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Carousel />
                <PopularMovies />
                <NewReleases />
              </main>
            }
          />
          <Route path="/screen1" element={<ModelViewer />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/booking" element={<BookingPageWrapper />} />
          <Route path="/My bookings" element={<MyBookingsPage/>}/>
          <Route path="/About" element={<AboutPage/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// BookingPageWrapper component to fetch movie data and pass to BookingPage
const BookingPageWrapper = () => {
  const { movieId } = useParams(); // Extract movieId from the URL
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const storedUserId = localStorage.getItem('_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  // Find the movie from movies.json based on movieId
  const movie = moviesData.find((movie) => movie.id === (movieId));
  if (!movie) {
    return <div>Movie not found!</div>; // Handle case when movie is not found
  }
  console.log(userId,movie.id,movie.title);
  return (
    <BookingPage
      movieId={movie.id}
      movieName={movie.title} // Pass movie title as movieName prop
      userID={userId} // You can handle userId logic as needed
    />
  );
};

export default App;
