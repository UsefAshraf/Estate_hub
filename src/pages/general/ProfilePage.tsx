import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, Pencil, Save, XCircle, Upload, User , Building} from "lucide-react";

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
    watch,
    formState: { errors },
  } = useForm<AccountForm>({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data: AccountForm) => {
    alert("Profile Updated");
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-(--bg-primary) rounded-lg shadow">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h2 className="text-xl text-(--text-primary) font-semibold">Account Information</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-(--button-primary) text-(--text-primary) rounded"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleSubmit(onSubmit)}
              className="flex items-center gap-2 px-4 py-2 bg-(--button-primary) text-(--text-primary) rounded"
            >
              <Save size={16} /> Save
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              <XCircle size={16} /> Cancel
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="flex flex-col items-center md:items-start gap-3">
          <div className="w-32 h-32 rounded-full overflow-hidden border">
            <img src={profileImage || "https://via.placeholder.com/150"} alt="" className="w-full h-full object-cover  bg-gray-100"/>
          </div>

          {isEditing && (
            <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-(--button-primary) border rounded hover:bg-gray-200 text-sm">
              <Upload size={16} />
              Upload Picture
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

     
        <div className="md:col-span-3 space-y-4">
          <div>

           <User className="icon" size={16} />
            <label className="font-medium block mb-1">Name</label>
            <input
              disabled={!isEditing}
              type="text"
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className={`w-full p-2 bg-(--bg-primary) rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
           </div>

          {/* COMPANY */}
          <div>
          <Building className="icon" size={16} />
            <label className="font-medium block mb-1">Company</label>
            <input
              disabled={!isEditing}
              {...register("company", { required: "Company is required" })}
              className={`w-full p-2 rounded-md border ${
                errors.company ? "border-red-500" : "border-gray-300"
              } focus:ring`}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>
          {/* MOBILE */}
          <div>
            <label className="font-medium block mb-1">Mobile</label>
            <div className="relative">
              <Phone className="icon" size={16} />
              <input
                disabled={!isEditing}
                {...register("mobile", {
                  required: "Mobile is required",
                  minLength: { value: 10, message: "Must be at least 10 digits" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Mobile must be numeric",
                  },
                })}
                className={`w-full pl-8 p-2 rounded-md border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } focus:ring `}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-medium block mb-1">Email</label>
            <div className="relative">
              <Mail className="icon" size={16} />
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
                className={`w-full pl-8 p-2 bg-(--bg-primary) rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* FAX */}
          <div>
            <label className="font-medium block mb-1">Fax</label>
            
            <input
              disabled={!isEditing}
              {...register("fax")}
              className="w-full p-2  pl-8 rounded-md border border-gray-300 focus:ring"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="font-medium block mb-1">Address</label>
            <div className="relative">
              <MapPin className="icon" size={16} />
              <textarea
                disabled={!isEditing}
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 5, message: "Minimum 5 characters" },
                })}
                className={`w-full pl-8 p-2 bg-(--bg-primary) rounded-md border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } focus:ring min-h-[90px]`}
              />
              
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountInfo;

