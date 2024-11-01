import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VehicleCard, UserDashboard } from "../components/index";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const User = () => {
  let [trucks, setTrucks] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  trucks = [
    { vehicleNumber: 'TRK-001', status: true },
    { vehicleNumber: 'TRK-002', status: false },
    { vehicleNumber: 'TRK-003', status: true },
    { vehicleNumber: 'TRK-004', status: false },
    { vehicleNumber: 'TRK-005', status: true },
    { vehicleNumber: 'TRK-006', status: false },
    { vehicleNumber: 'TRK-007', status: true },
    { vehicleNumber: 'TRK-008', status: true },
    { vehicleNumber: 'TRK-009', status: false },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Adjust if the token is stored differently

      try {
        // Fetch User Data
        const userResponse = await axios.get('http://localhost:8000/api/v1/users/user/current-user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(userResponse.data.data);

        // Fetch Truck Data
        const trucksResponse = await axios.get('http://localhost:8000/api/v1/users/truck/list-owner-trucks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTrucks(trucksResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8">
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
                to="/addvehicle"
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
                      // userId={userData._id}
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
                    No Vehicle Availabe
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













