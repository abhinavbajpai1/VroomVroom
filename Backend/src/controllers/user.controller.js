import Customer from "../models/customer.model.js";
import Rental from "../models/rental.model.js";
import Bike from "../models/bike.model.js";
import cloudinary from "../utils/Cloudinary.js";
import fs from "fs";

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await Customer.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user rental history
export const getUserRentals = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const rentals = await Rental.find({ customerId: userId })
            .populate('VehicleId', 'name model year')
            .sort({ createdAt: -1 });
        
        const formattedRentals = rentals.map(rental => ({
            rentalId: rental.rentalId,
            vehicleName: rental.VehicleId ? `${rental.VehicleId.name} ${rental.VehicleId.model}` : 'Unknown Vehicle',
            rental_start: rental.rental_start,
            rental_end: rental.rental_end,
            total_cost: rental.total_cost,
            status: rental.status,
            dueDate: rental.rental_end
        }));
        
        res.status(200).json(formattedRentals);
    } catch (error) {
        console.error("Error getting user rentals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log("Upload request received for user:", userId);
        console.log("File info:", req.file);
        
        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        console.log("Uploading to Cloudinary...");
        
        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile-pictures",
            transformation: [
                { width: 400, height: 400, crop: "fill" },
                { quality: "auto" }
            ]
        });
        
        console.log("Cloudinary upload successful:", cloudinaryResponse.secure_url);
        
        // Update user profile with new image URL
        const updatedUser = await Customer.findByIdAndUpdate(
            userId,
            { profileImage: cloudinaryResponse.secure_url },
            { new: true }
        ).select('-password');
        
        if (!updatedUser) {
            console.log("User not found:", userId);
            return res.status(404).json({ message: "User not found" });
        }
        
        // Delete local file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        console.log("Profile picture updated successfully");
        
        res.status(200).json({
            message: "Profile picture uploaded successfully",
            profileImageUrl: cloudinaryResponse.secure_url,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        console.error("Error details:", error.message);
        
        // Clean up local file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ 
            message: "Error uploading profile picture",
            error: error.message 
        });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, address, city, state } = req.body;
        
        const updatedUser = await Customer.findByIdAndUpdate(
            userId,
            { firstName, lastName, address, city, state },
            { new: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;
        
        const user = await Customer.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Verify current password (you should hash passwords in production)
        if (user.password !== currentPassword) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        
        // Update password (you should hash the new password in production)
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Error changing password" });
    }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const totalRentals = await Rental.countDocuments({ customerId: userId });
        const activeRentals = await Rental.countDocuments({ 
            customerId: userId, 
            status: 'active' 
        });
        
        const overdueRentals = await Rental.countDocuments({
            customerId: userId,
            status: 'active',
            rental_end: { $lt: new Date() }
        });
        
        res.status(200).json({
            totalRentals,
            activeRentals,
            overdueRentals
        });
    } catch (error) {
        console.error("Error getting dashboard stats:", error);
        res.status(500).json({ message: "Error getting dashboard stats" });
    }
};

