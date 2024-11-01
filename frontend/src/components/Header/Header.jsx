import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaTruck } from 'react-icons/fa';
import LogoutBtn from './LogoutBtn';
import NavBtn from './NavBtn';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => location.pathname === path;

  const navLinks = [
    { 
      to: '/', 
      text: 'Home', 
      active: true
    },
    { 
      to: authStatus ? '/analyzer' : '/', 
      text: 'Analyze Rock',
      active: authStatus
    },
    { 
      to: '/login', 
      text: 'Login',
      active: !authStatus
    },
    { 
      to: '/signup', 
      text: 'Sign Up',
      active: !authStatus
    },
    { 
      to: '/analyzer', 
      text: 'Analyze',
      active: true
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm text-white shadow-lg z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20"> {/* Responsive height */}
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-4"> 
            <Link 
              to="/" 
              className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
            >
              Coal Theft Detector 
            </Link>
            <FaTruck className="text-2xl md:text-3xl text-blue-400 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-110" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.active && (
                <NavBtn
                  key={link.to}
                  to={link.to}
                  text={link.text}
                  isActive={isActiveLink(link.to)}
                />
              )
            ))}
            {authStatus && <LogoutBtn />}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6 text-blue-400`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6 text-blue-400`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            link.active && (
              <NavBtn
                key={link.to}
                to={link.to}
                text={link.text}
                isActive={isActiveLink(link.to)}
                onClick={toggleMenu}
              />
            )
          ))}
          {authStatus && <LogoutBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;