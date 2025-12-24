import React, { useState, useEffect } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authServices";

const OTPPage: React.FC = () => {
  const [otpArr, setOtpArr] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    // If no email is provided (user accessed page directly), redirect to forgot password
    if (!email) {
      navigate("/forgot");
    }
    // Auto-focus the first OTP input on page load
    document.getElementById("otp-0")?.focus();
  }, [email, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpArr];
      newOtp[index] = value;
      setOtpArr(newOtp);

      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otpArr[index] === "" && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otpArr.join("");
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.verifyOtp(email, otpValue);
      // Pass email AND verified OTP to the reset page
      navigate("/renew", { state: { email, otp: otpValue } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid Code");
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
            <Mail className="w-8 h-8 text-button-text" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary text-center mb-2">
          Enter Verification Code
        </h2>
        <p className="text-secondary text-center mb-6">
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2">
            {otpArr.map((num, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={num}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="
                  w-12 h-12 text-center text-xl font-semibold
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
            ))}
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
             {loading ? <Loader2 className="animate-spin mr-2" /> : "Verify Code"}
          </button>

          {/* Resend Code */}
          <p className="text-center text-sm text-secondary">
            Didn't receive the code?{" "}
            <button 
              type="button"
              className="accent hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
            >
              Resend
            </button>
          </p>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="
              w-full text-secondary dark:text-text-secondary
              hover:text-primary dark:hover:text-text-primary
              font-medium py-2 transition-colors duration-200
              cursor-pointer
            "
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;