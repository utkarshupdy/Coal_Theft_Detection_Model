// Footer.jsx
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            {/* <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> */}
            <h3 className="text-xl font-bold mb-4 bg-white bg-clip-text text-transparent">
              Coal Theft Detector
            </h3>
            <p className="text-gray-400 mb-4 w-80">
            Quick, accurate, and reliable identification of coal theft incidents for industry professionals and security personnel.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Links */}
              <a
                href="https://instagram.com/tusharpaik__"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
              >
                {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg> */}
                <FaInstagram className="w-6 h-6 text-gray-400 hover:text-blue-100" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            {/* <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> */}
            <h3 className="text-xl font-bold mb-4 bg-white bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="list-none mb-4 space-y-2">
              {[
                { to: "/", text: "Home" },
                { to: "/login", text: "Login" },
                { to: "/signup", text: "Sign Up" },
                { to: "/about", text: "About Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            {/* <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> */}
            <h3 className="text-xl font-bold mb-4 bg-white bg-clip-text text-transparent">
              Contact Us
            </h3>
            <p className="text-gray-400 mb-4">
              Have a question or need help with something? Get in touch with us!
            </p>
            <ul className="list-none mb-4 space-y-2">
              <li>
                <a
                  href="mailto:tusharpaik543@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  tusharpaik543@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919340622196"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  +919340622196
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Coal Theft Detector. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;