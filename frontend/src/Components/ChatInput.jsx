import React, { useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import axios from 'axios';

export default function ChatInput({ handleSendMsg, from, to }) {
    const [msg, setMsg] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [file, setFile] = useState(null);
    const [unlockDateTime, setUnlockDateTime] = useState('');
    const [showFileInput, setShowFileInput] = useState(false);

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setMsg(selectedFile.name);
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('from', from);
            formData.append('to', to);
            formData.append('caption', msg);
            formData.append('unlockDateTime', unlockDateTime);

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/messages/addmsg/`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                const fileUrl = response.data.message.fileUrl;
                handleSendMsg(msg, fileUrl);
                setFile(null);
                setMsg('');
                setUnlockDateTime('');
                setShowFileInput(false);
                window.location.reload(); // Reload the page after sending the file
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            if (file) {
                handleFileUpload();
            } else {
                handleSendMsg(msg);
                setMsg('');
            }
        }
    };

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && (
                        <Picker onEmojiClick={handleEmojiClick} />
                    )}
                </div>
            </div>
            <form
                className="input-container"
                onSubmit={(event) => sendChat(event)}
            >
                <PlusButton onClick={() => setShowFileInput(!showFileInput)}>
                    <FaPlus />
                </PlusButton>
                {showFileInput && (
                    <>
                        <input type="file" onChange={handleFileChange} />
                        <input
                            type="datetime-local"
                            value={unlockDateTime}
                            onChange={(e) => setUnlockDateTime(e.target.value)}
                        />
                    </>
                )}
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #080420;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #9a86f3;
                    }
                }
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border-color: #9a86f3;
                }
                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: #ffffff34;
        input[type='text'] {
            width: 70%;
            height: 40px;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1rem;

            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 1.5rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg {
                font-size: 1.5rem;
                color: white;
            }
        }
    }
`;

const PlusButton = styled.button`
    background-color: #4f04ff21;
    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        font-size: 1.5rem;
        color: white;
    }
`;
