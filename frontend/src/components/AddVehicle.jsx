import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const AddVehicle = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [previewImage, setPreviewImage] = useState(null);


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const response = await axios.post('http://192.168.137.153:8000/api/v1/users/truck/add-truck', {
        vehicleNumber: data.vehicleNumber,
        modelNumber: data.vehicleModel,
        driverName: data.driverName,
        driverContact: data.driverNumber,
        driverPhoto: data.driverImage
      } , {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log('Registration Vehicle successful:', response.data);
    } catch (error) {
      console.error('Registration Vehicle error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // const onSubmit = async (data) => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("vehicleModel", data.vehicleModel);
  //     formData.append("vehicleNumber", data.vehicleNumber.toUpperCase());
  //     formData.append("driverName", data.driverName);
  //     formData.append("driverNumber", data.driverNumber);
  //     formData.append("driverImage", data.driverImage[0]);
  //     formData.append("userId", userData._id);

  //     // Add API call here
  //     // const response = await addVehicle(formData);
      
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Error adding vehicle:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://media.istockphoto.com/id/183280225/photo/pile-of-black-coal-pieces.jpg?s=2048x2048&w=is&k=20&c=7mEDG68LxiI96sZdkn_me_dw_GnSNXMrK7y-gkslbzQ=')`
      }}
    >
      <div className="max-w-3xl w-full bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Add New Vehicle
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Fill in the details to register a new vehicle
          </p>
        </div>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Grid Layout for Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "vehicleModel",
                label: "Vehicle Model",
                type: "text",
                placeholder: "e.g., Toyota Camry",
                validation: { required: "Vehicle model is required" },
              },
              {
                name: "vehicleNumber",
                label: "Vehicle Number",
                type: "text",
                placeholder: "XX-00-XX-0000",
                validation: {
                  required: "Vehicle number is required",
                  pattern: {
                    value: /^[A-Z]{2}[-][0-9]{2}[-][A-Z]{2}[-][0-9]{4}$/,
                    message: "Invalid vehicle number format (XX-00-XX-0000)",
                  },
                },
              },
              {
                name: "driverName",
                label: "Driver Name",
                type: "text",
                placeholder: "Enter driver's name",
                validation: { required: "Driver name is required" },
              },
              {
                name: "driverNumber",
                label: "Driver Phone Number",
                type: "text",
                placeholder: "Enter 10-digit phone number",
                validation: {
                  required: "Driver phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number format",
                  },
                },
              },
            ].map((field) => (
              <div key={field.name} className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  {...register(field.name, field.validation)}
                  className={`appearance-none rounded-lg relative block w-full px-4 py-3 
                    bg-gray-700/50 backdrop-blur-sm border 
                    ${errors[field.name] ? 'border-red-500' : 'border-gray-600'} 
                    placeholder-gray-400 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all duration-300 sm:text-sm
                    hover:border-gray-500`}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <p className="mt-2 text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>
  
          {/* Driver Image Upload */}
          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Driver Image
            </label>
            
            <div className="flex flex-col items-center space-y-4">
              {/* Image Preview */}
              <div className="relative group">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Driver preview"
                    className="h-48 w-48 rounded-lg object-cover border-2 border-blue-400 shadow-lg"
                  />
                ) : (
                  <div className="h-48 w-48 rounded-lg bg-gray-700/50 border-2 border-gray-600 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              {/* File Input */}
              <div className="flex flex-col items-center space-y-2">
                <label 
                  htmlFor="driver-image" 
                  className="px-4 py-2 bg-gray-700 text-blue-400 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-300"
                >
                  Choose Image
                </label>
                <span className="text-gray-400 text-sm">
                  {previewImage ? 'Image selected' : 'No image chosen'}
                </span>
                <input
                  id="driver-image"
                  type="file"
                  accept="image/*"
                  {...register("driverImage", {
                    required: "Driver image is required",
                  })}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Error Message */}
            {errors.driverImage && (
              <p className="text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md mt-2">
                {errors.driverImage.message}
              </p>
            )}
          </div>
  
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent 
                text-sm font-medium rounded-lg text-white shadow-lg
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed opacity-75' 
                  : 'bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/25'
                } 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 focus:ring-offset-gray-900`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding Vehicle...
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Add Vehicle</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>
  
        </form>
      </div>
  
      {/* Optional: Add a floating notification for successful submission */}
      {loading && (
        <div className="fixed bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg border border-gray-700/50 flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing your request...</span>
        </div>
      )}
    </div>
  );
};

export default AddVehicle;