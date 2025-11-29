import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { PagePaths } from "../../types/pages";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const goToSignIn = () => navigate(PagePaths.signin);

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-background flex items-center justify-center p-4">
      <div className="bg-bg-secondary dark:bg-bg-tertiary rounded-2xl shadow-xl w-full max-w-md p-8 text-center border border-custom transition-colors duration-200">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full transition-colors duration-200">
            <Check className="w-16 h-16 text-green-600 dark:text-green-400" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary mb-2">
          Password Reset Successful!
        </h2>
        <p className="text-secondary mb-8">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>

        <button
          onClick={goToSignIn}
          className="
            w-full btn-primary
            font-semibold py-3 rounded-lg
            transition-colors duration-200
            hover:bg-accent-hover
            cursor-pointer
          "
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;