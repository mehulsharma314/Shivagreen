import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import products from './data/product';

const Cart = () => {
  const { cart, addToCart, removeFromCart, totalItems, totalPrice, deleteItemFromCart } = useCart();
  const navigate = useNavigate();
  const deliveryCharge = totalItems > 0 ? 40 : 0;

  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [suggestionTrigger, setSuggestionTrigger] = useState(0);

  useEffect(() => {
    const cartIds = cart.map((item) => item.id);
    const filtered = products.filter((item) => !cartIds.includes(item.id));
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setSuggestedProducts(shuffled.slice(0, 4));
  }, [cart, suggestionTrigger]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart 🛒</h1>

      {totalItems === 0 ? (
        <div className="text-center text-lg text-gray-600">
          Your cart is empty.....🙂 <br />
          <button
            onClick={() => navigate('/services')}
            className="bg-green-600 text-white px-5 py-3 rounded-lg mt-6 hover:bg-green-700 cursor-pointer"
          >
            Order Now
          </button>
        </div>
      ) : (
        <div className="lg:flex lg:gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.weight}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500 mb-1">Weight: <strong>{item.weight}</strong></p>
                  <p className="text-gray-500 mb-1">Description: {item.description}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <p className="text-sm text-gray-700 font-medium">
                      Price: ₹{(item.price * item.quantity).toFixed(2)} (₹{item.price} x {item.quantity})
                    </p>
                    <div className="flex items-center border border-green-600 rounded-md">
                      <button
                        onClick={() => removeFromCart(item.id, item.weight)}
                        className="px-3 py-1 text-green-600 hover:bg-green-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item.id, 1, item.weight, item.price)}
                        className="px-3 py-1 text-green-600 hover:bg-green-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteItemFromCart(item.id, item.weight)}
                  className="text-red-400 hover:text-red-800 transition cursor-pointer ml-4"
                  title="Remove item"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3 mt-10 lg:mt-0">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg sticky top-20">
              <h3 className="text-2xl font-semibold mb-4">Cart Summary</h3>
              <div className="space-y-3 text-lg">
                <p>Total Items: <span className="font-semibold">{totalItems}</span></p>
                <p>Product Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Delivery Charges: ₹{deliveryCharge}</p>
                <hr className="my-2" />
                <p className="text-xl font-bold">
                  Grand Total: ₹{(totalPrice + deliveryCharge).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (token) {
                    navigate('/checkout');
                  } else {
                    navigate('/login', { state: { from: '/checkout' } });
                  }
                }}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition-all shadow-md cursor-pointer"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* You May Also Like */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {suggestedProducts.map((item) => {
            const defaultWeight = Object.keys(item.priceOptions)[0]; // e.g., '1kg'
            const defaultPrice = item.priceOptions[defaultWeight];

            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer"
              >
                {/* Wrap the image and description with Link for navigation */}
                <div onClick={() => navigate(`/product/${item.id}`)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-contain mb-4 rounded-lg transition-transform duration-300"
                  />
                  <h4 className="text-lg font-semibold text-green-700 mb-1">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description?.split(' ').slice(0, 14).join(' ')}...
                  </p>
                </div>
                <p className="text-md font-semibold text-gray-800 mb-2">₹{defaultPrice} ({defaultWeight})</p>
                <div className="flex items-center justify-center border border-green-600 rounded-md mt-2">
                  <button
                    onClick={() => {
                      addToCart(item.id, 1, defaultWeight, defaultPrice);
                      setSuggestionTrigger((prev) => prev + 1);
                    }}
                    className="px-4 py-1 text-green-600 hover:bg-green-300 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
