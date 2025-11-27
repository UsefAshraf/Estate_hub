// layouts/MainLayout.tsx
import Footer from "../components/Footer/footer";
import React from "react";
import { Outlet } from "react-router-dom";
import SellerNavbar from "@/components/Navbar/sellerNavbar";

const SellerLayout: React.FC = () => (
  <div>
    <SellerNavbar />
    <main className="pt-18"> {/* 20 * 4px = 80px, adjust to navbar height */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default SellerLayout;
