import React from 'react';
import beachImage from '../assets/beach.jpg';
import udaypro from '../assets/Profile.jpg';
const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Santusht Matra',
      role: 'NULL',
      bio: 'Santusht is an experienced project manager with a knack for keeping teams organized and motivated. He ensures all aspects of the project are delivered on time and within scope.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Uday Natthani',
      role: 'NULL',
      bio: 'Uday is a software development wizard with expertise in React and full-stack solutions. He leads the development team with a focus on performance and scalability.',
      image: udaypro,
    },
    {
      name: 'Megha Menghani',
      role: 'NULL',
      bio: 'Megha is a creative UI/UX designer who crafts user-friendly interfaces and ensures an exceptional user experience. She brings designs to life with a focus on accessibility.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Saee Nalawde',
      role: 'NULL',
      bio: 'Saee is a strategic marketer specializing in digital campaigns and branding. she ensures the project reaches the right audience effectively.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-100
        py-20"
      style={{ backgroundImage: `url(${beachImage})` }}
    >
      {/* <header className="bg-white shadow-md py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
                </div>
            </header> */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-700">
            We’re a passionate group of individuals dedicated to building
            innovative solutions.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              {/* <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                {/* <p className="text-blue-500 text-sm font-medium">
                  {member.role}
                </p> */}
                <p className="text-gray-700 mt-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
