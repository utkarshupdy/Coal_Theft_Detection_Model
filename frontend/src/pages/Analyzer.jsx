import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LineChart, Map } from '../components/index';
import axios from 'axios';
import LineChartFinal  from './LineChartFinal'
import MapFinal  from './MapFinal'
// import driver from './driver'

const Analyzer = () => {
  const { userId, vehicleNumber } = useParams();
  // const userData = useSelector((state) => state.auth.userData);

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://172.22.120.71:8000/api/v1/users/current-user');
        setUserData(response.data.data);
        console.log(userData)
      } catch (error) {
        console.error('Error fetching UserData:', error);
      }
    };

    fetchUserData();
  }, []);
  
  const vehicle = userData?.vehicles?.find(v => v.vehicleNumber === vehicleNumber);

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
            Analysis for Vehicle: CG-04-AB-1234
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
                  { label: 'Vehicle Number', value: "CG-04-AB-1234" },
                  { label: 'Vehicle Model', value: "Ashoka LeyLand" },
                ].map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3">
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                ))}
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(vehicle?.status)}`}>
                    {true}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4 text-white">Driver Details</h2>
              <div className="space-y-3">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
                    <img 
                      src={vehicle?.driverImage} 
                      alt="Driver" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {[
                  { label: 'Driver Name', value: "Chirag Garg" },
                  { label: 'Contact Number', value: "987678978" },
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
                  { label: 'Name', value: "Tushar Paik" },
                  { label: 'Contact', value: "9878967808" },
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