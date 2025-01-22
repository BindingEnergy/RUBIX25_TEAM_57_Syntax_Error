import React from 'react';
 

const AboutPage = () => {
    const teamMembers = [
        {
            name: 'Alice Johnson',
            role: 'Project Manager',
            bio: 'Alice is an experienced project manager with a knack for keeping teams organized and motivated. She ensures all aspects of the project are delivered on time and within scope.',
            image: 'https://via.placeholder.com/150', // Replace with actual image URLs.
        },
        {
            name: 'Bob Smith',
            role: 'Lead Developer',
            bio: 'Bob is a software development wizard with expertise in React and full-stack solutions. He leads the development team with a focus on performance and scalability.',
            image: 'https://via.placeholder.com/150', 
        },
        {
            name: 'Claire Lee',
            role: 'UI/UX Designer',
            bio: 'Claire is a creative UI/UX designer who crafts user-friendly interfaces and ensures an exceptional user experience. She brings designs to life with a focus on accessibility.',
            image: 'https://via.placeholder.com/150',
        },
        {
            name: 'David Brown',
            role: 'Marketing Specialist',
            bio: 'David is a strategic marketer specializing in digital campaigns and branding. He ensures the project reaches the right audience effectively.',
            image: 'https://via.placeholder.com/150', 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-12 px-4">
                <section className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet the Team</h2>
                    <p className="text-lg text-gray-600">
                        We’re a passionate group of individuals dedicated to building innovative solutions.
                    </p>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-blue-600 text-sm font-semibold">{member.role}</p>
                                <p className="text-gray-600 mt-2">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default AboutPage;
