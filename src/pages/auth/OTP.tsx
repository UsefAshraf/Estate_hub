// import React, { useState, useEffect } from "react";
// import { Mail } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const OTPPage: React.FC = () => {
//   const [otpArr, setOtpArr] = useState(Array(6).fill(""));
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Auto-focus the first OTP input on page load
//     document.getElementById("otp-0")?.focus();
//   }, []);

//   const handleOtpChange = (index: number, value: string) => {
//     if (/^\d?$/.test(value)) {
//       const newOtp = [...otpArr];
//       newOtp[index] = value;
//       setOtpArr(newOtp);

//       if (value && index < 5) {
//         const next = document.getElementById(`otp-${index + 1}`);
//         next?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace" && otpArr[index] === "" && index > 0) {
//       const prev = document.getElementById(`otp-${index - 1}`);
//       prev?.focus();
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const otpValue = otpArr.join("");
//     console.log("OTP entered:", otpValue);
//     navigate("/renew");
//   };

//   return (
//     <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
//       <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 border border-custom transition-colors duration-200">
        
//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-accent dark:bg-accent-hover p-4 rounded-2xl transition-colors duration-200">
//             <Mail className="w-8 h-8 text-button-text" />
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-primary text-center mb-2">
//           Enter Verification Code
//         </h2>
//         <p className="text-secondary text-center mb-6">
//           We've sent a 6-digit code to your email
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* OTP Input Fields */}
//           <div className="flex justify-center gap-2">
//             {otpArr.map((num, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength={1}
//                 value={num}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 className="
//                   w-12 h-12 text-center text-xl font-semibold
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
//             ))}
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
//             Verify Code
//           </button>

//           {/* Resend Code */}
//           <p className="text-center text-sm text-secondary">
//             Didn't receive the code?{" "}
//             <button 
//               type="button"
//               className="accent hover:text-primary transition-colors duration-200 font-medium cursor-pointer"
//             >
//               Resend
//             </button>
//           </p>

//           {/* Back Button */}
//           <button
//             type="button"
//             onClick={() => navigate("/forgot")}
//             className="
//               w-full text-secondary dark:text-text-secondary
//               hover:text-primary dark:hover:text-text-primary
//               font-medium py-2 transition-colors duration-200
//               cursor-pointer
//             "
//           >
//             Back
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPPage;

import React, { useState, useEffect } from "react";
import { Home, Mail, ArrowLeft, RefreshCw } from "lucide-react";

const OTPPage: React.FC = () => {
  const [otpArr, setOtpArr] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Auto-focus the first OTP input on page load
    document.getElementById("otp-0")?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

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

  const handleSubmit = () => {
    const otpValue = otpArr.join("");
    console.log("OTP entered:", otpValue);
    alert(`OTP Verified: ${otpValue}`);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtpArr(Array(6).fill(""));
    document.getElementById("otp-0")?.focus();
    alert("Verification code resent!");
  };

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
                Verify Your Identity
              </h2>

              {/* Description */}
              <p className="text-blue-100 text-lg mb-8">
                We've sent a verification code to your email address. Enter the 6-digit code below to confirm your identity and proceed with resetting your password.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Secure Verification</h3>
                    <p className="text-blue-100">Your code is encrypted and expires after 10 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Fast & Easy</h3>
                    <p className="text-blue-100">Enter your code and get back to your account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Need Help?</h3>
                    <p className="text-blue-100">Didn't receive the code? Request a new one anytime</p>
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

        {/* Right Side - OTP Form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">EstateHub</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-2xl transition-colors duration-200">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Enter Verification Code
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            We've sent a 6-digit code to your email
          </p>

          <div className="space-y-6">
            {/* OTP Input Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                Verification Code
              </label>
              <div className="flex justify-center gap-2 sm:gap-3">
                {otpArr.map((num, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={num}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-colors duration-200 hover:border-blue-400"
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              {!canResend && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Code expires in <span className="font-semibold text-blue-600">{timer}s</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={otpArr.some(digit => digit === "")}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Verify Code
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium inline-flex items-center gap-1"
                >
                  {canResend ? (
                    <>
                      <RefreshCw className="w-3 h-3" />
                      Resend Code
                    </>
                  ) : (
                    "Resend"
                  )}
                </button>
              </p>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => alert("Navigate back to Forgot Password")}
              className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forgot Password
            </button>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Having Issues?
              </h3>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• Wait a minute before requesting a new code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;