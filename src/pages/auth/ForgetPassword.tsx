import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// -------------------
// Zod Schema & Types
// -------------------
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// -------------------
// Component
// -------------------
const ForgotPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Reset Password Email:", data.email);
    navigate("/otp");
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
          Forgot Password?
        </h2>
        <p className="text-secondary text-center mb-6">
          Enter your email address and we'll send you a code to reset your password
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="
                  w-full pl-10 pr-4 py-3
                  bg-bg-secondary dark:bg-bg-tertiary border border-custom
                  rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-accent
                  text-primary
                  transition-colors duration-200
                  hover:bg-accent-hover hover:border-accent
                "
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full btn-primary
              font-semibold py-3 rounded-lg
              transition-colors duration-200
              hover:bg-accent-hover
              cursor-pointer
            "
          >
            Send Reset Code
          </button>

          {/* Back to Sign In */}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="
              w-full text-secondary dark:text-text-secondary
              hover:text-primary dark:hover:text-text-primary
              font-medium py-2 transition-colors duration-200
            "
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
