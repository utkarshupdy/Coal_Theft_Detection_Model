// About.jsx
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'John Anderson',
      role: 'Security Systems Expert',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      description: '15 years of experience in mining security and surveillance systems.',
    },
    {
      name: 'Dr. Emily Chen',
      role: 'AI & ML Specialist',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      description: 'Expert in AI-based detection systems and real-time monitoring.',
    },
    {
      name: 'Michael Brown',
      role: 'Operations Director',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      description: 'Specializes in mining operations and security protocol implementation.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Coal Theft Detector
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              We're dedicated to protecting mining assets through advanced AI technology 
              and real-time monitoring systems to prevent coal theft.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 mb-4">
                At Coal Theft Detector, we believe that securing mining operations 
                should be accessible to everyone, from industry professionals to local 
                communities.
              </p>
              <p className="text-gray-300 mb-4">
                Our mission is to provide accurate, instant detection of coal theft 
                using cutting-edge artificial intelligence, ensuring the safety and 
                integrity of mining operations.
              </p>
              <Link
                to="/analyzer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Try Our Analyzer
              </Link>
            </div>
            <div className="relative h-96">
              <img
                src="/path-to-your-image.jpg" // Add your image path
                alt="Coal Mining Operations"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-gray-300">{member.role}</p>
                  <p className="text-gray-300">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;