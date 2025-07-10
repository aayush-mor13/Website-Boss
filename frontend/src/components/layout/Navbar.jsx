import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('aboutus');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="border-gray-200 bg-amber-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logo.png" className="h-12 rounded-lg" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">WebsiteBoss</span>
        </Link>

        <button
          className="inline-flex items-center p-2 text-sm text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block transition-colors hover:text-amber-950 font-bold ${
                    isActive ? 'text-amber-950' : 'text-white'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>

            {role === 'admin' && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block transition-colors hover:text-amber-950 font-bold ${
                      isActive ? 'text-amber-950' : 'text-white'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {role !== 'admin' && (
              <>
                <li>
                  <button
                    onClick={handleScrollToAbout}
                    className="block transition-colors hover:text-amber-950 font-bold text-white"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleScrollToContact}
                    className="block transition-colors hover:text-amber-950 font-bold text-white"
                  >
                    Contact
                  </button>
                </li>
              </>
            )}

            {role === 'admin' && (
              <li>
                <NavLink
                  to="/create-website"
                  className={({ isActive }) =>
                    `block transition-colors hover:text-amber-950 font-bold ${
                      isActive ? 'text-amber-950' : 'text-white'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Create Website
                </NavLink>
              </li>
            )}

            {role !== 'admin' && (
              <>
                {/* <li>
                  <NavLink
                    to="/register"
                    className="block transition-colors text-white hover:text-amber-950 font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/login"
                    className="block transition-colors text-white hover:text-amber-950 font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {role && (
              <li>
                <button
                  onClick={handleLogout}
                  className="block transition-colors text-white hover:text-amber-950 font-bold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
