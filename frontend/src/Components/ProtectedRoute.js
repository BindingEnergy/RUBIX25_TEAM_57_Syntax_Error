import React from "react";
import { Navigate } from "react-router-dom";
import NotificationManager from "./NotificationManager";

const ProtectedRoute = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <NotificationManager />
            {children}
        </>
    );
};

export default ProtectedRoute;
