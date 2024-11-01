import React from 'react';


const UserDashboard = ({ user }) => {
  const { fullName, contact, email, avatar, numberOfTrucks } = user;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          User Dashboard
        </h1>
      </div>

      {/* User Profile Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
        <div className="flex flex-col items-center">
          {/* Profile Photo */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-blue-400 mb-4">
            <img
              src={avatar}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Information */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center">
              <span className="font-semibold text-gray-400">Name:</span>
              <span className="text-white ml-2">Chirag Garg</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-semibold text-gray-400">Trucks Owned:</span>
              <span className="text-white ml-2">9</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-semibold text-gray-400">Phone:</span>
              <span className="text-white ml-2">9340129430</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-semibold text-gray-400">Email:</span>
              <span className="text-white ml-2">chirag@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default UserDashboard;