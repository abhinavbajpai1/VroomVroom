import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MechanicDashboard = ({ user, onLogout }) => {
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('assigned');
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [taskStats, setTaskStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0
    });

    useEffect(() => {
        fetchAssignedTasks();
    }, [user]);

    const fetchAssignedTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/service-requests/mechanic/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAssignedTasks(response.data);
            
            // Calculate stats
            const stats = {
                total: response.data.length,
                pending: response.data.filter(task => task.status === 'assigned').length,
                inProgress: response.data.filter(task => task.status === 'in_progress').length,
                completed: response.data.filter(task => task.status === 'completed').length
            };
            setTaskStats(stats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching assigned tasks:', error);
            setLoading(false);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus, mechanicNotes = '', actualCost = 0) => {
        setUpdating(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:8000/api/service-requests/${taskId}/status`, {
                status: newStatus,
                mechanicNotes,
                actualCost
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Refresh tasks
            await fetchAssignedTasks();
            setShowTaskModal(false);
            setSelectedTask(null);
        } catch (error) {
            console.error('Error updating task status:', error);
            alert('Failed to update task status');
        } finally {
            setUpdating(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500 text-white';
            case 'high': return 'bg-orange-500 text-white';
            case 'medium': return 'bg-yellow-500 text-white';
            case 'low': return 'bg-green-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const openTaskModal = (task) => {
        setSelectedTask(task);
        setShowTaskModal(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mechanic Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Role: {user?.role}</span>
                            <button 
                                onClick={onLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                                <p className="text-2xl font-semibold text-gray-900">{taskStats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900">{taskStats.pending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">In Progress</p>
                                <p className="text-2xl font-semibold text-gray-900">{taskStats.inProgress}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">{taskStats.completed}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Assigned Tasks</h2>
                    </div>

                    {assignedTasks.length === 0 ? (
                        <div className="p-6 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks assigned</h3>
                            <p className="mt-1 text-sm text-gray-500">You don't have any tasks assigned to you yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Task Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer Info
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vehicle
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Priority
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {assignedTasks.map((task) => (
                                        <tr key={task._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {task.requestId}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {task.serviceType}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(task.createdAt)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {task.customerId?.firstName} {task.customerId?.lastName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {task.customerPhone}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {task.customerAddress}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {task.vehicleType} - {task.vehicleModel}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {task.vehicleNumber}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openTaskModal(task)}
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Details Modal */}
            {showTaskModal && selectedTask && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Details</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900">Request ID</h4>
                                    <p className="text-gray-600">{selectedTask.requestId}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900">Customer Information</h4>
                                    <p className="text-gray-600">
                                        {selectedTask.customerId?.firstName} {selectedTask.customerId?.lastName}
                                    </p>
                                    <p className="text-gray-600">Phone: {selectedTask.customerPhone}</p>
                                    <p className="text-gray-600">Address: {selectedTask.customerAddress}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900">Vehicle Information</h4>
                                    <p className="text-gray-600">Type: {selectedTask.vehicleType}</p>
                                    <p className="text-gray-600">Model: {selectedTask.vehicleModel}</p>
                                    <p className="text-gray-600">Number: {selectedTask.vehicleNumber}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900">Service Details</h4>
                                    <p className="text-gray-600">Type: {selectedTask.serviceType}</p>
                                    <p className="text-gray-600">Description: {selectedTask.description}</p>
                                    <p className="text-gray-600">Priority: {selectedTask.priority}</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900">Current Status</h4>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTask.status)}`}>
                                        {selectedTask.status.replace('_', ' ')}
                                    </span>
                                </div>

                                {selectedTask.mechanicNotes && (
                                    <div>
                                        <h4 className="font-medium text-gray-900">Notes</h4>
                                        <p className="text-gray-600">{selectedTask.mechanicNotes}</p>
                                    </div>
                                )}

                                <div className="flex space-x-3 pt-4">
                                    {selectedTask.status === 'assigned' && (
                                        <button
                                            onClick={() => handleUpdateTaskStatus(selectedTask._id, 'in_progress')}
                                            disabled={updating}
                                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {updating ? 'Updating...' : 'Start Work'}
                                        </button>
                                    )}
                                    
                                    {selectedTask.status === 'in_progress' && (
                                        <button
                                            onClick={() => handleUpdateTaskStatus(selectedTask._id, 'completed')}
                                            disabled={updating}
                                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {updating ? 'Updating...' : 'Mark Complete'}
                                        </button>
                                    )}
                                    
                                    <button
                                        onClick={() => setShowTaskModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MechanicDashboard; 