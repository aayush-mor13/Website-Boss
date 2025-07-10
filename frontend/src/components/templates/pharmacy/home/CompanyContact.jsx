import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function CompanyContact({ companyData }) {
  const { contact, primaryColor } = companyData;

  const infoItems = [
    {
      icon: <FaEnvelope className="text-2xl md:text-3xl mr-4" style={{ color: primaryColor }} />,
      title: "Email",
      detail: contact.email,
    },
    {
      icon: <FaPhoneAlt className="text-2xl md:text-3xl mr-4" style={{ color: primaryColor }} />,
      title: "Phone",
      detail: contact.phone,
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl md:text-3xl mr-4" style={{ color: primaryColor }} />,
      title: "Address",
      detail: contact.address,
    },
  ];

  return (
    <div id="companyContact" className="w-full bg-gradient-to-r from-white via-gray-50 to-white py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12" style={{ color: primaryColor }}>
          Get in Touch
        </h2>

        <div className="flex flex-col gap-10 justify-center items-center">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-start md:items-center">
              <div className="flex items-center">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-64 text-left">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm md:text-base break-words">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CompanyContact;
