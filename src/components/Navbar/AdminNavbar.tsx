import React, { useState, useEffect } from "react";
import { Home, Plus } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ThemeButton from "../Theme/ButtonTheme";
import { getUserProfile } from "@/services/profile.api";
import Swal from "sweetalert2";
const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // User profile state
  const [userProfile, setUserProfile] = useState<{
    fullName: string;
    email: string;
  } | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // First, try to get user from localStorage (faster)
        const userStr = localStorage.getItem("user");
        console.log("🔍 AdminNavbar - localStorage user:", userStr);

        if (userStr) {
          const user = JSON.parse(userStr);
          console.log("✅ AdminNavbar - Parsed user from localStorage:", user);
          setUserProfile({
            fullName: user.fullName || user.userName || user.name || "User",
            email: user.email || "user@estatehub.com",
          });
          setIsLoadingProfile(false);
          return; // Use localStorage data, no need to fetch from API
        }

        // If no user in localStorage, try to fetch from API
        console.log("⚠️ No user in localStorage, fetching from API...");
        const response = await getUserProfile();
        console.log("🔍 AdminNavbar - API response:", response);

        if (response.success && response.data) {
          setUserProfile({
            fullName: response.data.fullName,
            email: response.data.email,
          });
          console.log("✅ AdminNavbar - Set profile from API");
        }
      } catch (error) {
        console.error("❌ AdminNavbar - Failed to fetch user profile:", error);
        // Keep null state to show fallback values
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClassName = (path: string) => {
    if (isActive(path)) {
      return "block py-2 px-3 text-[#DDC7BB] bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0";
    }
    return "block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0";
  };

  // const handleLogout = async() => {
  //   const result = await Swal.fire({    
  //     icon: "question",    
  //     title: "Logout",    
  //     text: "Are you sure you want to logout?",    
  //     showCancelButton: true,   
  //      confirmButtonColor: "#dc2626",    
  //      cancelButtonColor: "#6b7280",    
  //      confirmButtonText: "Yes, logout",    
  //      cancelButtonText: "Cancel",  });  
  //   if (result.isConfirmed) {    
  //     // Clear all authentication data from localStorage    
  //     localStorage.removeItem("accessToken");    
  //     localStorage.removeItem("refreshToken");    
  //     localStorage.removeItem("user");        
  //     // Close the user menu   
  //    setIsUserMenuOpen(false);       
  //  // Navigate to sign-in page    
  //   navigate('/signin');
  // };

const handleLogout = async () => {
  const result = await Swal.fire({
    icon: "question",
    title: "Logout",
    text: "Are you sure you want to logout?",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",
  });
  if (result.isConfirmed) {
    // Clear all authentication data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    // Close the user menu
    setIsUserMenuOpen(false);
    // Navigate to sign-in page
    navigate('/signin');
  }
};


  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo - Same as buyer */}
        <Link
          to="/users"
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
          {/* User Menu Button */}
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 ml-5 rounded-full"
                src="./src/assets/profile.webp"
                alt="user photo"
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 z-50 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                <div className="px-4 py-3 text-sm border-b border-default">
                  <span className="block text-heading font-medium">
                    {isLoadingProfile ? "Loading..." : userProfile?.fullName || "User"}
                  </span>
                  <span className="block text-body truncate">
                    {isLoadingProfile ? "Loading..." : userProfile?.email || "user@estatehub.com"}
                  </span>
                </div>
                <ul className="p-2 text-sm text-body font-medium">
                  <li>
                    <Link
                      to="/profileAdmin"
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/visitsAdmin"
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      visits
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
          className={`items-center justify-between ${isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                to="/users"
                className={getLinkClassName('/users')}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className={getLinkClassName('/properties')}
              >
                Properties
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
