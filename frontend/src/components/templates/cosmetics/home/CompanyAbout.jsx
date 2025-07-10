import React from 'react';

function AboutCompany({ companyData }) {
  const { name, domain, tagline, about, primaryColor, logo } = companyData;

  return (
    <div id='companyAbout' className="w-full bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-evenly items-center gap-24">
        <div className="flex-shrink-0">
          <img src={logo} alt={`${name} Logo`} className="w-40 h-40 object-contain rounded-xl shadow-lg" />
        </div>

        <div className="flex flex-col gap-6 md:items-center">
          <h2 className="text-5xl font-bold flex items-center flex-wrap" style={{ color: primaryColor }}>
            About <span className="ml-4 text-6xl italic">{name}</span>
          </h2>

          <div className="text-lg text-gray-800 max-w-xl">
            <div className='flex flex-row items-end mb-4'>
              <p className="mb-2 text-2xl font-bold text-zinc-800">Domain : <span className="mb-2 pl-4 text-xl font-medium text-zinc-700">{domain}</span></p>
            </div>
            <div className='flex flex-row items-end  mb-4'>
              <p className="mb-2 text-2xl font-bold text-zinc-800">Tagline :  <span className="mb-2 pl-4 text-xl italic font-medium text-zinc-700">“ {tagline} ”</span></p>
            </div>
            <div className='flex flex-row flex-wrap items-end  mb-4'>
              <p className="mb-2 text-2xl font-bold text-zinc-800">What is {name} ? <br></br><span className="mb-2 text-xl text-zinc-700 font-medium text-center">{about.what}</span></p>
            </div>
            <div className='flex flex-row items-end'>
              <p className="mb-2 text-2xl font-bold text-zinc-800">Founded In : <span className="mb-2 pl-4 text-xl text-zinc-700  font-medium">{about.year}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCompany;
