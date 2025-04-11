import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Services from './Services';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';



const App = () => {
  return (
    <Router>
      
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
