import mongoose from "mongoose";

const BikeSchema = new mongoose.Schema({
    bikeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    image: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    fuelType: {
        type: String,
        default: "Petrol"
    },
    mileage: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Bike", BikeSchema);