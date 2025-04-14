import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Booking {
  movieId: string;
  movieName: string;
  screenName: string;
  selectedDate: string;
  showTime: string;
  seatPosition: string[];
}

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // New state for handling errors
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('_id');

    if (!userId) {
      // If no userId in localStorage, redirect to login page
      alert('Please login to see your bookings');
      navigate('/');
      return;
    }

    // If userId exists, fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://moviebooking-13wh.onrender.com/api/tickets/userbookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          // If the response status is not OK (e.g., 404 or 500)
          throw new Error('Error fetching bookings');
        }
        const data = await response.json();
        
        if (data.message === 'User bookings retrieved successfully') {
          setBookings(data.bookings);
        } else {
          setBookings([]); // In case the message is different, clear bookings
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings, please try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-500 animate-pulse">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-2xl font-extrabold mb-8 text-center text-red-500 ">No bookings yet</div> 
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.movieId}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col items-center border border-pink-400"
              >
                <img 
                  src={`/src/assets/${booking.movieName}.jpg`} 
                  alt={booking.movieName} 
                  className="w-full h-64 object-cover rounded-lg mb-4 sm:h-72 md:h-80 lg:h-96 border-4 border-pink-500 shadow-md transition-transform duration-300 hover:rotate-2" 
                />
                <h2 className="text-3xl font-bold text-center mb-2 text-pink-600 border-b-2 border-pink-500 pb-2">{booking.movieName}</h2>
                <p className="text-gray-700 text-center text-lg">🎥 Screen: <span className="font-semibold text-pink-500">{booking.screenName}</span></p>
                <p className="text-gray-700 text-center text-lg">📅 Date: <span className="font-semibold text-pink-500">{booking.selectedDate}</span></p>
                <p className="text-gray-700 text-center text-lg">⏰ Time: <span className="font-semibold text-pink-500">{booking.showTime}</span></p>
                <p className="text-gray-700 text-center text-lg">🎟 Seats: <span className="font-semibold text-pink-500">{booking.seatPosition.join(', ')}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
