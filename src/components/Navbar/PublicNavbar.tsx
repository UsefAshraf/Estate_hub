// components/Navbar/PublicNavbar.tsx
import React, { useState } from "react";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeButton from "../Theme/ButtonTheme";

const PublicNavbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClassName = (path: string) => {
    if (isActive(path)) {
      return "block py-2 px-3 text-[#DDC7BB] bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0";
    }
    return "block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0";
  };

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/homeBuyer"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
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
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2 ml-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-heading font-medium rounded-base hover:bg-neutral-tertiary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-brand text-primary font-medium rounded-base hover:bg-brand-hover transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                to="/homeBuyer"
                className={getLinkClassName('/home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/searchBuyer"
                className={getLinkClassName('/searchBuyer')}
              >
                Search Properties
              </Link>
            </li>
            
            {/* Mobile Auth Links */}
            <li className="md:hidden">
              <Link
                to="/signin"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary"
              >
                Login
              </Link>
            </li>
            <li className="md:hidden">
              <Link
                to="/signup"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;