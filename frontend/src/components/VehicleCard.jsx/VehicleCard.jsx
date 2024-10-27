// components/VehicleCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VehicleCard = ({ vehicleNumber, status, userId }) => {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const getStatusStyles = () => {
    switch (status) {
      case true:
        return {
          background: 'bg-gradient-to-r from-green-500/10 to-green-600/10',
          border: 'border-green-400',
          text: 'text-green-400'
        };
      case false:
        return {
          background: 'bg-gradient-to-r from-gray-500/10 to-gray-600/10',
          border: 'border-gray-400',
          text: 'text-gray-400'
        };
    }
  };

  // const handleClick = () => {
  //   if (user && user.id === userId) {
  //     navigate(`/analysis/${userId}/${vehicleNumber}`);
  //   } else {
  //     navigate('/unauthorized');
  //   }
  // };
  const handleClick = () => {
      navigate(`/analysis/${userId}/${vehicleNumber}`);
  };

  const statusStyle = getStatusStyles();

  return (
    <div 
      onClick={handleClick}
      className={`
        ${statusStyle.background}
        bg-gray-800
        rounded-lg
        border
        ${statusStyle.border}
        p-4
        shadow-lg
        transition-all
        duration-300
        ease-in-out
        cursor-pointer
        hover:shadow-xl
        hover:scale-105
        hover:border-blue-400
        group
        relative
        overflow-hidden
      `}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className={`
          text-xl
          font-bold
          ${statusStyle.text}
          group-hover:text-white
          transition-colors
          duration-300
        `}>
          {vehicleNumber}
        </h3>

        {/* Status Indicator */}
        <div className={`
          absolute
          top-2
          right-2
          w-2
          h-2
          rounded-full
          ${status === true ? 'bg-green-400' : 
            status === false ? 'bg-gray-400' : 'bg-red-400'}
          animate-pulse
        `} />
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  vehicleNumber: PropTypes.string.isRequired,
  status: PropTypes.oneOf([true, false]).isRequired,
  userId: PropTypes.string.isRequired,
};

export default VehicleCard;