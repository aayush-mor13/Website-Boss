import React from 'react';
import { NavLink } from 'react-router-dom';

function CompanyFooter({ name, logo, color }) {
  return (
    <footer className="bg-white rounded-lg shadow-sm mt-8 mx-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

          <div className="flex justify-center sm:justify-start items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Logo" />
            <span className="text-2xl font-semibold whitespace-nowrap">{name}</span>
          </div>

          <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-sm font-medium text-gray-500">
            <li>
              <NavLink to="#" className="hover:underline" style={{ color }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline" style={{ color }}>
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline" style={{ color }}>
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline" style={{ color }}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        <span className="block text-sm text-center font-bold" style={{ color }}>
          © 2025{' '}
          <NavLink to={`/pharmacy/${name}`} className="hover:underline" style={{ color }}>
            {name}™
          </NavLink>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default CompanyFooter;
