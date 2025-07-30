import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Dashboard from './components/Dashboard';
import MechanicDashboard from './components/MechanicDashboard';
import ServiceRequestForm from './components/ServiceRequestForm';
import Home from './components/Home';

import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated (you can store token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/auth/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Render dashboard based on user role
  const renderDashboard = () => {
    if (!user) return null;
    
    if (user.role === 'mechanic') {
      return <MechanicDashboard user={user} onLogout={handleLogout} />;
    } else {
      return <Dashboard user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Home onLogin={() => window.location.href = '/login'} />
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Register onRegister={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              renderDashboard() : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/service-request" 
            element={
              isAuthenticated && user?.role === 'customer' ? 
              <ServiceRequestForm user={user} /> : 
              <Navigate to="/dashboard" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
