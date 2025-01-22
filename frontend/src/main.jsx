import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import PasswordReset from './Components/PasswordReset.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import About from './Pages/About.jsx';
import Features from './Pages/features.jsx';
import ContactUs from './Pages/ContactUs.jsx';
// import NotFound from './Pages/NotFound.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard/:userId"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<ContactUs />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
