import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// -------------------
// Zod Schema
// -------------------
const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
    purpose: z.enum(["Buy/Rent a Property", "Sell a Property", "Both"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    agreeToTerms: z.boolean().refine((value) => value),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

// -------------------
// Component
// -------------------
const SignUpPage: React.FC = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SignUpFormData>({
  //   resolver: zodResolver(signUpSchema),
  // });

  // const onSubmit = (data: SignUpFormData) => {
  //   console.log("Form Data:", data);

  //   // Redirect based on user's purpose
  //   if (data.purpose === "Buy/Rent a Property") {
  //     navigate("/HomeBuyer");
  //   } else if (data.purpose === "Sell a Property") {
  //     navigate("/HomeSeller");
  //   }
  // };
const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "Buy/Rent a Property",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert(`Form submitted! Purpose: ${formData.purpose}`);
  };
  const inputClass =
    "w-full pl-10 pr-12 py-3 bg-bg-secondary dark:bg-bg-tertiary border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary transition-colors duration-200 hover:border-accent";

  // return (
  //   <div className="bg-bg-primary dark:bg-background flex">
  //     {/* Left Side - Branding & Image */}
  //     <div className="hidden lg:flex lg:w-3/4 bg-primary dark:bg-bg-tertiary relative overflow-hidden">
  //       {/* Background Pattern */}
  //       <div className="absolute inset-0 bg-primary dark:bg-bg-tertiary opacity-10">
  //         <div
  //           className="absolute inset-0"
  //           style={{
  //             backgroundImage:
  //               'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  //           }}
  //         ></div>
  //       </div>

  //       {/* Content */}
  //       <div className="relative z-10 flex flex-col justify-center px-12 py-16 ">
  //         {/* Logo */}
  //         <div className="flex items-center gap-3 mb-8">
  //           <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
  //             <Home className="w-10 h-10 text-primary" />
  //           </div>
  //           <h1 className="text-4xl text-primary font-bold">EstateHub</h1>
  //         </div>

  //         {/* Tagline */}
  //         <h2 className="text-3xl text-primary font-bold mb-4 leading-tight">
  //           Your Gateway to
  //           <br />
  //           Dream Properties
  //         </h2>

  //         {/* Description */}
  //         <p className="text-lg text-primary mb-8 leading-relaxed">
  //           EstateHub is your trusted partner in finding, buying, selling, and
  //           renting properties. We connect you with the perfect home or
  //           investment opportunity.
  //         </p>

  //         {/* Features */}
  //         <div className="space-y-4">
  //           <div className="flex items-start gap-3">
  //             <div className="text-primary bg-white/20 backdrop-blur-sm p-2 rounded-lg mt-1">
  //               <svg
  //                 className="w-5 h-5"
  //                 fill="currentColor"
  //                 viewBox="0 0 20 20"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //             </div>
  //             <div>
  //               <h3 className="font-semibold text-primary text-lg">
  //                 Buy & Rent Properties
  //               </h3>
  //               <p className="text-primary text-sm">
  //                 Browse thousands of verified listings
  //               </p>
  //             </div>
  //           </div>

  //           <div className="flex items-start gap-3">
  //             <div className="text-primary bg-white/20 backdrop-blur-sm p-2 rounded-lg mt-1">
  //               <svg
  //                 className="w-5 h-5"
  //                 fill="currentColor"
  //                 viewBox="0 0 20 20"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //             </div>
  //             <div>
  //               <h3 className="font-semibold text-primary text-lg">
  //                 Sell Your Property
  //               </h3>
  //               <p className="text-primary text-sm">
  //                 List your property and reach millions of buyers
  //               </p>
  //             </div>
  //           </div>

  //           <div className="flex items-start gap-3">
  //             <div className="text-primary backdrop-blur-sm p-2 rounded-lg mt-1">
  //               <svg
  //                 className="w-5 h-5"
  //                 fill="currentColor"
  //                 viewBox="0 0 20 20"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //             </div>
  //             <div>
  //               <h3 className="font-semibold text-lg text-primary">
  //                 Expert Guidance
  //               </h3>
  //               <p className="text-primary text-sm">
  //                 Get professional support throughout your journey
  //               </p>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Stats */}
  //         <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
  //           <div>
  //             <div className="text-3xl text-primary font-bold">10K+</div>
  //             <div className="text-primary text-sm">Properties</div>
  //           </div>
  //           <div>
  //             <div className="text-3xl text-primary font-bold">5K+</div>
  //             <div className="text-primary text-sm">Happy Clients</div>
  //           </div>
  //           <div>
  //             <div className="text-3xl text-primary font-bold">50+</div>
  //             <div className="text-primary text-sm">Cities</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Right Side - Signup Form */}
  //     <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
  //       <div className="w-full max-w-md">
  //         {/* Mobile Logo */}
  //         <div className="flex lg:hidden justify-center mb-6">
  //           <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
  //             <Home className="w-8 h-8 text-button-text" />
  //           </div>
  //         </div>

  //         <h2 className="text-3xl font-bold text-primary mb-2">
  //           Create Account
  //         </h2>
  //         <p className="text-secondary mb-8">
  //           Join EstateHub and find your dream property
  //         </p>

  //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  //           {/* Full Name */}
  //           <div className="relative">
  //             <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
  //             <input
  //               type="text"
  //               placeholder="John Doe"
  //               {...register("fullName")}
  //               className={inputClass}
  //             />
  //             {errors.fullName && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.fullName.message}
  //               </p>
  //             )}
  //           </div>

  //           {/* Email */}
  //           <div className="relative">
  //             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
  //             <input
  //               type="email"
  //               placeholder="you@example.com"
  //               {...register("email")}
  //               className={inputClass}
  //             />
  //             {errors.email && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.email.message}
  //               </p>
  //             )}
  //           </div>

  //           {/* Phone */}
  //           <div className="relative">
  //             <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
  //             <input
  //               type="tel"
  //               placeholder="+1 (555) 000-0000"
  //               {...register("phone")}
  //               className={inputClass}
  //             />
  //             {errors.phone && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.phone.message}
  //               </p>
  //             )}
  //           </div>

  //           {/* Purpose */}
  //           <div>
  //             <select {...register("purpose")} className={inputClass}>
  //               <option>Buy/Rent a Property</option>
  //               <option>Sell a Property</option>
  //             </select>
  //             {errors.purpose && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.purpose.message}
  //               </p>
  //             )}
  //           </div>

  //           {/* Password */}
  //           <div className="relative">
  //             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               placeholder="Create a strong password"
  //               {...register("password")}
  //               className={inputClass}
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowPassword(!showPassword)}
  //               className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
  //             >
  //               {showPassword ? <EyeOff /> : <Eye />}
  //             </button>
  //             {errors.password && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.password.message}
  //               </p>
  //             )}
  //           </div>

  //           {/* Confirm Password */}
  //           <div className="relative">
  //             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
  //             <input
  //               type={showConfirmPassword ? "text" : "password"}
  //               placeholder="Confirm your password"
  //               {...register("confirmPassword")}
  //               className={inputClass}
  //             />
  //             <button
  //               type="button"
  //               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  //               className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
  //             >
  //               {showConfirmPassword ? <EyeOff /> : <Eye />}
  //             </button>
  //             {errors.confirmPassword && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.confirmPassword.message}
  //               </p>
  //             )}
  //           </div>

  //           {/* Agree to Terms */}
  //           <div className="flex items-center">
  //             <input
  //               type="checkbox"
  //               {...register("agreeToTerms")}
  //               className="w-4 h-4 accent bg-bg-secondary dark:bg-bg-tertiary border-custom rounded transition-colors duration-200"
  //             />
  //             <label className="ml-2 text-sm text-secondary">
  //               I agree to the{" "}
  //               <span className="accent hover:text-primary cursor-pointer">
  //                 Terms of Service
  //               </span>{" "}
  //               and{" "}
  //               <span className="accent hover:text-primary cursor-pointer">
  //                 Privacy Policy
  //               </span>
  //             </label>
  //           </div>
  //           {errors.agreeToTerms && (
  //             <p className="text-red-500 text-sm mt-1">
  //               {errors.agreeToTerms.message}
  //             </p>
  //           )}

  //           {/* Submit */}
  //           <button
  //             type="submit"
  //             className="w-full btn-primary font-semibold py-3 rounded-lg transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
  //           >
  //             Create Account
  //           </button>
  //         </form>

  //         {/* Already have account */}
  //         <p className="text-center text-sm text-secondary mt-6">
  //           Already have an account?{" "}
  //           <button
  //             onClick={() => navigate("/signin")}
  //             className="accent hover:text-primary transition-colors duration-200 font-medium"
  //           >
  //             Sign In
  //           </button>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-start justify-center p-4 pt-20">
      <div className="w-full max-w-6xl flex gap-6">
        {/* Left Side - Branding & Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <Home className="w-10 h-10 text-white" />
              <span className="text-3xl font-bold text-white">EstateHub</span>
            </div>

            {/* Tagline */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                Your Gateway to Dream Properties
              </h2>

              {/* Description */}
              <p className="text-blue-100 text-lg mb-8">
                EstateHub is your trusted partner in finding, buying, selling, and renting properties. We connect you with the perfect home or investment opportunity.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Buy & Rent Properties</h3>
                    <p className="text-blue-100">Browse thousands of verified listings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Sell Your Property</h3>
                    <p className="text-blue-100">List your property and reach millions of buyers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Expert Guidance</h3>
                    <p className="text-blue-100">Get professional support throughout your journey</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
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
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">EstateHub</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Join EstateHub and find your dream property</p>

          <div className="space-y-5 flex-1">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
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
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input 
                    type="radio" 
                    value="Buy/Rent a Property" 
                    checked={formData.purpose === "Buy/Rent a Property"}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    className="mr-2" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Buy/Rent</span>
                </label>
                <label className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input 
                    type="radio" 
                    value="Sell a Property" 
                    checked={formData.purpose === "Sell a Property"}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    className="mr-2" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Sell</span>
                </label>
              </div>
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Agree to Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => alert("Navigate to Sign In")}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
