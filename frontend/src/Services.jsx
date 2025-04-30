import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import products from './data/product';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedWeights, setSelectedWeights] = useState({}); // ✅ Needed to select weight

  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const preloadImages = async () => {
      const promises = products.map((product) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = product.image;
          img.onload = resolve;
        });
      });
      await Promise.all(promises);
      setIsLoaded(true);
    };
    preloadImages();
  }, []);

  const handleAddToCart = (id, weight) => {
    addToCart(id, weight);
  };

  const handleIncrement = (id, weight) => {
    addToCart(id, weight);
  };

  const handleDecrement = (id, weight) => {
    removeFromCart(id, weight);
  };

  return (
    <div className="py-10 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

      {!isLoaded ? (
        <div className="flex justify-center items-center h-60">
          <span className="loader border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {products.slice(0, visibleCount).map((product) => {
                const weight = selectedWeights[product.id] || '1kg'; // ✅ ensure lowercase 'kg'
                const productKey = `${product.id}_${weight}`;
                const price = product.priceOptions[weight];

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col justify-between transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <img
                      onClick={() => navigate(`/product/${product.id}`)}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-opacity duration-500"
                    />
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {product.description.split(' ').slice(0, 18).join(' ')}...
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="text-green-600 font-medium hover:underline ml-1 cursor-pointer"
                        >
                          View More
                        </button>
                      </p>

                      <div className="mt-4 flex flex-col gap-2">
                        <select
                          className="border rounded-xl px-3 py-2"
                          value={selectedWeights[product.id] || '1kg'}
                          onChange={(e) =>
                            setSelectedWeights((prev) => ({
                              ...prev,
                              [product.id]: e.target.value,
                            }))
                          }
                        >
                          {Object.keys(product.priceOptions).map((weightOption) => (
                            <option key={weightOption} value={weightOption}>
                              {weightOption}
                            </option>
                          ))}
                        </select>

                        <p className="font-semibold text-lg text-gray-800">
                          Price: ₹{price}
                        </p>

                        <button
                          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl w-full cursor-pointer"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          View Product
                        </button>

                        {cart[productKey] ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between w-full border border-green-600 rounded-xl">
                              <button
                                onClick={() => handleDecrement(product.id, weight)}
                                className="px-4 py-2 text-green-600 hover:bg-green-100 font-bold"
                              >
                                -
                              </button>
                              <span className="px-2 text-sm font-semibold">
                                {cart[productKey].quantity}
                              </span>
                              <button
                                onClick={() => handleIncrement(product.id, weight)}
                                className="px-4 py-2 text-green-600 hover:bg-green-100 font-bold"
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl w-full cursor-pointer"
                              onClick={() => navigate('/cart')}
                            >
                              Go to Cart
                            </button>
                          </div>
                        ) : (
                          <button
                            className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-2 px-4 rounded-xl w-full cursor-pointer"
                            onClick={() => handleAddToCart(product.id, weight)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {products.length > 4 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() =>
                  setVisibleCount((prev) => (prev === 4 ? products.length : 4))
                }
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
              >
                {visibleCount === 4 ? (
                  <>
                    <span className="font-semibold">View More</span>
                    <FaChevronDown size={20} />
                  </>
                ) : (
                  <>
                    <span className="font-semibold">View Less</span>
                    <FaChevronUp size={20} />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;
