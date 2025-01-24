import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { sendMessageRoute, recieveMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await JSON.parse(
                localStorage.getItem(import.meta.env.VITE_BACKEND_URL)
            );
            const response = await axios.post(recieveMessageRoute, {
                from: data._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        };

        if (currentChat) {
            fetchMessages();
        }
    }, [currentChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(
                    localStorage.getItem(import.meta.env.VITE_BACKEND_URL)
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    const handleSendMsg = async (
        msg,
        fileUrl = null,
        unlockDateTime = null
    ) => {
        const data = await JSON.parse(
            localStorage.getItem(import.meta.env.VITE_BACKEND_URL)
        );
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: data._id,
            msg,
            fileUrl,
            unlockDateTime,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
            fileUrl,
            unlockDateTime,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg, fileUrl, unlockDateTime });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const currentUserId = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_BACKEND_URL)
    )._id;

    const handleFileClick = (fileUrl) => {
        setSelectedFile(fileUrl);
        setIsModalOpen(true);
    };

    const renderMessageContent = (message) => {
        if (!message) {
            return null;
        }

        const currentTime = new Date();
        const unlockTime = new Date(message.unlockDateTime);

        if (message.fileUrl && currentTime < unlockTime) {
            const timeDiff = unlockTime - currentTime;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor(
                (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            const countdown = `${hours}h ${minutes}m ${seconds}s`;

            return (
                <div className="file-container">
                    <p className="locked-file">Locked File</p>
                    <p className="unlock-time">
                        Unlocks at: {unlockTime.toLocaleString()}
                    </p>
                    <p className="countdown">{countdown}</p>
                </div>
            );
        }

        if (message.fileUrl) {
            const fileExtension = message.fileUrl
                .split('.')
                .pop()
                .toLowerCase();
            const fileName = message.fileUrl.split('/').pop();
            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                return (
                    <div>
                        <img
                            src={message.fileUrl}
                            alt="file"
                            className="file-preview"
                            onClick={() => handleFileClick(message.fileUrl)}
                        />
                        {message.message && <p>{message.message}</p>}
                    </div>
                );
            } else if (fileExtension === 'pdf') {
                return (
                    <div className="file-container">
                        <embed
                            src={message.fileUrl}
                            type="application/pdf"
                            className="file-preview"
                        />
                        <a
                            href={message.fileUrl}
                            download={fileName}
                            className="download-button"
                        >
                            Download
                        </a>
                        {message.message && <p>{message.message}</p>}
                    </div>
                );
            } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
                return (
                    <div className="file-container">
                        <audio controls>
                            <source
                                src={message.fileUrl}
                                type={`audio/${fileExtension}`}
                            />
                            Your browser does not support the audio element.
                        </audio>
                        <a
                            href={message.fileUrl}
                            download={fileName}
                            className="download-button"
                        >
                            Download
                        </a>
                        {message.message && <p>{message.message}</p>}
                    </div>
                );
            } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                return (
                    <div className="file-container">
                        <video controls className="file-preview">
                            <source
                                src={message.fileUrl}
                                type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video element.
                        </video>
                        <a
                            href={message.fileUrl}
                            download={fileName}
                            className="download-button"
                        >
                            Download
                        </a>
                        {message.message && <p>{message.message}</p>}
                    </div>
                );
            } else {
                return (
                    <div className="file-container">
                        <a
                            href={message.fileUrl}
                            download={fileName}
                            className="file-link"
                        >
                            {fileName}
                        </a>
                        <a
                            href={message.fileUrl}
                            download={fileName}
                            className="download-button"
                        >
                            Download
                        </a>
                        {message.message && <p>{message.message}</p>}
                    </div>
                );
            }
        } else {
            return <p>{message.message}</p>;
        }
    };

    return (
        <Container>
            {currentChat && (
                <>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;utf8,${currentChat.avatarImage}`}
                                    alt=""
                                />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages">
                        {messages.map((message) => {
                            return (
                                <div ref={scrollRef} key={uuidv4()}>
                                    <div
                                        className={`message ${
                                            message.fromSelf
                                                ? 'sended'
                                                : 'recieved'
                                        }`}
                                    >
                                        <div className="content ">
                                            {renderMessageContent(message)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ChatInput
                        handleSendMsg={handleSendMsg}
                        from={currentUserId}
                        to={currentChat._id}
                    />
                    {isModalOpen && (
                        <Modal>
                            <ModalContent>
                                <CloseButton
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    X
                                </CloseButton>
                                {selectedFile && (
                                    <>
                                        {['jpg', 'jpeg', 'png', 'gif'].includes(
                                            selectedFile
                                                .split('.')
                                                .pop()
                                                .toLowerCase()
                                        ) && (
                                            <img
                                                src={selectedFile}
                                                alt="Preview"
                                            />
                                        )}
                                        {['mp4', 'webm', 'ogg'].includes(
                                            selectedFile
                                                .split('.')
                                                .pop()
                                                .toLowerCase()
                                        ) && (
                                            <video controls>
                                                <source
                                                    src={selectedFile}
                                                    type={`video/${selectedFile
                                                        .split('.')
                                                        .pop()
                                                        .toLowerCase()}`}
                                                />
                                                Your browser does not support
                                                the video element.
                                            </video>
                                        )}
                                        <DownloadButton
                                            href={selectedFile}
                                            download
                                        >
                                            Download
                                        </DownloadButton>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    )}
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    @media screen and (max-width: 720px) {
        grid-template-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        @media screen and (max-width: 720px) {
            padding: 0 1rem;
        }
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                    @media screen and (max-width: 720px) {
                        height: 2rem;
                    }
                }
            }
            .username {
                h3 {
                    color: white;
                    @media screen and (max-width: 720px) {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        @media screen and (max-width: 720px) {
            padding: 0.5rem 1rem;
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
                @media screen and (min-width: 720px) and (max-width: 1080px) {
                    max-width: 70%;
                }
                @media screen and (max-width: 720px) {
                    max-width: 80%;
                    padding: 0.5rem;
                    font-size: 0.9rem;
                }
                .file-preview {
                    max-width: 100px;
                    max-height: 100px;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    @media screen and (max-width: 720px) {
                        max-width: 50px;
                        max-height: 50px;
                    }
                }
                .file-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .locked-file {
                        color: white;
                        margin-bottom: 0.5rem;
                        @media screen and (max-width: 720px) {
                            font-size: 0.8rem;
                        }
                    }
                    .unlock-time {
                        color: white;
                        margin-bottom: 0.5rem;
                        @media screen and (max-width: 720px) {
                            font-size: 0.8rem;
                        }
                    }
                    .countdown {
                        color: white;
                        margin-top: 0.5rem;
                        @media screen and (max-width: 720px) {
                            font-size: 0.8rem;
                        }
                    }
                    .file-link {
                        color: white;
                        text-decoration: none;
                        margin-bottom: 0.5rem;
                        @media screen and (max-width: 720px) {
                            font-size: 0.8rem;
                        }
                    }
                    .download-button {
                        background-color: #9a86f3;
                        border: none;
                        border-radius: 0.5rem;
                        padding: 0.5rem 1rem;
                        color: white;
                        cursor: pointer;
                        text-decoration: none;
                        @media screen and (max-width: 720px) {
                            padding: 0.3rem 0.5rem;
                            font-size: 0.8rem;
                        }
                    }
                }
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .recieved {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    position: relative;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    img,
    video {
        max-width: 90vw;
        max-height: 90vh;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: red;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;

const DownloadButton = styled.a`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #9a86f3;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-decoration: none;
    @media screen and (max-width: 720px) {
        padding: 0.3rem 0.5rem;
        font-size: 0.8rem;
    }
`;
