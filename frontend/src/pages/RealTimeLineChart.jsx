import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RealTimeLineChart = ({ dataset, label }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: label,
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)', // Default color
                fill: true,
                segment: {
                    borderColor: (ctx) => {
                        const prev = ctx.p0.parsed.y; // Previous value
                        const curr = ctx.p1.parsed.y; // Current value
                        return curr > prev ? 'rgba(75, 192, 75, 1)' : 'rgba(255, 99, 132, 1)'; // Green for increase, red for decrease
                    },
                },
            },
        ],
    });

    const [index, setIndex] = useState(0);  // Track the index in the dataset

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const newLabel = now.toLocaleTimeString();

            // Ensure we don't exceed the dataset length
            if (index < dataset.length) {
                const newDataPoint = dataset[index];  // Fetch the next data point from the dataset

                setData(prevData => {
                    const updatedLabels = [...prevData.labels, newLabel];
                    const updatedData = [...prevData.datasets[0].data, newDataPoint];

                    // Limit the number of data points to the last 60
                    if (updatedLabels.length > 3600) {
                        updatedLabels.shift();
                        updatedData.shift();
                    }

                    return {
                        labels: updatedLabels,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: updatedData,
                            },
                        ],
                    };
                });

                setIndex(prevIndex => prevIndex + 1);  // Move to the next index
            }
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [index, dataset]);  // Dependencies include index and dataset

    const options = {
        maintainAspectRatio: false, // Allow chart to grow and fill the div
        animation: {
            duration: index < dataset.length ? 500 : 0, // Animate only when new data is added
        },
        // scales: {
        //     y: {
        //         min: 1450,  // Set the minimum value for the y-axis
        //         max: 1550,  // Set the maximum value for the y-axis
        //         ticks: {
        //             stepSize: 50,  // Set the distance between ticks
        //             callback: (value) => `${value} kg`, // Custom label format (e.g., adding 'kg' after values)
        //         },
        //         title: {
        //             display: true,
        //             text: 'Load Weight (kg)',
        //         },
        //     },
        //     x: {
        //         title: {
        //             display: true,
        //             text: 'Time',
        //         },
        //     },
        // },
    };

    return (
        <div className="w-full h-72 p-10">
            <Line data={data} options={options} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default RealTimeLineChart;