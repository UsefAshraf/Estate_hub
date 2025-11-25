// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import SignUpPage from "../pages/auth/Signup";
import SignInPage from "../pages/auth/Login";
import ForgotPasswordPage from "../pages/auth/ForgetPassword";
import OTPPage from "../pages/auth/OTP";
import RenewPasswordPage from "../pages/auth/ResetPassword";
import SuccessPage from "../pages/auth/Success";
import { PagePaths } from "../types/pages"
import HomeSellerPage from "@/pages/seller/HomeSellere";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import AuthLayout from "@/Layouts/AuthLayout";
import MainLayout from "@/Layouts/MainLayout";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path={PagePaths.signup} element={<SignUpPage />} />
          <Route path={PagePaths.signin} element={<SignInPage />} />
          <Route path={PagePaths.forgot} element={<ForgotPasswordPage />} />
          <Route path={PagePaths.otp} element={<OTPPage />} />
          <Route path={PagePaths.renew} element={<RenewPasswordPage />} />
          <Route path={PagePaths.success} element={<SuccessPage />} />
        </Route>
         {/* Main App Routes */}
        <Route element={<MainLayout />}>
          <Route path="/home-seller" element={<HomeSellerPage />} />
          {/* Add other main app routes here */}
        </Route>
        {/* Redirect root to Sign In */}
        <Route path="/" element={<Navigate to={PagePaths.signin} replace />} />

        {/* Catch all 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
