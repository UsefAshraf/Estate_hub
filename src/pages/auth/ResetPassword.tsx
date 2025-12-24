import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authServices";

// -------------------
// Zod Schema & Types
// -------------------
const renewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RenewPasswordFormData = z.infer<typeof renewPasswordSchema>;

// -------------------
// RenewPassword Component
// -------------------
const RenewPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RenewPasswordFormData>({
    resolver: zodResolver(renewPasswordSchema),
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot");
    }
  }, [email, otp, navigate]);

  const onSubmit = async (data: RenewPasswordFormData) => {
    setLoading(true);
    setApiError(null);
    try {
      await authService.resetPassword({
        email,
        otp,
        password: data.password
      });
      navigate("/success");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Failed to reset password.");
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
            <Lock className="w-8 h-8 text-button-text" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary text-center mb-2">
          Reset Password
        </h2>
        <p className="text-secondary text-center mb-6">
          Create a new password for your account
        </p>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {apiError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
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
                  cursor-text
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-secondary hover:text-primary
                  transition-colors duration-200
                  cursor-pointer
                "
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
            <label className="block text-sm font-medium text-primary mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
                className="
                  w-full pl-10 pr-12 py-3
                  bg-bg-secondary dark:bg-bg-tertiary
                  border border-custom
                  rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-accent
                  text-primary
                  transition-colors duration-200
                  hover:border-accent
                  cursor-text
                "
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-secondary hover:text-primary
                  transition-colors duration-200
                  cursor-pointer
                "
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="bg-bg-primary dark:bg-bg-secondary border border-custom rounded-lg p-4 transition-colors duration-200">
            <p className="text-sm text-primary font-medium mb-2">
              Password must contain:
            </p>
            <ul className="text-sm text-secondary space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 accent" />
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 accent" />
                One uppercase letter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 accent" />
                One lowercase letter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 accent" />
                One number
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 accent" />
                One special character
              </li>
            </ul>
          </div>

          {/* Submit Button */}
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
             {loading ? <Loader2 className="animate-spin mr-2" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenewPasswordPage;