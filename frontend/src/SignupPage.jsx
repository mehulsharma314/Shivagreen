import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from './services/authService.js'; 
import GoogleLoginButton from './GoogleLoginButton.jsx';
import { useAuth } from './AuthContext'; 

const SignupPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from || '/';

  const { login } = useAuth();  
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await registerUser(formData);
      setSuccess(res.message);

      const user = { ...formData, token: res.token };  
      login(user);

      navigate(from); 

      setFormData({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token'); // or however you store login
    if (isLoggedIn) {
      navigate(from); // or wherever your StepperPage is
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Sign Up</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-600 text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Mobile</label>
            <input
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg transition-all cursor-pointer"
          >
            Sign Up
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-1/3"></div>
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 w-1/3"></div>
          </div>

          {/* Google Login Button */}
          <div className="w-full mt-4">
            <GoogleLoginButton />
          </div>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
