import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('myOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-3">Order #{index + 1}</h4>
              <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {order.status}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Placed On:</strong> {new Date(order.placedAt).toLocaleString()}</p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Shipping Address:</strong><br />
                {order.address.fullName}, {order.address.street},<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800 mb-1">Items Ordered:</h5>
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 shadow-sm">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                      <span className="text-sm text-gray-600">Price: ₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-right font-bold text-lg text-blue-700">
                Total: ₹{order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
