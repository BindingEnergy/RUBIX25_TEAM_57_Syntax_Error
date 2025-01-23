import React from 'react';
import beachImage from '../assets/beach.jpg';
export default function Contact() {
    const [result, setResult] = React.useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult('Sending...');
        const formData = new FormData(event.target);

        formData.append('access_key', '3ae3f409-08ba-484a-a645-006c634aad4f');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success) {
                event.target.reset();
                setResult('Form Submitted Successfully!');
            } else {
                console.error('Error', data);
                setResult(data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setResult('Failed to submit form. Please try again.');
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-pink-100 rounded-lg shadow-md mt-16 h-screen"
            style={{
                backgroundImage: `url(${beachImage})`,
                backgroundSize: 'cover',
            }}
        >
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                FeedBack Form
            </h1>
            <form onSubmit={onSubmit} className="space-y-6 max-w-md w-full">
                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="text-gray-800 font-semibold"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-2 border-2 border-gray-300 bg-white h-10 px-4 rounded-lg text-sm focus:outline-none focus:ring-pink-400 focus:ring-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-gray-800 font-semibold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-2 border-2 border-gray-300 bg-white h-10 px-4 rounded-lg text-sm focus:outline-none focus:ring-pink-400 focus:ring-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="message"
                        className="text-gray-800 font-semibold"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        className="mt-2 border-2 border-gray-300 bg-white h-24 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-pink-400 focus:ring-2"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
            <span className="mt-4 text-center text-gray-700">{result}</span>
        </div>
    );
}
