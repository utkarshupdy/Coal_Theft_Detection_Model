// MapTracking.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const MapTracking = ({ startPosition, endPosition, currentPosition }) => {
  const mapRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Initial map setup
  useEffect(() => {
    // Fix for default marker icon
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Create map instance
    const map = L.map('map').setView(startPosition, 13);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add start and end markers
    const startMarker = L.marker(startPosition).addTo(map);
    const endMarker = L.marker(endPosition).addTo(map);

    // Add current position marker
    const currentMarker = L.marker(currentPosition, {
      icon: L.divIcon({
        className: 'current-location-marker',
        html: '<div style="background-color: #2196f3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>'
      })
    }).addTo(map);
    currentMarkerRef.current = currentMarker;

    // Add routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPosition),
        L.latLng(endPosition)
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [
          { color: '#6FA1EC', weight: 4 }
        ]
      },
      show: false // Hide the routing control panel
    }).addTo(map);

    // Add popups
    startMarker.bindPopup('Start Location').openPopup();
    endMarker.bindPopup('End Location');
    currentMarker.bindPopup('Current Location');

    // Fit bounds to show all markers
    const bounds = L.latLngBounds([startPosition, endPosition, currentPosition]);
    map.fitBounds(bounds, { padding: [50, 50] });

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Update only the current position marker
  useEffect(() => {
    if (currentMarkerRef.current) {
      currentMarkerRef.current.setLatLng(currentPosition);
    }
  }, [currentPosition]);

  return (
    <div id="map" ref={mapRef} style={{ height: '500px', width: '100%', borderRadius: '8px' }}></div>
  );
};

export default MapTracking;