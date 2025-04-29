import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('myOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleCancelOrder = (indexToCancel) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToCancel);
    setOrders(updatedOrders);
    localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border border-gray-200 shadow-lg rounded-2xl p-6 gap-6"
            >
              {/* Left: First item image */}
              <div className="w-full md:w-1/4 flex justify-center">
                <img
                  src={order.items[0]?.image || 'https://via.placeholder.com/150'}
                  alt="Order Item"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              </div>

              {/* Middle: Order details */}
              <div className="w-full md:w-2/4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Order #{index + 1}</h4>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {order.status}</p>
                <p className="text-sm text-gray-600"><strong>Placed On:</strong> {new Date(order.placedAt).toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Shipping Address:</strong> {order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                </p>
                <div className="mt-4 space-y-1">
                  <h5 className="font-semibold text-gray-800">Items:</h5>
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-700">
                      {item.name} ({item.selectedOption?.weight || 'N/A'}) × {item.quantity} — ₹{(item.selectedOption?.price || 0) * item.quantity}
                    </p>
                  ))}
                </div>
                <p className="mt-3 font-bold text-blue-700">Total: ₹{order.total}</p>
              </div>

              {/* Right: Cancel button */}
              <div className="w-full md:w-1/4 flex justify-center md:justify-end">
                <button
                  onClick={() => handleCancelOrder(index)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
