// import React, { useState } from "react";
// import { Home, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { signUp } from "@/services/auth.api";
// import type { SignUpRequest } from "@/types/auth.types";
// import Swal from "sweetalert2";

// // -------------------
// // Component
// // -------------------
// const SignUpPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     purpose: "Buy/Rent a Property",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//   });
//   const [errors, setErrors] = useState<any>({});

//   const handleChange = (name: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev: any) => ({ ...prev, [name]: undefined }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const role: SignUpRequest["role"] =
//       formData.purpose === "Sell a Property" ? "seller" : "buyer";
//     const payload: SignUpRequest = {
//       userName: formData.fullName,
//       email: formData.email,
//       phone: formData.phone,
//       role,
//       password: formData.password,
//       confirmPassword: formData.confirmPassword,
//     };

//     try {
//       const { data } = await signUp(payload);

//       // Store user data and tokens in localStorage
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("accesstoken", data.accesstoken);
//       localStorage.setItem("refreshToken", data.refreshToken);

//       // Show success popup
//       await Swal.fire({
//         icon: "success",
//         title: "Signed Up Successfully!",
//         html: `
//           <p class="text-gray-700 dark:text-gray-300 mb-2">
//             A verification email has been sent to <strong>${formData.email}</strong>
//           </p>
//           <p class="text-gray-600 dark:text-gray-400">
//             Please check your email and click the verification link to activate your account.
//           </p>
//         `,
//         confirmButtonText: "OK",
//         confirmButtonColor: "#2563eb",
//       });

//       // Clear all form inputs
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         purpose: "Buy/Rent a Property",
//         password: "",
//         confirmPassword: "",
//         agreeToTerms: false,
//       });
//     } catch (error: any) {
//       // Show error popup
//       Swal.fire({
//         icon: "error",
//         title: "Signup Failed",
//         text:
//           error.response?.data?.message ||
//           "An error occurred during signup. Please try again.",
//         confirmButtonColor: "#dc2626",
//       });
//     }
//   };
//   const inputClass =
//     "w-full pl-10 pr-12 py-3 bg-bg-secondary dark:bg-bg-tertiary border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary transition-colors duration-200 hover:border-accent";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-start justify-center p-4 pt-20">
//       <div className="w-full max-w-6xl flex gap-6">
//         {/* Left Side - Branding & Image */}
//         <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 flex-col justify-between relative overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
//           </div>

//           {/* Content */}
//           <div className="relative z-10 flex flex-col h-full justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-2 mb-8">
//               <Home className="w-10 h-10 text-white" />
//               <span className="text-3xl font-bold text-white">EstateHub</span>
//             </div>

//             {/* Tagline */}
//             <div className="flex-1 flex flex-col justify-center">
//               <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
//                 Your Gateway to Dream Properties
//               </h2>

//               {/* Description */}
//               <p className="text-blue-100 text-lg mb-8">
//                 EstateHub is your trusted partner in finding, buying, selling,
//                 and renting properties. We connect you with the perfect home or
//                 investment opportunity.
//               </p>

//               {/* Features */}
//               <div className="space-y-4 mb-8">
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">
//                       Buy & Rent Properties
//                     </h3>
//                     <p className="text-blue-100">
//                       Browse thousands of verified listings
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">
//                       Sell Your Property
//                     </h3>
//                     <p className="text-blue-100">
//                       List your property and reach millions of buyers
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">
//                       Expert Guidance
//                     </h3>
//                     <p className="text-blue-100">
//                       Get professional support throughout your journey
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-400/30">
//               <div>
//                 <div className="text-3xl font-bold text-white">10K+</div>
//                 <div className="text-blue-100 text-sm">Properties</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-white">5K+</div>
//                 <div className="text-blue-100 text-sm">Happy Clients</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-white">50+</div>
//                 <div className="text-blue-100 text-sm">Cities</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col">
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center gap-2 mb-6">
//             <Home className="w-8 h-8 text-blue-600" />
//             <span className="text-2xl font-bold text-gray-900 dark:text-white">
//               EstateHub
//             </span>
//           </div>

//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Create Account
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">
//             Join EstateHub and find your dream property
//           </p>

//           <div className="space-y-5 flex-1">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={formData.fullName}
//                   onChange={(e) => handleChange("fullName", e.target.value)}
//                   className={inputClass}
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                   className={inputClass}
//                   placeholder="john@example.com"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Phone
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                   className={inputClass}
//                   placeholder="+1 234 567 8900"
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.phone.message}
//                 </p>
//               )}
//             </div>

