import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchPlace } from './index';

const VehicleJourney = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  // const onSubmit = async (data) => {
  //   const journeyData = {
  //     vehicleNumber: data.vehicleNumber,
  //     startLocation,
  //     endLocation
  //   };

  //   console.log('Submitted Data:', journeyData);
  //   // Here you can handle the submission, e.g., send it to an API
  // };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(' http://localhost:8000/api/v1/users/truck/start-truck-journey', {
        vehicleNumber: data.vehicleNumber,
        startLocation: data.startLocation,
        endLocation: data.endLocation
      });
      navigate("/user")
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://media.istockphoto.com/id/183280225/photo/pile-of-black-coal-pieces.jpg?s=2048x2048&w=is&k=20&c=7mEDG68LxiI96sZdkn_me_dw_GnSNXMrK7y-gkslbzQ=')`
      }}
    >
      <div className="max-w-2xl w-full space-y-10 bg-gray-800/90 backdrop-blur-sm p-12 rounded-xl shadow-2xl border border-gray-700/50">
        <h2 className="mt-6 text-center text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Vehicle Journey
        </h2>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="vehicleNumber" className="block text-base font-medium text-gray-300 mb-2">
                Vehicle Number
              </label>
              <input
                id="vehicleNumber"
                type="text"
                {...register('vehicleNumber', { required: 'Vehicle number is required' })}
                className={`appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700/50 border ${
                  errors.vehicleNumber ? 'border-red-500' : 'border-gray-600'
                } placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base`}
                placeholder="Vehicle Number"
              />
              {errors.vehicleNumber && (
                <p className="mt-2 text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md">{errors.vehicleNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-base font-medium text-gray-300">Start Location</label>
              <SearchPlace setLocation={setStartLocation} />
            </div>

            <div>
              <label className="block mb-2 text-base font-medium text-gray-300">End Location</label>
              <SearchPlace setLocation={setEndLocation} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white shadow-lg bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Submit Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleJourney;