import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:5000'); // Connect to your server

const Dashboard = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState({
        title: '',
        content: '',
        privacy: 'private',
        members: [],
    });
    const [availableUsers, setAvailableUsers] = useState([]); // For selecting users
    const [view, setView] = useState('recentChats'); // Track the current view: 'recentChats' or 'createChat'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const currentUser = await axios.get('/api/auth/currentUser');
                const userDetails = await axios.get(
                    `/api/users/${currentUser.data.id}`
                );
                setUser(userDetails.data);
                console.log(userDetails.data);

                // Fetch chats for the user
                const userChats = await axios.get(
                    `/api/chats/${userDetails.data._id}`
                );
                setChats(Array.isArray(userChats.data) ? userChats.data : []); // Ensure chats is an array

                // Fetch available users for chat creation
                const userList = await axios.get(
                    'http://localhost:5000/api/users'
                ); // Assuming you have an endpoint to fetch users
                setAvailableUsers(
                    Array.isArray(userList.data) ? userList.data : []
                ); // Ensure availableUsers is an array
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
            await axios.post('/api/auth/logout');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleCreateChat = () => {
        if (!user) {
            console.error('User is not defined');
            return;
        }

        // Emit a socket event to create a new chat
        socket.emit('createChat', {
            title: newChat.title,
            content: newChat.content,
            privacy: newChat.privacy,
            members: [...newChat.members, user._id], // Add the current user to the members
            creatorId: user._id, // Use the current user's ID as the creator
        });

        // Reset chat form after sending the event
        setNewChat({ title: '', content: '', privacy: 'private', members: [] });

        // Switch to recent chats view after creating the chat
        setView('recentChats');
    };

    const handleMemberChange = (userId, isChecked) => {
        const selectedMembers = isChecked
            ? [...newChat.members, userId]
            : newChat.members.filter((id) => id !== userId);

        setNewChat({
            ...newChat,
            members: selectedMembers,
            privacy: selectedMembers.length > 1 ? 'group' : 'private',
        });
    };

    useEffect(() => {
        // Listen for the 'newChat' event from the server
        socket.on('newChat', (newChat) => {
            setChats((prevChats) => [...prevChats, newChat]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('newChat');
        };
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-medium text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Left Pane */}
            <div className="bg-blue-600 text-white py-4 px-6 w-64">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <button
                    onClick={() => setView('recentChats')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full mb-4"
                >
                    Recent Chats
                </button>
                <button
                    onClick={() => setView('createChat')}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full"
                >
                    Create Chat
                </button>
            </div>

            {/* Main Content */}
            <div className="p-6 flex-1">
                {/* Welcome Section */}
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Welcome, {user?.name}
                    </h2>
                    <p className="text-gray-600">Email: {user?.email}</p>
                </div>

                {/* Conditional Rendering Based on Current View */}
                {view === 'recentChats' && (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Your Recent Chats
                        </h3>
                        {chats.length === 0 ? (
                            <p className="text-gray-500">
                                You have no chats yet.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {chats.map((chat) => (
                                    <div
                                        key={chat._id}
                                        className="p-4 border border-gray-300 rounded-md"
                                    >
                                        <h4 className="font-semibold">
                                            {chat.title}
                                        </h4>
                                        <p>{chat.content}</p>
                                        <p className="text-gray-500">
                                            Privacy: {chat.privacy}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {view === 'createChat' && (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Create New Chat
                        </h3>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Chat Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={newChat.title}
                                onChange={(e) =>
                                    setNewChat({
                                        ...newChat,
                                        title: e.target.value,
                                    })
                                }
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Chat Content
                            </label>
                            <textarea
                                id="content"
                                value={newChat.content}
                                onChange={(e) =>
                                    setNewChat({
                                        ...newChat,
                                        content: e.target.value,
                                    })
                                }
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="privacy"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Privacy
                            </label>
                            <select
                                id="privacy"
                                value={newChat.privacy}
                                onChange={(e) =>
                                    setNewChat({
                                        ...newChat,
                                        privacy: e.target.value,
                                    })
                                }
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="private">Private</option>
                                <option value="group">Group</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="members"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Add Members
                            </label>
                            <div className="space-y-2">
                                {availableUsers.map(
                                    (userOption) =>
                                        userOption._id !== user._id && (
                                            <div
                                                key={userOption._id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={userOption._id}
                                                    checked={newChat.members.includes(
                                                        userOption._id
                                                    )}
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            userOption._id,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                <label className="text-sm text-gray-600">
                                                    {userOption.fullName ||
                                                        userOption.name}
                                                </label>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleCreateChat}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                        >
                            Create Chat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
