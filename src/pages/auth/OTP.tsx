import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OTPPage: React.FC = () => {
  const [otpArr, setOtpArr] = useState(Array(6).fill(""));
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-focus the first OTP input on page load
    document.getElementById("otp-0")?.focus();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otpArr.join("");
    console.log("OTP entered:", otpValue);
    navigate("/renew");
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
          We've sent a 6-digit code to your email
        </p>

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
            className="
              w-full btn-primary
              font-semibold py-3 rounded-lg
              transition-colors duration-200
              hover:bg-accent-hover
              cursor-pointer
            "
          >
            Verify Code
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