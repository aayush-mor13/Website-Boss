import React from 'react'
import FeaturesSection from './FeaturesSection'
import About from './About';
import Testimonials from './Testimonials';
import Contact from './Contact';

function Home() {
  return (
    <div>
      <div className='mx-40 h-[calc(100vh-82px)] flex flex-col items-center justify-center gap-20'>
        <div className='flex flex-row sm:flex-col md:flex-row justify-center items-center'>
            <div className='m-8 w-1/2 sm:w-full flex flex-col justify-center items-center gap-8'>
                <h1 className='text-center text-5xl text-gray-800 font-bold'>Welcome to <span className='text-amber-700'>WebsiteBoss.com</span> !</h1>
                <p className='text-gray-600 text-xl text-center'>Launch Websites. Faster. Smarter. Industry-Ready.</p>
                <p className='text-gray-600 text-lg text-center'>We help businesses and agencies build tailored, industry-specific websites efficiently — ensuring consistent structure, modern design, and quick delivery for every client</p>
            </div>
            <div className='w-1/2 sm:w-full'>
                <img src="/images/homeimg.webp" className='rounded-3xl' alt="Home" />
            </div>
        </div>
      </div>
      <FeaturesSection/>
      <About/>
      <Testimonials/>
      <Contact/>
    </div>
  )
}

export default Home
