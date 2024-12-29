// import fs from 'fs/promises';
import { asyncHandler } from "../utils/async-Handler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Directly import the JSON file
import dataArray from '../data (1).json' assert { type: 'json' }; // Adjust the path as necessary

let currentIndex = 0;

const getNextDataPoint = asyncHandler(async ( _ , res) => {
    try {
        if (currentIndex < dataArray.length) {
            const dataPoint = dataArray[currentIndex];
            currentIndex++;
            return res.status(200).json(new ApiResponse(200, dataPoint, "Data point fetched successfully"));
        } else {
            currentIndex = 0; // Reset to the beginning of the array
            return res.status(200).json(new ApiResponse(200, dataArray[currentIndex], "Data point fetched successfully"));
        }
    } catch (error) {
        throw new ApiError(500, "Error processing data");
    }
});

export default getNextDataPoint;
