import React, { useState, useEffect } from 'react';
import Services from './Services';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Auto-import images
const images = import.meta.glob('./assets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const slides = Object.values(images)
  .slice(0, 4)
  .map((img, index) => ({
    image: img,
    text: [
      'Boost your soil with our premium organic fertilizer.',
      'Enhance growth naturally using plant booster solutions.',
      'Improve soil texture with eco-friendly soil enhancers.',
      'Go green with nutrient-rich compost for your crops.',
    ][index],
  }));

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Preload images
  useEffect(() => {
    const promises = slides.map(slide => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = slide.image;
        img.onload = resolve;
      });
    });

    Promise.all(promises).then(() => {
      setIsLoaded(true);
    });
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='flex flex-col'>
      <div className='relative w-full h-[400px] overflow-hidden rounded-md'>
        {!isLoaded ? (
          <div className="absolute inset-0 bg-gray-200 flex justify-center items-center z-10">
            <span className="loader border-4 border-green-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></span>
          </div>
        ) : (
          <img
            src={slides[current].image}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out"
          />
        )}

        {/* Overlay Text & Button */}
        <div className='absolute inset-0 bg-black/40 flex flex-col justify-center px-8 md:px-20 z-20'>
          <h2 className='text-white text-xl md:text-3xl font-bold drop-shadow-md max-w-xl'>
            {slides[current].text}
          </h2>
          <button
            onClick={() => navigate("/services")}
            className='mt-4 w-fit bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-xl shadow-md transition-all cursor-pointer'
          >
            Order Now
          </button>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow z-30'
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow z-30'
        >
          <ChevronRight />
        </button>
      </div>

      {/* Services Section */}
      <Services />
    </div>
  );
};

export default Home;
