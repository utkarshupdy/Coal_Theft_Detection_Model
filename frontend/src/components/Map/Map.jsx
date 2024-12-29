import { useState, useEffect } from 'react';
import MapTracking from './MapTracking';

function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let intervalId;
    const fetchPosition = async () => {
      try {
        const response = await fetch('https://coal-theft-detection-model.onrender.com/api/v1/users/dataset/get-data-points'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentLocation(data.currentPosition);
        setStartLocation(data.startPosition);
        setEndLocation(data.endPosition);
      } catch (error) {
        console.error('Error fetching position:', error);
      }
    };

    if (isPlaying) {
      intervalId = setInterval(() => {
        fetchPosition();
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handleReset = () => {
    setCurrentLocation(null);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Route Map
        </h1>

        {/* Controls */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={handlePlayPause}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 
              ${isPlaying 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white'
              } 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
          >
            <div className="flex items-center space-x-2">
              {isPlaying ? (
                <>
                  <PauseIcon className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5" />
                  <span>Play</span>
                </>
              )}
            </div>
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 
              transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2"
          >
            <ResetIcon className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Map Container */}
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 overflow-hidden">
          {currentLocation ? (
            <MapTracking
              startPosition={startLocation}
              endPosition={endLocation}
              currentPosition={currentLocation}
            />
          ) : (
            <div className="h-[600px] flex items-center justify-center text-gray-400">
              <p>Loading map...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icon Components
const PlayIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PauseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ResetIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default Map;