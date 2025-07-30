import express from "express";
import { 
    getAllBikes, 
    createBike, 
    updateBikeAvailability 
} from "../controllers/bike.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const bikeRouter = express.Router();

// Upload route for bike images
bikeRouter.post("/upload", upload.single('bikeImage'), (req, res) => {
    res.json({ message: "File uploaded successfully", file: req.file });
});

// Bike routes (protected)
bikeRouter.get("/", verifyToken, getAllBikes);
bikeRouter.post("/", verifyToken, createBike);
bikeRouter.put("/:bikeId/availability", verifyToken, updateBikeAvailability);

export default bikeRouter; 