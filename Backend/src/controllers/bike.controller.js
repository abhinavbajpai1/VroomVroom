import Bike from "../models/bike.model.js";

// Get all available bikes
export const getAvailableBikes = async (req, res) => {
    try {
        const bikes = await Bike.find({ available: true }).sort({ createdAt: -1 });
        res.status(200).json(bikes);
    } catch (error) {
        console.error("Error getting available bikes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all bikes (admin only)
export const getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find().sort({ createdAt: -1 });
        res.status(200).json(bikes);
    } catch (error) {
        console.error("Error getting all bikes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get bike by ID
export const getBikeById = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const bike = await Bike.findOne({ bikeId });
        
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        
        res.status(200).json(bike);
    } catch (error) {
        console.error("Error getting bike:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create new bike (admin only)
export const createBike = async (req, res) => {
    try {
        const {
            bikeId,
            name,
            model,
            type,
            year,
            price,
            description,
            fuelType,
            mileage
        } = req.body;

        // Check if bike already exists
        const existingBike = await Bike.findOne({ bikeId });
        if (existingBike) {
            return res.status(400).json({ message: "Bike with this ID already exists" });
        }

        const newBike = new Bike({
            bikeId,
            name,
            model,
            type,
            year,
            price,
            description,
            fuelType,
            mileage
        });

        await newBike.save();
        res.status(201).json({
            message: "Bike created successfully",
            bike: newBike
        });
    } catch (error) {
        console.error("Error creating bike:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update bike availability
export const updateBikeAvailability = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const { available } = req.body;

        const bike = await Bike.findOneAndUpdate(
            { bikeId },
            { available },
            { new: true }
        );

        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }

        res.status(200).json({
            message: "Bike availability updated successfully",
            bike
        });
    } catch (error) {
        console.error("Error updating bike availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 