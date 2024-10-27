import React, { useState, useEffect } from 'react';
import LineChartComponent from './LineChartComponent';
import axios from 'axios'; // Make sure to install axios: npm install axios

function LineChart(apiaddress, labeltext, minValue, maxValue, dataType) {
    const [currentDataPoint, setCurrentDataPoint] = useState(null);
    const [isDataAvailable, setIsDataAvailable] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiaddress);
                const newDataPoint = response.data.dataType; // Adjust this based on your API response structure
                
                if (newDataPoint !== undefined) {
                    setCurrentDataPoint(newDataPoint);
                } else {
                    setIsDataAvailable(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsDataAvailable(false);
            }
        };

        const interval = setInterval(() => {
            if (isDataAvailable) {
                fetchData();
            }
        }, 1000); // Fetch new data every second

        return () => clearInterval(interval);
    }, [isDataAvailable]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <LineChartComponent newDataPoint={currentDataPoint} labeltext={labeltext} maxValue={maxValue} minValue={minValue}/>
        </div>
    );
}

export default LineChart;