import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authServices";

// -------------------
// Zod Schema
// -------------------
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

// -------------------
// Component
// -------------------
const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [apiError, setApiError] = useState<string | null>(null); // Add error state
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      await authService.login(data);
      // Redirect based on role or default path
      navigate("/homeBuyer");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
      <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 border border-custom transition-colors duration-200">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
            <Home className="w-8 h-8 text-button-text" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-secondary text-center mb-6">
          Sign in to your EstateHub account
        </p>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="
                w-full pl-10 pr-4 py-3
                bg-bg-secondary dark:bg-bg-tertiary
                border border-custom
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-accent
                text-primary
                transition-colors duration-200
                hover:border-accent
              "
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="
                w-full pl-10 pr-12 py-3
                bg-bg-secondary dark:bg-bg-tertiary
                border border-custom
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-accent
                text-primary
                transition-colors duration-200
                hover:border-accent
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors duration-200"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 accent bg-bg-secondary dark:bg-bg-tertiary border-custom rounded transition-colors duration-200"
              />
              <label className="ml-2 text-sm text-secondary">Remember me</label>
            </div>
            <button
              type="button"
              onClick={() => navigate("/forgot")}
              className="text-sm accent hover:text-primary transition-colors duration-200 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full btn-primary
              font-semibold py-3 rounded-lg
              transition-colors duration-200
              hover:bg-accent-hover
              cursor-pointer
              flex justify-center items-center
            "
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm text-secondary mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="accent hover:text-primary transition-colors duration-200 font-medium"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;