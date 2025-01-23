import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import styled from 'styled-components';
import axios from 'axios';
import { logoutRoute } from '../utils/APIRoutes';

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            // Retrieve user data from localStorage
            const userData = localStorage.getItem(
                import.meta.env.VITE_BACKEND_URL
            );
            if (!userData) {
                console.error('No user data found in localStorage.');
                navigate('/login'); // Redirect to login
                return;
            }

            // Parse user data and get the user ID
            const { _id: id } = JSON.parse(userData);
            if (!id) {
                console.error('User ID not found in parsed data.');
                navigate('/login'); // Redirect to login
                return;
            }

            // Call the logout API
            const response = await axios.get(`${logoutRoute}/${id}`);
            if (response.status === 200) {
                // Clear local storage and navigate to login
                localStorage.clear();
                navigate('/login');
            } else {
                console.error(
                    'Logout API call failed with status:',
                    response.status
                );
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;
