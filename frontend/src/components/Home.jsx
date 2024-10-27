import React, { useState } from 'react';
import { 
  MdNotifications, 
  MdSecurity, 
  MdDashboard,
  MdAnalytics,
  MdWarning,
  MdShield 
} from 'react-icons/md';
import { RiDatabase2Fill } from 'react-icons/ri';
import { BiSolidCctv } from 'react-icons/bi';
import { FaServer } from 'react-icons/fa';
import videoSrc from '../assets/homevideo.mp4';
import { Link } from 'react-router-dom';


const Home = () => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className="w-full">
      <div className="bg-gray-900 min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="bg-gray-800 text-white p-6 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              {/* <MdSecurity className="text-4xl text-blue-400" /> */}
              <h1 className="text-4xl font-bold pt-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Coal Theft Detector
              </h1>
            </div>
            <p className="text-center mt-2 text-gray-300">
              Protecting your resources with cutting-edge technology
            </p>
          </div>
        </header>

        {/* Hero Section with Background Video */}
      <section className="relative flex flex-col items-center justify-center min-h-[600px] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gray-900/50 z-10" /> {/* Dark overlay */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ filter: 'brightness(0.6)' }}
          >
            <source 
              src={videoSrc}
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <div className="backdrop-blur-sm bg-gray-800/80 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div className="flex justify-center mb-4">
              <BiSolidCctv className="text-6xl text-blue-400 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center">
              Detect Coal Theft <span className="text-blue-400">Instantly!</span>
            </h2>
            <p className="mt-4 text-gray-300 text-center text-lg">
              Our advanced detection system alerts you in real-time about any unauthorized access to your coal resources.
            </p>
            <div className="mt-8 flex justify-center">
              <button className="group relative px-6 py-3 bg-blue-500 text-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                <span className="relative z-10"><Link to="/about">Learn More</Link></span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce flex flex-col items-center text-white/50">
            <div className="w-1 h-8 rounded-full bg-white/20 mb-2" />
            <span className="text-sm">Scroll to explore</span>
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Advanced Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MdNotifications className="w-8 h-8" />,
                  title: "Real-Time Alerts",
                  description: "Receive instant notifications of any suspicious activities.",
                },
                {
                  icon: <MdAnalytics className="w-8 h-8" />,
                  title: "Data Analytics",
                  description: "Analyze theft patterns and improve your security measures.",
                },
                {
                  icon: <MdDashboard className="w-8 h-8" />,
                  title: "User-Friendly Interface",
                  description: "Easy to navigate dashboard for all your monitoring needs.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="h-full p-8 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                    <div className="flex justify-center mb-6">
                      <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-center">
                      {feature.description}
                    </p>
                    {isHovered === index && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 pt-24">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: <RiDatabase2Fill />, text: "Secure Data Storage" },
                { icon: <FaServer />, text: "24/7 Server Monitoring" },
                { icon: <MdShield />, text: "Advanced Encryption" },
                { icon: <BiSolidCctv />, text: "CCTV Integration" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-3 p-4 bg-gray-700 rounded-lg text-white">
                  <span className="text-2xl text-blue-400">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        {/* <section className="py-16 bg-gray-800">
        </section> */}

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-6">
              Get Started Today!
            </h2>
            
            <button className="px-8 py-3 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 mx-auto">
              <span><Link to="/signup">Sign Up Now</Link></span>
              {/* <MdSecurity className="text-xl" /> */}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;