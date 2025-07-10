import React from 'react'

function Testimonials() {
  const testimonials = [
    {
      name: "Aayush Mor",
      role: "Small Business Owner",
      feedback: "WebsiteBoss helped me launch my consulting website in under an hour and it actually looks professional!",
      image: "/images/testimonial1.jpg"
    },
    {
      name: "Rohit Mutha",
      role: "Marketing Consultant",
      feedback: "The process was so smooth and quick. No coding, no stress only results, speed, and satisfaction",
      image: "/images/testimonial2.jpg"
    },
    {
      name: "Anjali Sharma",
      role: "Freelance Designer",
      feedback: "I have used many website tools but this one just gets it right. It's fast, clean, and designed for businesses",
      image: "/images/testimonial3.jpg"
    }
  ]

  return (
    <div className='mx-40 my-24'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold text-amber-700'>What Our Users Say</h2>
        <p className='text-lg text-gray-600 mt-2'>Trusted by business owners, freelancers, and agencies</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10'>
        {testimonials.map((t, index) => (
          <div key={index} className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition'>
            <div className='flex flex-col items-center gap-4'>
              <img
                src={t.image}
                alt={t.name}
                className='w-20 h-20 rounded-full object-cover border-2 border-amber-700'
              />
              <p className='text-gray-700 text-center italic'>" {t.feedback} "</p>
              <div className='text-center'>
                <h4 className='font-semibold text-lg text-gray-800'>{t.name}</h4>
                <p className='text-sm text-gray-500'>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
