import React from 'react';
import fert1 from './assets/fert1.png'
import fert2 from './assets/fert2.png'
import fert3 from './assets/fert3.png'
import fert4 from './assets/fert4.png'

const products = [
  {
    id: 1,
    name: 'Organic Fertilizer',
    description: 'Eco-friendly and effective for healthy crops.',
    image: fert1, // Replace with actual images
  },
  {
    id: 2,
    name: 'Plant Booster',
    description: 'Increases yield and improves resistance.',
    image: fert2,
  },
  {
    id: 3,
    name: 'Soil Enhancer',
    description: 'Improves soil quality and nutrient retention.',
    image: fert3,
  },
  {
    id: 4,
    name: 'Compost Pack',
    description: '100% organic compost for gardening and farming.',
    image: fert4,
  },
];

const Services = () => {
  return (
    <div className="py-10 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col justify-between">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl w-full transition-all duration-200 cursor-pointer">
                  Buy Product
                </button>
                <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-2 px-4 rounded-xl w-full transition-all duration-200 cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
