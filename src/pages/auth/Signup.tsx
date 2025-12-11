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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form Data:", data);

    // Redirect based on user's purpose
    if (data.purpose === "Buy/Rent a Property") {
      navigate("/HomeBuyer");
    } else if (data.purpose === "Sell a Property") {
      navigate("/HomeSeller");
    }
  };

  const inputClass =
    "w-full pl-10 pr-12 py-3 bg-bg-secondary dark:bg-bg-tertiary border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary transition-colors duration-200 hover:border-accent";

  return (
    <div className="bg-bg-primary dark:bg-background flex">
      {/* Left Side - Branding & Image */}
      <div className="hidden lg:flex lg:w-3/4 bg-primary dark:bg-bg-tertiary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-primary dark:bg-bg-tertiary opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 ">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Home className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl text-primary font-bold">EstateHub</h1>
          </div>

          {/* Tagline */}
          <h2 className="text-3xl text-primary font-bold mb-4 leading-tight">
            Your Gateway to
            <br />
            Dream Properties
          </h2>

          {/* Description */}
          <p className="text-lg text-primary mb-8 leading-relaxed">
            EstateHub is your trusted partner in finding, buying, selling, and
            renting properties. We connect you with the perfect home or
            investment opportunity.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-primary bg-white/20 backdrop-blur-sm p-2 rounded-lg mt-1">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary text-lg">
                  Buy & Rent Properties
                </h3>
                <p className="text-primary text-sm">
                  Browse thousands of verified listings
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-primary bg-white/20 backdrop-blur-sm p-2 rounded-lg mt-1">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary text-lg">
                  Sell Your Property
                </h3>
                <p className="text-primary text-sm">
                  List your property and reach millions of buyers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-primary backdrop-blur-sm p-2 rounded-lg mt-1">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary">
                  Expert Guidance
                </h3>
                <p className="text-primary text-sm">
                  Get professional support throughout your journey
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl text-primary font-bold">10K+</div>
              <div className="text-primary text-sm">Properties</div>
            </div>
            <div>
              <div className="text-3xl text-primary font-bold">5K+</div>
              <div className="text-primary text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl text-primary font-bold">50+</div>
              <div className="text-primary text-sm">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-6">
            <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
              <Home className="w-8 h-8 text-button-text" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-2">
            Create Account
          </h2>
          <p className="text-secondary mb-8">
            Join EstateHub and find your dream property
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("fullName")}
                className={inputClass}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
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
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Purpose */}
            <div>
              <select {...register("purpose")} className={inputClass}>
                <option>Buy/Rent a Property</option>
                <option>Sell a Property</option>
              </select>
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.purpose.message}
                </p>
              )}
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="w-4 h-4 accent bg-bg-secondary dark:bg-bg-tertiary border-custom rounded transition-colors duration-200"
              />
              <label className="ml-2 text-sm text-secondary">
                I agree to the{" "}
                <span className="accent hover:text-primary cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="accent hover:text-primary cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.agreeToTerms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn-primary font-semibold py-3 rounded-lg transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm text-secondary mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="accent hover:text-primary transition-colors duration-200 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
