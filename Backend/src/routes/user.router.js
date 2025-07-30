import { Router } from "express";
import { 
    getUserProfile, 
    getUserRentals, 
    uploadProfilePicture, 
    updateUserProfile, 
    changePassword, 
    getDashboardStats 
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// Dashboard routes (protected)
userRouter.get("/profile/:userId", verifyToken, getUserProfile);
userRouter.get("/rentals/:userId", verifyToken, getUserRentals);
userRouter.get("/stats/:userId", verifyToken, getDashboardStats);

// Profile management routes (protected)
userRouter.post("/upload-profile/:userId", verifyToken, upload.single('profileImage'), uploadProfilePicture);
userRouter.put("/profile/:userId", verifyToken, updateUserProfile);
userRouter.put("/change-password/:userId", verifyToken, changePassword);

// Legacy routes
userRouter.get("/", (req, res) => {
    res.send("user router");
});

userRouter.get("/home", (req, res) => {
    res.send("this is Home");
});

export default userRouter;
