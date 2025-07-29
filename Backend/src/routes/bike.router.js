import { Router } from "express";
import { 
    getAvailableBikes, 
    getAllBikes, 
    getBikeById, 
    createBike, 
    updateBikeAvailability 
} from "../controllers/bike.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const bikeRouter = Router();

// Public routes
bikeRouter.get("/available", getAvailableBikes);
bikeRouter.get("/:bikeId", getBikeById);

// Protected routes
bikeRouter.get("/", authenticateToken, getAllBikes);
bikeRouter.post("/", authenticateToken, createBike);
bikeRouter.put("/:bikeId/availability", authenticateToken, updateBikeAvailability);

export default bikeRouter; 