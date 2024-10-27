import { asyncHandler } from "../utils/async-Handler.js";
import { ApiError } from "../utils/ApiError.js";
import { Truck } from "../model/truck.model.js";
import { Journey } from "../model/journey.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {User} from "../model/user.model.js"

// 1. Owner adds a new truck to their dashboard
const addTruck = asyncHandler(async (req, res) => {
    const { modelNumber, driverName, driverContact, vehicleNumber } = req.body;
    const ownerId = req.user._id;

    if (!modelNumber || !driverName || !driverContact || !vehicleNumber) {
        throw new ApiError(400, "All fields are compulsory");
    }

    const existingTruck = await Truck.findOne({ vehicleNumber });
    if (existingTruck) {
        throw new ApiError(409, "Truck with this vehicle number already exists");
    }

    const driverPhotoPath = req.files?.driverPhoto[0]?.path;
    if (!driverPhotoPath) throw new ApiError(400, "Driver photo file is required");

    const driverPhoto = await uploadOnCloudinary(driverPhotoPath);
    if (!driverPhoto) throw new ApiError(500, "Failed to upload driver photo");

    const truck = await Truck.create({
        ownerId,
        modelNumber,
        driverName,
        driverPhoto: driverPhoto.url,
        driverContact,
        vehicleNumber
    });

    await User.findByIdAndUpdate(ownerId, { $inc: { numberOfTrucks: 1 } });

    return res.status(201).json(new ApiResponse(201, truck, "Truck added successfully"));
});

// 2. Owner deletes a truck from their dashboard
const deleteTruck = asyncHandler(async (req, res) => {
    const { vehicleNumber } = req.body;
    const ownerId = req.user._id;

    const truck = await Truck.findOne({ vehicleNumber, ownerId });
    if (!truck) {
        throw new ApiError(404, "Truck not found or does not belong to the owner");
    }

    await Truck.findByIdAndDelete(truck._id);

    return res.status(200).json(new ApiResponse(200, {}, "Truck deleted successfully"));
});

// 3. Owner starts a truck journey using vehicleNumber
const startTruckJourney = asyncHandler(async (req, res) => {
    const { vehicleNumber, slotStartTime, startLocation, endLocation } = req.body;

    const truck = await Truck.findOne({ vehicleNumber, ownerId: req.user._id });
    if (!truck) {
        throw new ApiError(404, "Truck not found");
    }

    const existingJourney = await Journey.findOne({ truckId: truck._id, isActive: true });
    if (existingJourney) {
        throw new ApiError(409, "Truck is already on an active journey");
    }

    const newJourney = await Journey.create({
        ownerId: req.user._id,
        truckId: truck._id,
        slotStartTime,
        startLocation,
        endLocation,
        isActive: true
    });

    await Truck.findByIdAndUpdate(truck._id, { status: true });
    

    res.status(201).json(new ApiResponse(201, "Journey started", newJourney));
});

// 4. End truck journey
const endTruckJourney = asyncHandler(async (req, res) => {
    const { vehicleNumber } = req.body;

    const truck = await Truck.findOne({ vehicleNumber, ownerId: req.user._id });
    if (!truck) {
        throw new ApiError(404, "Truck not found");
    }

    const activeJourney = await Journey.findOneAndUpdate(
        { truckId: truck._id, isActive: true },
        { isActive: false },
        { new: true }
    );

    if (!activeJourney) {
        throw new ApiError(404, "No active journey found for this truck");
    }
    await Truck.findByIdAndUpdate(truck._id, { status: false });

    res.status(200).json(new ApiResponse(200, "Journey ended successfully", activeJourney));
});

// 5. Get active journeys for the owner
const getActiveJourneys = asyncHandler(async (req, res) => {
    const activeJourneys = await Journey.find({ ownerId: req.user._id, isActive: true }).populate('truckId');
    res.status(200).json(new ApiResponse(200, "Active journeys fetched successfully", activeJourneys));
});

// 6. List all trucks for the owner
const listOwnerTrucks = asyncHandler(async (req, res) => {
    const ownerId = req.user._id;

    const trucks = await Truck.find({ ownerId });

    return res.status(200).json(new ApiResponse(200, trucks, "Owner's trucks fetched successfully"));
});

export {
    addTruck,
    deleteTruck,
    startTruckJourney,
    listOwnerTrucks,
    endTruckJourney,
    getActiveJourneys
};






