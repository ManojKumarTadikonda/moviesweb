const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Movies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Movies</a></li>
              <li><a href="#" className="hover:text-white">Videos</a></li>
              <li><a href="#" className="hover:text-white">English Movies</a></li>
              <li><a href="#" className="hover:text-white">Tailor</a></li>
              <li><a href="#" className="hover:text-white">Upcoming Movies</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Tv Series</a></li>
              <li><a href="#" className="hover:text-white">Blogs</a></li>
              <li><a href="#" className="hover:text-white">Login</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-4">Locations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Asia</a></li>
              <li><a href="#" className="hover:text-white">France</a></li>
              <li><a href="#" className="hover:text-white">Taiwan</a></li>
              <li><a href="#" className="hover:text-white">United States</a></li>
              <li><a href="#" className="hover:text-white">Korea</a></li>
              <li><a href="#" className="hover:text-white">United Kingdom</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Enter your email and receive the latest news, updates and special offers from us.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-gray-800 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;