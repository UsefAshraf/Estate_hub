import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authServices";

// -------------------
// Zod Schema
// -------------------
const signUpSchema = z.object({
  userName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  purpose: z.enum(["Buy/Rent a Property", "Sell a Property", "Both"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
  agreeToTerms: z.boolean().refine((value) => value),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// -------------------
// Component
// -------------------
const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      await authService.register(data);
      // Success - Redirect to login or success page
      navigate("/success");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-12 py-3 bg-bg-secondary dark:bg-bg-tertiary border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary transition-colors duration-200 hover:border-accent";

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
      <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 border border-custom transition-colors duration-200">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
            <Home className="w-8 h-8 text-button-text" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary text-center mb-2">Create Account</h2>
        <p className="text-secondary text-center mb-6">Join EstateHub and find your dream property</p>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type="text"
              placeholder="John Doe"
              {...register("userName")}
              className={inputClass}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={inputClass}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
              className={inputClass}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Purpose */}
          <div>
            <select {...register("purpose")} className={inputClass}>
              <option>Buy/Rent a Property</option>
              <option>Sell a Property</option>
              <option>Both</option>
            </select>
            {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              {...register("password")}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Agree to Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("agreeToTerms")}
              className="w-4 h-4 accent bg-bg-secondary dark:bg-bg-tertiary border-custom rounded transition-colors duration-200"
            />
            <label className="ml-2 text-sm text-secondary">
              I agree to the <span className="accent hover:text-primary cursor-pointer">Terms of Service</span> and <span className="accent hover:text-primary cursor-pointer">Privacy Policy</span>
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary font-semibold py-3 rounded-lg transition-colors duration-200 hover:bg-accent-hover cursor-pointer flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2"/> : "Create Account"}
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-secondary mt-4">
          Already have an account?{" "}
          <button onClick={() => navigate("/signin")} className="accent hover:text-primary transition-colors duration-200 font-medium">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;