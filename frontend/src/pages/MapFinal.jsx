import { useState, useEffect } from 'react';
import MapTracking from './MapTracking';
import jsondataset from './positions.json';

const positions = jsondataset.map(pos => pos);

function MapFinal() {
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(positions[0]);
  const [isPlaying, setIsPlaying] = useState(true);


  const startLocation = {
    lat: 21.250000,
    lng: 81.629997
  };

  const endLocation = {
    lat: 25.473034,
    lng: 81.878357
  };

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentPosIndex(prevIndex => {
          if (prevIndex >= positions.length - 1) {
            setIsPlaying(false);
            return prevIndex;
          }
          setCurrentPosition(positions[prevIndex + 1]);
          return prevIndex + 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handleReset = () => {
    setCurrentPosIndex(0);
    setCurrentPosition(positions[0]);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <h1>Route Map</h1> */}
      {/* <div style={{ marginBottom: '20px' }}>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
        <span style={{ marginLeft: '20px' }}>
          Position: {currentPosIndex + 1} of {positions.length}
        </span>
      </div> */}
      <MapTracking 
        startPosition={startLocation} 
        endPosition={endLocation} 
        currentPosition={currentPosition} 
      />
    </div>
  );
}

export default MapFinal;