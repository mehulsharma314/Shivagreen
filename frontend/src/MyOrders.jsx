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
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold mb-2">Order #{index + 1}</h4>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.placedAt).toLocaleString()}</p>
              <p><strong>Address:</strong> {order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Items:</h5>
                <ul className="space-y-2">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 font-bold text-blue-700">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
