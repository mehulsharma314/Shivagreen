import React from 'react';
import aboutImage from './assets/image.png'; 

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 rounded-lg">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Image */}
        <div>
          <img
            src={aboutImage}
            alt="About us"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Right: Text */}
        <div className="text-gray-800">
          <h2 className="text-3xl font-bold mb-4">About Our Agriculture Products</h2>
          <p className="text-lg leading-relaxed mb-4">
            We provide high-quality organic fertilizers, plant boosters, and soil enhancers to help farmers and gardeners achieve sustainable growth.
          </p>
          <p className="text-md text-gray-600">
            Our mission is to support healthy farming practices while protecting the environment. Each of our products is designed with nature in mind, delivering nutrients to your crops while being eco-friendly and cost-effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
