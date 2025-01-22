import React from 'react';

export default function Contact() {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "541ebeb4-1b99-4ec7-8539-45c99d6dcc53");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                event.target.reset();
            } else {
                console.log("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setResult("Failed to submit form. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700">Name</label>
                    <input type="text" id="name" name="name" required className="mt-1 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:ring-2"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700">Email</label>
                    <input type="email" id="email" name="email" required className="mt-1 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:ring-2"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message" className="text-gray-700">Message</label>
                    <textarea id="message" name="message" required className="mt-1 border-2 border-gray-300 bg-white h-24 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:ring-2"></textarea>
                </div>

                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Submit Form
                </button>
            </form>
            <span className="mt-2 text-center text-gray-800">{result}</span>
        </div>
    );
}