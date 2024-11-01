import React from 'react';
import RealTimeLineChart from './RealTimeLineChart';

import jsondataset from './data.json'

const humiditydataset = jsondataset.map(truck => truck.Humidity);
const weightdataset = jsondataset.map(truck => truck.Weight);
const tempdataset = jsondataset.map(truck => truck.Temperature);

function LineChartFinal() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <RealTimeLineChart dataset={humiditydataset} label={"Humidity Data"} />
            <RealTimeLineChart dataset={weightdataset} label={"Weight Data"} />
            <RealTimeLineChart dataset={tempdataset} label={"Temp Data"} />
        </div>
    );
}

export default LineChartFinal;