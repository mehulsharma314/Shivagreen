import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StepperPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const cartArray = Object.values(parsedCart);
      setCartItems(cartArray);
    }
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const saveAddress = () => {
    for (let key in address) {
      if (!address[key]) {
        toast.error(`Please fill in the ${key}`);
        return;
      }
    }
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
    handleNext();
  };

  const simulatePayment = () => {
    const storedAddress = localStorage.getItem('deliveryAddress');
    if (!storedAddress) {
      toast.error('Please enter address again.');
      setCurrentStep(1);
      return;
    }

    const order = {
      items: cartItems,
      address: JSON.parse(storedAddress),
      total: calculateTotal(),
      status: 'Confirmed',
      placedAt: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    existingOrders.push(order);
    localStorage.setItem('myOrders', JSON.stringify(existingOrders));

    handleNext();
  };

  const calculateTotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
      const itemPrice = item.selectedOption?.price || item.price || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const steps = [
    { step: 1, title: 'Delivery Address' },
    { step: 2, title: 'Payment' },
    { step: 3, title: 'Order Summary' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Checkout Flow */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          {/* Stepper UI */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Checkout Progress</h2>
            <div className="flex items-center justify-between">
              {steps.map((item) => (
                <div key={item.step} className="flex flex-col items-center w-full relative">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-semibold 
                    ${currentStep >= item.step ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    {item.step}
                  </div>
                  <p className={`text-sm mt-2 ${currentStep === item.step ? 'text-blue-700 font-semibold' : 'text-gray-400'}`}>
                    {item.title}
                  </p>
                  {item.step !== steps.length && (
                    <div className="absolute top-5 right-0 w-full border-t-2 border-dashed border-gray-300 z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-10">
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Enter Delivery Address</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" />
                  <input type="text" name="phoneNumber" placeholder="Phone Number" value={address.phoneNumber} onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" />
                  <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 md:col-span-2" />
                  <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" />
                  <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" />
                  <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 md:col-span-2" />
                </form>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={saveAddress}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg cursor-pointer"
                  >
                    Save and Proceed to Payment →
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Choose Payment Method</h3>
                <button
                  onClick={simulatePayment}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg cursor-pointer"
                >
                  Pay Now (Simulated) →
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
                <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Delivery Address</h4>
                    <p><strong>{address.fullName}</strong></p>
                    <p>{address.phoneNumber}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Order Status</h4>
                    <p className="text-green-600 font-bold">Confirmed</p>
                  </div>
                  <button
                    onClick={() => navigate('/my-orders')}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg cursor-pointer"
                  >
                    Go to My Orders →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Products</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-700">{item.name}</h4>
                    <p className="text-gray-600">Weight: {item.selectedOption?.weight || 'N/A'}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      Subtotal: ₹{(item.selectedOption?.price || item.price || 0) * item.quantity}
                    </p>
                    <p className="text-blue-600 font-bold">
                      ₹{item.selectedOption?.price || item.price}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-xl font-bold text-gray-800">
                  Total: ₹{calculateTotal()}
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperPage;
