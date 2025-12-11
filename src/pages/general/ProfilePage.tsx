import React, { useState } from "react";
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
  Building,
  Camera,
} from "lucide-react";
import Swal from "sweetalert2";

interface AccountForm {
  name: string;
  company: string;
  phone: string;
  mobile: string;
  email: string;
  fax?: string;
  address: string;
}

const AccountInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");

  const defaultValues: AccountForm = {
    name: "Rachel Green",
    company: "Wise Agent Realty",
    phone: "4808675309",
    mobile: "4805551212",
    email: "help@wiseagent.com",
    fax: "4806798512",
    address: "123 Cosmo Blvd. Fountain Hills, AZ 85268 United States",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountForm>({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data: AccountForm) => {
    // alert("Profile Updated Successfully!");
    Swal.fire({
      icon: "success",
      title: "Profile Updated Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setIsEditing(false);
    console.log("Saved data:", data);
  };

  const cancelEdit = () => {
    reset(defaultValues);
    setProfileImage("");
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-12 pr-4 py-3 bg-bg-secondary dark:bg-bg-tertiary border ${
      hasError ? "border-red-500" : "border-custom"
    } rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-primary transition-all duration-300 hover:border-accent disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section with Gradient */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative overflow-hidden rounded-2xl btn-favorite p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Account Profile
              </h1>
              <p className="text-secondary text-sm md:text-base">
                Manage your personal information and preferences
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-custom"
              >
                <Pencil size={18} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-xl font-semibold shadow-lg hover:bg-accent hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Save size={18} /> Save Changes
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary rounded-xl font-semibold shadow-lg hover:bg-tertiary hover:shadow-xl hover:scale-105 transition-all duration-300 border border-custom"
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
        <div className="bg-primary rounded-2xl shadow-2xl overflow-hidden border border-custom favorite-card">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Profile Image Section */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 bg-accent shadow-xl ring-4 ring-accent/20 transition-all duration-300 group-hover:scale-105">
                    <img
                      src={profileImage || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-2 right-2 cursor-pointer bg-accent hover:bg-accent text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                {isEditing && (
                  <label className="mt-6 flex items-center gap-2 cursor-pointer btn-primary px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <Upload size={18} />
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}

                <div className="mt-8 text-center">
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {defaultValues.name}
                  </h3>
                  <p className="text-secondary text-sm">
                    {defaultValues.company}
                  </p>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="lg:col-span-3 space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="font-semibold text-primary block mb-2 text-sm uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-hover:text-accent transition-colors duration-300"
                      size={20}
                    />
                    <input
                      disabled={!isEditing}
                      type="text"
                      {...register("name", {
                        required: "Full name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                      })}
                      className={inputClass(!!errors.name)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Company Field */}
                <div className="group">
                  <label className="font-semibold text-primary block mb-2 text-sm uppercase tracking-wide">
                    Company
                  </label>
                  <div className="relative">
                    <Building
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-hover:text-accent transition-colors duration-300"
                      size={20}
                    />
                    <input
                      disabled={!isEditing}
                      {...register("company", {
                        required: "Company is required",
                      })}
                      className={inputClass(!!errors.company)}
                      placeholder="Enter your company name"
                    />
                  </div>
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Mobile & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Field */}
                  <div className="group">
                    <label className="font-semibold text-primary block mb-2 text-sm uppercase tracking-wide">
                      Mobile
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-hover:text-accent transition-colors duration-300"
                        size={20}
                      />
                      <input
                        disabled={!isEditing}
                        {...register("mobile", {
                          required: "Mobile is required",
                          minLength: {
                            value: 10,
                            message: "Must be at least 10 digits",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Mobile must be numeric",
                          },
                        })}
                        className={inputClass(!!errors.mobile)}
                        placeholder="Enter mobile number"
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                        <span className="font-medium">⚠</span>{" "}
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>

                  {/* Fax Field */}
                  <div className="group">
                    <label className="font-semibold text-primary block mb-2 text-sm uppercase tracking-wide">
                      Fax (Optional)
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-hover:text-accent transition-colors duration-300"
                        size={20}
                      />
                      <input
                        disabled={!isEditing}
                        {...register("fax")}
                        className={inputClass(false)}
                        placeholder="Enter fax number"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="font-semibold text-primary block mb-2 text-sm uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-hover:text-accent transition-colors duration-300"
                      size={20}
                    />
                    <input
                      disabled={!isEditing}
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email format",
                        },
                      })}
                      className={inputClass(!!errors.email)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Address Field */}
                <div className="group">
                  <label className="font-semibold text-primary block mb-2 text-sm uppercase tracking-wide">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-4 text-secondary group-hover:text-accent transition-colors duration-300"
                      size={20}
                    />
                    <textarea
                      disabled={!isEditing}
                      {...register("address", {
                        required: "Address is required",
                        minLength: {
                          value: 5,
                          message: "Minimum 5 characters",
                        },
                      })}
                      className={`${inputClass(
                        !!errors.address
                      )} min-h-[120px] resize-none pt-3`}
                      placeholder="Enter your full address"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <span className="font-medium">⚠</span>{" "}
                      {errors.address.message}
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

export default AccountInfo;
