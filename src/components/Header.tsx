import { Search, User, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [activeMenu, setActiveMenu] = useState<string>('Home');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (_id: string, name: string, token: string,email :string) => {
    localStorage.setItem('_id', _id);
    localStorage.setItem('username', name);
    localStorage.setItem('token', token);
    localStorage.setItem('email',email);
    setUsername(name);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUsername('');
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-pink-600">Vasu Cinemas</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Movies', 'About', 'My bookings'].map((item) => (
                <Link
                  key={item}
                  to={`/${item === 'Home' ? '' : item}`} 
                  className={`text-${activeMenu === item ? 'pink-600' : 'gray-600'} hover:text-pink-600`}
                  onClick={() => setActiveMenu(item)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Search & User Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* User Section */}
              {username ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium">{username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <User
                    className="h-6 w-6 text-gray-600 cursor-pointer"
                    onClick={() => openAuthModal('login')}
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* Dark Mode Toggle */}
              <Moon className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={(mode) => setAuthMode(mode)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
