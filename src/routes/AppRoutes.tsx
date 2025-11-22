// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// import Login from "../pages/auth/Login";
// import Signup from "../pages/auth/Signup";
// import ResetPassword from "../pages/auth/ResetPassword";
// import OTP from "../pages/auth/OTP";
// import Success from "../pages/auth/Success";
// import BuyerMain from "../pages/buyer/MainPage";
// import SellerMain from "../pages/seller/MainPage";
// import AdminMain from "../pages/admin/MainPage";
// import Profile from "../pages/general/Profile";
// import AboutUs from "../pages/general/AboutUs";
// import ContactUs from "../pages/general/ContactUs";
// import NotFound404 from "../pages/general/NotFound404";

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Auth */}
    {/* <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/otp" element={<OTP />} />
    <Route path="/success" element={<Success />} /> */}

    {/* Buyer */}
    {/* <Route path="/buyer" element={<BuyerMain />} /> */}

    {/* Seller */}
    {/* <Route path="/seller" element={<SellerMain />} /> */}

    {/* Admin */}
    {/* <Route path="/admin" element={<AdminMain />} /> */}

    {/* General */}
    {/* <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/contact" element={<ContactUs />} /> */}

    {/* 404 */}
    {/* <Route path="*" element={<NotFound404 />} /> */}
  </Routes>
);

export default AppRoutes;
