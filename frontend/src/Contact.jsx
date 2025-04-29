import React, { useEffect, useState } from 'react';
import contactImage from './assets/contact.png'; 
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';


const Contact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    e.target,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )
  .then((result) => {
    toast.success("Message sent successfully!");
  }, (error) => {
    toast.error("Failed to send message. Try again.");
    console.error(error.text);
  });

  e.target.reset();
};





  useEffect(() => {
    const img = new Image();
    img.src = contactImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {/* Left: Contact Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-md w-full flex flex-col justify-center space-y-5 h-[500px]">
  <h2 className="text-3xl font-bold text-green-700 mb-2">Contact Us</h2>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Name</label>
    <input
      type="text"
      name="name"  
      placeholder="Enter your name"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Email</label>
    <input
      type="email"
      name="email"  
      placeholder="Enter your email"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Phone Number</label>
    <input
      type="tel"
      name="phone"  
      placeholder="Enter your phone number"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Message</label>
    <textarea
      name="message"  
      rows="2"
      placeholder="Your message..."
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
      required
    />
  </div>
  <input type="hidden" name="time" value={new Date().toLocaleString()} />


  <button
    type="submit"
    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl text-lg transition-all cursor-pointer"
  >
    Submit
  </button>
</form>


        {/* Right: Image with loader */}
        <div className="hidden md:flex items-center justify-center">
          {!imageLoaded ? (
            <div className="w-full h-[500px] flex justify-center items-center bg-gray-100 rounded-2xl shadow-inner">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <img
              src={contactImage}
              alt="Contact"
              className="h-[500px] w-full object-cover rounded-2xl shadow-lg transition-opacity duration-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
