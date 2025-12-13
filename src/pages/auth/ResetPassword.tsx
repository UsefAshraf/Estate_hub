// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // -------------------
// // Zod Schema & Types
// // -------------------
// const renewPasswordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Must contain at least one number")
//       .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type RenewPasswordFormData = z.infer<typeof renewPasswordSchema>;

// // -------------------
// // RenewPassword Component
// // -------------------
// const RenewPasswordPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { register, handleSubmit, formState: { errors } } = useForm<RenewPasswordFormData>({
//     resolver: zodResolver(renewPasswordSchema),
//   });
//   const navigate = useNavigate();

//   const onSubmit = (data: RenewPasswordFormData) => {
//     console.log("New Password:", data.password);
//     navigate("/success");
//   };

//   return (
//     <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
//       <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 border border-custom transition-colors duration-200">
        
//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
//             <Lock className="w-8 h-8 text-button-text" />
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-primary text-center mb-2">
//           Reset Password
//         </h2>
//         <p className="text-secondary text-center mb-6">
//           Create a new password for your account
//         </p>

//         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-primary mb-2">
//               New Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter new password"
//                 {...register("password")}
//                 className="
//                   w-full pl-10 pr-12 py-3
//                   bg-bg-secondary dark:bg-bg-tertiary
//                   border border-custom
//                   rounded-lg
//                   focus:outline-none focus:ring-2 focus:ring-accent
//                   text-primary
//                   transition-colors duration-200
//                   hover:border-accent
//                   cursor-text
//                 "
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="
//                   absolute right-3 top-1/2 -translate-y-1/2
//                   text-secondary hover:text-primary
//                   transition-colors duration-200
//                   cursor-pointer
//                 "
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-primary mb-2">
//               Confirm New Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 {...register("confirmPassword")}
//                 className="
//                   w-full pl-10 pr-12 py-3
//                   bg-bg-secondary dark:bg-bg-tertiary
//                   border border-custom
//                   rounded-lg
//                   focus:outline-none focus:ring-2 focus:ring-accent
//                   text-primary
//                   transition-colors duration-200
//                   hover:border-accent
//                   cursor-text
//                 "
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="
//                   absolute right-3 top-1/2 -translate-y-1/2
//                   text-secondary hover:text-primary
//                   transition-colors duration-200
//                   cursor-pointer
//                 "
//               >
//                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           {/* Password Requirements */}
//           <div className="bg-bg-primary dark:bg-bg-secondary border border-custom rounded-lg p-4 transition-colors duration-200">
//             <p className="text-sm text-primary font-medium mb-2">
//               Password must contain:
//             </p>
//             <ul className="text-sm text-secondary space-y-1">
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 accent" />
//                 At least 8 characters
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 accent" />
//                 One uppercase letter
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 accent" />
//                 One lowercase letter
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 accent" />
//                 One number
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 accent" />
//                 One special character
//               </li>
//             </ul>
//           </div>

//           {/* Submit Button */}
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
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RenewPasswordPage;

import React, { useState } from "react";
import { Home, Lock, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

const RenewPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  // Password strength checks
  const hasMinLength = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.password);
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && passwordsMatch;

  const handleSubmit = () => {
    if (!allRequirementsMet) {
      alert("Please meet all password requirements");
      return;
    }
    console.log("New Password:", formData.password);
    alert("Password reset successful!");
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
                Create a Strong Password
              </h2>

              {/* Description */}
              <p className="text-blue-100 text-lg mb-8">
                Choose a secure password to protect your account. Make sure it's unique and meets all the requirements below for maximum security.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Strong Security</h3>
                    <p className="text-blue-100">Your password is encrypted and securely stored</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Password Guidelines</h3>
                    <p className="text-blue-100">Follow best practices for a secure account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Account Protection</h3>
                    <p className="text-blue-100">Keep your properties and data safe</p>
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

        {/* Right Side - Reset Password Form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">EstateHub</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-2xl transition-colors duration-200">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Create a new password for your account
          </p>

          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={inputClass}
                  placeholder="Enter new password"
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
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={inputClass}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-200">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-3">
                Password must contain:
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  {hasMinLength ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={hasMinLength ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                    At least 8 characters
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {hasUpperCase ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={hasUpperCase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                    One uppercase letter
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {hasLowerCase ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={hasLowerCase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                    One lowercase letter
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {hasNumber ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                    One number
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {hasSpecialChar ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={hasSpecialChar ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                    One special character
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {passwordsMatch ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={passwordsMatch ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                    Passwords match
                  </span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!allRequirementsMet}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Reset Password
            </button>

            {/* Security Note */}
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Make sure to use a strong, unique password that you haven't used elsewhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewPasswordPage;