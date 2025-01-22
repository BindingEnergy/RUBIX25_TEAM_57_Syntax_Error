import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by checking local storage or cookies
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        // Clear user data from local storage or cookies
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const getNavLinkClass = ({ isActive }) =>
        isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600';

    return (
        <>
            <nav className="fixed top-0 left-0 w-full p-4 bg-white bg-opacity-80 flex justify-between items-center shadow-md backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="h-10" />
                    <span className="text-2xl font-bold">Time Capsule</span>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-800 hover:text-blue-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                    {isMobileMenuOpen && (
                        <div className="absolute top-0 left-0 w-full mt-16 bg-white shadow-md">
                            <NavLink
                                to="/"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                About
                            </NavLink>
                            <a
                                href="/features"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Features
                            </a>
                            <NavLink
                                to="/contact"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Contact
                            </NavLink>
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                                >
                                    Logout
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    )}
                </div>
                <div className="hidden md:flex gap-8">
                    <NavLink
                        to="/"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        About
                    </NavLink>
                    <a
                        href="/features"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Features
                    </a>
                    <NavLink
                        to="/contact"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Contact
                    </NavLink>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="text-gray-800 hover:text-blue-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className="text-gray-800 hover:text-blue-600"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
