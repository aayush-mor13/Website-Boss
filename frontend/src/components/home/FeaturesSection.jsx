import React from 'react'
import { FaRocket, FaMobileAlt, FaClock, FaGlobe, FaPaintBrush, FaSyncAlt } from 'react-icons/fa'

function Features() {
  const features = [
    {
      icon: <FaRocket className="text-3xl text-amber-700" />,
      title: "Launch Fast",
      desc: "Get your website live in minutes - no delays, no technical setup",
    },
    {
      icon: <FaMobileAlt className="text-3xl text-amber-700" />,
      title: "Mobile-Optimized",
      desc: "Your website looks perfect on phones, tablets, and desktops",
    },
    {
      icon: <FaClock className="text-3xl text-amber-700" />,
      title: "Always On",
      desc: "Built for speed, uptime, and performance",
    },
    {
      icon: <FaGlobe className="text-3xl text-amber-700" />,
      title: "SEO-Ready",
      desc: "Optimized to rank better and bring in organic traffic",
    },
    {
      icon: <FaPaintBrush className="text-3xl text-amber-700" />,
      title: "Modern Design",
      desc: "A sleek, professional look tailored for your business",
    },
    {
      icon: <FaSyncAlt className="text-3xl text-amber-700" />,
      title: "Always Updated",
      desc: "Your site stays fresh with ongoing improvements, best practices, and tech updates",
    },
  ]

  return (
    <div className='mx-40 my-24'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold text-amber-700'>Features That Power Your Website</h2>
        <p className='text-gray-600 mt-2 text-lg'>Everything you need</p>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10'>
        {features.map((feature, index) => (
          <div key={index} className='p-6 bg-white shadow-md rounded-2xl flex flex-col items-center text-center hover:shadow-xl transition-all'>
            <div className='mb-4'>{feature.icon}</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>{feature.title}</h3>
            <p className='text-gray-600'>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
