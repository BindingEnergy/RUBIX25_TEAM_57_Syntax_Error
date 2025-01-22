import React, { useState, useEffect } from 'react';
import chatService from '../services/ChatService'; // Your chat service
import { useParams } from 'react-router-dom';

const ViewChats = () => {
    const [chats, setChats] = useState([]);
    const { userId } = useParams(); // Get the userId from URL

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const userChats = await chatService.getUserChats(userId);
                setChats(userChats);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [userId]);

    return (
        <div>
            <h3>Your Chats</h3>
            <div>
                {chats.length > 0 ? (
                    <ul>
                        {chats.map((chat) => (
                            <li key={chat.chatId}>
                                <p>Chat with {chat.participants.join(', ')}</p>
                                {/* Display more info or a link to open the chat */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No chats found</p>
                )}
            </div>
        </div>
    );
};

export default ViewChats;
