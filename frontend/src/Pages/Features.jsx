import React from 'react'
import beachImage from '../assets/beach.jpg';
const Features = () => {
    const features = [
        {
            title: 'Scheduled Unlocking',
            description:
                'Set specific future dates for your digital time capsule reveal.',
        },
        {
            title: 'Media Upload & Storage',
            description: 'Store text, images, videos, and audio recordings.',
        },
        {
            title: 'Collaborative Capsules',
            description: 'Create shared memories with multiple contributors.',
        },
        {
            title: 'Privacy & Access Controls',
            description: 'Choose between private, shared, or public capsules.',
        },
        {
            title: 'Countdown & Notifications',
            description: 'Track time until unlock with real-time countdown.',
        },
        {
            title: 'Thematic Templates',
            description: 'Personalize capsules with themed templates.',
        },
    ];
  return (
    <div  >
          <section id="features" className="py-16 bg-gray-50"  style={{ backgroundImage: `url(${beachImage})` }}>
                    <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Our Features</h2>
                    <div className="grid gap-6 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:translate-x-2">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
    </div>
  )
}

export default Features
