import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('Form submitted:', data); // Log the data

    try {
      // Define credentials object
      const credentials = {
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(
        'http://localhost:8000/api/v1/users/user/login',
        credentials,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      

      console.log('Login successful:', response.data);
      navigate("/user");
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     console.log('Form submitted:', data);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <div 
      className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://media.istockphoto.com/id/183280225/photo/pile-of-black-coal-pieces.jpg?s=2048x2048&w=is&k=20&c=7mEDG68LxiI96sZdkn_me_dw_GnSNXMrK7y-gkslbzQ=')`
      }}
    >
      <div className="max-w-2xl w-full space-y-10 bg-gray-800/90 backdrop-blur-sm p-12 rounded-xl shadow-2xl border border-gray-700/50">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Sign in to your account
          </h2>
          <p className="mt-4 text-center text-base text-gray-400">
            Or{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-400 hover:text-cyan-400 transition-colors duration-300"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email',
                  },
                })}
                className={`appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700/50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700/50 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base`}
                placeholder="Password" 
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 bg-red-400/10 px-3 py-1 rounded-md">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-5 w-5 text-blue-400 focus:ring-blue-500 bg-gray-700/50 border-gray-600 rounded"
                />
                <label htmlFor="rememberMe" className="ml-3 block text-base text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-base">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white shadow-lg
                ${isLoading 
                  ? 'bg-gray-600 cursor-not-allowed opacity-75' 
                  : 'bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/25'
                } 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900`}
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
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;