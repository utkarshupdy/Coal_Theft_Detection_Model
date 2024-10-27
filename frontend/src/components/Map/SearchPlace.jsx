import React, { useState, useEffect } from 'react';

const SearchPlace = ({ setLocation }) => {
  const [searchPlace, setSearchPlace] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch suggestions
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchPlace);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchPlace]);

  const handleSelectSuggestion = async (suggestion) => {
    setSearchPlace(suggestion.display_name);
    setSuggestions([]);
    const coordinates = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon)
    };
    setLocation(coordinates); // Set the location in the parent component
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchPlace}
        onChange={(e) => setSearchPlace(e.target.value)}
        placeholder="Enter location"
        className="p-2 text-lg border rounded border-gray-300 w-full box-border"
      />
      
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded max-h-52 overflow-y-auto z-50 shadow-md">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer border-b border-gray-200 hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}

      {error && <div class ="text-red-500 mb-2">{error}</div>}
    </div>
  );
};

export default SearchPlace;