import React, { useEffect } from "react";

const NotificationManager = () => {
    useEffect(() => {
        // Request notification permission on component mount
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        const notify = () => {
            if (Notification.permission === "granted") {
                new Notification("Time Capsule Reminder", {
                    body: "Don't forget to check your Time Capsule messages!",
                    icon: "/path-to-icon.png", // Replace with your app's icon
                });
            }
        };

        // Trigger notifications every 1 minute (60,000ms)
        const notificationInterval = setInterval(() => {
            notify();
        }, 60000);

        // Cleanup timer on unmount
        return () => {
            clearInterval(notificationInterval);
        };
    }, []);

    return null; // This component doesn't render anything visible
};

export default NotificationManager;
