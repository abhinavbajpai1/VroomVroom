import ServiceRequest from "../models/serviceRequest.model.js";
import Customer from "../models/customer.model.js";

// Create a new service request
export const createServiceRequest = async (req, res) => {
    try {
        const {
            customerId,
            vehicleType,
            vehicleModel,
            vehicleNumber,
            serviceType,
            description,
            customerAddress,
            customerPhone,
            priority
        } = req.body;

        // Generate unique request ID
        const requestId = `SR${Date.now()}${Math.floor(Math.random() * 1000)}`;

        const newServiceRequest = new ServiceRequest({
            requestId,
            customerId,
            vehicleType,
            vehicleModel,
            vehicleNumber,
            serviceType,
            description,
            customerAddress,
            customerPhone,
            priority
        });

        await newServiceRequest.save();

        res.status(201).json({
            message: "Service request created successfully",
            serviceRequest: newServiceRequest
        });
    } catch (error) {
        console.error("Error creating service request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all service requests (for admin/mechanics)
export const getAllServiceRequests = async (req, res) => {
    try {
        const { status, priority } = req.query;
        let filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const serviceRequests = await ServiceRequest.find(filter)
            .populate('customerId', 'firstName lastName email phoneNumber')
            .populate('assignedMechanicId', 'firstName lastName phoneNumber')
            .sort({ createdAt: -1 });

        res.status(200).json(serviceRequests);
    } catch (error) {
        console.error("Error getting service requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get service requests assigned to a specific mechanic
export const getMechanicServiceRequests = async (req, res) => {
    try {
        const { mechanicId } = req.params;
        const { status } = req.query;
        
        let filter = { assignedMechanicId: mechanicId };
        if (status) filter.status = status;

        const serviceRequests = await ServiceRequest.find(filter)
            .populate('customerId', 'firstName lastName email phoneNumber address city state')
            .sort({ createdAt: -1 });

        res.status(200).json(serviceRequests);
    } catch (error) {
        console.error("Error getting mechanic service requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get service requests by customer
export const getCustomerServiceRequests = async (req, res) => {
    try {
        const { customerId } = req.params;

        const serviceRequests = await ServiceRequest.find({ customerId })
            .populate('assignedMechanicId', 'firstName lastName phoneNumber')
            .sort({ createdAt: -1 });

        res.status(200).json(serviceRequests);
    } catch (error) {
        console.error("Error getting customer service requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Assign service request to mechanic
export const assignServiceRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { mechanicId } = req.body;

        // Verify mechanic exists and has mechanic role
        const mechanic = await Customer.findById(mechanicId);
        if (!mechanic || mechanic.role !== 'mechanic') {
            return res.status(400).json({ message: "Invalid mechanic ID" });
        }

        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            requestId,
            {
                assignedMechanicId: mechanicId,
                status: 'assigned',
                assignedDate: new Date()
            },
            { new: true }
        ).populate('customerId', 'firstName lastName email phoneNumber address city state')
         .populate('assignedMechanicId', 'firstName lastName phoneNumber');

        if (!serviceRequest) {
            return res.status(404).json({ message: "Service request not found" });
        }

        res.status(200).json({
            message: "Service request assigned successfully",
            serviceRequest
        });
    } catch (error) {
        console.error("Error assigning service request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update service request status
export const updateServiceRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status, mechanicNotes, actualCost } = req.body;

        const updateData = { status };
        if (mechanicNotes) updateData.mechanicNotes = mechanicNotes;
        if (actualCost) updateData.actualCost = actualCost;
        if (status === 'completed') {
            updateData.completedDate = new Date();
        }

        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            requestId,
            updateData,
            { new: true }
        ).populate('customerId', 'firstName lastName email phoneNumber address city state')
         .populate('assignedMechanicId', 'firstName lastName phoneNumber');

        if (!serviceRequest) {
            return res.status(404).json({ message: "Service request not found" });
        }

        res.status(200).json({
            message: "Service request updated successfully",
            serviceRequest
        });
    } catch (error) {
        console.error("Error updating service request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get service request by ID
export const getServiceRequestById = async (req, res) => {
    try {
        const { requestId } = req.params;

        const serviceRequest = await ServiceRequest.findById(requestId)
            .populate('customerId', 'firstName lastName email phoneNumber address city state')
            .populate('assignedMechanicId', 'firstName lastName phoneNumber');

        if (!serviceRequest) {
            return res.status(404).json({ message: "Service request not found" });
        }

        res.status(200).json(serviceRequest);
    } catch (error) {
        console.error("Error getting service request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get available mechanics
export const getAvailableMechanics = async (req, res) => {
    try {
        const mechanics = await Customer.find({ role: 'mechanic' })
            .select('firstName lastName phoneNumber address city state');

        res.status(200).json(mechanics);
    } catch (error) {
        console.error("Error getting available mechanics:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 