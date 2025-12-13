// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Check } from "lucide-react";
// import { PagePaths } from "../../types/pages";

// const SuccessPage: React.FC = () => {
//   const navigate = useNavigate();

//   const goToSignIn = () => navigate(PagePaths.signin);

//   return (
//     <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
//       <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 text-center border border-custom transition-colors duration-200">
        
//         {/* Success Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full transition-colors duration-200">
//             <Check className="w-16 h-16 text-green-600 dark:text-green-400" strokeWidth={3} />
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-primary mb-2">
//           Password Reset Successful!
//         </h2>
//         <p className="text-secondary mb-8">
//           Your password has been successfully reset. You can now sign in with
//           your new password.
//         </p>

//         <button
//           onClick={goToSignIn}
//           className="
//             w-full btn-primary
//             font-semibold py-3 rounded-lg
//             transition-colors duration-200
//             hover:bg-accent-hover
//             cursor-pointer
//           "
//         >
//           Back to Sign In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;

// import React from "react";
// import { Home, Check, ArrowRight, Shield, Lock, Smile } from "lucide-react";

// const SuccessPage: React.FC = () => {
//   const goToSignIn = () => {
//     alert("Navigate to Sign In");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-start justify-center p-4 pt-20">
//       <div className="w-full max-w-6xl flex gap-6">
//         {/* Left Side - Branding & Image */}
//         <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-8 flex-col justify-between relative overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
//           </div>

//           {/* Content */}
//           <div className="relative z-10 flex flex-col h-full justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-2 mb-8">
//               <Home className="w-10 h-10 text-white" />
//               <span className="text-3xl font-bold text-white">EstateHub</span>
//             </div>

//             {/* Tagline */}
//             <div className="flex-1 flex flex-col justify-center">
//               <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
//                 You're All Set!
//               </h2>

//               {/* Description */}
//               <p className="text-green-100 text-lg mb-8">
//                 Your password has been successfully updated. Your account is now secure and ready to use. Sign in and continue exploring amazing properties!
//               </p>

//               {/* Features */}
//               <div className="space-y-4 mb-8">
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">Secure Account</h3>
//                     <p className="text-green-100">Your new password is encrypted and protected</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">Ready to Go</h3>
//                     <p className="text-green-100">Sign in and access all your saved properties</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
//                   <div>
//                     <h3 className="text-white font-semibold text-lg">Stay Protected</h3>
//                     <p className="text-green-100">Keep your password safe and don't share it</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-4 pt-8 border-t border-green-400/30">
//               <div>
//                 <div className="text-3xl font-bold text-white">10K+</div>
//                 <div className="text-green-100 text-sm">Properties</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-white">5K+</div>
//                 <div className="text-green-100 text-sm">Happy Clients</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-white">50+</div>
//                 <div className="text-green-100 text-sm">Cities</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Success Content */}
//         <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center gap-2 mb-6">
//             <Home className="w-8 h-8 text-green-600" />
//             <span className="text-2xl font-bold text-gray-900 dark:text-white">EstateHub</span>
//           </div>

//           {/* Success Icon */}
//           <div className="flex justify-center mb-6">
//             <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full transition-colors duration-200 relative">
//               <Check className="w-16 h-16 text-green-600 dark:text-green-400" strokeWidth={3} />
//               <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
//             </div>
//           </div>

//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
//             Password Reset Successful!
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
//             Your password has been successfully reset. You can now sign in with your new password.
//           </p>

//           <div className="space-y-6">
//             {/* Info Cards */}
//             <div className="grid grid-cols-3 gap-3">
//               <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-100 dark:border-green-800">
//                 <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
//                 <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Secure</p>
//               </div>
//               <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-100 dark:border-green-800">
//                 <Lock className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
//                 <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Protected</p>
//               </div>
//               <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-100 dark:border-green-800">
//                 <Smile className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
//                 <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Ready</p>
//               </div>
//             </div>

//             {/* Sign In Button */}
//             <button
//               onClick={goToSignIn}
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//             >
//               Back to Sign In
//               <ArrowRight className="w-5 h-5" />
//             </button>

//             {/* Additional Tips */}
//             <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
//                 Security Tips
//               </h3>
//               <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
//                 <li>• Never share your password with anyone</li>
//                 <li>• Use a unique password for each account</li>
//                 <li>• Enable two-factor authentication if available</li>
//                 <li>• Update your password regularly</li>
//               </ul>
//             </div>

//             {/* Help Link */}
//             <div className="text-center">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Need help?{" "}
//                 <button
//                   type="button"
//                   onClick={() => alert("Contact support")}
//                   className="text-green-600 hover:text-green-700 transition-colors duration-200 font-medium"
//                 >
//                   Contact Support
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;


import React from "react";
import { Home, Check, ArrowRight, Shield, Lock, Smile } from "lucide-react";

const SuccessPage: React.FC = () => {
  const goToSignIn = () => {
    alert("Navigate to Sign In");
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
                You're All Set!
              </h2>

              {/* Description */}
              <p className="text-blue-100 text-lg mb-8">
                Your password has been successfully updated. Your account is now secure and ready to use. Sign in and continue exploring amazing properties!
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Secure Account</h3>
                    <p className="text-blue-100">Your new password is encrypted and protected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Ready to Go</h3>
                    <p className="text-blue-100">Sign in and access all your saved properties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Stay Protected</h3>
                    <p className="text-blue-100">Keep your password safe and don't share it</p>
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

        {/* Right Side - Success Content */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">EstateHub</span>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full transition-colors duration-200 relative">
              <Check className="w-16 h-16 text-green-600 dark:text-green-400" strokeWidth={3} />
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>

          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-100 dark:border-green-800">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Secure</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-100 dark:border-green-800">
                <Lock className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Protected</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-100 dark:border-green-800">
                <Smile className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Ready</p>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={goToSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Back to Sign In
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Additional Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Security Tips
              </h3>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Never share your password with anyone</li>
                <li>• Use a unique password for each account</li>
                <li>• Enable two-factor authentication if available</li>
                <li>• Update your password regularly</li>
              </ul>
            </div>

            {/* Help Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need help?{" "}
                <button
                  type="button"
                  onClick={() => alert("Contact support")}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                >
                  Contact Support
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;