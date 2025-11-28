
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "../../redux/store";

export default function ProfileLayout() {
  return (
    <Provider store={store}> 
      <div className=" bg-gray-50">
        <Outlet />
      </div>
    </Provider>
  );
}












// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { Heart, Calendar, History, User } from "lucide-react";

// export default function ProfileLayout() {
//   const location = useLocation();

//   const tabs = [
//     { id: "favorites", label: "Favorites", icon: Heart, path: "favorites" },
//     { id: "visits", label: "Visits", icon: Calendar, path: "visits" },
//     { id: "history", label: "History", icon: History, path: "history" },
//     { id: "profile", label: "Profile", icon: User, path: "" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Tabs Navigation */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide">

//             {tabs.map((tab) => {
//               const IconComponent = tab.icon;

//               const active =
//                 location.pathname === `/profile/${tab.path}` ||
//                 (tab.path === "" && location.pathname === "/profile");

//               return (
//                 <NavLink
//                   key={tab.id}
//                   to={tab.path}
//                   end
//                   className={`
//                     flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4
//                     border-b-2 whitespace-nowrap flex-shrink-0 transition-colors
//                     ${active
//                       ? "border-blue-600 text-gray-800"
//                       : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
//                     }
//                   `}
//                 >
//                   <IconComponent className="w-5 h-5" />
//                   {tab.label}
//                 </NavLink>
//               );
//             })}

//           </div>
//         </div>
//       </div>

//       {/* Render the selected tab content */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }




// // import { useState } from 'react';
// // import { Heart, Calendar, History, User, Mail, Phone, MapPin, Settings } from 'lucide-react';

// // export default function ProfileLayout() {
// //   const [activeTab, setActiveTab] = useState('profile');
// //   const location = useLocation();

  
// //   const tabs = [
// //     { id: 'saved', label: 'Favorites', icon: Heart, count: profileData.savedCount },
// //     { id: 'visits', label: 'Visits', icon: Calendar, count: profileData.visitsCount },
// //     { id: 'history', label: 'History', icon: History },
// //     { id: 'profile', label: 'Profile', icon: User },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Navigation Tabs - Responsive with horizontal scroll on mobile */}
// //       <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
// //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide">
// //             {tabs.map((tab) => {
// //               const IconComponent = tab.icon;
// //               return (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
// //                     activeTab === tab.id
// //                       ? 'border-blue-600 text-gray-700'
// //                       : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
// //                   }`}
// //                   aria-label={`Switch to ${tab.label} tab`}
// //                   aria-current={activeTab === tab.id ? 'page' : undefined}
// //                 >
// //                   <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
// //                   <span className="font-medium text-sm sm:text-base">{tab.label}</span>
// //                   {tab.count !== undefined && (
// //                     <span className="ml-1 text-xs sm:text-sm px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-600">
// //                       {tab.count}
// //                     </span>
// //                   )}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Profile Content - Responsive padding and spacing */}
// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
// //         <div className="bg-orange-200 rounded-lg shadow-sm p-6 sm:p-8">
// //           {/* Avatar and Name Section */}
// //           <div className="flex flex-col items-center mb-6 sm:mb-8">
// //             {/* Avatar Circle - Responsive size */}
// //             <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-linear-to-br from-orange-300 to-orange-400 flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
// //               <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={2} />
// //             </div>

// //             {/* Name and Member Since - Responsive text */}
// //             <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 text-center">
// //               {profileData.name}
// //             </h1>
// //             <p className="text-sm sm:text-base text-gray-500 text-center">
// //               Member since {profileData.memberSince}
// //             </p>
// //           </div>

// //           {/* Contact Information - Responsive spacing and text */}
// //           <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
// //             {/* Email */}
// //             <div className="flex items-center gap-3 sm:gap-4">
// //               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
// //                 <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
// //               </div>
// //               <span className="text-sm sm:text-base text-gray-700 break-all">
// //                 {profileData.email}
// //               </span>
// //             </div>

// //             {/* Phone */}
// //             <div className="flex items-center gap-3 sm:gap-4">
// //               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
// //                 <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
// //               </div>
// //               <span className="text-sm sm:text-base text-gray-700">
// //                 {profileData.phone}
// //               </span>
// //             </div>

// //             {/* Location */}
// //             <div className="flex items-center gap-3 sm:gap-4">
// //               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
// //                 <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
// //               </div>
// //               <span className="text-sm sm:text-base text-gray-700">
// //                 {profileData.location}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Edit Profile Button - Responsive padding */}
// //           <button 
// //             className="w-full py-2.5 sm:py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
// //             aria-label="Edit your profile"
// //           >
// //             <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
// //             Edit Profile
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }