import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import SignUpPage from "../pages/auth/Signup";
import SignInPage from "../pages/auth/Login";
import ForgotPasswordPage from "../pages/auth/ForgetPassword";
import OTPPage from "../pages/auth/OTP";
import RenewPasswordPage from "../pages/auth/ResetPassword";
import SuccessPage from "../pages/auth/Success";
import VerifyEmail from "../pages/auth/VerifyEmail";
import { PagePaths } from "../types/pages";

import HomeBuyerPage from "../pages/buyer/HomeBuyer";
import FavouritesBuyerPage from "../pages/buyer/FavouritesBuyer";
import SearchResultsPage from "../pages/search/SearchResults";
import PaymentPage from "../pages/buyer/payment";
import PaymentSuccessPage from "../pages/buyer/confirmpayment";

import HomeSellerPage from "../pages/seller/HomeSeller";
import CreateProperty from "../pages/seller/CreateProperty";
import MyProperties from "../pages/seller/MyProperties";
import SellerPropeties from "@/pages/seller/SellerPropeties";

import UserManagement from "@/pages/admin/usermanagement";
import AdminPropertiesPage from "@/pages/admin/AdminPropPage";
import AddUser from "../pages/admin/AddUser";

import About from "@/pages/general/AboutUs";
import Contact from "@/pages/general/ContactUs";
import NotFoundPage from "@/pages/general/NotFound";
import Profile from "../pages/general/ProfilePage";
import VisitsPage from "../pages/general/VisitsPage";
import ProfileLayout from "../pages/general/ProfilePage";
import Propertydetail from "@/pages/buyer/propertydetail";

import AuthLayout from "../Layouts/AuthLayout";
import BuyerLayout from "../Layouts/BuyerLayout";
import SellerLayout from "../Layouts/SellerLayout";
import AdminLayout from "@/Layouts/AdminLayout";

import RequireRole from "./RequireRole";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public/Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path={PagePaths.signup} element={<SignUpPage />} />
          <Route path={PagePaths.signin} element={<SignInPage />} />
          <Route path={PagePaths.forgot} element={<ForgotPasswordPage />} />
          <Route path={PagePaths.otp} element={<OTPPage />} />
          <Route path={PagePaths.renew} element={<RenewPasswordPage />} />
          <Route path={PagePaths.success} element={<SuccessPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Buyer routes */}
        <Route element={<RequireRole allowedRoles={["buyer"]} />}>
          <Route element={<BuyerLayout />}>
            <Route path="/homeBuyer" element={<HomeBuyerPage />} />
            <Route path="/searchBuyer" element={<SearchResultsPage />} />
            <Route path="/propertydetailBuyer/:id" element={<Propertydetail />} />
            <Route path="/favoritesBuyer" element={<FavouritesBuyerPage />} />
            <Route path="/paymentBuyer" element={<PaymentPage />} />
            <Route path="/confirmPayment" element={<PaymentSuccessPage />} />
            <Route path="/profileBuyer" element={<Profile />} />
            <Route path="/visitsBuyer" element={<VisitsPage />} />
            <Route path="/aboutBuyer" element={<About />} />
            <Route path="/contactBuyer" element={<Contact />} />
          </Route>
        </Route>

        {/* Seller routes */}
        <Route element={<RequireRole allowedRoles={["seller"]} />}>
          <Route element={<SellerLayout />}>
            <Route path="/homeSeller" element={<HomeSellerPage />} />
            <Route path="/createProperty" element={<CreateProperty />} />
            <Route path="/sellerProperties" element={<SellerPropeties />} />
            <Route path="/profileSeller" element={<Profile />} />
            <Route path="/visitsSeller" element={<VisitsPage />} />
            <Route path="/aboutSeller" element={<About />} />
            <Route path="/contactSeller" element={<Contact />} />
            <Route path="/my-properties" element={<MyProperties />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<RequireRole allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/addusers" element={<AddUser />} />
            <Route path="/properties" element={<AdminPropertiesPage />} />
            <Route path="/departments" element={<HomeSellerPage />} />
            <Route path="/visitsAdmin" element={<VisitsPage />} />
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback routes */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
