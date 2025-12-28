// layouts/MainLayout.tsx
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const BuyerLayout: React.FC = () => (
  <div>
    <Navbar />
    <main className="pt-18">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default BuyerLayout;