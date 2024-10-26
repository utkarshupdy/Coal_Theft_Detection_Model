import mongoose, { Schema } from 'mongoose';

const truckSchema = new Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    modelNumber: {
        type: String,
        required: true,
        trim: true,
    },
    driverName: {
        type: String,
        required: true,
        trim: true,
    },
    driverPhoto: {
        type: String,
        // required: true,
    },
    driverContact: {
        type: Number,
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export const Truck = mongoose.model("Truck", truckSchema);
