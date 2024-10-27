// NavButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ to, text, isActive, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        px-4 py-2
        md:px-5 md:py-2.5
        rounded-lg 
        font-medium 
        transition-all 
        duration-300
        text-base
        md:text-lg
        relative 
        overflow-hidden 
        group 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
        ${isActive
          ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-lg hover:shadow-blue-500/25'
          : 'text-gray-300 hover:text-white'
        }
        hover:transform 
        hover:scale-105
        active:scale-95
      `}
    >
      <span className="relative z-10">{text}</span>
      <div 
        className={`
          absolute 
          inset-0 
          h-full 
          w-full 
          bg-gradient-to-r 
          from-blue-400 
          to-cyan-400 
          opacity-0 
          group-hover:opacity-10 
          transition-opacity 
          duration-300
          ${!isActive && 'group-hover:opacity-20'}
        `}
      />
    </Link>
  );
};

export default NavButton;