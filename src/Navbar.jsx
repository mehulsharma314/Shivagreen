import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from './assets/assets';
import { Menu, X } from 'lucide-react'; // Icons from lucide-react

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={30} /> : <Menu size={30}/>}
          </button>
        </div>

        {/* Links (hidden on mobile, shown on md+) */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-6 text-white text-lg font-medium">
          <NavLinks />
        </div>

        {/* Login Button (right side) */}
        <div className="hidden md:block">
          <Link to="/login">
            <button className="bg-white text-green-600 hover:bg-yellow-300 hover:text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-600 px-4 pb-4 space-y-4">
          <NavLinks mobile />
          <Link to="/login">
            <button className="w-full bg-white text-green-600 hover:bg-yellow-300 hover:text-white font-semibold py-2 rounded-full transition duration-300 shadow">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLinks Component
const NavLinks = ({ mobile = false }) => {
  const baseClass = "transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-300 hover:after:w-full after:transition-all";

  const mobileClass = "block text-white text-base font-medium py-2 border-b border-white/30";
  const desktopClass = "hover:text-yellow-200";

  return (
    <>
      <Link to="/" className={`${baseClass} ${mobile ? mobileClass : desktopClass}`}>Home</Link>
      <Link to="/services" className={`${baseClass} ${mobile ? mobileClass : desktopClass}`}>Services</Link>
      <Link to="/about" className={`${baseClass} ${mobile ? mobileClass : desktopClass}`}>About</Link>
      <Link to="/contact" className={`${baseClass} ${mobile ? mobileClass : desktopClass}`}>Contact</Link>
    </>
  );
};

export default Navbar;
