import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function CompanyContact({companyData}) {
  const {contact,primaryColor} = companyData;

  return (
    <div id='companyContact' className="w-full bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: primaryColor }}>
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-800">
          <div
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md transition-all"
            style={{boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 8px ${primaryColor}`}}
          >
            <FaEnvelope className="text-4xl mb-4" style={{ color: primaryColor }} />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-md break-all">{contact.email}</p>
          </div>
          <div
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md transition-all"
            style={{boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 8px ${primaryColor}`}}
          >
            <FaPhoneAlt className="text-4xl mb-4" style={{ color: primaryColor }} />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-md">{contact.phone}</p>
          </div>
          <div
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md transition-all"
            style={{boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 8px ${primaryColor}`}}
          >
            <FaMapMarkerAlt className="text-4xl mb-4" style={{ color: primaryColor }} />
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-md">{contact.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyContact;
