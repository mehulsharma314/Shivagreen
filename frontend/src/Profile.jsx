import React, { useState, useEffect } from 'react';
import { User, MapPin, CreditCard, Settings, ShoppingBag, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from './services/Api.js';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: '',
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setOriginalData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsEdited(true); 
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.put('/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast('Profile updated successfully!');
      setUserData(response.data.user);
      setOriginalData(response.data.user); 
      setIsEdited(false); 
    } catch (error) {
      console.error('Error updating profile:', error);
      toast('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    setUserData(originalData); 
    setIsEdited(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white p-6 shadow-md flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center mt-6">
            {/* Placeholder avatar */}
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-3">
              <img
                src="https://randomuser.me/api/portraits/lego/5.jpg" // Random avatar
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Hello,</h2>
            <p className="text-lg font-bold text-green-700">{userData.name}</p>
          </div>

          <nav className="flex flex-col gap-4 mt-8">
            <div className="font-semibold text-gray-600">MY ORDERS</div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
              <ShoppingBag className="w-5 h-5" />
              <span onClick={() => navigate('/orders')}>My Orders</span>
            </div>

            <div className="font-semibold text-gray-600 mt-4">ACCOUNT SETTINGS</div>
            <div className="flex flex-col gap-3 pl-6">
              <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <User className="w-5 h-5" />
                <span className="text-blue-600">Profile Information</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <MapPin className="w-5 h-5" />
                <span>Manage Addresses</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <Settings className="w-5 h-5" />
                <span>PAN Card Information</span>
              </div>
            </div>

            <div className="font-semibold text-gray-600 mt-4">PAYMENTS</div>
            <div className="flex flex-col gap-3 pl-6">
              <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <CreditCard className="w-5 h-5" />
                <span>Gift Cards</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <CreditCard className="w-5 h-5" />
                <span>Saved UPI</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <CreditCard className="w-5 h-5" />
                <span>Saved Cards</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-8 w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Personal Information */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border border-gray-300 rounded-md p-3 w-full"
            />
          </div>

          <div className="mt-6">
            <label className="font-medium text-gray-700 block mb-2">Your Gender</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userData.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userData.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
        </section>

        {/* Email Address */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Email Address</h2>
          </div>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
          />
        </section>

        {/* Mobile Number */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mobile Number</h2>
          </div>
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
          />
        </section>

        {/* Save & Cancel Buttons */}
        {isEdited && (
          <div className="flex justify-start gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md cursor-pointer"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
