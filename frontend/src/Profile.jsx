import React, { useState, useEffect } from 'react';
import { User, MapPin, CreditCard, Settings, ShoppingBag, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from './services/Api.js';
import toast from 'react-hot-toast';

// ... imports remain the same

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
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
      const response = await api.put('/api/auth/profile', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully!');
      setUserData(response.data.user);
      setOriginalData(response.data.user);
      setIsEdited(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-72 bg-white p-6 shadow-md z-60 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center mt-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-3">
              <img
                src="https://randomuser.me/api/portraits/lego/5.jpg"
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

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 p-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-8 w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Toggle Header */}
      <div className="flex md:hidden justify-between items-center bg-white p-4 shadow-md w-full z-40">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600">
          <Menu />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Profile</h2>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 mt-4 md:mt-0">
        {/* Personal Info */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
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

        {/* Email */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Email Address</h2>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
          />
        </section>

        {/* Mobile */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Mobile Number</h2>
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full"
          />
        </section>

        {isEdited && (
          <div className="flex justify-start gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-md"
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

