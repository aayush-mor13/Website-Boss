import React from 'react'

function Contact() {
  return (
    <div id='contact' className="mx-40 my-24 flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-700">Get in Touch</h2>
        <p className="text-lg text-gray-600 mt-2">
          Have a question or need help? Fill out the form and we will get back to you shortly
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-10 md:flex md:gap-12 justify-center w-4/6">
        <form className="w-full md:w-2/3 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="How can we help you?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            ></textarea>
          </div>

          <div className='flex justify-center'>
            <button
            type="submit"
            className="bg-amber-700 border-white border-2 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-amber-700 hover:border-amber-700 transition"
          >
            Send Message
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
