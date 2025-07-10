import React from 'react';

function AboutCompany({ companyData }) {
  const { name, domain, tagline, about, primaryColor, logo } = companyData;

  return (
    <div id="companyAbout" className="w-full bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-evenly items-center gap-12 bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
        
        <div className="flex justify-center md:justify-start pl-16">
          <div className="bg-white rounded-full p-6 shadow-md border w-fit">
            <img
              src={logo}
              alt={`${name} Logo`}
              className="w-48 object-contain rounded-full"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              <span style={{ color: primaryColor }}>About</span> <span className="italic">{name}</span>
              <div
                className="absolute bottom-0 left-0 h-1 w-full rounded-full"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </h2>
          </div>

          <div className="space-y-4 text-gray-800 text-lg">
            <div>
              <p className="font-semibold text-gray-700">
                <span className="text-gray-900 font-bold">Domain:</span>{' '}
                <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 ml-2">
                  {domain}
                </span>
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">
                <span className="text-gray-900 font-bold">Tagline:</span>{' '}
                <span className="italic text-base ml-2 text-gray-600">“{tagline}”</span>
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 text-lg">
                <span className="text-gray-900 font-bold">What is {name}?</span>
                <br />
                <span className="text-base font-normal leading-relaxed">{about.what}</span>
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">
                <span className="text-gray-900 font-bold">Founded In:</span>{' '}
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full ml-2">
                  {about.year}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCompany;
