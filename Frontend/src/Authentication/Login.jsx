import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', formData);
            
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Call the onLogin callback with user data
            onLogin(response.data.user);
            
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Image Section */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?technology')" }}>
                
            </div>

            <div className="w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded shadow">
                    <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={formData.password}
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
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <p className="text-center text-sm">
                            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
