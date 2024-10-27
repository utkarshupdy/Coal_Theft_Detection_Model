
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChartComponent = ({ newDataPoint, labeltext, minValue, maxValue}) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: labeltext,
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

    useEffect(() => {
        if (newDataPoint !== null) {
            const now = new Date();
            const newLabel = now.toLocaleTimeString();

            setData(prevData => {
                const updatedLabels = [...prevData.labels, newLabel];
                const updatedData = [...prevData.datasets[0].data, newDataPoint];

                // Limit the number of data points to the last 60
                if (updatedLabels.length > 30) {
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
        }
    }, [newDataPoint]);

    const options = {
        maintainAspectRatio: false,
        animation: {
            duration: 500,
        },
        scales: {
            y: {
                min: minValue,
                max: maxValue,
                ticks: {
                    stepSize: 50,
                    callback: (value) => `${value} kg`,
                },
                title: {
                    display: true,
                    text: 'Load Weight (kg)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
        },
    };

    return (
        <div className="w-full h-96 p-10">
            <Line data={data} options={options} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default LineChartComponent;