// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Home, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // -------------------
// // Zod Schema
// // -------------------
// const signInSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   rememberMe: z.boolean().optional(),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// // -------------------
// // Component
// // -------------------
// const SignInPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//   });

//   const onSubmit = (data: SignInFormData) => {
//     console.log("Form Data:", data);
//     navigate("/homeBuyer");
//   };

//   return (
//     <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
//       <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 border border-custom transition-colors duration-200">

//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
//             <Home className="w-8 h-8 text-button-text" />
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-primary text-center mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-secondary text-center mb-6">
//           Sign in to your EstateHub account
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Email */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
//             <input
//               type="email"
//               placeholder="you@example.com"
//               {...register("email")}
//               className="
//                 w-full pl-10 pr-4 py-3
//                 bg-bg-secondary dark:bg-bg-tertiary
//                 border border-custom
//                 rounded-lg
//                 focus:outline-none focus:ring-2 focus:ring-accent
//                 text-primary
//                 transition-colors duration-200
//                 hover:border-accent
//               "
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               {...register("password")}
//               className="
//                 w-full pl-10 pr-12 py-3
//                 bg-bg-secondary dark:bg-bg-tertiary
//                 border border-custom
//                 rounded-lg
//                 focus:outline-none focus:ring-2 focus:ring-accent
//                 text-primary
//                 transition-colors duration-200
//                 hover:border-accent
//               "
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
//             >
//               {showPassword ? <EyeOff /> : <Eye />}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Remember Me & Forgot */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 {...register("rememberMe")}
//                 className="w-4 h-4 accent bg-bg-secondary dark:bg-bg-tertiary border-custom rounded transition-colors duration-200"
//               />
//               <label className="ml-2 text-sm text-secondary">Remember me</label>
//             </div>
//             <button
//               type="button"
//               onClick={() => navigate("/forgot")}
//               className="text-sm accent hover:text-primary transition-colors duration-200 font-medium"
//             >
//               Forgot password?
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="
//               w-full btn-primary
//               font-semibold py-3 rounded-lg
//               transition-colors duration-200
//               hover:bg-accent-hover
//               cursor-pointer
//             "
//           >
//             Sign In
//           </button>

//           {/* Sign Up */}
//           <p className="text-center text-sm text-secondary mt-4">
//             Don't have an account?{" "}
//             <button
//               onClick={() => navigate("/signup")}
//               className="accent hover:text-primary transition-colors duration-200 font-medium"
//             >
//               Sign Up
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;


import React, { useState } from "react";
import { Home, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert(`Signed in as: ${formData.email}`);
  };

  const inputClass = "w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-colors duration-200 hover:border-blue-500";

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
                Welcome Back to Your Property Journey
              </h2>

              {/* Description */}
              <p className="text-blue-100 text-lg mb-8">
                Continue exploring thousands of properties, manage your listings, and connect with potential buyers and sellers. Your dream property awaits!
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Access Your Dashboard</h3>
                    <p className="text-blue-100">View saved properties and manage your listings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Real-Time Updates</h3>
                    <p className="text-blue-100">Get instant notifications on property matches</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Personalized Experience</h3>
                    <p className="text-blue-100">Tailored recommendations based on your preferences</p>
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

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">EstateHub</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-2xl transition-colors duration-200">
              <Home className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Sign in to your EstateHub account
          </p>

          <div className="space-y-6">
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
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange("rememberMe", e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => alert("Navigate to forgot password")}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert("Google Sign In")}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Facebook Sign In")}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => alert("Navigate to Sign Up")}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;