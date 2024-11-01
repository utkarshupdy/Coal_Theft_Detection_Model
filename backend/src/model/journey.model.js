import mongoose, { Schema } from 'mongoose';

const journeySchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    truckId: {
        type: Schema.Types.ObjectId,
        ref: 'Truck',
        required: true,
    },
    slotStartTime: {
        type: Date,
        required: true,
    },
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    journeyDate: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export const Journey = mongoose.model("Journey", journeySchema);
