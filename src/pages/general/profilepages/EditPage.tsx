import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";
import { updateUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: "admin" | "buyer" | "seller" | "user";
  imag?: FileList;
}

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  const [preview, setPreview] = useState<string | undefined>(user.imag);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      role: user.role,
    },
    mode: "onSubmit",
  });

  // imag preview
  useEffect(() => {
    const subscription = watch((values) => {
      const fileList = values.imag;
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {
    const updatedData = { ...data, imag: preview }; // Save base64 string to Redux
    dispatch(updateUser(updatedData));
    navigate("/profile");
  };

  return (
    <div className="w-full bg-(--bg-primary) mx-auto mt-10 ml-5 shadow p-6 rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6">User Information</h2>

      {/* imag */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 bg-(--bg-secondary) rounded-full overflow-hidden flex items-center  justify-center shadow-md mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          {...register("imag")}
          className="text-sm text-gray-700 hover:cursor-pointer hover:text-blue-500"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Must be at least 10 digits" },
            })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            {...register("location", { required: "City is required" })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select {...register("role", { required: "Please select a role" })}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Link
          to="/passwordPage"
          className="w-fit  flex items-center gap-2 bg-(--button-primary) hover:bg-(--button-primary-hover) text-(--text-primary) px-4 py-2 rounded-lg"
        >
          <Settings className="w-4 h-4" /> Change Password
        </Link>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            title="submit"
            type="submit"
            className="w-full p-2 rounded-md transition bg-(--button-primary) text-(--text-primary) hover:bg-(--button-primary-hover)"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex-1 p-2 rounded-md transition border text-(--text-secondary) hover:bg-gray-100"
            
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import  type { RootState } from "../../../redux/store/store";
// import { updateUser } from "../../../redux/slices/userSlice";
// import { useNavigate } from "react-router-dom";

// interface FormValues {
//   fullName: string;
//   email: string;
//   phone: string;
//   location: string;
//   imag?: FileList;
// }

// const EditProfile: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector((state: RootState) => state.user);
//   const [preview, setPreview] = useState<string | undefined>(user.imag);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<FormValues>({
//     defaultValues: {
//       fullName: user.fullName || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       location: user.location || "",
//     },
//     mode: "onSubmit",
//   });

//   //const file = watch("imag") as unknown as FileList;
//   useEffect(() => {
//     const subscription = watch((values) => {
//         if (values.imag && values.imag.length > 0) {
//         const file = values.imag[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
// });
//     return () => subscription.unsubscribe();
//   }, [watch]);

//   const onSubmit = (data: FormValues & { imag?: FileList }) => {
//     const updatedData = { ...data, imag: preview }; // save base64 to Redux
//     dispatch(updateUser(updatedData));
//     navigate("/profile");
//   };

//   return (

//     <div className="max-w-xl mx-auto mt-10 bg-(--bg-primary) shadow p-6 rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

//       <div className="flex flex-col items-center mb-6">
//         <div className="w-32 h-32 rounded-full overflow-hidden  bg-pink-200 flex items-center justify-center shadow-md mb-4">
//         <div className="w-32 h-32 rounded-full overflow-hidden bg-(--bg-secondary) flex items-center justify-center shadow-md mb-4">
//           {preview ? (
//             <img src={preview} alt="Profile" className="w-full h-full object-cover" />
//           ) : (
//             <span className="text-gray-500">No Image</span>
//           )}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           {...register("imag")}
//           className="text-sm text-gray-700 hover:cursor-pointer hover:text-blue-500"
//         />
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Full Name */}
//         <div>
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             {...register("fullName", { required: "Full name is required" })}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /\S+@\S+\.\S+/,
//                 message: "Invalid email format",
//               },
//             })}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block mb-1 font-medium">Phone Number</label>
//           <input
//             type="text"
//             {...register("phone", {
//               required: "Phone number is required",
//               minLength: {
//                 value: 10,
//                 message: "Must be at least 10 digits",
//               },
//             })}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//           )}
//         </div>

//         {/* City */}
//         <div>
//           <label className="block mb-1 font-medium">City</label>
//           <input
//             type="text"
//             {...register("location", { required: "City is required" })}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.location && (
//             <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="flex gap-4 pt-4">
//         <button
//           type="submit"
//           className="w-full bg-(--button-primary) text-(--text-primary) p-2 rounded-md hover:bg-(--button-primary-hover) transition"
//         >
//           Save Changes
//         </button>

//         <button
//             type="button"
//             onClick={() => navigate("/profile")}
//             className="flex-1 border text-(--text-secondary) border-gray-300 hover:bg-(--button-secondary-hover) p-2 rounded-md transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;

// // // import React from "react";
// // // import { useForm } from "react-hook-form";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import  type { RootState } from "../../../redux/store";
// // // import { updateUser } from "../../../redux/userSlice";
// // // import { useNavigate, useRouteLoaderData } from "react-router-dom";

// // // type FormData = {
// // //   name: string;
// // //   email: string;
// // //   phone: string;
// // //   city: string;
// // //   address: string;
// // //   bio: string;
// // // };

// // // const EditProfile: React.FC = () => {
// // //   const user = useSelector((state: RootState) => state.user);
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     formState: { errors },
// // //   } = useForm<FormData>({
// // //     defaultValues: user,
// // //     mode: "onSubmit", //
// // //   });

// // //   const onSubmit = (data: FormData) => {
// // //     dispatch(updateUser(data));

// // //     // ✅ SUCCESS TOAST
// // //     toast({
// // //       title: "Profile Saved",
// // //       description: "Your profile has been updated successfully.",
// // //     });

// // //     // Redirect back after small delay (optional)
// // //     setTimeout(() => navigate("/profile"), 600);
// // //   };

// // //   return (
// // //     <div className="p-6 max-w-xl mx-auto">
// // //       <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

// // //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

// // //         {/* NAME */}
// // //         <div>
// // //           <label className="block font-medium">Name</label>
// // //           <input
// // //             className="w-full border rounded p-2"
// // //             {...register("name", {
// // //               required: "Name is required",
// // //               minLength: { value: 3, message: "Min 3 characters" },
// // //               maxLength: { value: 30, message: "Max 30 characters" },
// // //             })}
// // //           />
// // //           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
// // //         </div>

// // //         {/* EMAIL */}
// // //         <div>
// // //           <label className="block font-medium">Email</label>
// // //           <input
// // //             className="w-full border rounded p-2"
// // //             {...register("email", {
// // //               required: "Email is required",
// // //               pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
// // //             })}
// // //           />
// // //           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
// // //         </div>

// // //         {/* PHONE */}
// // //         <div>
// // //           <label className="block font-medium">Phone</label>
// // //           <input
// // //             className="w-full border rounded p-2"
// // //             {...register("phone", {
// // //               required: "Phone is required",
// // //               pattern: {
// // //                 value: /^[0-9]{10,15}$/,
// // //                 message: "Enter a valid phone number",
// // //               },
// // //             })}
// // //           />
// // //           {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
// // //         </div>

// // //         {/* CITY */}
// // //         <div>
// // //           <label className="block font-medium">City</label>
// // //           <input
// // //             className="w-full border rounded p-2"
// // //             {...register("city", {
// // //               required: "City is required",
// // //             })}
// // //           />
// // //           {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
// // //         </div>

// // //         {/* ADDRESS */}
// // //         <div>
// // //           <label className="block font-medium">Address</label>
// // //           <input
// // //             className="w-full border rounded p-2"
// // //             {...register("address", {
// // //               minLength: { value: 5, message: "Min 5 characters" },
// // //             })}
// // //           />
// // //           {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
// // //         </div>

// // //         {/* BIO */}
// // //         <div>
// // //           <label className="block font-medium">Bio</label>
// // //           <textarea
// // //             rows={4}
// // //             className="w-full border rounded p-2"
// // //             {...register("bio", {
// // //               maxLength: { value: 160, message: "Max 160 characters" },
// // //             })}
// // //           />
// // //           {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
// // //         </div>

// // //         {/* SUBMIT */}
// // //         <button
// // //           type="submit"
// // //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // //         >
// // //           Save Changes
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default EditProfile;

// // // // import { useState } from "react";
// // // // import { useSelector, useDispatch } from "react-redux";
// // // // import type { RootState, AppDispatch } from "../../../redux/store";
// // // // import { updateUser } from "../../../redux/userSlice";
// // // // import { useNavigate } from "react-router-dom";

// // // // export default function EditProfilePage() {
// // // //   const user = useSelector((state: RootState) => state.user);
// // // //   const dispatch = useDispatch<AppDispatch>();
// // // //   const navigate = useNavigate();

// // // //   const [form, setForm] = useState(user);

// // // //   const handleSave = () => {
// // // //     dispatch(updateUser(form));
// // // //     navigate("/profile");
// // // //   };

// // // //   return (
// // // //     <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">

// // // //       <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

// // // //       <div className="space-y-4">
// // // //         <input
// // // //           className="w-full p-2 border rounded"
// // // //           placeholder="Name"
// // // //           value={form.name}
// // // //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// // // //         />

// // // //         <input
// // // //           className="w-full p-2 border rounded"
// // // //           placeholder="Email"
// // // //           value={form.email}
// // // //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// // // //         />

// // // //         <input
// // // //           className="w-full p-2 border rounded"
// // // //           placeholder="Phone"
// // // //           value={form.phone}
// // // //           onChange={(e) => setForm({ ...form, phone: e.target.value })}
// // // //         />

// // // //         <input
// // // //           className="w-full p-2 border rounded"
// // // //           placeholder="Location"
// // // //           value={form.location}
// // // //           onChange={(e) => setForm({ ...form, location: e.target.value })}
// // // //         />
// // // //       </div>

// // // //       <button
// // // //         onClick={handleSave}
// // // //         className="mt-6 w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
// // // //       >
// // // //         Save Changes
// // // //       </button>

// // // //     </div>
// // // //   );
// // // // }
