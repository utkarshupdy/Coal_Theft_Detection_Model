import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      profilePicture: null,
      acceptTerms: false,
    },
  });

  const password = watch('password');

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

  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     // Add your signup logic here
  //     console.log('Form submitted:', data);
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/v1/users/user/register', {
  //       email: data.email,
  //       password: data.password,
  //       fullName: data.name,
  //       contact: data.phoneNumber,
  //       avatar: data.profilePicture
  //     });
  //     navigate("/")
  //     console.log('Register User successful:', response.data);
  //   } catch (error) {
  //     console.error('Register User error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setIsLoading(true);
  
    try {
      const requestBody = {
        fullName: data.name,
        email: data.email,
        contact: data.phoneNumber,
        password: data.password,
      };
  
      // If an avatar is provided, handle it properly
      if (data.profilePicture && data.profilePicture[0]) {
        const file = data.profilePicture[0];
        const reader = new FileReader();
  
        // Convert the file to a Base64 string
        reader.onloadend = async () => {
          requestBody.avatar = reader.result; // Add avatar to requestBody as Base64 string
  
          // Make the API call
          const response = await axios.post('http://localhost:8000/api/v1/users/user/register', requestBody, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          navigate('/login');
          console.log('Register User successful:', response.data);
        };
  
        reader.readAsDataURL(file);
      } else {
        // If no avatar is provided, make the API call directly
        const response = await axios.post('http://localhost:8000/api/v1/users/user/register', requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        navigate('/login');
        console.log('Register User successful:', response.data);
      }
    } catch (error) {
      console.error('Register User error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://media.istockphoto.com/id/183280225/photo/pile-of-black-coal-pieces.jpg?s=2048x2048&w=is&k=20&c=7mEDG68LxiI96sZdkn_me_dw_GnSNXMrK7y-gkslbzQ=')`
      }}
    >
      <div className="max-w-5xl w-full bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
        <div className="mb-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </div>
  
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Profile Picture */}
            <div className="flex flex-col items-center justify-start space-y-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <div className="w-full text-center">
                <label className="block text-lg font-medium text-gray-300 mb-6">
                  Profile Picture
                </label>
                {/* <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="h-48 w-48 rounded-full object-cover border-4 border-blue-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-48 w-48 rounded-full bg-gray-700/50 border-4 border-gray-600 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400">
                        <span className="text-gray-400 text-lg">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm">Change Picture</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('profilePicture')}
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-400 
                      file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 
                      file:text-sm file:font-medium file:bg-gray-700 file:text-blue-400 
                      hover:file:bg-gray-600 file:transition-colors file:duration-300
                      focus:outline-none cursor-pointer"
                  />
                </div> */}
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="relative group">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="h-60 w-60 rounded-full object-cover border-4 border-blue-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-60 w-60 rounded-full bg-gray-700/50 border-4 border-gray-600 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400">
                        <span className="text-gray-400 text-lg">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm">Change Picture</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2 w-full">
                    <label 
                      htmlFor="file-upload" 
                      className="px-4 py-2 bg-gray-700 text-blue-400 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-300"
                    >
                      Choose File
                    </label>
                    <span className="text-gray-400 text-sm">
                      {previewImage ? 'File chosen' : 'No file chosen'}
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      {...register('profilePicture')}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Column - Form Fields */}
            <div className="space-y-5">
              {['name', 'phoneNumber', 'email', 'password'].map((field) => (
                <div key={field} className="group">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-300 capitalize mb-2">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    id={field}
                    type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                    {...register(field, {
                      required: `${field.replace(/([A-Z])/g, ' $1').trim()} is required`,
                      ...(field === 'email' && {
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Invalid email address',
                        },
                      }),
                      ...(field === 'password' && {
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      }),
                    })}
                    className={`appearance-none rounded-lg relative block w-full px-4 py-3 
                      bg-gray-700/50 backdrop-blur-sm border 
                      ${errors[field] ? 'border-red-500' : 'border-gray-600'} 
                      placeholder-gray-400 text-white 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-300 sm:text-sm
                      hover:border-gray-500`}
                    placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                  />
                  {errors[field] && (
                    <p className="mt-2 text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md">
                      {errors[field].message}
                    </p>
                  )}
                </div>
              ))}
  
              {/* Accept Terms */}
              {/* <div className="flex items-center mt-6">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  {...register('acceptTerms', {
                    required: 'You must accept the terms and conditions',
                  })}
                  className="h-5 w-5 text-blue-400 focus:ring-blue-500 bg-gray-700/50 border-gray-600 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-3 block text-sm text-gray-300">
                  I accept the{' '}
                  <a href="#" className="text-blue-400 hover:text-cyan-400 transition-colors duration-300">
                    terms and conditions
                  </a>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="mt-2 text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md">
                  {errors.acceptTerms.message}
                </p>
              )} */}
            </div>
          </div>

          <div className="mt-8">
          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent 
              text-sm font-medium rounded-lg text-white shadow-lg
              ${isLoading 
                ? 'bg-gray-600 cursor-not-allowed opacity-75' 
                : 'bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/25'
              } 
              transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 focus:ring-offset-gray-900`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Sign up'
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default Signup;


{/* Accept Terms */}
{/* <div className="flex items-center">
  <input
    id="acceptTerms"
    type="checkbox"
    {...register('acceptTerms', {
      required: 'You must accept the terms and conditions',
    })}
    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
  />
  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
    I accept the{' '}
    <a href="#" className="text-blue-600 hover:text-blue-500">
      terms and conditions
    </a>
  </label>
  {errors.acceptTerms && (
    <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
  )}
</div> */}
