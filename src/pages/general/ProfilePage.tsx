
// pages/Profile.tsx - Universal Profile Component
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Phone,
  Mail,
  MapPin,
  Pencil,
  Save,
  XCircle,
  Upload,
  User,
  Camera,
  Loader2,
  Calendar,
  Shield,
} from "lucide-react";
import Swal from "sweetalert2";
import { getUserProfile, updateUserProfile, uploadAvatar } from "../../services/profile.api";

interface ProfileForm {
  fullName: string;
  phone: string;
  location: string;
}

interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    mode: "onBlur",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Check if token exists
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Not Authenticated",
          text: "Please login to view your profile",
        }).then(() => {
          window.location.href = '/login';
        });
        return;
      }

      console.log('Fetching profile with token:', token ? 'Token exists' : 'No token');
      
      const response = await getUserProfile();
      
      if (response.success) {
        const data = response.data;
        setUserData(data);
        setProfileImage(data.avatar || "");
        
        // Reset form with fetched data
        reset({
          fullName: data.fullName,
          phone: data.phone || "",
          location: data.location || "",
        });

        // Update localStorage
        localStorage.setItem('id', data.id);
        localStorage.setItem('userName', data.fullName);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        localStorage.setItem('phone', data.phone || '');
        localStorage.setItem('location', data.location || '');
        localStorage.setItem('avatar', data.avatar || '');
      }
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      
      const errorMessage = error.message || error.error || "Please try again later";
      
      Swal.fire({
        icon: "error",
        title: "Failed to load profile",
        text: errorMessage,
        footer: error.success === false ? 'Authentication required' : '',
      }).then(() => {
        // If authentication error, redirect to login
        if (errorMessage.includes('_id') || errorMessage.includes('undefined')) {
          window.location.href = '/login';
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      const response = await updateUserProfile(data);
      
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        
        setIsEditing(false);
        fetchProfile(); // Refresh profile data
      }
    } catch (error: any) {
      console.error('Update error:', error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Please try again",
      });
    }
  };

  const cancelEdit = () => {
    if (userData) {
      reset({
        fullName: userData.fullName,
        phone: userData.phone || "",
        location: userData.location || "",
      });
      setProfileImage(userData.avatar || "");
    }
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File too large",
        text: "Please select an image under 5MB",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please select an image file",
      });
      return;
    }

    try {
      setUploadingImage(true);
      
      // Upload to server
      const response = await uploadAvatar(file);
      
      if (response.success) {
        setProfileImage(response.data.avatar);
        
        Swal.fire({
          icon: "success",
          title: "Avatar uploaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        
        // Refresh profile to get updated data
        fetchProfile();
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message || "Please try again",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'seller':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'buyer':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-12 pr-4 py-3 bg-neutral-secondary border ${
      hasError ? "border-red-500" : "border-default"
    } rounded-xl focus:outline-none focus:ring-2 focus:ring-brand text-heading transition-all duration-300 hover:border-brand disabled:opacity-60 disabled:cursor-not-allowed`;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-primary flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand mx-auto mb-4" />
          <p className="text-heading">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-primary py-12 px-4 sm:px-6 lg:px-8 pt-20">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-hover p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Account Profile
              </h1>
              <p className="text-primary/80 text-sm md:text-base">
                Manage your personal information and preferences
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-heading rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-default"
              >
                <Pencil size={18} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Save size={18} /> Save Changes
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-neutral-tertiary text-heading rounded-xl font-semibold shadow-lg hover:bg-neutral-tertiary-medium hover:shadow-xl hover:scale-105 transition-all duration-300 border border-default"
                >
                  <XCircle size={18} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-neutral-secondary rounded-2xl shadow-2xl overflow-hidden border border-default">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Profile Image Section */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-brand shadow-xl ring-4 ring-brand/20 transition-all duration-300 group-hover:scale-105">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand flex items-center justify-center">
                        <span className="text-5xl font-bold text-primary">
                          {userData.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-2 right-2 cursor-pointer bg-brand hover:bg-brand-hover text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                      {uploadingImage ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Camera size={20} />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  )}
                </div>

                {isEditing && (
                  <label className="mt-6 flex items-center gap-2 cursor-pointer bg-brand hover:bg-brand-hover text-primary px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <Upload size={18} />
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                )}

                <div className="mt-8 text-center w-full">
                  <h3 className="text-xl font-bold text-heading mb-2">
                    {userData.fullName}
                  </h3>
                  
                  {/* Role Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getRoleBadgeColor(userData.role)} font-medium text-sm mb-4`}>
                    <Shield size={16} />
                    <span className="capitalize">{userData.role}</span>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center justify-center gap-2 text-sm text-body mt-4">
                    <Calendar size={16} />
                    <span>Member since {formatDate(userData.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="lg:col-span-3 space-y-6">
                {/* Full Name Field */}
                <div className="group">
                  <label className="font-semibold text-heading block mb-2 text-sm uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-body group-hover:text-brand transition-colors duration-300"
                      size={20}
                    />
                    <input
                      disabled={!isEditing}
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                      })}
                      className={inputClass(!!errors.fullName)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email Field (Read-only) */}
                <div className="group">
                  <label className="font-semibold text-heading block mb-2 text-sm uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-body group-hover:text-brand transition-colors duration-300"
                      size={20}
                    />
                    <input
                      disabled
                      type="email"
                      value={userData.email}
                      className={inputClass(false)}
                      placeholder="Email address"
                    />
                  </div>
                  <p className="text-body text-xs mt-1 ml-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="font-semibold text-heading block mb-2 text-sm uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-body group-hover:text-brand transition-colors duration-300"
                      size={20}
                    />
                    <input
                      disabled={!isEditing}
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9+\-\s()]*$/,
                          message: "Invalid phone format",
                        },
                      })}
                      className={inputClass(!!errors.phone)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Location Field */}
                <div className="group">
                  <label className="font-semibold text-heading block mb-2 text-sm uppercase tracking-wide">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-4 text-body group-hover:text-brand transition-colors duration-300"
                      size={20}
                    />
                    <textarea
                      disabled={!isEditing}
                      {...register("location")}
                      className={`${inputClass(
                        !!errors.location
                      )} min-h-[120px] resize-none pt-3`}
                      placeholder="Enter your location/address"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;