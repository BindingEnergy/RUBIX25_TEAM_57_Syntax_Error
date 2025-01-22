import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for backend communication
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import countryData from '../Components/data/db.json';

const Signup = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        lname: '',
        email: '',
        password: '',
        cpassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'cpassword' || name === 'password') {
            if (formData.password !== formData.cpassword) {
                setPasswordMatchError('Passwords do not match');
            } else {
                setPasswordMatchError('');
            }
        }
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleMobileNumberChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setMobileNumber(value);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter only numbers.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.cpassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }

        try {
            const fullName = `${formData.name} ${formData.lname}`;
            // console.log(fullName);

            const userPayload = {
                username: `${fullName} ${formData.email}`,
                email: formData.email,
                password: formData.password,
                name: fullName,
                gender: gender,
                mobile: mobileNumber,
            };

            // Replace the URL with your backend endpoint
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                userPayload
            );
            // console.log(response.data);

            toast.success(
                'User registered successfully! Check your email for verification.'
            );
            setErrorMessage('');
            navigate('/login');
        } catch (error) {
            console.log('Error during sign-up:', error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(
                    'An error occurred during sign-up. Please try again.'
                );
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <ToastContainer />
            <div>
                <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
                    <div className="text-center mb-12 sm:mb-16">
                        <a href="javascript:void(0)"></a>
                        <h4 className="text-gray-600 text-base mt-6">
                            Sign up
                        </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    First Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    Last Name
                                </label>
                                <input
                                    name="lname"
                                    type="text"
                                    value={formData.lname}
                                    onChange={handleInputChange}
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                    placeholder="Enter last name"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    Email Id
                                </label>
                                <input
                                    name="email"
                                    type="text"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    Mobile No.
                                </label>
                                <div className="flex">
                                    <select className="bg-gray-100 w-1/4 text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all">
                                        {countryData.map((country) => (
                                            <option
                                                key={country.code}
                                                value={country.dial_code}
                                            >
                                                {country.name} (
                                                {country.dial_code})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        name="number"
                                        type="text"
                                        value={mobileNumber}
                                        onChange={handleMobileNumberChange}
                                        className="bg-gray-100 w-3/4 text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                        placeholder="Enter mobile number"
                                        maxLength="10"
                                        pattern="[6-9]{1}[0-9]{9}"
                                    />
                                </div>
                                <p className="text-red-500 text-sm mt-1">
                                    {errorMessage}
                                </p>
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    Gender{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={gender}
                                    onChange={handleGenderChange}
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-3 right-3 text-gray-500"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        name="cpassword"
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={formData.cpassword}
                                        onChange={handleInputChange}
                                        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                        placeholder="Enter confirm password"
                                    />
                                    <button
                                        type="button"
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                        className="absolute top-3 right-3 text-gray-500"
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {passwordMatchError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {passwordMatchError}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Sign up
                            </button>
                            <div className="mt-4 text-center">
                                <p>Already have an account?</p>
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
