import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Optional icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ShivaGreen</h2>
          <p className="text-gray-400 text-sm">
            Empowering farmers with eco-friendly solutions.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShivaGreen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
