import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-pink-600">🎂 Hope Epicure</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
              Admin
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-pink-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-pink-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
