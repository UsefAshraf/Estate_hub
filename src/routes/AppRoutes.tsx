// src/routes/AppRoutes.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import SignUpPage from "../pages/auth/Signup";
import SignInPage from "../pages/auth/Login";
import ForgotPasswordPage from "../pages/auth/ForgetPassword";
import OTPPage from "../pages/auth/OTP";
import RenewPasswordPage from "../pages/auth/ResetPassword";
import SuccessPage from "../pages/auth/Success";
import { PagePaths } from "../types/pages";
// import HomeSellerPage from "../pages/seller/HomeSeller";
import HomeBuyerPage from "../pages/buyer/HomeBuyer";
import FavouritesBuyerPage from "../pages/buyer/FavouritesBuyer";
import SearchResultsPage from "../pages/search/SearchResults";
import AuthLayout from "../Layouts/AuthLayout";

import BuyerLayout from "../Layouts/BuyerLayout";
import HomeSellerPage from "../pages/seller/HomeSeller";
import SellerLayout from "../Layouts/SellerLayout";
import AdminLayout from "@/Layouts/AdminLayout";
import Propertydetail from "@/pages/buyer/propertydetail";
import UserManagement from "@/pages/admin/usermanagement";
import AdminPropertiesPage from "@/pages/admin/AdminPropPage";
import PaymentPage from "@/pages/buyer/payment";
import PaymentSuccessPage from "@/pages/buyer/confirmpayment";
import About from "@/pages/general/AboutUs";
import Contact from "@/pages/general/ContactUs";
import NotFoundPage from "@/pages/general/NotFound";
import Profile from "../pages/general/ProfilePage";
import VisitsPage from "../pages/general/VisitsPage";
import EditProfile from "../pages/general/EditPage";
import ProfileLayout from "../pages/general/ProfileLayout";
import CreateProperty from "../pages/seller/CreateProperty";
import MyProperties from '../pages/seller/MyProperties';


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

        <Route element={<BuyerLayout />}>
          <Route path="/homeBuyer" element={<HomeBuyerPage />} />
          <Route path="/searchBuyer" element={<SearchResultsPage />} />
          <Route path="/propertydetailBuyer" element={<Propertydetail />} />
          <Route path="/aboutBuyer" element={<About />} />
          <Route path="/contactBuyer" element={<Contact />} />
          <Route path="/favoritesBuyer" element={<FavouritesBuyerPage />} />
          <Route path="/paymentBuyer" element={<PaymentPage />} />
          <Route path="/confirmPayment" element={<PaymentSuccessPage />} />
        </Route>

        <Route element={<SellerLayout />}>
          <Route path="/homeSeller" element={<HomeSellerPage />} />
          <Route path="/createProperty" element={<CreateProperty />} />
          <Route path="/aboutSeller" element={<About />} />
          <Route path="/contactSeller" element={<Contact />} />
          <Route path="/my-properties" element={<MyProperties />} />

        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/properties" element={<AdminPropertiesPage />} />
          <Route path="/departments" element={<HomeSellerPage />} />
          <Route path="/visits" element={<VisitsPage />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>

        {/* General */}

        {/* Profile + nested routes */}

        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/homeBuyer" replace />} />

        {/* Catch all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
