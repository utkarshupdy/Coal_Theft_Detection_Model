import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LineChart, Map } from '../components/index';
import axios from 'axios';
import LineChartFinal  from './LineChartFinal'
import MapFinal  from './MapFinal'
import { useLocation ,Link, useNavigate } from 'react-router-dom'



// import driver from './driver'


const Analyzer = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { vehicleNumber, vehicleModel, driverName, driverNumber, userId, status } = location.state || {};
  console.log(vehicleNumber);
  console.log(vehicleModel);
  console.log(driverName);
  console.log(driverNumber);
  console.log(userId);

  if (!vehicleNumber || !userId) {
    navigate('/'); // Redirect to a fallback route if data is missing
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Assuming the access token is stored in localStorage
        const response = await axios.get('http://localhost:8000/api/v1/users/user/current-user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching UserData:', error);
      }
    };

    fetchUserData();
  }, []);
  console.log(userData);
  
  // const vehicle = userData?.vehicles?.find(v => v.vehicleNumber === vehicleNumber);
  // console.log(vehicle);

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-400/10 text-green-400'
      : 'bg-red-400/10 text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto space-y-6 px-4 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Analysis for Vehicle: {vehicleNumber}
          </h1>
        </div>

        {/* Top Section - Vehicle Details and Map */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Vehicle and Owner Details Dashboard */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Vehicle Details</h2>
              <div className="space-y-3">
                {[
                  { label: 'Vehicle Number', value: `${vehicleNumber}` },
                  { label: 'Vehicle Model', value: `${vehicleModel}` },
                ].map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3">
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                ))}
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
                    {true}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4 text-white">Driver Details</h2>
              <div className="space-y-3">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
                    <img 
                      src={"https://img.freepik.com/premium-photo/portrait-happy-male-smiling-truck-driver-container-ai-generated_868783-25487.jpg"} 
                      alt="Driver" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {[
                  { label: 'Driver Name', value: `${driverName}` },
                  { label: 'Contact Number', value: `${driverNumber}` },
                ].map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3">
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4 text-white">Owner Details</h2>
              <div className="space-y-3">
                {[
                  { label: 'Name', value: userData ? `${userData.fullName}` : "Please Login" },
                  // { label: 'Name', value: "XYZ" },
                  // { label: 'Contact', value: "666666666" },
                  { label: 'Contact', value: userData ?`${userData.contact}` : "Please Login" },
                ].map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3">
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 h-full min-h-[500px]">
              <h2 className="text-xl font-semibold mb-4 text-white">Live Location</h2>
              <MapFinal />
            </div>
          </div>
        </div>

        {/* Bottom Section - Line Chart */}
        <div className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Real Time Charts</h2>
          {/* <div className="h-full">
              <LineChart apiaddress={'http://192.168.137.1:8000/api/v1/users/current-user'} labelText={'Weight Data'} dataType={'Weight'} /> 
          </div>
          <div className="h-full">
              <LineChart apiaddress={'http://192.168.137.1:8000/api/v1/users/current-user'} labelText={'Humidity Data'} dataType={'Humidity'} /> 
          </div>
          <div className="h-full">
              <LineChart apiaddress={'http://192.168.137.1:8000/api/v1/users/current-user'} labelText={'Temperature Data'} dataType={'Temperature'} /> 
          </div> */}
            <LineChartFinal />
        </div>
      </div>
    </div>
  );
};

export default Analyzer;