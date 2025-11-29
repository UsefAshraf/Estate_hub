import React from 'react';
import { Home, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-8">
          {/* Brand Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-accent p-2 rounded-lg">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <span className="text-primary text-xl font-bold">EstateHub</span>
            </div>
            <p className="text-secondary mb-6 max-w-sm">
              Your trusted partner in finding the perfect property. We make buying, selling, and renting easy.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-secondary hover:accent transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-primary text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Properties', 'About Us', 'Blog', 'Contact'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-secondary hover:accent transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1">
            <h3 className="text-primary text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Buying Guide', 'Selling Guide', 'Mortgage Calculator', 'Market Trends', 'FAQ'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-secondary hover:accent transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex-1">
            <h3 className="text-primary text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 accent flex-shrink-0 mt-1" />
                <span className="text-secondary">123 Real Estate Ave, Suite 100, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 accent flex-shrink-0" />
                <a href="tel:+15551234567" className="text-secondary hover:accent transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 accent flex-shrink-0" />
                <a href="mailto:info@estatehub.com" className="text-secondary hover:accent transition-colors">
                  info@estatehub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-custom pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary text-sm">© 2025 EstateHub. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, idx) => (
              <a key={idx} href="#" className="text-secondary hover:accent transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
