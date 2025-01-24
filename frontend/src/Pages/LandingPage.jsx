import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import beachImage from '../assets/beach.jpg';
import 'react-calendar/dist/Calendar.css';
import './LandingPage.css';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
// import { set } from 'mongoose';

const LandingPage = () => {
    const [date, setDate] = useState(new Date());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem(
            `${import.meta.env.VITE_BACKEND_URL}`
        );
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleButtonClick = () => {
        if (loggedIn) {
            navigate('/chat');
        } else {
            navigate('/login');
        }
    };

    const features = [
        {
            title: 'Scheduled Unlocking',
            description:
                'Set specific future dates for your digital time capsule reveal.',
        },
        {
            title: 'Media Upload & Storage',
            description: 'Store text, images, videos, and audio recordings.',
        },
        {
            title: 'Collaborative Capsules',
            description: 'Create shared memories with multiple contributors.',
        },
        // {
        //     title: 'Privacy & Access Controls',
        //     description: 'Choose between private, shared, or public capsules.',
        // },
        {
            title: 'Countdown & Notifications',
            description: 'Track time until unlock with real-time countdown.',
        },
        // {
        //     title: 'Thematic Templates',
        //     description: 'Personalize capsules with themed templates.',
        // },
    ];

    // const toggleMobileMenu = () => {
    //     setIsMobileMenuOpen(!isMobileMenuOpen);
    // };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center opacity-50 z-[-1]"
                style={{ backgroundImage: `url(${beachImage})` }}
            ></div>

            {/* <nav className="fixed top-0 left-0 w-full p-4 bg-white bg-opacity-80 flex justify-between items-center shadow-md backdrop-blur-md z-50">
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
                            <a
                                href="#home"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Home
                            </a>
                            <a
                                href="/about"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                About
                            </a>
                            <a
                                href="#features"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Features
                            </a>
                            <a
                                href="/contactus"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Contact
                            </a>
                            <a
                                href="./login"
                                className="block text-gray-800 hover:text-blue-600 py-2 px-4"
                            >
                                Login
                            </a>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex gap-8">
                    <a
                        href="#home"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Home
                    </a>
                    <a
                        href="/about"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        About
                    </a>
                    <a
                        href="#features"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Features
                    </a>
                    <a
                        href="/contactus"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Contact
                    </a>
                    <a
                        href="./login"
                        className="text-gray-800 hover:text-blue-600"
                    >
                        Login
                    </a>
                </div>
            </nav> */}

            <main className="pt-20">
                <section className="hero-section">
                    <div className="hero-content">
                        <div className="calendar-wrapper">
                            <Calendar
                                // onClickDay={(day) => console.log(day)}
                                onChange={setDate}
                                value={date}
                                className="custom-calendar"
                            />
                        </div>
                        <div className="hero-text">
                            <h1>Your Memories, Waiting for the Right Moment</h1>
                            <p>
                                Create timeless digital capsules for tomorrow's
                                treasures.
                            </p>
                            <button
                                onClick={handleButtonClick}
                                className="mt-5 block hover:text-gray-800 text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 md:w-fit font-bold rounded-full shadow-xl transition duration-500 ease-in-out transform hover:scale-110 text-xl items-center align-middle justify-center"
                            >
                                {loggedIn ? 'Chat' : 'Login'}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="features-section" id="features">
                    <h2>Our Features</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
