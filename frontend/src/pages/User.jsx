import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VehicleCard, UserDashboard } from "../components/index";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const User = () => {
  const [trucks, setTrucks] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get('http://192.168.137.153:8000/api/v1/users/truck/list-owner-trucks');
        setTrucks(response.data.data);
      } catch (error) {
        console.error('Error fetching trucks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.137.153:8000/api/v1/users/current-user');
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching UserData:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - UserDashboard */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 sticky top-4">
              <UserDashboard user={userData} />
            </div>
          </div>

          {/* Right Content - Vehicles Section */}
          <div className="lg:w-3/4 w-full space-y-8">
            {/* Header Section with Add Vehicle Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-white">My Vehicles</h2>
              <Link
                to="/add-vehicle"
                className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto justify-center"
              >
                <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Add New Vehicle</span>
              </Link>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              // Vehicles Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {trucks.map((truck) => (
                  <div 
                    key={truck.vehicleNumber}
                    className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <VehicleCard
                      vehicleNumber={truck.vehicleNumber}
                      status={truck.status}
                      userId={userData._id}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && trucks.length === 0 && (
              <div className="text-center py-16 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-6 px-4">
                  <div className="text-gray-400 text-6xl mb-4 animate-bounce">
                    🚛
                  </div>
                  <p className="text-gray-300 text-xl mb-4">
                    Your fleet is empty! Start by adding your first vehicle.
                  </p>
                  <Link
                    to="/addvehicle"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaPlus className="text-sm" />
                    <span>Add your first vehicle</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
