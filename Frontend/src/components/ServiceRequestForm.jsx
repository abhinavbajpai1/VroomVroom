import React, { useState } from 'react';
import axios from 'axios';

const ServiceRequestForm = ({ user, onRequestSubmitted }) => {
    const [formData, setFormData] = useState({
        vehicleType: '',
        vehicleModel: '',
        vehicleNumber: '',
        serviceType: '',
        description: '',
        priority: 'medium'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate user data
        if (!user || !user._id) {
            setError('User information is missing. Please log in again.');
            setLoading(false);
            return;
        }

        if (!user.phoneNumber) {
            setError('Phone number is required. Please update your profile.');
            setLoading(false);
            return;
        }

        if (!user.address) {
            setError('Address is required. Please update your profile.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token is missing. Please log in again.');
                setLoading(false);
                return;
            }

            const requestData = {
                customerId: user._id,
                vehicleType: formData.vehicleType,
                vehicleModel: formData.vehicleModel,
                vehicleNumber: formData.vehicleNumber,
                serviceType: formData.serviceType,
                description: formData.description,
                customerAddress: user.address,
                customerPhone: user.phoneNumber,
                priority: formData.priority
            };

            console.log('Submitting service request:', requestData);

            const response = await axios.post('http://localhost:8000/api/service-requests', requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Service request response:', response.data);

            // Reset form
            setFormData({
                vehicleType: '',
                vehicleModel: '',
                vehicleNumber: '',
                serviceType: '',
                description: '',
                priority: 'medium'
            });

            if (onRequestSubmitted) {
                onRequestSubmitted();
            }

            alert('Service request submitted successfully!');
        } catch (error) {
            console.error('Error submitting service request:', error);
            
            if (error.response) {
                // Server responded with error
                const errorMessage = error.response.data?.message || 'Server error occurred';
                setError(`Failed to submit service request: ${errorMessage}`);
            } else if (error.request) {
                // Network error
                setError('Network error. Please check your connection and try again.');
            } else {
                // Other error
                setError('Failed to submit service request. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Mechanic Service</h2>
            
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vehicle Type *
                        </label>
                        <select
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="bike">Bike</option>
                            <option value="scooter">Scooter</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vehicle Model *
                        </label>
                        <input
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Honda Activa, Bajaj Pulsar"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Number *
                    </label>
                    <input
                        type="text"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., MH12AB1234"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Type *
                        </label>
                        <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Service Type</option>
                            <option value="repair">Repair</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="emergency">Emergency</option>
                            <option value="inspection">Inspection</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority *
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Describe the issue or service needed..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">Service Information</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Customer:</strong> {user?.firstName} {user?.lastName}</p>
                        <p><strong>Phone:</strong> {user?.phoneNumber || 'Not provided'}</p>
                        <p><strong>Address:</strong> {user?.address || 'Not provided'}, {user?.city}, {user?.state}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => {
                            setFormData({
                                vehicleType: '',
                                vehicleModel: '',
                                vehicleNumber: '',
                                serviceType: '',
                                description: '',
                                priority: 'medium'
                            });
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServiceRequestForm; 