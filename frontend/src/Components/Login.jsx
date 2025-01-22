import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Ensure axios is installed for making API calls

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] =
        useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const navigate = useNavigate();

    const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
    console.log(backendUrl);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please enter both email and password.');
            return;
        }

        try {
            // Making an API call to the backend for login
            const response = await axios.post(`${backendUrl}/api/auth/login`, {
                email: formData.email,
                password: formData.password,
            });

            toast.success('Login successful!');
            const { userId, token } = response.data;

            // Store user information in local storage or cookies
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);

            // Redirect user to the dashboard
            navigate(`/dashboard/${userId}`);
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Login failed. Please check your credentials.');
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const handleForgotPassword = async () => {
        try {
            // Send password reset email to backend
            await axios.post(`${backendUrl}/api/forgot-password`, {
                email: forgotPasswordEmail,
            });

            toast.success('Password reset link sent to your email.');
            setShowForgotPasswordModal(false);
        } catch (error) {
            console.error('Error sending password reset link:', error);
            toast.error(
                'Failed to send password reset link. Please check your email.'
            );
        }
    };

    const handleMouseEnter = () => {
        setShowPassword(true);
    };

    const handleMouseLeave = () => {
        setShowPassword(false);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                            />
                            <button
                                type="button"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                />
                            </button>
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-1">
                            {errorMessage}
                        </p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign up
                    </Link>
                </p>

                <p className="mt-4 text-center text-sm text-gray-500">
                    <button
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Forgot Password?
                    </button>
                </p>
            </div>

            {showForgotPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl mb-4">Reset Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={forgotPasswordEmail}
                            onChange={(e) =>
                                setForgotPasswordEmail(e.target.value)
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
                        />
                        <button
                            onClick={handleForgotPassword}
                            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Send Reset Link
                        </button>
                        <button
                            onClick={() => setShowForgotPasswordModal(false)}
                            className="w-full mt-2 rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
