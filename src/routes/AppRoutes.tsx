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
import VerifyEmail from "../pages/auth/VerifyEmail";
import { PagePaths } from "../types/pages";
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
import UnauthorizedPage from "@/pages/general/Unauthorized";
import Profile from "../pages/general/ProfilePage";
import VisitsPage from "../pages/general/VisitsPage";
import CreateProperty from "@/pages/seller/CreateProperty";
import SellerPropeties from "@/pages/seller/SellerPropeties";
import RequireRole from "./RequireRole";
import RequireAuth from "./RequireAuth";
import AddUser from "@/pages/admin/AddUser";
import PublicLayout from "@/Layouts/PublicLayout";
import ProfileSeller from "@/pages/general/ProfileSeller";

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
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Public Pages - No Authentication Required */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<HomeBuyerPage />} />
          <Route path="/propertydetailBuyer/:id" element={<Propertydetail />} />
          <Route path="/searchBuyer" element={<SearchResultsPage />} />
        </Route>

        {/* Protected Buyer Routes - Authentication Required */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["buyer"]} />}>
            <Route element={<BuyerLayout />}>
              <Route path="/homeBuyer" element={<HomeBuyerPage />} />
              <Route path="/propertydetailBuyer/:id" element={<Propertydetail />} />
              <Route path="/searchBuyer" element={<SearchResultsPage />} />
              <Route path="/favoritesBuyer" element={<FavouritesBuyerPage />} />
              <Route path="/paymentBuyer" element={<PaymentPage />} />
              <Route path="/profileBuyer" element={<Profile />} />
              <Route path="/visitsBuyer" element={<VisitsPage />} />
              <Route path="/confirmPayment" element={<PaymentSuccessPage />} />
              <Route path="/aboutBuyer" element={<About />} />
              <Route path="/contactBuyer" element={<Contact />} />
            </Route>
          </Route>
        </Route>

        {/* Seller Routes — only seller role */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["seller"]} />}>
            <Route element={<SellerLayout />}>
              <Route path="/homeSeller" element={<HomeSellerPage />} />
              <Route path="/createProperty" element={<CreateProperty />} />
              <Route path="/sellerProperties" element={<SellerPropeties />} />
              <Route path="/profileSeller" element={<Profile />} />
              <Route path="/visitsSeller" element={<VisitsPage />} />
              <Route path="/aboutSeller" element={<About />} />
              <Route path="/contactSeller" element={<Contact />} />
            </Route>
          </Route>
        </Route>

        {/* Admin Routes — only admin role */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/properties" element={<AdminPropertiesPage />} />
              <Route path="/admincreateProperty" element={<CreateProperty />} />
              <Route path="/departments" element={<HomeSellerPage />} />
              <Route path="/visitsAdmin" element={<VisitsPage />} />
              <Route path="/profileAdmin" element={<Profile />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/homeBuyer" replace />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;