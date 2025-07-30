import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        AddhaarNumber: '',
        panNumber: '',
        address: '',
        city: '',
        state: '',
        role: 'customer'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                AddhaarNumber: formData.AddhaarNumber,
                panNumber: formData.panNumber,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                role: formData.role
            });
            
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Call the onRegister callback with user data
            onRegister(response.data.user);
            
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Image Section */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?motorcycle')" }}>
                
            </div>

            <div className="w-1/2 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-md p-8 bg-white rounded shadow">
                    <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                className="p-3 border border-gray-300 rounded" 
                                type="text" 
                                name="firstName"
                                placeholder="First Name" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                className="p-3 border border-gray-300 rounded" 
                                type="text" 
                                name="lastName"
                                placeholder="Last Name" 
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="tel" 
                            name="phoneNumber"
                            placeholder="Phone Number" 
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="text" 
                            name="AddhaarNumber"
                            placeholder="Aadhaar Number" 
                            value={formData.AddhaarNumber}
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="text" 
                            name="panNumber"
                            placeholder="PAN Number" 
                            value={formData.panNumber}
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="text" 
                            name="address"
                            placeholder="Address" 
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                className="p-3 border border-gray-300 rounded" 
                                type="text" 
                                name="city"
                                placeholder="City" 
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                className="p-3 border border-gray-300 rounded" 
                                type="text" 
                                name="state"
                                placeholder="State" 
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <select 
                            className="p-3 border border-gray-300 rounded" 
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="mechanic">Mechanic</option>
                        </select>
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            className="p-3 border border-gray-300 rounded" 
                            type="password" 
                            name="confirmPassword"
                            placeholder="Confirm Password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        
                        <button 
                            className={`p-3 text-white rounded ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`} 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                        
                        <p className="text-center text-sm">
                            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;