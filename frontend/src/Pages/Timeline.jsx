// Timeline.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Change this line - we only need Link
import beachImage from '../assets/beach.jpg';
import logo from '../assets/logo.png';

const TimelinePage = () => { // Change the component name to TimelinePage
    const timelineEvents = [
        {
            date: "March 15, 2024",
            title: "Mom's 50th Birthday",
            description: "A beautiful celebration with family and friends"
        },
        {
            date: "April 2, 2024",
            title: "Rajasthan Trip",
            description: "Exploring the majestic palaces and desert landscapes"
        },
        {
            date: "May 10, 2024",
            title: "Graduation Day",
            description: "A proud moment for the family"
        },
        {
            date: "June 20, 2024",
            title: "Summer Vacation",
            description: "A relaxing getaway to the beach"
        },
        {
            date: "July 4, 2024",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 15, 2024",
            title: "Friend's Wedding",
            description: "A joyous celebration of love and friendship"
        },
        {
            date: "September 1, 2024",
            title: "New School Year",
            description: "A fresh start for the kids"
        },
        {
            date: "October 12, 2024",
            title: "Halloween Party",
            description: "A spooky night of fun and games"
        },
        {
            date: "November 22, 2024",
            title: "Thanksgiving Dinner",
            description: "A time to give thanks and share with loved ones"
        },
        {
            date: "December 25, 2024",
            title: "Christmas Celebration",
            description: "A festive day filled with joy and gifts"
        },
        {
            date: "January 1, 2025",
            title: "New Year's Eve Party",
            description: "A night to remember, welcoming the new year"
        },
        {
            date: "February 14, 2025",
            title: "Valentine's Day",
            description: "A day to celebrate love and romance"
        },
        {
            date: "March 17, 2025",
            title: "St. Patrick's Day",
            description: "A day of Irish heritage and celebration"
        },
        {
            date: "April 1, 2025",
            title: "April Fool's Day",
            description: "A day of playful jokes and pranks"
        },
        {
            date: "May 12, 2025",
            title: "Mother's Day",
            description: "A special day to honor mothers"
        },
        {
            date: "June 15, 2025",
            title: "Father's Day",
            description: "A day to celebrate and appreciate fathers"
        },
        {
            date: "July 4, 2025",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 19, 2025",
            title: "Back to School",
            description: "A time of new beginnings and learning"
        },
        {
            date: "September 7, 2025",
            title: "Labor Day",
            description: "A day to recognize the hard work and dedication"
        },
        {
            date: "October 31, 2025",
            title: "Halloween Night",
            description: "A spooky evening of costumes and treats"
        },
        {
            date: "November 26, 2025",
            title: "Thanksgiving Feast",
            description: "A time to come together and give thanks"
        },
        {
            date: "December 24, 2025",
            title: "Christmas Eve",
            description: "A night of anticipation and joy"
        },
        {
            date: "January 1, 2026",
            title: "New Year's Day",
            description: "A fresh start to the year"
        },
        {
            date: "February 13, 2026",
            title: "Valentine's Day Celebration",
            description: "A day to cherish love and relationships"
        },
        {
            date: "March 17, 2026",
            title: "St. Patrick's Day Parade",
            description: "A festive celebration of Irish heritage"
        },
        {
            date: "April 1, 2026",
            title: "April Fool's Day Pranks",
            description: "A day of playful jokes and surprises"
        },
        {
            date: "May 10, 2026",
            title: "Mother's Day Celebration",
            description: "A special day to honor mothers and motherhood"
        },
        {
            date: "June 21, 2026",
            title: "Father's Day Celebration",
            description: "A day to celebrate and appreciate fathers"
        },
        {
            date: "July 4, 2026",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 16, 2026",
            title: "Back to School Season",
            description: "A time of new beginnings and learning"
        },
        {
            date: "September 7, 2026",
            title: "Labor Day Weekend",
            description: "A day to recognize the hard work and dedication"
        },
        {
            date: "October 31, 2026",
            title: "Halloween Costume Party",
            description: "A spooky evening of costumes and treats"
        },
        {
            date: "November 25, 2026",
            title: "Thanksgiving Feast",
            description: "A time to come together and give thanks"
        },
        {
            date: "December 24, 2026",
            title: "Christmas Eve Celebration",
            description: "A night of anticipation and joy"
        },
        {
            date: "January 1, 2027",
            title: "New Year's Eve Celebration",
            description: "A night to remember, welcoming the new year"
        },
        {
            date: "February 14, 2027",
            title: "Valentine's Day Celebration",
            description: "A day to celebrate love and romance"
        },
        {
            date: "March 17, 2027",
            title: "St. Patrick's Day Celebration",
            description: "A festive celebration of Irish heritage"
        },
        {
            date: "April 1, 2027",
            title: "April Fool's Day Jokes",
            description: "A day of playful jokes and pranks"
        },
        {
            date: "May 9, 2027",
            title: "Mother's Day Celebration",
            description: "A special day to honor mothers and motherhood"
        },
        {
            date: "June 20, 2027",
            title: "Father's Day Celebration",
            description: "A day to celebrate and appreciate fathers"
        },
        {
            date: "July 4, 2027",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 15, 2027",
            title: "Back to School Season",
            description: "A time of new beginnings and learning"
        },
        {
            date: "September 6, 2027",
            title: "Labor Day Weekend",
            description: "A day to recognize the hard work and dedication"
        },
        {
            date: "October 31, 2027",
            title: "Halloween Night",
            description: "A spooky evening of costumes and treats"
        },
        {
            date: "November 24, 2027",
            title: "Thanksgiving Feast",
            description: "A time to come together and give thanks"
        },
        {
            date: "December 24, 2027",
            title: "Christmas Eve Celebration",
            description: "A night of anticipation and joy"
        },
        {
            date: "January 1, 2028",
            title: "New Year's Day Celebration",
            description: "A fresh start to the year"
        },
        {
            date: "February 14, 2028",
            title: "Valentine's Day Celebration",
            description: "A day to celebrate love and romance"
        },
        {
            date: "March 17, 2028",
            title: "St. Patrick's Day Celebration",
            description: "A festive celebration of Irish heritage"
        },
        {
            date: "April 1, 2028",
            title: "April Fool's Day Pranks",
            description: "A day of playful jokes and surprises"
        },
        {
            date: "May 14, 2028",
            title: "Mother's Day Celebration",
            description: "A special day to honor mothers and motherhood"
        },
        {
            date: "June 18, 2028",
            title: "Father's Day Celebration",
            description: "A day to celebrate and appreciate fathers"
        },
        {
            date: "July 4, 2028",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 21, 2028",
            title: "Back to School Season",
            description: "A time of new beginnings and learning"
        },
        {
            date: "September 4, 2028",
            title: "Labor Day Weekend",
            description: "A day to recognize the hard work and dedication"
        },
        {
            date: "October 31, 2028",
            title: "Halloween Costume Party",
            description: "A spooky evening of costumes and treats"
        },
        {
            date: "November 22, 2028",
            title: "Thanksgiving Feast",
            description: "A time to come together and give thanks"
        },
        {
            date: "December 24, 2028",
            title: "Christmas Eve Celebration",
            description: "A night of anticipation and joy"
        },
        {
            date: "January 1, 2029",
            title: "New Year's Eve Celebration",
            description: "A night to remember, welcoming the new year"
        },
        {
            date: "February 14, 2029",
            title: "Valentine's Day Celebration",
            description: "A day to celebrate love and romance"
        },
        {
            date: "March 17, 2029",
            title: "St. Patrick's Day Celebration",
            description: "A festive celebration of Irish heritage"
        },
        {
            date: "April 1, 2029",
            title: "April Fool's Day Jokes",
            description: "A day of playful jokes and pranks"
        },
        {
            date: "May 13, 2029",
            title: "Mother's Day Celebration",
            description: "A special day to honor mothers and motherhood"
        },
        {
            date: "June 17, 2029",
            title: "Father's Day Celebration",
            description: "A day to celebrate and appreciate fathers"
        },
        {
            date: "July 4, 2029",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 19, 2029",
            title: "Back to School Season",
            description: "A time of new beginnings and learning"
        },
        {
            date: "September 3, 2029",
            title: "Labor Day Weekend",
            description: "A day to recognize the hard work and dedication"
        },
        {
            date: "October 31, 2029",
            title: "Halloween Night",
            description: "A spooky evening of costumes and treats"
        },
        {
            date: "November 21, 2029",
            title: "Thanksgiving Feast",
            description: "A time to come together and give thanks"
        },
        {
            date: "December 24, 2029",
            title: "Christmas Eve Celebration",
            description: "A night of anticipation and joy"
        },
        {
            date: "January 1, 2030",
            title: "New Year's Day Celebration",
            description: "A fresh start to the year"
        },
        {
            date: "February 14, 2030",
            title: "Valentine's Day Celebration",
            description: "A day to celebrate love and romance"
        },
        {
            date: "March 17, 2030",
            title: "St. Patrick's Day Celebration",
            description: "A festive celebration of Irish heritage"
        },
        {
            date: "April 1, 2030",
            title: "April Fool's Day Pranks",
            description: "A day of playful jokes and surprises"
        },
        {
            date: "May 12, 2030",
            title: "Mother's Day Celebration",
            description: "A special day to honor mothers and motherhood"
        },
        {
            date: "June 16, 2030",
            title: "Father's Day Celebration",
            description: "A day to celebrate and appreciate fathers"
        },
        {
            date: "July 4, 2030",
            title: "Independence Day Celebration",
            description: "Fireworks and patriotic fervor"
        },
        {
            date: "August 18, 2030",
            title: "Back to School Season",
            description: "A time of new beginnings and learning"
        },
        {
            date: "September 2, 2030",
            title: "Labor Day Weekend",
            description: "A day to recognize the hard work and dedication"
        },
        {
            date: "October 31, 2030",
            title: "Halloween Costume Party",
            description: "A spooky evening of costumes and treats"
        },
        {
            date: "November 26, 2030",
            title: "Thanksgiving Feast",
            description: "A time to come together and give thanks"
        },
        {
            date: "December 24, 2030",
            title: "Christmas Eve Celebration",
            description: "A night of anticipation and joy"
        },
        {
            date: "January 1, 2031",
            title: "New Year's Eve Celebration",
            description: "A night to remember, welcoming the new year"
        },
        {
            date: "February 14, 2031",
            title: "Valentine's Day Celebration",
            description: "A day to celebrate love and romance"
        },
        {
            date: "March 17, 2031",
            title: "St. Patrick's Day Celebration",
            description: "A festive celebration of Irish heritage"
        },
        {
            date: "April 1, 2031",
            title: "April Fool's Day Jokes",
            description: "A day of playful jokes and pranks"
        },
        {
            date: "May 10, 2031",
            title: "Mother's Day Celebration",
            description: "A special day to honor mothers and motherhood"
        },
        {
            date: "June 21, 2031",
        }
    ];

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
           
            <div 
                className="fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-no-repeat bg-center bg-contain bg-white -z-10"
                style={{ backgroundImage: `url(${beachImage})` }}
            />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full px-8 py-4 bg-[rgba(214,244,249,0.9)] flex justify-between items-center z-50 shadow-md">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-bold text-gray-800">Time Capsule</span>
                </div>
                <div className="flex gap-8">
                    <Link to="/" className="text-gray-800 font-medium hover:text-[#6b95ff] transition-colors">Home</Link>
                    {/* <Link to="/timeline" className="text-gray-800 font-medium hover:text-[#6b95ff] transition-colors">Timeline</Link> */}
                    <Link to="/about" className="text-gray-800 font-medium hover:text-[#6b95ff] transition-colors">About</Link>
                    <Link to="/features" className="text-gray-800 font-medium hover:text-[#6b95ff] transition-colors">Features</Link>
                    <Link to="/contact" className="text-gray-800 font-medium hover:text-[#6b95ff] transition-colors">Contact</Link>
                </div>
            </nav>

            <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Memory Timeline</h1>
                
                
                <div className="relative">
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sky-200"></div>

                   
                    {timelineEvents.map((event, index) => (
                        <div key={index} className="relative mb-16">
                         
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-sky-400 rounded-full shadow-lg"></div>
                         
                            <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} 
                                          bg-white/90 rounded-lg shadow-lg hover:shadow-xl transition-shadow
                                          p-6 cursor-pointer hover:translate-y-[-2px] transition-transform`}>
                                <div className="text-sky-600 font-semibold mb-2">{event.date}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                <p className="text-gray-600">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimelinePage;