// ⭐ Modified to use redux + routing, but design unchanged

import { useSelector } from "react-redux";       
import  type{ RootState } from "src/redux/store";   
import { Link} from "react-router-dom";        

import { User, Mail, Phone, MapPin,Settings } from "lucide-react";
//import { useState } from "react";

export default function SimpleProfilePage() {
  const user = useSelector((state: RootState) => state.user)

//   const location = useLocation();
//   const tabs = [
//     { id: "Favorites", label: "Favorites",path: "/Profile/favorites", icon: Heart },
//     { id: "visits", label: "Visits",path: "/Profile/visits", icon: Calendar },
//     { id: "history", label: "History",path: "/Profile/history", icon: History },
//     { id: "profile", label: "Profile",path: "/profile",  icon: User },
//   ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Tabs
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3 py-3 border-b-2 ${
                    isActive
                      ? "border-blue-600 text-gray-700"
                      : "border-transparent text-gray-600"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div> */}

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-orange-200 rounded-lg shadow-sm p-8">

          {/* Old Design – Unchanged */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-orange-300 flex items-center justify-center shadow-lg">
              <User className="w-16 h-16 text-white" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mt-4">{user.name}</h1>
            <p className="text-gray-500">Member since Nov 2024</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-700">{user.email}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-700">{user.phone}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-700">{user.location}</span>
            </div>
          </div>

          {/* ⭐ EDIT PROFILE BUTTON (ADDED) */}
          <Link
            to="/profile/edit"
            className="w-full py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium flex justify-center gap-2 hover:bg-gray-50"
          >
            <Settings className="w-5 h-5" />
            Edit Profile
          </Link>

        </div>
      </div>
    </div>
  );
}

























// import { Mail, Phone, MapPin, User, Settings } from "lucide-react";

// export default function Profile() {
//   const profileData = {
//     name: "John Doe",
//     memberSince: "Nov 2024",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     location: "Los Angeles, CA",
//   };

//   return (
//     <div className="bg-orange-200 rounded-lg shadow-sm p-6 sm:p-8">
      
//       {/* Avatar and Name */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-linear-to-br from-orange-300 to-orange-400 flex items-center justify-center mb-4 shadow-lg">
//           <User className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={2} />
//         </div>

//         <h1 className="text-2xl font-semibold text-gray-900">
//           {profileData.name}
//         </h1>
//         <p className="text-gray-600">Member since {profileData.memberSince}</p>
//       </div>

//       {/* Contact Info */}
//       <div className="space-y-6 mb-8">

//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//             <Mail className="w-5 h-5 text-gray-600" />
//           </div>
//           <span className="text-gray-700">{profileData.email}</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//             <Phone className="w-5 h-5 text-gray-600" />
//           </div>
//           <span className="text-gray-700">{profileData.phone}</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//             <MapPin className="w-5 h-5 text-gray-600" />
//           </div>
//           <span className="text-gray-700">{profileData.location}</span>
//         </div>

//       </div>

//       {/* Edit Button */}
//       <button className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
//         <Settings className="w-5 h-5" />
//         Edit Profile
//       </button>

//     </div>
//   );
// }




















// // function ProfilePage() {
// //     const profileData = {
// //         name: 'John Doe',
// //         memberSince: 'Nov 2024',
// //         email: 'john.doe@example.com',
// //         phone: '+1 (555) 123-4567',
// //         location: 'Los Angeles, CA',
// //         savedCount: 9,
// //         visitsCount: 2,
// //       };
    
// //     return <div>Profile Page</div>;
// //         }
// // export default ProfilePage;