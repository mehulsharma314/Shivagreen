import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from './Navbar';
import Home from './Home';
import Services from './Services';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Profile from './Profile';
import { AuthProvider } from './AuthContext';
import { Toaster } from 'react-hot-toast';
import StepperPage from './StepperPage';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <Navbar />
          <div className="mt-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<StepperPage />} />

            </Routes>
          </div>
          <Footer />
        </Router>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </GoogleOAuthProvider>
    </AuthProvider>

  );
};

export default App;
