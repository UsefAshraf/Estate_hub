import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store/store";
import { Link } from "react-router-dom";

import { User, Mail, Phone, MapPin, Settings } from "lucide-react";

export default function SimpleProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-(--bg-secondary) rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            {/* <div className="animate-in fade-in duration-700 w-32 h-32 rounded-full bg-red-200 flex items-center justify-center shadow-lg"> */}
            <div className=" animate-in fade-in duration-700 w-32 h-32 rounded-full bg-(--bg-primary) flex items-center justify-center shadow-lg overflow-auto">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-center"/>
            ) : (
              <User className="w-16 h-16 text-(--text-primary)" />
            )}
            

              
              <User className="w-16 h-16 text-(--text-primary)" />
            </div>

            <h1 className="text-2xl font-semibold text-(--text-primary) mt-4">
              {user.fullName}
            </h1>
            <p className="text-(--text-secondary)">Member since Nov 2024</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center">
                <Mail className="w-5 h-5 text-(--text-primary)" />
              </div>
              <span className="text-(--text-primary)">{user.email}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center">
                <Phone className="w-5 h-5 text-(--text-primary)" />
              </div>
              <span className="text-(--text-primary)">{user.phone}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center">
                <MapPin className="w-5 h-5 text-(--text-primary)" />
              </div>
              <span className="text-(--text-primary)">{user.location}</span>
            </div>
          </div>
          <Link
            to="/profile/edit"
            className="w-full py-3  bg-(--button-primary) border-(--border-primary) rounded-lg text-(--text-primary) font-medium flex justify-center gap-2 hover:bg-(--button-primary-hover) transition"
          >
            <Settings className="w-5 h-5" />
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
