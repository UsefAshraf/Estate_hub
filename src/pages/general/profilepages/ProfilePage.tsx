import { useSelector } from "react-redux";
import type { RootState } from "src/redux/store";
import { Link } from "react-router-dom";

import { User, Mail, Phone, MapPin, Settings } from "lucide-react";

export default function SimpleProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-orange-200 rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <div className=" w-32 h-32 rounded-full bg-red-200 flex items-center justify-center shadow-lg">
              <User className="w-16 h-16 text-white" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mt-4">
              {user.fullName}
            </h1>
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
