import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from './services/authService.js';
import GoogleLoginButton from './GoogleLoginButton.jsx';
import { useAuth } from './AuthContext.jsx';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const from = location.state?.from || '/'; 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(formData);
      console.log(res.message);
      navigate(from);
      login(res.data);
    } catch (err) {
      setError(err.message || 'Login failed');
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

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email Input */}
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

          {/* Password Input */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg transition-all cursor-pointer"
          >
            Login
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

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-green-700 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
