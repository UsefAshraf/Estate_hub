import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "@/services/auth.api";
import type { VerifyEmailResponse } from "@/types/auth.types";
import { CheckCircle, XCircle, Loader2, Home } from "lucide-react";
import { useRef } from "react";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  console.log("VerifyEmail component rendered, status:", status);
  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const { data } = await verifyEmail(token);
        const response = data as VerifyEmailResponse;

        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));

        setStatus("success");
        setMessage("Email verified successfully! Redirecting...");

        setTimeout(() => {
          navigate(
            response.user.role === "seller" ? "/homeSeller" : "/homeBuyer"
          );
        }, 2000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed or link expired."
        );
      }
    };

    verify();
  }, [searchParams, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Home className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              EstateHub
            </span>
          </div>

          {/* Status Content */}
          <div className="text-center">
            {status === "loading" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Verifying Your Email
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we verify your email address...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Verified Successfully!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{message}</p>
                <div className="pt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full w-0 animate-[progressBar_2s_ease-in-out_forwards]"></div>
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <XCircle className="w-16 h-16 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Verification Failed
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{message}</p>
                <div className="pt-4">
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Back to Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Need help?{" "}
          <a
            href="/contactBuyer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
