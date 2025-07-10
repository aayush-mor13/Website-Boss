import React from 'react'

function About() {

    
    
  return (
    <div id='aboutus' className='mx-40 my-20'>
      <div className='flex flex-col gap-8'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold text-amber-700 mb-2'>About WebsiteBoss</h2>
          <p className='text-lg text-gray-600'>Smart. Simple. Fast. Your business deserves better and we are here to deliver.</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-2xl font-semibold text-gray-800'>Our Mission</h3>
          <p className='text-lg text-gray-700'>
            We believe every business should have access to a powerful, professional website  without delays, complexity, or high costs. Our mission is to help businesses launch beautiful, high-performing websites quickly and effortlessly.
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-2xl font-semibold text-gray-800'>Our Story</h3>
          <p className='text-lg text-gray-700'>
            WebsiteBoss started with a simple goal : to simplify the way businesses go online. After watching too many companies struggle with long timelines, complex tools, or expensive agencies, we decided to change that. We built a platform that puts speed, simplicity, and quality first.
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-2xl font-semibold text-gray-800'>What We Offer</h3>
          <ul className='list-disc pl-5 text-lg text-gray-700 space-y-2'>
            <li>Launch-ready websites in minutes</li>
            <li>Mobile-first and responsive by design</li>
            <li>SEO-optimized and performance-driven</li>
            <li>Simple editing without any tech skills</li>
            <li>Reliable structure tailored for businesses and agencies</li>
          </ul>
        </div>
        <div className='text-center'>
          <p className='text-xl font-semibold text-gray-800'>
            “We are here to empower your online journey in the smart way. Let's build something great”
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default About
