// import React from 'react';
// import { Home, Heart } from 'lucide-react';

// const Navbar: React.FC = () => {
//   return (
//     <nav className="bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="bg-cyan-500 p-2 rounded-lg">
//               <Home className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-slate-900 text-xl font-bold">EstateHub</span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex items-center gap-8">
//             <a href="#" className="text-cyan-500 font-medium hover:text-cyan-600 transition-colors">
//               Home
//             </a>
//             <a href="#" className="text-gray-600 font-medium hover:text-cyan-500 transition-colors">
//               Properties
//             </a>
//             <a href="#" className="text-gray-600 font-medium hover:text-cyan-500 transition-colors">
//               Dashboard
//             </a>
//             <a href="#" className="text-gray-600 font-medium hover:text-cyan-500 transition-colors">
//               About
//             </a>
//             <a href="#" className="text-gray-600 font-medium hover:text-cyan-500 transition-colors">
//               Contact
//             </a>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-6">
//             <button className="text-gray-600 hover:text-cyan-500 transition-colors">
//               <Heart className="w-6 h-6" />
//             </button>
//             <button className="text-red-500 font-semibold hover:text-red-600 transition-colors">
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { Home, Heart } from "lucide-react";
import ThemeButton from "../Theme/ButtonTheme"; // adjust the path if needed

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900 dark:text-foreground text-xl font-bold">
              EstateHub
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-cyan-500 font-medium hover:text-cyan-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 font-medium hover:text-cyan-500 transition-colors">
              Properties
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 font-medium hover:text-cyan-500 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 font-medium hover:text-cyan-500 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 font-medium hover:text-cyan-500 transition-colors">
              Contact
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* NEW: Theme Button */}
            <ThemeButton />

            <button className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors">
              <Heart className="w-6 h-6" />
            </button>

            <button className="text-red-500 font-semibold hover:text-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
