import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/Auth';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                const userDetails = await authService.getUserDetails(
                    currentUser.$id
                );
                setUser(userDetails);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login'); // Redirect to login after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-medium text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-blue-600 text-white py-4 px-6 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Welcome, {user?.fullName}
                    </h2>
                    <p className="text-gray-600">Email: {user?.email}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Recent Chats</h3>
                    <div className="space-y-3">
                        {/* Placeholder for chats */}
                        <div className="p-4 border border-gray-300 rounded-md text-gray-500">
                            No recent chats available.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
