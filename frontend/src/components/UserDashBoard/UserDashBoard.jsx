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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-blue-400">
              <img
                src={avatar}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Information */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold w-32 text-gray-400">Name:</span>
                  <span className="text-white">{fullName}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32 text-gray-400">Trucks Owned:</span>
                  <span className="text-white">{numberOfTrucks}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold w-32 text-gray-400">Phone:</span>
                  <span className="text-white">{contact}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32 text-gray-400">Email:</span>
                  <span className="text-white">{email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;