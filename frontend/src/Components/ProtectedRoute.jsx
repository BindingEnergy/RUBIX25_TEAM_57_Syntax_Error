import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../appwrite/Auth'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated(); // Implement this method in your authService

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
