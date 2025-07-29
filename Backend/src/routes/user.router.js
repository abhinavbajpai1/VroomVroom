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
import { authenticateToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// Dashboard routes (protected)
userRouter.get("/profile/:userId", authenticateToken, getUserProfile);
userRouter.get("/rentals/:userId", authenticateToken, getUserRentals);
userRouter.get("/stats/:userId", authenticateToken, getDashboardStats);

// Profile management routes (protected)
userRouter.post("/upload-profile/:userId", authenticateToken, upload.single('profileImage'), uploadProfilePicture);
userRouter.put("/profile/:userId", authenticateToken, updateUserProfile);
userRouter.put("/change-password/:userId", authenticateToken, changePassword);

// Legacy routes
userRouter.get("/", (req, res) => {
    res.send("user router");
});

userRouter.get("/home", (req, res) => {
    res.send("this is Home");
});

export default userRouter;
