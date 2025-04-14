import React from 'react';
import { Link } from 'react-router-dom'; 

import './AboutPage.css'; 

const AboutPage: React.FC = () => {
    return (
        <div>
            <div className="team">
                <h2>Meet Our Team 🚀</h2>
                <div className="team-members">
                <div className="team-card" >
                        <img src="../src/assets/Manoj.jpg" alt="Manoj" />

                        <h3>Manoj</h3>
                        <p>Scrum Master</p>
                    </div> 
                    
                    <div className="team-card">
                        <img src="../src/assets/Dattu.jpg" alt="Dattu" />

                        <h3>Dattu</h3>
                        <p>Product Manager</p>
                    </div>
                    <div className="team-card">
                        <img src="../src/assets/Malli.jpg" alt="Mallika" />

                        <h3>Mallika</h3>
                        <p>Developer</p>
                    </div>
                    <div className="team-card">
                        <img src="../src/assets/Rajya.jpg" alt="Rajya Lakshmi" />

                        <h3>Rajya Lakshmi</h3>
                        <p>Developer</p>
                    </div>
                    <div className="team-card">
                        <img src="../src/assets/Nikhi.jpg" alt="Nikhila" />

                        <h3>Nikhila</h3>
                        <p>Developer</p>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="hero">
                <h1>🎬 Experience the Magic of Movies at Vasu Cinemas 🍿</h1>
                <p>India's leading cinema chain, redefining movie-watching with luxury, technology, and unforgettable experiences.</p>
                <Link to={`/movies`}>
                    <button className="hero-btn">🎟️ Book Your Tickets Now</button>
                </Link>

            </div>

            {/* About Section */}
            <div className="about">
                <h2>Our Love for Cinema ❤️</h2>
                <p>Movies are more than just entertainment; they are an experience, a journey into different worlds, emotions, and perspectives. At Vasu Cinemas, we bring this experience to life with world-class auditoriums, crystal-clear visuals, and immersive sound.</p>
                
                <h2>The Pride of Vasu Cinemas 🎬</h2>
                <p>Founded in 1997, Vasu Cinemas has set a new benchmark in the Indian film exhibition industry. With cutting-edge projection technology, luxurious seating, and gourmet food options, Vasu offers an unparalleled movie-going experience. Whether it's IMAX, 4DX, or Gold Class, Vasu continues to push the boundaries of cinematic excellence.</p>
                
                <h2>Technology & Comfort 🎞️</h2>
                <p>Vasu Cinemas is at the forefront of innovation, bringing you the best in entertainment technology. From state-of-the-art 4K projection to Dolby Atmos sound, every screening is a visual and auditory delight. Our recliner seating and premium auditoriums ensure maximum comfort, making every movie special.</p>
                
                <h2>Celebrating Indian & Global Cinema 🌍</h2>
                <p>With a rich legacy of showcasing both Indian and international films, Vasu plays a vital role in promoting cinema culture. From Bollywood blockbusters to indie gems and Hollywood spectacles, Vasu celebrates the diversity of storytelling across the world.</p>
            </div>

            {/* Team Section */}
            
            {/* Testimonial Section */}
            <div className="testimonial">
                <h3>What Our Viewers Say 😊</h3>
                <p>"Watching a movie at Vasu is an experience like no other! The sound, the picture quality, the comfort—everything is top-notch!" – Rajesh K.</p>
                <p>"Vasu has transformed cinema in India. The IMAX experience is simply breathtaking!" – Sneha M.</p>
            </div>

            {/* Call to Action */}
            <Link to={`/movies`}>
            <div className="cta">
                <button>🎥 Book Your Experience Now 🍿</button>
            </div>
            </Link>
            {/* Footer */}
            <div className="footer">
                <p>&copy; 2025 Vasu Cinemas. All Rights Reserved. 🎬</p>
            </div>
        </div>
    );
};

export default AboutPage;
