import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

export default function FileUpload({ handleSendFile, from, to }) {
    const [file, setFile] = useState(null);
    const [showFileInput, setShowFileInput] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('from', from);
            formData.append('to', to);

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
                handleSendFile(fileUrl);
                setFile(null);
                setShowFileInput(false);
                window.location.reload(); // Reload the page after sending the file
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <FileUploadContainer>
            <PlusButton onClick={() => setShowFileInput(!showFileInput)}>
                <FaPlus />
            </PlusButton>
            {showFileInput && (
                <FileInputContainer>
                    <input type="file" onChange={handleFileChange} />
                    {file && (
                        <FilePreview>
                            <p>{file.name}</p>
                            <button onClick={handleFileUpload}>Send</button>
                        </FilePreview>
                    )}
                </FileInputContainer>
            )}
        </FileUploadContainer>
    );
}

const FileUploadContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
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

const FileInputContainer = styled.div`
    display: flex;
    align-items: center;
    input {
        display: none;
    }
    button {
        background-color: #9a86f3;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        margin-left: 0.5rem;
    }
    input[type='file'] {
        display: block;
        margin-left: 0.5rem;
    }
`;

const FilePreview = styled.div`
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-left: 0.5rem;
    p {
        margin: 0;
        color: white;
    }
    button {
        background-color: #9a86f3;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        margin-left: 0.5rem;
    }
`;
