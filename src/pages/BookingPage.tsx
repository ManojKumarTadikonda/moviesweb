import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SEAT_PRICE = 200;
const CONVENIENCE_FEE = 30;

const BookingPage = ({
  movieName,
  movieId,
  userID,
}: {
  movieName: string;
  movieId: string;
  userID: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState<any[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedScreen, setSelectedScreen] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`https://moviebooking-13wh.onrender.com/api/schedules`);
        const data = await response.json();
        setShowtimes(data);
        const dates: string[] = Array.from(
          new Set(
            data
              .filter(
                (showtime: { movieName: string }) =>
                  showtime.movieName === movieName
              )
              .map((showtime: { date: any }) => showtime.date)
          )
        );
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
    if (selectedDate && selectedTime && selectedScreen) {
      getSeats();
    }
  }, [movieId, movieName,selectedDate, selectedTime, selectedScreen]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    const filtered = showtimes.filter(
      (showtime) => showtime.movieName === movieName && showtime.date === date
    );
    setFilteredShowtimes(filtered);
  };

  const handleScreenClick = (screen: number) => {
    setSelectedScreen(screen); // Set selected screen here
    const selectedScreenShowtimes = showtimes.filter(
      (showtime) =>
        showtime.screen === screen &&
        showtime.movieName === movieName &&
        showtime.date === selectedDate
    );
    setFilteredShowtimes(selectedScreenShowtimes);
    setSelectedTime(null); // Reset time selection when switching screens
  };

  const handleSeatClick = (seat: string) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeats((prev: string[]) =>
        prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
      );
    }
  };

   const getSeatColor = (seat: string) => {
    if (bookedSeats.includes(seat)) return "bg-red-600 text-white cursor-not-allowed";
    if (selectedSeats.includes(seat))
      return "bg-gradient-to-r from-blue-600 to-purple-600 text-white";
    return "bg-gray-300 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white";
  };

  const generateSeatsMGB = () => {
    const rows = ["G", "F", "E", "D", "C", "B", "A"];
    const seatsPerRow = 12;
    return rows.map((row) =>
      Array.from({ length: seatsPerRow }, (_, i) => `${row}${i + 1}`)
    );
  };

  const generateSeatsRainSquare = () => {
    const rows = ["K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
    const seatsPerRow = 20;
    return rows.map((row) =>
      Array.from({ length: seatsPerRow }, (_, i) => `${row}${i + 1}`)
    );
  };
  const handleSummary = () => {
    if (selectedSeats.length > 0) {
      setShowSummary(true);
    }
  };


  const calculateTotal = () => {
    return selectedSeats.length * SEAT_PRICE + CONVENIENCE_FEE;
  };
  const navigate = useNavigate();
  // Retrieve the email from localStorage
  const email = localStorage.getItem("email");
  console.log(email);



  const handleBooking = async () => {
    const bookingData = {
      userId: userID,
      email: email, // Replace with dynamic email
      movieId,
      movieName,
      selectedDate,
      showTime: selectedTime,
      screenName: selectedScreen,
      seatPosition: selectedSeats.join(", "),
      amount: selectedSeats.length * SEAT_PRICE,
      payment: "done", // You can change this based on the payment process
    };

    try {
      const response = await fetch("https://moviebooking-13wh.onrender.com/api/tickets/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      console.log(bookingData);
      if (response.ok) {
        const data = await response.json();
        alert("Booking successful!");
        navigate("/");
        // Optionally redirect to another page after successful booking
        console.log(data);
      } else {
        alert("Booking failed.");
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("An error occurred while booking the ticket.");
    }
  };


  const getSeats = async () => {
    try {
      const response = await fetch("https://moviebooking-13wh.onrender.com/api/tickets/getseats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          movieName,
          selectedDate,
          showTime: selectedTime,
          screenName: selectedScreen,
        }),
      });
      const data = await response.json();
      if (data.message === "Booked seats retrieved successfully") {
        console.log(data);
        setBookedSeats(data.bookedSeats.flatMap((seat: string) => seat.split(", ")));
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-10">
      <div className="container mx-auto px-4 py-8 overflow-y-auto mt-10">
        <h1 className="text-3xl font-extrabold text-pink-500 text-center mb-4">
          Book Your Tickets 🎥
        </h1>

        {/* Date Selection */}
        <section className="mb-8 bg-gray-200 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-black mb-4 animate-bounce">
            Select Date
          </h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] transition-all duration-300 ${
                  selectedDate === date
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "bg-gray-300 hover:bg-gray-200"
                }`}
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-xs">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <span className="text-lg font-bold">
                  {new Date(date).getDate()}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Screen Selection */}
        {selectedDate && filteredShowtimes.length > 0 && (
          <section className="mb-8 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black mb-4">Select Screen</h2>
            <div className="flex space-x-4">
              {[1, 2].map((screen) => (
                <button
                  key={screen}
                  onClick={() => handleScreenClick(screen)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                    filteredShowtimes.some(
                      (showtime) => showtime.screen === screen
                    )
                      ? "bg-gradient-to-br from-green-600 to-blue-600 text-white"
                      : "bg-gray-300"
                  }`}
                  disabled={
                    !filteredShowtimes.some(
                      (showtime) => showtime.screen === screen
                    )
                  }
                >
                  <span className="text-lg font-bold">{`Screen ${screen}`}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Showtime Selection */}
        {selectedDate && filteredShowtimes.length > 0 && (
          <section className="mb-8 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-black mb-4">
              Select Showtime
            </h2>
            <div className="flex flex-col gap-4">
              {filteredShowtimes.map((showtime) => (
                <div key={showtime.showTime}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button
                      onClick={() => setSelectedTime(showtime.showTime)}
                      className={`flex flex-col items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
                        selectedTime === showtime.showTime
                          ? "bg-gradient-to-br from-green-600 to-blue-600 text-white"
                          : "bg-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      <Clock className="h-5 w-5 mb-1" />
                      <span className="text-sm font-bold">
                        {showtime.showTime}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Seat Selection */}
        {selectedTime && (
          <section className="mb-10 bg-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-black mb-6 animate-bounce">
              Select Seats
            </h2>
            <div className="bg-gray-300 p-8 rounded-lg">
              <div className="w-full h-4 bg-gray-600 rounded mb-10 relative flex items-center justify-center">
                <span className="text-white font-bold text-lg">SCREEN</span>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {(() => {
                  const selectedShowtime = filteredShowtimes.find(
                    (showtime) => showtime.showTime === selectedTime
                  );
                  const isRainSquare = selectedShowtime?.screen === 2;

                  return isRainSquare
                    ? generateSeatsRainSquare().map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex justify-center gap-4"
                        >
                          <div className="flex gap-3">
                            {row.slice(0, 8).map((seat) => (
                              <button
                                key={seat}
                                onClick={() => handleSeatClick(seat)}
                                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${getSeatColor(
                                  seat
                                )}`}
                              >
                                {seat}
                              </button>
                            ))}
                          </div>
                          <div className="w-32" />
                          <div className="flex gap-3">
                            {row.slice(8).map((seat) => (
                              <button
                                key={seat}
                                onClick={() => handleSeatClick(seat)}
                                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${getSeatColor(
                                  seat
                                )}`}
                              >
                                {seat}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    : generateSeatsMGB().map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex justify-center gap-4"
                        >
                          <div className="flex gap-3">
                            {row.slice(0, 6).map((seat) => (
                              <button
                                key={seat}
                                onClick={() => handleSeatClick(seat)}
                                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${getSeatColor(
                                  seat
                                )}`}
                              >
                                {seat}
                              </button>
                            ))}
                          </div>
                          <div className="w-16" />
                          <div className="flex gap-3">
                            {row.slice(6).map((seat) => (
                              <button
                                key={seat}
                                onClick={() => handleSeatClick(seat)}
                                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${getSeatColor(
                                  seat
                                )}`}
                              >
                                {seat}
                              </button>
                            ))}
                          </div>
                        </div>
                      ));
                })()}
              </div>
            </div>
          </section>
        )}

        <button
          className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-indigo-700 disabled:bg-gray-400"
          disabled={
            !selectedDate ||
            !selectedScreen ||
            !selectedTime ||
            selectedSeats.length === 0
          }
          onClick={handleSummary}
        >
           Book Now
        </button>

        {/* Booking Summary */}
        {showSummary && (
          <><div className="border-t border-gray-300 pt-4 mt-4 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Booking Summary:
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Date:</strong> {selectedDate || "Not selected"}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Screen:</strong> {selectedScreen || "Not selected"}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Showtime:</strong> {selectedTime || "Not selected"}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Seats:</strong>{" "}
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "Not selected"}
            </p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-lg font-medium text-gray-800">
                <strong>Ticket Price:</strong> ₹{SEAT_PRICE} x{" "}
                {selectedSeats.length}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <strong>Convenience Fee:</strong> ₹{CONVENIENCE_FEE}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-800 mt-4 mb-2">
              Total: ₹{calculateTotal()}
            </p>
          </div><button
            className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-indigo-700 disabled:bg-gray-400"
            disabled={!selectedDate ||
              !selectedScreen ||
              !selectedTime ||
              selectedSeats.length === 0}
            onClick={handleBooking}
          >
              Confirm Booking
            </button></>
        )}


      </div>
    </div>
  );
};

export default BookingPage;
