import Customer from "../models/customer.model.js";
import jwt from "jsonwebtoken";

// User registration
export const register = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            AddhaarNumber, 
            panNumber, 
            address, 
            city, 
            state 
        } = req.body;

        // Check if user already exists
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Create new user
        const newUser = new Customer({
            firstName,
            lastName,
            email,
            password, // In production, hash this password
            AddhaarNumber,
            panNumber,
            address,
            city,
            state
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data (excluding password) and token
        const userData = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            address: newUser.address,
            city: newUser.city,
            state: newUser.state,
            profileImage: newUser.profileImage
        };

        res.status(201).json({
            message: "Registration successful",
            token,
            user: userData
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Customer.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password (in production, you should hash passwords)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data (excluding password) and token
        const userData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            city: user.city,
            state: user.state,
            profileImage: user.profileImage
        };

        res.status(200).json({
            message: "Login successful",
            token,
            user: userData
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await Customer.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Get current user error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
}; 