import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

function SocketClient() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(''); // We'll handle chat rooms here
    const [userId, setUserId] = useState(''); // User ID to join chat rooms

    // Initialize socket connection
    useEffect(() => {
        const socketInstance = io('http://localhost:5000'); // Your backend URL
        setSocket(socketInstance);

        // Listen for incoming messages
        socketInstance.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    // Join a chat room (private or group)
    const joinRoom = (chatId, userId, isPrivate) => {
        socket.emit('joinRoom', chatId, userId, isPrivate);
        setChatId(chatId);
    };

    // Send a new message
    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        const messageData = {
            chatId,
            sender: userId,
            content: newMessage,
            media: '', // Optionally handle media uploads
        };

        socket.emit('sendMessage', messageData);
        setNewMessage('');
    };

    return (
        <div className="App">
            <h1>Chat Application</h1>

            {/* User and Chat Input */}
            <div>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your user ID"
                />
                <button
                    onClick={() => joinRoom('sample-chat-id', userId, true)}
                >
                    Join Private Chat
                </button>
                <button
                    onClick={() => joinRoom('group-chat-id', userId, false)}
                >
                    Join Group Chat
                </button>
            </div>

            {/* Messages Display */}
            <div className="chat-box">
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>

            {/* New Message */}
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default SocketClient;
