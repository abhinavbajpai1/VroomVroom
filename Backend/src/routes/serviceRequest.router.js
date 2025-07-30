import express from "express";
import {
    createServiceRequest,
    getAllServiceRequests,
    getMechanicServiceRequests,
    getCustomerServiceRequests,
    assignServiceRequest,
    updateServiceRequestStatus,
    getServiceRequestById,
    getAvailableMechanics
} from "../controllers/serviceRequest.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new service request
router.post("/", verifyToken, createServiceRequest);

// Get all service requests (admin/mechanics)
router.get("/", verifyToken, getAllServiceRequests);

// Get service requests assigned to a specific mechanic
router.get("/mechanic/:mechanicId", verifyToken, getMechanicServiceRequests);

// Get service requests by customer
router.get("/customer/:customerId", verifyToken, getCustomerServiceRequests);

// Get service request by ID
router.get("/:requestId", verifyToken, getServiceRequestById);

// Assign service request to mechanic
router.patch("/:requestId/assign", verifyToken, assignServiceRequest);

// Update service request status
router.patch("/:requestId/status", verifyToken, updateServiceRequestStatus);

// Get available mechanics
router.get("/mechanics/available", verifyToken, getAvailableMechanics);

export default router; 