import mongoose, { Schema } from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    assignedMechanicId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        default: null
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['bike', 'scooter', 'motorcycle', 'other']
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['repair', 'maintenance', 'emergency', 'inspection', 'other']
    },
    description: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    estimatedCost: {
        type: Number,
        default: 0
    },
    actualCost: {
        type: Number,
        default: 0
    },
    assignedDate: {
        type: Date,
        default: null
    },
    completedDate: {
        type: Date,
        default: null
    },
    mechanicNotes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export default mongoose.model("ServiceRequest", ServiceRequestSchema); 