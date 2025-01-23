import React, { useState, useEffect } from 'react';

export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const data = await JSON.parse(
                localStorage.getItem(import.meta.env.VITE_BACKEND_URL)
            );
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        };
        fetchData();
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {currentUserImage && currentUserName && (
                <div className="flex flex-col h-screen bg-gray-900 text-white">
                    {/* Contacts List */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col items-center gap-4 py-4">
                            {contacts.map((contact, index) => (
                                <div
                                    key={contact._id}
                                    className={`flex items-center gap-4 w-11/12 max-w-md p-3 rounded-lg cursor-pointer transition-all ${
                                        index === currentSelected
                                            ? 'bg-indigo-600'
                                            : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                                    onClick={() =>
                                        changeCurrentChat(index, contact)
                                    }
                                >
                                    {/* Avatar */}
                                    <div className="w-12 h-12 overflow-hidden rounded-full">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Username */}
                                    <h3 className="text-base font-medium">
                                        {contact.username}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current User */}
                    <div className="flex items-center justify-center gap-4 py-4 bg-gray-800">
                        <div className="w-16 h-16 overflow-hidden rounded-full">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="Current User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold">
                            {currentUserName}
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
}