//             {/* Purpose */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 I want to
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <label className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
//                   <input
//                     type="radio"
//                     value="Buy/Rent a Property"
//                     checked={formData.purpose === "Buy/Rent a Property"}
//                     onChange={(e) => handleChange("purpose", e.target.value)}
//                     className="mr-2"
//                   />
//                   <span className="text-sm text-gray-700 dark:text-gray-300">
//                     Buy/Rent
//                   </span>
//                 </label>
//                 <label className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
//                   <input
//                     type="radio"
//                     value="Sell a Property"
//                     checked={formData.purpose === "Sell a Property"}
//                     onChange={(e) => handleChange("purpose", e.target.value)}
//                     className="mr-2"
//                   />
//                   <span className="text-sm text-gray-700 dark:text-gray-300">
//                     Sell
//                   </span>
//                 </label>
//               </div>
//               {errors.purpose && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.purpose.message}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={(e) => handleChange("password", e.target.value)}
//                   className={inputClass}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={(e) =>
//                     handleChange("confirmPassword", e.target.value)
//                   }
//                   className={inputClass}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             {/* Agree to Terms */}
//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 checked={formData.agreeToTerms}
//                 onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
//                 className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label className="text-sm text-gray-600 dark:text-gray-400">
//                 I agree to the{" "}
//                 <a
//                   href="#"
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a
//                   href="#"
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Privacy Policy
//                 </a>
//               </label>
//             </div>
//             {errors.agreeToTerms && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.agreeToTerms.message}
//               </p>
//             )}

//             {/* Submit */}
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
//             >
//               Create Account
//             </button>

//             {/* Already have account */}
//             <p className="text-center text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/signin")}
//                 className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
//               >
//                 Sign In
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;


import React, { useState, useEffect } from "react";
import { Home, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: "buyer" | "seller" | "";
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState<any>({});

  const API_URL = "http://localhost:3000"; // Change to your backend URL
  const GOOGLE_CLIENT_ID = "584541693614-7khqp9pqbrc0sk693tk9ecean8e244up.apps.googleusercontent.com"; // Add your Google Client ID

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        const googleButtonDiv = document.getElementById("google-signup-button");
        if (googleButtonDiv) {
          window.google.accounts.id.renderButton(googleButtonDiv, {
            theme: "outline",
            size: "large",
            width: 350,
            text: "signup_with",
          });
        }
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Full name is required";
    } else if (formData.userName.length < 2) {
      newErrors.userName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 6) {
      newErrors.phone = "Phone number must be at least 6 digits";
    }

    if (!formData.role) {
      newErrors.role = "Please select your purpose";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store user data and tokens
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        await Swal.fire({
          icon: "success",
          title: "Account Created Successfully!",
          html: `
            <p class="text-gray-700 dark:text-gray-300 mb-2">
              Welcome to EstateHub, <strong>${formData.userName}</strong>!
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              ${data.message || "You can now sign in to your account."}
            </p>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563eb",
        });

        // Clear form
        setFormData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "",
        });

        // Navigate to sign in or home page
        navigate("/signin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.message || "An error occurred during signup. Please try again.",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleResponse = async (response: GoogleCredentialResponse) => {
    setIsLoading(true);
    console.log(response);
    
    try {
      const res = await fetch(`${API_URL}/auth/gmail-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      console.log(data);
      

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        await Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `Signed up successfully with Google!`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Navigate based on role
        if (data.user?.role === "seller") {
          navigate("/homeSeller");
        } else if (data.user?.role === "admin") {
          navigate("/users");
        } else {
          navigate("/homeBuyer");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Google Signup Failed",
          text: data.message || "An error occurred with Google signup.",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to complete Google signup. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-colors duration-200 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-start justify-center p-4 pt-20">
      <div className="w-full max-w-6xl flex gap-6">
        {/* Left Side - Branding & Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-2 mb-8">
              <Home className="w-10 h-10 text-white" />
              <span className="text-3xl font-bold text-white">EstateHub</span>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                Your Gateway to Dream Properties
              </h2>

              <p className="text-blue-100 text-lg mb-8">
                EstateHub is your trusted partner in finding, buying, selling,
                and renting properties. We connect you with the perfect home or
                investment opportunity.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Buy & Rent Properties
                    </h3>
                    <p className="text-blue-100">
                      Browse thousands of verified listings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Sell Your Property
                    </h3>
                    <p className="text-blue-100">
                      List your property and reach millions of buyers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Expert Guidance
                    </h3>
                    <p className="text-blue-100">
                      Get professional support throughout your journey
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-400/30">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-blue-100 text-sm">Properties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-blue-100 text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-blue-100 text-sm">Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              EstateHub
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join EstateHub and find your dream property
          </p>

          {/* Google Sign-In Button */}
          <div className="mb-4">
            <div id="google-signup-button" className="flex justify-center"></div>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4 flex-1">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => handleChange("userName", e.target.value)}
                  className={inputClass}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass}
                  placeholder="john@example.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass}
                  placeholder="+1 234 567 8900"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Purpose/Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input
                    type="radio"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Buy/Rent
                  </span>
                </label>
                <label className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input
                    type="radio"
                    value="seller"
                    checked={formData.role === "seller"}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Sell
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className={inputClass}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                disabled={isLoading}
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;