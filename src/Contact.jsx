import React from 'react';
import contactImage from './assets/contact.png'; // Make sure this image exists

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {/* Left: Contact Form */}
        <form className="bg-gray-50 p-8 rounded-2xl shadow-md w-full flex flex-col justify-center space-y-5 h-[500px]">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Contact Us</h2>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Message</label>
            <textarea
              rows="2"
              placeholder="Your message..."
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl text-lg transition-all"
          >
            Submit
          </button>
        </form>

        {/* Right: Image */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src={contactImage}
            alt="Contact"
            className="h-[500px] w-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
