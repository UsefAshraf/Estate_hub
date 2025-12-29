import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Loader2 } from "lucide-react";
import { getUserProfile } from "../../services/profile.api";

interface UserProfileData {
  id: string;
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  createdAt: string;
}

const ProfileSeller: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getUserProfile();

      if (response.success) {
        const userData = response.data;
        setProfile(userData);

        // Update localStorage with fresh data
        localStorage.setItem('id', userData.id);
        localStorage.setItem('userName', userData.fullName);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('phone', userData.phone || '');
        localStorage.setItem('location', userData.location || '');
        localStorage.setItem('avatar', userData.avatar || '');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-primary flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand mx-auto mb-4" />
          <p className="text-heading">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-primary flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md">
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={fetchProfile}
              className="px-4 py-2 bg-brand text-primary rounded-lg hover:bg-brand-hover transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-secondary border border-custom rounded-xl p-8 mb-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-brand"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-brand flex items-center justify-center border-4 border-brand">
                  <span className="text-3xl font-bold text-primary">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-heading mb-2">
                {profile.fullName}
              </h1>
              <p className="text-body capitalize mb-2">
                {profile.role} Account
              </p>
              <div className="flex items-center gap-2 text-sm text-body">
                <Calendar className="w-4 h-4" />
                <span>Member since {formatDate(profile.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-secondary border border-custom rounded-xl p-8">
          <h2 className="text-2xl font-bold text-heading mb-6">
            Profile Information
          </h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-accent p-3 rounded-lg">
                <Mail className="w-5 h-5 text-brand" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-body mb-1">Email Address</p>
                <p className="text-heading font-medium">{profile.email}</p>
              </div>
            </div>

            {/* Phone */}
            {profile.phone && (
              <div className="flex items-start gap-4">
                <div className="bg-accent p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-body mb-1">Phone Number</p>
                  <p className="text-heading font-medium">{profile.phone}</p>
                </div>
              </div>
            )}

            {/* Location */}
            {profile.location && (
              <div className="flex items-start gap-4">
                <div className="bg-accent p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-body mb-1">Location</p>
                  <p className="text-heading font-medium">{profile.location}</p>
                </div>
              </div>
            )}

            {/* User ID */}
            <div className="flex items-start gap-4">
              <div className="bg-accent p-3 rounded-lg">
                <User className="w-5 h-5 text-brand" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-body mb-1">User ID</p>
                <p className="text-heading font-mono text-sm">{profile.id}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-custom flex gap-4">
            <button
              onClick={fetchProfile}
              className="px-6 py-2 btn-primary rounded-lg hover:bg-accent-hover transition-colors font-medium border border-custom"
            >
              Refresh Profile
            </button>
            <button
              className="px-6 py-2 btn-primary rounded-lg hover:bg-accent-hover transition-colors font-medium border border-custom"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSeller;