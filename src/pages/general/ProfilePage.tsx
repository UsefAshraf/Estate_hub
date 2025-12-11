import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store/store";
import { Link } from "react-router-dom";

import { User, Mail, Phone, MapPin, Settings,Briefcase} from "lucide-react";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-(--bg-primary)">
      <div className="bg-(--bg-secondary) rounded-xl shadow p-8">

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-(--bg-primary) flex items-center justify-center shadow overflow-hidden">
            {user.imag ? (
              <img
                src={user?.imag}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-(--text-primary)" />
            )}
          </div>

          <h1 className="text-2xl font-semibold text-(--text-primary) mt-4">
            {user.fullName}
          </h1>

          <p className="text-(--text-secondary)">Member since Nov 2024</p>
        </div>

        {/* User Information */}
        <div className="space-y-6 mb-8">
          <div className="flex gap-4 items-center">
            <Mail className="w-6 h-6 text-(--text-primary)" />
            <span className="text-(--text-primary)">{user.email}</span>
          </div>

          <div className="flex gap-4 items-center">
            <Phone className="w-6 h-6 text-(--text-primary)" />
            <span className="text-(--text-primary)">{user.phone}</span>
          </div>

          <div className="flex gap-4 items-center">
            <MapPin className="w-6 h-6 text-(--text-primary)" />
            <span className="text-(--text-primary)">{user.location}</span>
          </div>

          <div className="flex gap-4 items-center">
            <Briefcase className="w-6 h-6 text-(--text-primary)"/>
            <span className="text-(--text-primary)">{user.role}</span>
            
          </div>
        </div>

        {/* Edit Profile Button */}
        <Link
          to="/profile/edit"
          className="w-full py-3 bg-(--button-primary) border-(--border-primary) rounded-lg text-(--text-primary) font-medium flex justify-center gap-2 hover:bg-(--button-primary-hover) transition"
        >
          <Settings className="w-5 h-5" />
          Edit Profile
        </Link>

      </div>
    </div>
  );
}

