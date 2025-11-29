import React, { useState } from "react";
import { Home, Plus } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ThemeButton from "../Theme/ButtonTheme";

const SellerNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

 const getLinkClassName = (path: string) => {
  if (isActive(path)) {
    return "block py-2 px-3 text-[#DDC7BB] bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0";
  }
  return "block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0";
};


  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo - Same as buyer */}
        <Link to="/seller/main" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="bg-accent p-2 rounded-lg">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            EstateHub
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ThemeButton />
          
          {/* Add Property Button */}
          <Link
            to="/seller/add-property"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand rounded-lg hover:bg-brand-hover transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Link>

          {/* User Menu Button */}
          <div className="relative">
            <button 
              type="button" 
              className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="./src/assets/profile.webp" alt="user photo" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 z-50 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                <div className="px-4 py-3 text-sm border-b border-default">
                  <span className="block text-heading font-medium">John Seller</span>
                  <span className="block text-body truncate">seller@estatehub.com</span>
                </div>
                <ul className="p-2 text-sm text-body font-medium">
                  <li>
                    <Link 
                      to="/seller/profile" 
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/seller/my-properties" 
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Properties
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/seller/settings" 
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link to="/homeSeller" className={getLinkClassName('/seller/main')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/seller-addproperty" className={getLinkClassName('/seller/add-property')}>
                Add Property
              </Link>
            </li>
            <li>
              <a href="about" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">
                About
              </a>
              {/* <link>

              </link> */}
            </li>
            <li>
              <a href="#contact" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SellerNavbar;