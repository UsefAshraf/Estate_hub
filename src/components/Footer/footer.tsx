import React from 'react';
import { Home, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-8">
          {/* Brand Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyan-500 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xl font-bold">EstateHub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted partner in finding the perfect property. We make buying, selling, and renting easy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Properties</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Buying Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Selling Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Mortgage Calculator</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">Market Trends</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-500 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <span>123 Real Estate Ave, Suite 100, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-cyan-500 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <a href="mailto:info@estatehub.com" className="hover:text-cyan-500 transition-colors">
                  info@estatehub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 EstateHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;