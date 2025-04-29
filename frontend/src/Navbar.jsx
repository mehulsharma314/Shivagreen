import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from './assets/assets';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          // Scrolling down
          setShowNavbar(false);
        } else {
          // Scrolling up
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    toast.success('Logout Succesfull ', {
            icon: '👍',
            style: {
                borderRadius: '10px',
                background: '#f7f4f4fb',
                color: '#f71b07',
            },
        });
    navigate('/login');
  };

  return (
    <nav className={`bg-slate-100 shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-14 w-auto drop-shadow-md"
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-800">
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-6 text-lg font-medium">
          <NavLinks />
        </div>

        {/* Right-side Icons */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {/* Cart Icon */}
          <div className="relative group">
            <Link to="/cart" className="relative">
              <ShoppingCart size={28} className="text-slate-800 hover:text-blue-500 transition" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="text-slate-800">
              <User size={28} className="hover:text-blue-500 transition cursor-pointer" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 w-48 bg-white shadow-lg rounded-lg z-10 opacity-0 group-hover:opacity-100 group-hover:visible group-hover:block invisible">
              <ul className="text-slate-800 text-sm">
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-300 rounded-t-lg" onClick={() => setMenuOpen(false)}>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-gray-300">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-300 rounded-b-lg cursor-pointer">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-300 rounded-t-lg">
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="block px-4 py-2 hover:bg-gray-300 rounded-b-lg">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-200 px-4 pb-4 space-y-4">
          <NavLinks mobile />
          <div className="flex justify-around items-center pt-2">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-slate-800" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button>
              <User size={24} className="text-slate-800" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ mobile = false }) => {
  const baseClass = "transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all";
  const mobileClass = "block text-slate-800 text-base font-medium py-2 border-b border-slate-400";
  const desktopClass = "text-slate-800 hover:text-blue-500";

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
